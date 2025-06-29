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
    const params = url.searchParams;

    const filters: any = {};

    // Search by slug (direct fetch)
    if (params.has("slug")) {
      const slug = params.get("slug");
      const prop = await Property.findOne({ slug }).lean();
      if (!prop)
        return NextResponse.json(
          { error: "Property not found" },
          { status: 404 }
        );
      return NextResponse.json(prop);
    }

    // Location (search across state, city, street)
    if (params.has("location")) {
      const location = params.get("location")!;
      filters.$or = [
        { city: { $regex: location, $options: "i" } },
        { state: { $regex: location, $options: "i" } },
        { street: { $regex: location, $options: "i" } },
      ];
    }

    // Type → maps to `category` in DB
    if (params.has("type")) {
      filters.category = params.get("type");
    }

    // Purpose (sale/rent/short-let)
    if (params.has("purpose")) {
      filters.purpose = params.get("purpose");
    }

    // Bedrooms
    if (params.has("beds")) {
      filters.bedrooms = { $gte: parseInt(params.get("beds")!) };
    }

    // Price range
    if (params.has("minPrice") || params.has("maxPrice")) {
      filters.price = {};
      if (params.has("minPrice")) {
        filters.price.$gte = parseInt(params.get("minPrice")!);
      }
      if (params.has("maxPrice")) {
        filters.price.$lte = parseInt(params.get("maxPrice")!);
      }
    }

    console.log("Applied Filters:", filters); // Optional: helpful debug

    const props = await Property.find(filters).lean();
    return NextResponse.json(props);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
