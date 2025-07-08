import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken");
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const user = JSON.parse(atob(token.value.split(".")[1]));

    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isAgentRoute = req.nextUrl.pathname.startsWith("/agent");

    if (isAdminRoute && user.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (isAgentRoute && user.role !== "agent") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/agent/:path*"],
};
