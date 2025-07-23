// /app/api/webhook/route.ts

import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  // Handle event types
  if (event.event === "charge.success") {
    console.log("✅ Webhook: Payment successful", event.data.reference);
    // You can mark subscription as paid again, or log transaction
  }

  return NextResponse.json({ received: true });
}
