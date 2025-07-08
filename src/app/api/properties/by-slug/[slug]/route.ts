import dbConnect from "@/utils/dbConnect";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const prop = await Property.findOne({ slug: params.slug }).lean();
    if (!prop)
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    return NextResponse.json(prop);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}
