import type { Request, Response, NextFunction } from 'express';
import { validateUrl, resolveAndValidate, isWithinDir, safePath, redactSensitiveText } from '../services/security.js';

interface WebhookRoute {
  path: string;
  secret?: string;
  rateLimit?: number;
  handler: (req: Request, res: Response) => void | Promise<void>;
}

const webhookRoutes = new Map<string, WebhookRoute>();
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function registerWebhook(path: string, options?: { secret?: string; rateLimit?: number }, handler?: (req: Request, res: Response) => void | Promise<void>) {
  webhookRoutes.set(path, { path, secret: options?.secret, rateLimit: options?.rateLimit ?? 60, handler: handler ?? defaultHandler });
}

function defaultHandler(_req: Request, res: Response) {
  res.json({ ok: true });
}

export function webhookMiddleware(req: Request, res: Response, next: NextFunction) {
  const route = webhookRoutes.get(req.path);
  if (!route) return next();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (route.secret) {
    const auth = req.headers.authorization;
    if (!auth || auth !== `Bearer ${route.secret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  if (route.rateLimit) {
    const key = req.ip ?? 'unknown';
    const now = Date.now();
    const entry = requestCounts.get(key);
    if (!entry || now > entry.resetAt) {
      requestCounts.set(key, { count: 1, resetAt: now + 60_000 });
    } else {
      entry.count++;
      if (entry.count > route.rateLimit) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
      }
    }
  }

  try {
    const result = route.handler(req, res);
    if (result && typeof (result as any).catch === 'function') {
      (result as Promise<void>).catch(err => {
        console.error('Webhook handler error:', err);
        if (!res.headersSent) res.status(500).json({ error: 'Internal error' });
      });
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    if (!res.headersSent) res.status(500).json({ error: 'Internal error' });
  }
}

export { validateUrl, resolveAndValidate, isWithinDir, safePath, redactSensitiveText };
