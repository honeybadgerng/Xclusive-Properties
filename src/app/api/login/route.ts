import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

const secret = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to the database

    const { email, password } = await req.json();
    console.log("Login attempt for:", email);

    // Find user in the database
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found for email:", email);
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    } else {
      console.log("✅ User found:", user);
    }

    // Logging stored hashed password
    console.log("🔐 Stored Hashed Password:", user.password);
    console.log("🔑 Entered Password:", password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🛠 Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password does not match for:", email);
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    console.log("✅ Password matches. Generating token...");

    // Generate JWT token
    const token = jwt.sign({ email: user.email, role: user.role }, secret, {
      expiresIn: "1h",
    });

    console.log("🔑 JWT Token Generated:", token);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("🔥 Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
