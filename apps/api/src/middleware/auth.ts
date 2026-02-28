import { NextFunction, Request, Response } from 'express';
import { config } from '../config';

export function apiKeyAuth(req: Request, res: Response, next: NextFunction): void {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== config.API_KEY) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}
