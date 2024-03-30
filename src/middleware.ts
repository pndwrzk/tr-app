import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("access_token")?.value;

  if (request.nextUrl.pathname === "/login" && refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.nextUrl.pathname !== "/login" && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/summary",
    "/profile",
    "/change-password",
    "/attendance",
    "/login",
  ],
};
