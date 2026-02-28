import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      startTime: number;
    }
  }
}

export function requestContext(req: Request, res: Response, next: NextFunction): void {
  req.requestId = req.header('x-request-id') ?? crypto.randomUUID();
  req.startTime = Date.now();
  res.setHeader('x-request-id', req.requestId);
  next();
}
