import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const internationalizationMiddleware = createMiddleware({
  locales: ["en", "pt"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  // Exclude specific paths from further processing
  if (
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/api") &&
    !request.nextUrl.pathname.startsWith("/_next") &&
    !request.nextUrl.pathname.includes(".")
  ) {
    return internationalizationMiddleware(request);
  }
  // Return the response object directly
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};