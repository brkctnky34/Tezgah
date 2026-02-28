import { z } from 'zod';

const imageUrlSchema = z
  .string()
  .url()
  .refine((url) => url.startsWith('http://') || url.startsWith('https://'), {
    message: 'Image URL must be http or https'
  })
  .refine((url) => !url.startsWith('data:'), {
    message: 'Base64/data URLs are not allowed'
  });

export const listingRequestSchema = z
  .object({
    images: z.array(imageUrlSchema).min(1).max(5),
    notes: z.string().min(1).max(5000),
    platform: z.enum(['trendyol', 'hepsiburada', 'etsy', 'generic']),
    lang: z.enum(['tr', 'en']),
    image_ops: z.array(z.enum(['caption', 'upscale', 'bg_remove'])).optional()
  })
  .strict();

export const listingResponseSchema = z
  .object({
    listing: z.object({
      title: z.string(),
      bullets: z.array(z.string()),
      description: z.string(),
      seo_keywords: z.array(z.string()),
      hashtags_or_tags: z.array(z.string()),
      claims_to_avoid: z.array(z.string()),
      assumptions: z.array(z.string())
    }),
    captions: z.array(z.string()),
    processed_images: z.array(z.string()),
    meta: z.object({
      platform: z.enum(['trendyol', 'hepsiburada', 'etsy', 'generic']),
      lang: z.enum(['tr', 'en'])
    })
  })
  .strict();
