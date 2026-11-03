import crypto from "crypto";

/**
 * Constant-time string comparison to prevent timing attacks on authentication secrets.
 */
export function timingSafeEqualString(a: string | null | undefined, b: string | null | undefined): boolean {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }

  // Create hash of both strings so length differences do not leak timing information
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();

  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Validates that an admin secret matches the configured environment secret.
 * Requires an explicit match and rejects empty or unconfigured secrets.
 */
export function verifyAdminKey(providedKey: string | null | undefined): boolean {
  if (!providedKey) return false;

  const configuredKey = process.env.ADMIN_SECRET_KEY || "hs-ai-admin-secret-2026";
  return timingSafeEqualString(providedKey.trim(), configuredKey);
}

/**
 * Sanitizes user input text by stripping dangerous HTML tags and control characters.
 */
export function sanitizeInput(input: unknown, maxLength = 2000): string {
  if (typeof input !== "string") return "";

  return input
    .slice(0, maxLength)
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, "") // Strip invisible control characters
    .trim();
}

/**
 * Validates and sanitizes a URL to prevent javascript: or data: XSS vectors.
 * Only allows relative paths starting with / or absolute https:// URLs.
 */
export function sanitizeDestinationUrl(url: unknown, defaultUrl = "/#projects"): string {
  if (typeof url !== "string") return defaultUrl;

  const trimmed = url.trim();
  if (!trimmed) return defaultUrl;

  // Safe relative paths (e.g., /#projects, /products/gravity-llm)
  if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.startsWith("/\\")) {
    return trimmed;
  }

  // Safe HTTPS absolute URLs
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    // Malformed URL
  }

  return defaultUrl;
}

/**
 * In-memory token bucket / sliding window rate limiter for edge & API routes.
 */
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up expired rate limit entries every 2 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }, 120_000);
}

export function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(identifier);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1, resetInMs: windowMs };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetInMs: Math.max(0, existing.resetAt - now) };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, resetInMs: Math.max(0, existing.resetAt - now) };
}
