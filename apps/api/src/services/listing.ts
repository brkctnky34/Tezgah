import { config } from '../config';
import { ImageOp, ListingRequest, ListingResult, AppError } from '../types';
import { createMockListing } from './mock';
import { generateListingFromOpenRouter } from './openrouter';
import { captionImage, processImage } from './replicate';
import { listingResponseSchema } from '../validators/listing';

function normalizeOps(imageOps?: ImageOp[]): ImageOp[] {
  if (!imageOps || imageOps.length === 0) {
    return ['caption'];
  }
  return Array.from(new Set(imageOps));
}

export async function buildListing(request: ListingRequest): Promise<ListingResult> {
  if (config.MOCK_MODE) {
    return createMockListing(request);
  }

  const ops = normalizeOps(request.image_ops);
  const captions: string[] = [];
  const processedImages: string[] = [];

  const hasReplicateToken = !!config.REPLICATE_API_TOKEN;

  if (ops.includes('caption') && hasReplicateToken) {
    for (const image of request.images) {
      captions.push(await captionImage(image));
    }
  }

  for (const op of ops) {
    if (op === 'caption') {
      continue;
    }

    if (!hasReplicateToken) {
      continue;
    }

    for (const image of request.images) {
      const outputs = await processImage(image, op);
      processedImages.push(...outputs);
    }
  }

  const listing = await generateListingFromOpenRouter({
    platform: request.platform,
    lang: request.lang,
    notes: request.notes,
    captions,
    processedImages
  });

  const result: ListingResult = {
    listing,
    captions,
    processed_images: processedImages,
    meta: {
      platform: request.platform,
      lang: request.lang
    }
  };

  const validated = listingResponseSchema.safeParse(result);
  if (!validated.success) {
    throw new AppError('Generated listing failed response validation', 502);
  }

  return result;
}
