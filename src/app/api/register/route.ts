// app/api/register/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
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

    // 🚀 Ensure role is "admin" (even if the frontend sends an empty role)
    const userRole = role && role.trim() ? role : "admin";
    console.log("👑 Assigning Role:", userRole); // Debugging log

    const newUser = new User({
      email,
      password, // No manual hashing here
      role: userRole,
    });

    await newUser.save();

    console.log("✅ User registered successfully:", { email, role: userRole });
    console.log("🛠 Final role before saving:", userRole);

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { email, role: userRole },
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
