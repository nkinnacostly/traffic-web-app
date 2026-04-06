import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Protect dashboard routes
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  // Protect create-business routes
  const isCreateBusiness =
    request.nextUrl.pathname.startsWith("/create-business");

  const isProtectedRoute = isDashboard || isCreateBusiness;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Redirect authenticated users away from auth pages
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (isAuthPage && token) {
    return NextResponse.redirect(
      new URL("/create-business/step1", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/create-business/:path*", "/auth/:path*"],
};
