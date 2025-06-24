import dbConnect from "@/utils/dbConnect";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const data = await req.json();
    const required = [
      "title",
      "slug",
      "price",
      "usdtPrice",
      "state",
      "city",
      "street",
    ];
    const missing = required.filter((k) => !(k in data));
    if (missing.length) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const prop = new Property(data);
    await prop.save();

    return NextResponse.json(prop, { status: 201 });
  } catch (error) {
    console.error(error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create property", details: msg },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (slug) {
      const prop = await Property.findOne({ slug }).lean();
      if (!prop)
        return NextResponse.json(
          { error: "Property not found" },
          { status: 404 }
        );
      return NextResponse.json(prop);
    }

    const props = await Property.find({}).lean();
    return NextResponse.json(props);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
