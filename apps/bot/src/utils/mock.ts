import { ListingRequest, ListingResponse } from '../types';

export function mockListing(input: ListingRequest): ListingResponse {
  return {
    listing: {
      title: input.lang === 'tr' ? 'Mock Baslik: Sik ve Kullanisli Urun' : 'Mock Title: Stylish and Practical Product',
      bullets: [
        'High-quality finish',
        'Designed for daily use',
        'Easy to maintain',
        'Great value',
        'Fast shipping ready'
      ],
      description:
        input.lang === 'tr'
          ? `Mock aciklama (platform: ${input.platform}): ${input.notes.slice(0, 220)}`
          : `Mock description (platform: ${input.platform}): ${input.notes.slice(0, 220)}`,
      seo_keywords: ['mock', input.platform, input.lang, 'listing'],
      hashtags_or_tags: input.platform === 'etsy' ? Array.from({ length: 13 }, (_, i) => `tag${i + 1}`) : ['#mock', '#shop', '#listing'],
      claims_to_avoid: ['Unverified guarantees'],
      assumptions: ['Image URLs are valid product images']
    },
    captions: input.images.map((_, i) => `Mock caption ${i + 1}`),
    processed_images: [],
    meta: {
      platform: input.platform,
      lang: input.lang
    }
  };
}
