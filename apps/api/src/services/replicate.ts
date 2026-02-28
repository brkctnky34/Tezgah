import { config } from '../config';
import { AppError } from '../types';
import { withRetry } from '../utils/retry';

type PredictionResponse = {
  id: string;
  status: string;
  output?: unknown;
  error?: string;
};

type PredictionInput = Record<string, unknown>;

const REPLICATE_BASE = 'https://api.replicate.com/v1';

async function replicateRequest(path: string, init: RequestInit, timeoutMs = config.REPLICATE_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(`${REPLICATE_BASE}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${config.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        ...(init.headers ?? {})
      }
    });
  } catch {
    throw new AppError('Replicate request failed', 502);
  } finally {
    clearTimeout(timeout);
  }
}

async function createPrediction(version: string, input: PredictionInput): Promise<PredictionResponse> {
  const res = await withRetry(
    () =>
      replicateRequest('/predictions', {
        method: 'POST',
        body: JSON.stringify({ version, input })
      }),
    { retries: 2 }
  );

  if (!res.ok) {
    throw new AppError('Replicate prediction creation failed', 502);
  }

  return (await res.json()) as PredictionResponse;
}

async function getPrediction(id: string): Promise<PredictionResponse> {
  const res = await withRetry(() => replicateRequest(`/predictions/${id}`, { method: 'GET' }), { retries: 2 });

  if (!res.ok) {
    throw new AppError('Replicate polling failed', 502);
  }

  return (await res.json()) as PredictionResponse;
}

function extractOutputUrls(output: unknown): string[] {
  if (typeof output === 'string' && output.startsWith('http')) {
    return [output];
  }

  if (Array.isArray(output)) {
    return output.filter((item): item is string => typeof item === 'string' && item.startsWith('http'));
  }

  return [];
}

async function runPrediction(version: string, input: PredictionInput): Promise<unknown> {
  if (!config.REPLICATE_API_TOKEN) {
    throw new AppError('Missing REPLICATE_API_TOKEN', 500);
  }

  const created = await createPrediction(version, input);

  for (let i = 0; i < config.REPLICATE_MAX_POLL_ATTEMPTS; i++) {
    const polled = await getPrediction(created.id);

    if (polled.status === 'succeeded') {
      return polled.output;
    }

    if (polled.status === 'failed' || polled.status === 'canceled') {
      throw new AppError(polled.error || 'Replicate prediction failed', 502);
    }

    const delay = Math.min(config.REPLICATE_POLL_INTERVAL_MS * 2 ** i, 30_000);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new AppError('Replicate polling timeout', 504);
}

export async function captionImage(imageUrl: string): Promise<string> {
  if (!config.REPLICATE_CAPTION_VERSION) {
    throw new AppError('Missing REPLICATE_CAPTION_VERSION', 500);
  }

  const output = await runPrediction(config.REPLICATE_CAPTION_VERSION, { image: imageUrl });

  if (typeof output === 'string') {
    return output;
  }

  if (Array.isArray(output) && typeof output[0] === 'string') {
    return output[0];
  }

  throw new AppError('Replicate caption output not usable', 502);
}

export async function processImage(imageUrl: string, operation: 'upscale' | 'bg_remove'): Promise<string[]> {
  const version = operation === 'upscale' ? config.REPLICATE_UPSCALE_VERSION : config.REPLICATE_BGREMOVE_VERSION;

  if (!version) {
    return [];
  }

  const output = await runPrediction(version, { image: imageUrl });
  return extractOutputUrls(output);
}
