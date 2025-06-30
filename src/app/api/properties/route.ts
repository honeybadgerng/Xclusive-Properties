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

    // Unified $or filter for both q (keyword) and location
    // const orFilters: any[] = [];

    // if (params.has("q")) {
    //   const q = params.get("q")!;
    //   orFilters.push(
    //     { title: { $regex: q, $options: "i" } },
    //     { slug: { $regex: q, $options: "i" } },
    //     { city: { $regex: q, $options: "i" } },
    //     { state: { $regex: q, $options: "i" } },
    //     { street: { $regex: q, $options: "i" } }
    //   );
    // }

    // if (params.has("location")) {
    //   const location = params.get("location")!;
    //   orFilters.push(
    //     { city: { $regex: location, $options: "i" } },
    //     { state: { $regex: location, $options: "i" } },
    //     { street: { $regex: location, $options: "i" } }
    //   );
    // }

    // if (orFilters.length > 0) {
    //   filters.$or = orFilters;
    // }

    // working perfect Location location logic (search across state, city, street)
    if (params.has("location")) {
      const location = params.get("location")!;
      filters.$or = [
        { city: { $regex: location, $options: "i" } },
        { state: { $regex: location, $options: "i" } },
        { street: { $regex: location, $options: "i" } },
      ];
    }

    // Type → maps to `category` in DB
    // if (params.has("type")) {
    //   filters.category = params.get("type");
    // }

    // // Purpose (sale/rent/short-let)
    // if (params.has("purpose")) {
    //   filters.purpose = params.get("purpose");
    // }

    // // ✅ Property Type, Subtype, Category, Market Status
    // ["type", "subtype", "category", "marketStatus"].forEach((field) => {
    //   const value = params.get(field);
    //   if (value) filters[field] = { $regex: new RegExp(`^${value}$`, "i") }; // case-insensitive match
    // });

    ["type", "category", "marketStatus"].forEach((field) => {
      const value = params.get(field);
      if (value) {
        filters[field] = { $regex: new RegExp(`^${value}$`, "i") }; // exact, case-insensitive match
      }
    });

    const subtype = params.get("subtype");
    if (subtype) {
      filters.subtype = { $regex: subtype, $options: "i" }; // matches anywhere in string
    }

    // Bedrooms
    if (params.has("beds")) {
      filters.bedrooms = { $gte: parseInt(params.get("beds")!) };
    }
    if (params.get("toilets"))
      filters.toilets = parseInt(params.get("toilets")!);

    if (params.get("bathrooms"))
      filters.bathrooms = parseInt(params.get("bathrooms")!);

    if (params.get("parkingSpaces"))
      filters.parkingSpaces = parseInt(params.get("parkingSpaces")!);

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

    // ✅ Boolean fields
    if (params.get("furnished") === "true") filters.furnished = true;
    if (params.get("serviced") === "true") filters.serviced = true;
    if (params.get("featured") === "true") filters.featured = true;
    if (params.get("premium") === "true") filters.premium = true;

    // ✅ facilities[]
    const facilities = params.getAll("facilities");
    if (facilities.length > 0) {
      filters.facilities = {
        $all: facilities.map((f) => new RegExp(f, "i")),
      };
    }

    // Handle numeric filters like beds, bathrooms, etc.
    if (params.get("beds")) filters.bedrooms = parseInt(params.get("beds")!);
    if (params.get("toilets"))
      filters.toilets = parseInt(params.get("toilets")!);
    if (params.get("bathrooms"))
      filters.bathrooms = { $gte: parseInt(params.get("bathrooms")!) };
    if (params.get("parkingSpaces"))
      filters.parking = { $gte: parseInt(params.get("parkingSpaces")!) };
    console.log("Final applied filters:", filters);

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
