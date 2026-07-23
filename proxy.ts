import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // lengths must match before comparing, but do so without leaking timing
  return (
    bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
  );
}

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' },
  });
}

export function proxy(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    // fail closed — no admin access until a password is actually configured
    return new Response("Admin access is not configured.", { status: 503 });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Basic ")) {
    return unauthorized();
  }

  const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf-8");
  const separatorIndex = decoded.indexOf(":");
  const suppliedPassword =
    separatorIndex === -1 ? "" : decoded.slice(separatorIndex + 1);

  if (!safeEqual(suppliedPassword, password)) {
    return unauthorized();
  }

  return NextResponse.next();
}
