// utils/auth.ts
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export function getTokenFromRequest(req: NextRequest): any | null {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("❌ No authorization header or malformed");
      return null;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // contains: id, email, role, etc.
  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    return null;
  }
}
