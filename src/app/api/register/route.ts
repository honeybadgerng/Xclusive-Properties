// app/api/register/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import Plan from "@/models/Plan";

export async function POST(req: Request) {
  const { email, password, role, name, phone, companyName, whatsapp } =
    await req.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "Email, password, and name are required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 🚀 Ensure role is "agent" (even if the frontend sends an empty role)
    const allowedRoles = ["agent", "customer"];
    const userRole = allowedRoles.includes(role) ? role : "agent";

    console.log("👑 Assigning Role:", userRole); // Debugging log

    // 🎁 Get the free plan
    const freePlan = await Plan.findOne({ key: "free" });
    if (!freePlan) {
      return NextResponse.json(
        { error: "Free plan not found in database" },
        { status: 500 }
      );
    }

    const now = new Date();
    const freeDurationMs = 30 * 24 * 60 * 60 * 1000; // 30 days
    const expiresAt = new Date(now.getTime() + freeDurationMs);

    const newUser = new User({
      email,
      password,
      role: userRole,
      name,
      phone,
      whatsapp,
      companyName: userRole === "agent" ? companyName : undefined,
      subscription: {
        plan: freePlan.key,
        planName: freePlan.name,
        listings: freePlan.listings,
        premiumListings: freePlan.premiumListings,
        boosts: freePlan.boosts,
        duration: "monthly",
        startedAt: now,
        expiresAt,
      },
    });
    await newUser.save();

    console.log("✅ User registered successfully:", { email, role: userRole });
    console.log("🛠 Final role before saving:", userRole);

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          email,
          role: userRole,
          name,
          phone,
          companyName,
          whatsapp,
          subscription: newUser.subscription,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
