import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "session_token";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/admin"];

// Routes that should redirect to dashboard if already logged in
const authRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  // If trying to access protected route without session, redirect to login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If trying to access auth routes while already logged in, redirect to dashboard
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
