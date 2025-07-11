// Example: app/api/properties/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/utils/auth"; // if using auth
import dbConnect from "@/utils/dbConnect";
import Property from "@/models/Property";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const property = await Property.findById(params.id).lean();

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching property" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const id = params.id;

    const token = getTokenFromRequest(req);
    if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";
    let bodyData: any = {};
    let newImages: File[] = [];

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const dataStr = form.get("data") as string;
      bodyData = JSON.parse(dataStr);

      // Files
      const images = form.getAll("images") as File[];
      newImages = images;
    } else {
      bodyData = await req.json();
    }

    // Handle image uploads here if needed
    const { existingImages = [] } = bodyData;

    const updated = await Property.findOneAndUpdate(
      { _id: id, user: token.id },
      {
        ...bodyData,
        images: [...existingImages], // You can later add logic to append uploaded URLs
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Property not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const deleted = await Property.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
