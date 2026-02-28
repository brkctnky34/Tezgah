import { NextFunction, Request, Response } from 'express';
import { AppError } from '../types';

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ error: 'Not found' });
}

export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof AppError) {
    // pino-http is mounted before routes and exposes req.log at runtime.
    (req as Request & { log?: { warn: (obj: object, msg: string) => void } }).log?.warn(
      { reason: error.message, statusCode: error.statusCode },
      'request failed'
    );
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  (req as Request & { log?: { error: (obj: object, msg: string) => void } }).log?.error({ error }, 'unexpected error');
  res.status(500).json({ error: 'Internal server error' });
}
