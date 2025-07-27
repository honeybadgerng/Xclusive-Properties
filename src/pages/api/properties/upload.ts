import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File, Files, Fields } from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import jwt from "jsonwebtoken";

import dbConnect from "@/utils/dbConnect";
import Property from "@/models/Property";
import User from "@/models/User";
import Plan from "@/models/Plan";

const JWT_SECRET = process.env.JWT_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  const form = formidable({ multiples: true, keepExtensions: true });

  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Form parse failed", details: err.message });
    }

    try {
      // ✅ Extract token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid token" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

      if (!decoded?.id) {
        return res
          .status(400)
          .json({ error: "User ID not found in token payload" });
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const planKey = user.subscription?.plan?.toLowerCase?.() || "free";
      const plan = await Plan.findOne({ key: planKey });

      if (!plan) {
        return res.status(500).json({
          error: `Plan "${planKey}" not found. Please contact support.`,
        });
      }

      // enforce limit
      const existingCount = await Property.countDocuments({ user: user._id });
      if (existingCount >= plan.listings) {
        return res.status(403).json({
          error: `You have reached your ${planKey} plan limit of ${plan.listings} listings.`,
        });
      }
      // ✅ Parse form data
      const rawData = Array.isArray(fields.data)
        ? fields.data[0]
        : (fields.data as unknown as string);
      const data = JSON.parse(rawData);

      // ✅ Handle images
      const rawFiles = files.images;
      const fileArray = Array.isArray(rawFiles)
        ? rawFiles
        : ([rawFiles].filter(Boolean) as unknown as File[]);

      const imageUrls: string[] = [];

      for (const file of fileArray) {
        if (!file?.filepath) continue;

        const upload = await cloudinary.uploader.upload(file.filepath, {
          folder: "properties",
          transformation: [
            {
              overlay: "Xclusive_properties_lizebt", // must be uploaded to Cloudinary first
              gravity: "center", // center
              width: 1000,
              opacity: 60,
              effect: "brightness:10",
            },
          ],
        });

        imageUrls.push(upload.secure_url);
        fs.unlinkSync(file.filepath);
      }

      // ✅ Add user ID to the new property
      const newProperty = new Property({
        ...data,
        user: decoded.id, // Attach user ID here
        images: imageUrls,
      });

      await newProperty.save();

      return res.status(201).json(newProperty);
    } catch (uploadError) {
      console.error("Upload failed", uploadError);
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Unknown upload error";
      return res.status(500).json({ error: "Upload failed", details: message });
    }
  });
}
