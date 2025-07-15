// app/api/register/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

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

    const newUser = new User({
      email,
      password,
      role: userRole,
      name,
      phone,
      whatsapp,
      companyName: userRole === "agent" ? companyName : undefined,
    });
    await newUser.save();

    console.log("✅ User registered successfully:", { email, role: userRole });
    console.log("🛠 Final role before saving:", userRole);

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { email, role: userRole, name, phone, companyName, whatsapp },
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
