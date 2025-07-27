// /app/api/plans/route.ts

import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Plan from "@/models/Plan";

export async function GET() {
  try {
    await dbConnect();

    const plans = await Plan.find().sort({ monthlyPrice: 1 }).lean();
    return NextResponse.json(plans);
  } catch (err) {
    console.error("Failed to fetch plans:", err);
    return NextResponse.json(
      { error: "Failed to fetch plans" },
      { status: 500 }
    );
  }
}
