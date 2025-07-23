// /app/api/subscribe/route.ts

import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Plan from "@/models/Plan";
import Subscription from "@/models/Subscription";
import jwt from "jsonwebtoken";
import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_API = "https://api.paystack.co";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const { planKey, duration, userEmail, userId } = body;

  if (!planKey || !duration || !userEmail || !userId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Get price from DB
  const plan = await Plan.findOne({ key: planKey });
  if (!plan)
    return NextResponse.json({ error: "Invalid plan" }, { status: 404 });

  let amount;
  switch (duration) {
    case "monthly":
      amount = plan.monthlyPrice;
      break;
    case "half-year":
      amount = plan.halfYearPrice;
      break;
    case "yearly":
      amount = plan.fullYearPrice;
      break;
    default:
      return NextResponse.json({ error: "Invalid duration" }, { status: 400 });
  }

  try {
    const res = await axios.post(
      `${PAYSTACK_API}/transaction/initialize`,
      {
        email: userEmail,
        amount: amount * 100, // in kobo
        metadata: {
          userId,
          planKey,
          duration,
        },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/success`, // adjust
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { authorization_url } = res.data.data;
    return NextResponse.json({ url: authorization_url });
  } catch (err: any) {
    console.error("Paystack init failed:", err.response?.data || err);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
