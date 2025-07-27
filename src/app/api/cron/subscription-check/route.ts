// /app/api/cron/subscription-check/route.ts
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import Subscription from "@/models/Subscription";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const now = new Date();

  // Find users with expired subscriptions
  const expiredUsers = await User.find({
    "subscription.expiresAt": { $lte: now },
  });

  for (const user of expiredUsers) {
    user.subscription = undefined;
    await user.save();

    // Optionally mark their latest subscription record as expired
    await Subscription.updateMany(
      { user: user._id, status: "active" },
      { status: "expired" }
    );
  }

  return NextResponse.json({
    message: `Checked ${expiredUsers.length} users.`,
  });
}
