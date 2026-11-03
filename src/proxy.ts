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

// Malicious probe, path traversal, and vulnerability scanner patterns
const SUSPICIOUS_PATTERNS = [
  /(\.\.|\%2e\%2e)/i, // Directory traversal
  /\.(env|git|htaccess|htpasswd|ini|bak|conf|sql|pem|key|aws|docker)/i, // Sensitive credentials & source files
  /(wp-admin|wp-login|phpinfo|cgi-bin|actuator|eval\(|<script|console|solr|phpunit|autodiscover|\.well-known\/(?!security\.txt))/i, // Scanner exploits
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

  // 3. API-specific defenses: Rate Limiting, Payload Sizing, and CORS Verification
  if (pathname.startsWith("/api/")) {
    // 3a. Payload size limit (Max 1MB for API routes to prevent memory flooding)
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength > 1_048_576) {
      return new NextResponse(
        JSON.stringify({ error: "Payload Too Large. Max request size is 1MB." }),
        {
          status: 413,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 3b. Robust client IP resolution (prioritize edge x-real-ip to prevent X-Forwarded-For spoofing)
    const realIp = req.headers.get("x-real-ip");
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = (realIp || (forwardedFor ? forwardedFor.split(",")[0].trim() : "anonymous-client"))
      .replace(/[^a-zA-Z0-9.:_-]/g, "");

    let rateLimit = 120; // Default: 120 requests/min
    const windowMs = 60_000;

    if (pathname.startsWith("/api/admin")) {
      rateLimit = 15; // Strict: 15 attempts/min for admin endpoints
    } else if (pathname.startsWith("/api/download")) {
      rateLimit = 30; // 30 download checks/min
    } else if (pathname.startsWith("/api/assistant")) {
      rateLimit = 40; // 40 AI assistant queries/min
    } else if (pathname.startsWith("/api/push")) {
      rateLimit = 20; // 20 push subscription requests/min
    }

    const rateLimitKey = `${clientIp}:${pathname.split("/").slice(0, 4).join("/")}`;
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

    // 3c. Strict same-origin & authorized domain CORS guard for mutating requests
    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
      const origin = req.headers.get("origin");
      const host = req.headers.get("host");

      if (origin && host) {
        try {
          const originHost = new URL(origin).host;

          // Strict whitelist: strictly allow matching host, local dev, or Harshan Seliyan's authorized project domain
          const isAllowedHost =
            originHost === host ||
            originHost === "hs-ai-studio-4i7i-git-main-harshanseliyan28-1638s-projects.vercel.app" ||
            /^hs-ai-studio-[a-z0-9-]+-harshanseliyan28-1638s-projects\.vercel\.app$/.test(originHost) ||
            originHost === "localhost" ||
            originHost.startsWith("localhost:") ||
            originHost === "127.0.0.1" ||
            originHost.startsWith("127.0.0.1:");

          if (!isAllowedHost) {
            return new NextResponse(
              JSON.stringify({ error: "Cross-Origin Request Blocked by Security Policy" }),
              {
                status: 403,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        } catch {
          return new NextResponse(
            JSON.stringify({ error: "Invalid Request Origin Header" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }
    }
  }

  // 4. Apply comprehensive security headers
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
    "/((?!_next/static|_next/image|favicon.ico|images/|videos/|audio/).*)",
  ],
};

export default proxy;
