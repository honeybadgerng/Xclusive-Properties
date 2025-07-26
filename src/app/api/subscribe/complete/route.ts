// /app/api/subscribe/complete/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import handleSuccessfulPayment from "@/utils/handleSuccessfulPayment";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { userId, plan, duration, pricePaid } = await req.json();

  if (!userId || !plan || !duration) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await handleSuccessfulPayment({ userId, plan, duration, pricePaid });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to complete subscription:", err);
    return NextResponse.json(
      { error: "Subscription update failed" },
      { status: 500 }
    );
  }
}
