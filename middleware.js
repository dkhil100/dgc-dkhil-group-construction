import { NextResponse } from "next/server";

// In-memory store for tracking IP request counts
const rateLimitMap = new Map();

// Configuration
const LIMIT = 5; // Max 5 submissions
const WINDOW_MS = 60 * 60 * 1000; // Per 1 hour window

export function middleware(request) {
  // Extract client IP address
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const now = Date.now();
  const userRateLimit = rateLimitMap.get(ip);

  // Initialize or reset window if expired
  if (!userRateLimit || now > userRateLimit.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return NextResponse.next();
  }

  // Enforce rate limit
  if (userRateLimit.count >= LIMIT) {
    const retryAfter = Math.ceil((userRateLimit.resetTime - now) / 1000 / 60);

    return new NextResponse(
      JSON.stringify({
        success: false,
        error: `Trop de tentatives. Veuillez réessayer dans ${retryAfter} minutes.`,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter * 60),
        },
      }
    );
  }

  // Increment counter
  userRateLimit.count += 1;
  rateLimitMap.set(ip, userRateLimit);

  return NextResponse.next();
}

// Only run middleware on the appointment API route
export const config = {
  matcher: "/api/appointment/:path*",
};