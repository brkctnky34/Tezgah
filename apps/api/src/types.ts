export type Platform = 'trendyol' | 'hepsiburada' | 'etsy' | 'generic';
export type Language = 'tr' | 'en';
export type ImageOp = 'caption' | 'upscale' | 'bg_remove';

export type ListingRequest = {
  images: string[];
  notes: string;
  platform: Platform;
  lang: Language;
  image_ops?: ImageOp[];
};

export type ListingResult = {
  listing: {
    title: string;
    bullets: string[];
    description: string;
    seo_keywords: string[];
    hashtags_or_tags: string[];
    claims_to_avoid: string[];
    assumptions: string[];
  };
  captions: string[];
  processed_images: string[];
  meta: {
    platform: Platform;
    lang: Language;
  };
};

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}
