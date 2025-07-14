import dbConnect from "@/utils/dbConnect";
import Property from "@/models/Property";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getTokenFromRequest } from "@/utils/auth"; // helper to decode JWT

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

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const params = url.searchParams;

    const filters: any = {};

    // 👤 Check for "me=true" to filter for current logged-in agent
    const me = params.get("me") === "true";
    if (me) {
      const authHeader = req.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
        const token = authHeader.split(" ")[1];
        const decoded: any = jwt.verify(token, JWT_SECRET);
        filters.user = decoded.id; // Only fetch properties created by this user
      } catch (err) {
        console.error("JWT verification failed", err);
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }
    }

    // Search by slug (direct fetch)
    if (params.has("slug")) {
      const slug = params.get("slug");

      const prop = (await Property.findOne({ slug })
        .populate({
          path: "user",
          select: "name phone email whatsapp profileImage companyName",
        })
        .lean()) as any;

      if (!prop)
        return NextResponse.json(
          { error: "Property not found" },
          { status: 404 }
        );

      console.log("📦 Raw property from DB:", JSON.stringify(prop, null, 2));

      const user = prop.user;

      if (!user || typeof user === "string") {
        console.warn("⚠️ User not populated properly:", user);
      }

      const agent = {
        name: user?.name,
        phone: user?.phone,
        whatsapp: user?.whatsapp,
        email: user?.email,
        image: user?.profileImage,
        company: user?.companyName,
      };

      const finalResponse = {
        ...prop,
        agent,
      };

      console.log("🚀 Final response:", JSON.stringify(finalResponse, null, 2));

      return NextResponse.json(finalResponse);
    }

    // working perfect Location location logic (search across state, city, street)
    if (params.has("location")) {
      const location = params.get("location")!;
      filters.$or = [
        { city: { $regex: location, $options: "i" } },
        { state: { $regex: location, $options: "i" } },
        { street: { $regex: location, $options: "i" } },
      ];
    }

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

    // ✅ Parse multipart form data
    const formData = await req.formData();

    const raw = formData.get("data");
    console.log("📦 raw form data from 'data':", raw);
    if (!raw || typeof raw !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid form data" },
        { status: 400 }
      );
    }

    let body;
    try {
      body = JSON.parse(raw);
    } catch (err) {
      console.error("Failed to parse JSON in PUT", err, "RAW:", raw);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // images (if any)
    const images = formData.getAll("images"); // These are Blob/File objects

    // You can optionally process image uploads here

    const updated = await Property.findOneAndUpdate(
      { _id: id, user: token.id },
      { ...body },
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
    console.error("PUT /api/properties/:id error", err);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const deleted = await Property.findOneAndDelete({
      _id: id,
      user: token.id, // ✅ user must own it
    });

    if (!deleted) {
      return NextResponse.json(
        { error: "Property not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
