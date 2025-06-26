import { NextResponse } from "next/server";
import Property from "@/models/Property";
import dbConnect from "@/utils/dbConnect";

export async function GET() {
  try {
    await dbConnect();

    const featuredProperties = await Property.find({ featured: true }).limit(8);

    return NextResponse.json(featuredProperties);
  } catch (error) {
    console.error("Failed to fetch featured properties:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
