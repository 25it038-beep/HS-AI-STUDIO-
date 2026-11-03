import { NextRequest, NextResponse } from "next/server";

// In-memory sliding window rate limiter for edge runtime
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const edgeRateLimitStore = new Map<string, RateLimitRecord>();

function checkEdgeRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = edgeRateLimitStore.get(key);

  if (!record || record.resetAt <= now) {
    edgeRateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

// Clean up expired keys periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of edgeRateLimitStore.entries()) {
      if (record.resetAt <= now) {
        edgeRateLimitStore.delete(key);
      }
    }
  }, 60_000);
}

// Malicious probe and path traversal patterns
const SUSPICIOUS_PATTERNS = [
  /(\.\.|\%2e\%2e)/i, // Directory traversal
  /\.(env|git|htaccess|htpasswd|ini|bak|conf|sql|pem|key)/i, // Sensitive config & source files
  /(wp-admin|wp-login|phpinfo|cgi-bin|actuator|eval\(|<script)/i, // Common automated exploit scanners
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method.toUpperCase();

  // 1. Block unsafe HTTP methods
  if (method === "TRACE" || method === "TRACK") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  // 2. Reject malicious path traversal & scanner probes
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(pathname) || pattern.test(req.nextUrl.search)) {
      return new NextResponse(
        JSON.stringify({ error: "Access Denied: Request blocked by security policy." }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "X-Robots-Tag": "noindex, nofollow",
          },
        }
      );
    }
  }

  // 3. Rate limiting on sensitive API endpoints
  if (pathname.startsWith("/api/")) {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "anonymous-client";

    let rateLimit = 120; // Default: 120 requests/min
    let windowMs = 60_000;

    if (pathname.startsWith("/api/admin")) {
      rateLimit = 15; // Strict: 15 attempts/min for admin endpoints
    } else if (pathname.startsWith("/api/download")) {
      rateLimit = 30; // 30 download checks/min
    } else if (pathname.startsWith("/api/assistant")) {
      rateLimit = 40; // 40 AI assistant queries/min
    } else if (pathname.startsWith("/api/push")) {
      rateLimit = 20; // 20 push subscription requests/min
    }

    const rateLimitKey = `${ip}:${pathname.split("/").slice(0, 4).join("/")}`;
    const allowed = checkEdgeRateLimit(rateLimitKey, rateLimit, windowMs);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({
          error: "Rate limit exceeded. Too many requests. Please retry in a moment.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }

    // 4. Same-origin validation for state-changing API requests (POST, PUT, DELETE)
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      const origin = req.headers.get("origin");
      const host = req.headers.get("host");

      if (origin && host) {
        try {
          const originHost = new URL(origin).host;
          // Allow same-host or authorized localhost/vercel previews
          const isAllowedHost =
            originHost === host ||
            originHost.endsWith(".vercel.app") ||
            originHost.startsWith("localhost") ||
            originHost.startsWith("127.0.0.1");

          if (!isAllowedHost) {
            return new NextResponse(
              JSON.stringify({ error: "Cross-Origin Request Blocked" }),
              {
                status: 403,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        } catch {
          return new NextResponse(
            JSON.stringify({ error: "Invalid Request Origin" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }
    }
  }

  // 5. Apply comprehensive security headers
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, videos, audio (static public media)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|videos/|audio/).*)",
  ],
};

export default proxy;
