import { ListingRequest, ListingResult } from '../types';

export function createMockListing(input: ListingRequest): ListingResult {
  const opSet = new Set(input.image_ops ?? ['caption']);
  const captions = input.images.map((_, i) => `Mock caption ${i + 1}: clean product shot with neutral background.`);
  const processedImages = opSet.has('upscale') || opSet.has('bg_remove') ? input.images.map((u) => `${u}?mock_processed=true`) : [];

  return {
    listing: {
      title: input.lang === 'tr' ? 'Mock Urun Basligi - Premium Kalite ve Modern Tasarim' : 'Mock Product Title - Premium Quality and Modern Design',
      bullets:
        input.platform === 'hepsiburada'
          ? [
              'Technical specification 1',
              'Technical specification 2',
              'Material durability detail',
              'Compatibility note',
              'Usage efficiency point',
              'Warranty-friendly information'
            ]
          : ['Benefit-focused bullet 1', 'Benefit-focused bullet 2', 'Benefit-focused bullet 3', 'Benefit-focused bullet 4', 'Benefit-focused bullet 5'],
      description:
        input.lang === 'tr'
          ? `Notlara gore hazirlandi: ${input.notes.slice(0, 220)}`
          : `Generated from seller notes: ${input.notes.slice(0, 220)}`,
      seo_keywords: ['mock', 'listing', input.platform, input.lang],
      hashtags_or_tags:
        input.platform === 'etsy'
          ? ['handmade', 'giftidea', 'homedecor', 'minimal', 'artisan', 'custom', 'smallbusiness', 'vintage', 'etsyfinds', 'craft', 'eco', 'design', 'unique']
          : ['#mock', '#listing', `#${input.platform}`],
      claims_to_avoid: ['Medical claims', 'Guaranteed outcomes'],
      assumptions: ['Image quality is representative', 'Notes reflect accurate product details']
    },
    captions,
    processed_images: processedImages,
    meta: {
      platform: input.platform,
      lang: input.lang
    }
  };
}
