import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Waitlist from "@/models/Waitlist";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const entry = await Waitlist.create({
      fullName: body.fullName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      investmentRange: body.investmentRange,
      investmentPreference: body.investmentPreference,
      paymentPreference: body.paymentPreference,
      wantsUpdates: body.wantsUpdates,
    });

    return NextResponse.json({ success: true, data: entry });
  } catch (err) {
    console.error("Waitlist Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
