"use server";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken");
  const protectedRoutes = ["/dashboard", "/profile"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only on certain routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
