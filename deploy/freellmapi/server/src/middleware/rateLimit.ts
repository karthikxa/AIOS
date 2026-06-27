import type { Request, Response, NextFunction } from 'express';

// Per-IP fixed-window rate limiter for the public /v1 proxy (#35, item #6).
//
// The /v1 surface authenticates with the unified API key but has no password
// login like the dashboard does, so without this an attacker who can reach the
// server could brute-force the key or flood upstream providers. This caps how
// many requests a single client IP can make per minute and returns a standard
// OpenAI-shaped 429 once the cap is exceeded.
//
// FreeLLMAPI is a single-user tool, so the default ceiling is generous. Tune it
// with PROXY_RATE_LIMIT_RPM (requests per minute per IP); set it to 0 to turn
// rate limiting off entirely.

const WINDOW_MS = 60_000;
const DEFAULT_RPM = 120;
const MAX_TRACKED_IPS = 10_000;

interface WindowState {
  count: number;
  resetAt: number;
}

function parseLimit(): number {
  const raw = process.env.PROXY_RATE_LIMIT_RPM;
  if (raw === undefined || raw.trim() === '') return DEFAULT_RPM;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return DEFAULT_RPM;
  return Math.floor(n);
}

// Normalize ::ffff:127.0.0.1 → 127.0.0.1 so IPv4-mapped IPv6 doesn't create
// duplicate rate-limit entries for the same client.
function normalizeIp(ip: string): string {
  return ip.startsWith('::ffff:') ? ip.slice(7) : ip;
}

export function createProxyRateLimiter() {
  const limit = parseLimit();
  const windows = new Map<string, WindowState>();

  // Prune expired entries periodically (every ~30s) instead of on every request,
  // avoiding O(MAX_TRACKED_IPS) iteration in the hot path.
  let lastPrune = 0;
  const PRUNE_INTERVAL_MS = 30_000;

  function pruneExpired(now: number) {
    for (const [key, value] of windows) {
      if (now >= value.resetAt) windows.delete(key);
    }
  }

  return function proxyRateLimit(req: Request, res: Response, next: NextFunction): void {
    if (limit === 0) {
      next();
      return;
    }

    const now = Date.now();
    const ip = normalizeIp(req.ip ?? req.socket.remoteAddress ?? 'unknown');

    let state = windows.get(ip);
    if (!state || now >= state.resetAt) {
      state = { count: 0, resetAt: now + WINDOW_MS };
      windows.set(ip, state);
    }
    state.count += 1;

    // Throttled pruning: only scan once per PRUNE_INTERVAL_MS.
    if (now - lastPrune > PRUNE_INTERVAL_MS) {
      lastPrune = now;
      pruneExpired(now);
    }

    res.setHeader('X-RateLimit-Limit', String(limit));
    res.setHeader('X-RateLimit-Remaining', String(Math.max(0, limit - state.count)));
    res.setHeader('X-RateLimit-Reset', String(Math.ceil(state.resetAt / 1000)));

    if (state.count > limit) {
      const retryAfter = Math.max(1, Math.ceil((state.resetAt - now) / 1000));
      res.setHeader('Retry-After', String(retryAfter));
      res.status(429).json({
        error: {
          message: `Rate limit exceeded: more than ${limit} requests per minute. Retry in ${retryAfter}s.`,
          type: 'rate_limit_error',
        },
      });
      return;
    }

    next();
  };
}
