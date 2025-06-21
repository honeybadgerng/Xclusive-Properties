import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");

  if (!token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Optionally, decode the token and verify the user role
  const user = JSON.parse(atob(token.value.split(".")[1]));
  if (user.role !== "admin") {
    // Redirect if the user is not an admin
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

// Protect only admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
