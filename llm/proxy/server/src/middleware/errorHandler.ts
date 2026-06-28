import type { Request, Response, NextFunction } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

export function errorHandler(err: Error, _req: Request, res: Response, next: NextFunction) {
  console.error('[Error]', isProduction ? err.message : err);

  if (res.headersSent) return next(err);

  const status = (err as any).status ?? (err as any).statusCode ?? 500;
  const message = isProduction ? 'Internal server error' : err.message;
  res.status(status).json({
    error: {
      message,
      type: err.name ?? 'server_error',
    },
  });
}
