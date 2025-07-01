import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File, Files, Fields } from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dbConnect from "@/utils/dbConnect";
import Property from "@/models/Property";

// Disable default body parsing (required for formidable)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Setup Cloudinary
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
      // ✅ Handle possible array from form data
      const rawData = Array.isArray(fields.data)
        ? fields.data[0]
        : (fields.data as unknown as string);

      const data = JSON.parse(rawData);

      const rawFiles = files.images;
      const fileArray = Array.isArray(rawFiles)
        ? rawFiles
        : ([rawFiles].filter(Boolean) as unknown as File[]);

      const imageUrls: string[] = [];

      for (const file of fileArray) {
        if (!file || !file.filepath) continue;

        const upload = await cloudinary.uploader.upload(file.filepath, {
          folder: "properties",
        });

        imageUrls.push(upload.secure_url);

        // ✅ Delete temp file safely
        fs.unlinkSync(file.filepath);
      }

      const newProp = new Property({ ...data, images: imageUrls });
      await newProp.save();

      return res.status(201).json(newProp);
    } catch (uploadError: unknown) {
      console.error("Upload failed", uploadError);
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Unknown upload error";
      return res.status(500).json({ error: "Upload failed", details: message });
    }
  });
}
