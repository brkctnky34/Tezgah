import { ListingRequest, ListingResponse } from '../types';

const API_BASE_URL = process.env.API_BASE_URL ?? 'http://api:3000';
const API_KEY = process.env.API_KEY ?? '';
const REQUEST_TIMEOUT_MS = Number(process.env.API_TIMEOUT_MS ?? 15000);

async function requestWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function createListing(input: ListingRequest): Promise<ListingResponse> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await requestWithTimeout(
        `${API_BASE_URL}/v1/listing`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          },
          body: JSON.stringify(input)
        },
        REQUEST_TIMEOUT_MS
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API ${res.status}: ${text}`);
      }

      return (await res.json()) as ListingResponse;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1) ** 2));
    }
  }

  throw new Error(`API request failed: ${String(lastError)}`);
}
