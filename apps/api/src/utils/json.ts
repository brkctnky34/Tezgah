import { AppError } from '../types';

export function parseStrictJson<T>(content: string): T {
  try {
    return JSON.parse(content) as T;
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new AppError('Model did not return valid JSON', 502);
    }

    try {
      return JSON.parse(match[0]) as T;
    } catch {
      throw new AppError('Model JSON parsing failed', 502);
    }
  }
}
