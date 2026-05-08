// In-memory rate limiter.
//
// Works correctly in long-running Node.js servers (Docker, Railway, VPS).
// On serverless platforms (Vercel, AWS Lambda) each invocation is stateless,
// so this Map resets between cold-starts. For serverless production deployments
// replace this with @upstash/ratelimit backed by Redis.

interface Record {
  count: number;
  resetAt: number;
}

const store = new Map<string, Record>();

const WINDOW_MS = 60 * 1000; // 1-minute rolling window
const MAX_REQUESTS = 3;       // max form submissions per IP per window

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const existing = store.get(identifier);

  // First request, or the window has expired — start fresh
  if (!existing || now > existing.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetInSeconds: WINDOW_MS / 1000 };
  }

  // Window is still open and limit reached
  if (existing.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  // Window is still open, increment counter
  existing.count += 1;
  store.set(identifier, existing);

  return {
    allowed: true,
    remaining: MAX_REQUESTS - existing.count,
    resetInSeconds: Math.ceil((existing.resetAt - now) / 1000),
  };
}
