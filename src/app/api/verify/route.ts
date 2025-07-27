// /app/api/verify/route.ts

import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Subscription from "@/models/Subscription";
import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_API = "https://api.paystack.co";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  try {
    const res = await axios.get(
      `${PAYSTACK_API}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = res.data.data;

    if (data.status !== "success") {
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }

    const { metadata } = data;
    const { userId, planKey, duration } = metadata;

    const now = new Date();
    const endDate = new Date();

    if (duration === "monthly") endDate.setMonth(endDate.getMonth() + 1);
    if (duration === "half-year") endDate.setMonth(endDate.getMonth() + 6);
    if (duration === "yearly") endDate.setFullYear(endDate.getFullYear() + 1);

    // Save subscription
    await Subscription.create({
      user: userId,
      plan: planKey,
      duration,
      pricePaid: data.amount / 100,
      startDate: now,
      endDate,
      status: "active",
    });

    return NextResponse.json({ message: "Subscription active" });
  } catch (err: any) {
    console.error("Verification failed:", err.response?.data || err);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
