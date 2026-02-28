import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  API_KEY: z.string().min(1),
  MOCK_MODE: z.string().optional().default('false').transform((v) => v.toLowerCase() === 'true'),
  OPENROUTER_API_KEY: z.string().optional(),
  OPENROUTER_MODEL: z.string().default('openai/gpt-4o-mini'),
  OPENROUTER_URL: z.string().default('https://openrouter.ai/api/v1/chat/completions'),
  OPENROUTER_TIMEOUT_MS: z.coerce.number().int().positive().default(20000),
  OPENROUTER_MAX_TOKENS: z.coerce.number().int().positive().default(500),
  OPENROUTER_TEMPERATURE: z.coerce.number().min(0).max(1).default(0.2),
  REPLICATE_API_TOKEN: z.string().optional(),
  REPLICATE_TIMEOUT_MS: z.coerce.number().int().positive().default(20000),
  REPLICATE_MAX_POLL_ATTEMPTS: z.coerce.number().int().positive().default(20),
  REPLICATE_POLL_INTERVAL_MS: z.coerce.number().int().positive().default(1500),
  REPLICATE_CAPTION_VERSION: z.string().optional(),
  REPLICATE_UPSCALE_VERSION: z.string().optional(),
  REPLICATE_BGREMOVE_VERSION: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  throw new Error(`Invalid environment: ${parsed.error.message}`);
}

export const config = parsed.data;
