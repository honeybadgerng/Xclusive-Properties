// GET /api/properties/agent
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";
import Property from "@/models/Property";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  await dbConnect();

  const token = req.cookies.get("authToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  let decoded: jwt.JwtPayload | string;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  let agentId: string | undefined;
  if (typeof decoded === "object" && decoded !== null && "_id" in decoded) {
    agentId = (decoded as jwt.JwtPayload)._id as string;
  }

  if (!agentId) {
    return NextResponse.json(
      { error: "Invalid token payload" },
      { status: 401 }
    );
  }

  const properties = await Property.find({ user: agentId });

  return NextResponse.json(properties);
}
