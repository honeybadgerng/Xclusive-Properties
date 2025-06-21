import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product"; // Import your Product model

// Force Next.js to treat this API as a dynamic route
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();

    // Get search params from the request URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || ""; // Search keyword
    const category = searchParams.get("category"); // Optional filter
    const minPrice = searchParams.get("minPrice"); // Optional filter
    const maxPrice = searchParams.get("maxPrice");
    const brand = searchParams.get("brand");

    let pipeline: any[] = [];

    // If query exists, use Atlas Search
    if (query) {
      pipeline.push({
        $search: {
          index: "product_search", // Use your Atlas Search index name
          text: {
            query: query,
            path: ["name", "description"], // Fields to search in
          },
        },
      });
    }

    // Apply optional filters
    let matchStage: any = {};
    if (category) matchStage.category = category;
    if (brand) matchStage.brand = brand;
    if (minPrice || maxPrice) {
      matchStage.price = {};
      if (minPrice) matchStage.price.$gte = parseFloat(minPrice);
      if (maxPrice) matchStage.price.$lte = parseFloat(maxPrice);
    }

    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Limit results
    pipeline.push({ $limit: 20 });

    // Select necessary fields
    pipeline.push({
      $project: {
        name: 1,
        price: 1,
        images: 1, // Ensure the field name matches your schema
        category: 1,
        brand: 1,
        slug: 1,
      },
    });

    const products = await Product.aggregate(pipeline);

    return NextResponse.json({ products });
  } catch (error) {
    console.error("❌ Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
