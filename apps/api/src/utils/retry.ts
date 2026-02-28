import { AppError } from '../types';

type RetryOptions = {
  retries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const retries = options.retries ?? 2;
  const factor = options.factor ?? 2;
  const initialDelayMs = options.initialDelayMs ?? 250;
  const maxDelayMs = options.maxDelayMs ?? 2000;

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === retries) {
        break;
      }
      const delay = Math.min(initialDelayMs * factor ** attempt, maxDelayMs);
      await sleep(delay);
    }
  }

  if (lastError instanceof AppError) {
    throw lastError;
  }
  throw new AppError('External service failed', 502);
}
