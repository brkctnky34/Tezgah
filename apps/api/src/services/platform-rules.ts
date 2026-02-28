import { Language, Platform } from '../types';

export function buildPlatformRules(platform: Platform, lang: Language): string {
  const langRule = lang === 'tr'
    ? 'Ciktinin dili Turkce olsun. Turkce karakterler kullan (ş, ç, ğ, ü, ö, ı).'
    : 'Output language must be English.';

  const seoBase = lang === 'tr'
    ? [
        'seo_keywords: En az 8 adet Turkce arama anahtar kelimesi uret.',
        'Hem genel (orn: "seramik vazo") hem long-tail (orn: "el yapimi mat seramik vazo salon dekor") keyword kullan.',
        'Kullanicinin arayabilecegi esanlamli kelimeleri de ekle (orn: vazo/saksı, el yapimi/handmade).',
        'Baslikta ana anahtar kelimeyi ilk 40 karaktere yerlestir.',
        'Aciklamada anahtar kelimeleri dogal sekilde 2-3 kez tekrarla, keyword stuffing yapma.'
      ].join(' ')
    : [
        'seo_keywords: Generate at least 8 search keywords.',
        'Mix broad (e.g. "ceramic vase") and long-tail (e.g. "handmade matte ceramic vase home decor") keywords.',
        'Include synonyms buyers might search for (e.g. vase/planter, handmade/artisan).',
        'Place the primary keyword within the first 40 characters of the title.',
        'Use keywords naturally 2-3 times in the description, no keyword stuffing.'
      ].join(' ');

  switch (platform) {
    case 'trendyol':
      return [
        langRule,
        'Title: 60-80 karakter, ana anahtar kelime basta, marka/ozellik/renk/materyal icersin.',
        'Exactly 5 concise benefit-driven bullets. Her bullet bir ozellik + fayda icersin.',
        'Description: 150-300 kelime, ilk cumle en onemli anahtar kelimeyi icersin.',
        seoBase,
        'hashtags_or_tags: Trendyol kategori aramasina uygun 5-8 tag uret (# olmadan, kucuk harf, Turkce).',
        'Trendyol aramasinda ust siralara cikmak icin baslik ve aciklamada urun kategorisini, malzeme turunu ve kullanim alanini belirt.'
      ].join(' ');

    case 'hepsiburada':
      return [
        langRule,
        'Title: 80-120 karakter, teknik ve aciklayici, model/marka/ozellik icersin.',
        'Exactly 6 bullets with technical feature emphasis. Olculer, malzeme, uyumluluk bilgisi ekle.',
        'Description: 200-400 kelime, teknik detay agirlikli, karsilastirmali avantajlar belirt.',
        seoBase,
        'hashtags_or_tags: Hepsiburada filtre sistemiyle uyumlu 5-8 tag (kategori, marka, ozellik bazli).',
        'Hepsiburada aramasinda teknik terimler ve model numaralari onemli, bunlari basliga ekle.'
      ].join(' ');

    case 'etsy':
      return [
        langRule,
        'Title: 100-140 characters, storytelling style, front-load primary keyword, include material + occasion + style.',
        'Exactly 5 bullets with handcrafted/artisan tone. Emphasize uniqueness, materials, care instructions.',
        'Description: 200-350 words, story-driven, describe the making process and the experience of owning the item.',
        seoBase,
        'hashtags_or_tags: Exactly 13 Etsy tags (Etsy allows max 13). Each tag max 20 chars.',
        'Mix broad tags (e.g. "home decor") with specific long-tail tags (e.g. "minimalist ceramic vase").',
        'Include occasion tags (gift, birthday, housewarming), style tags (boho, minimal, rustic), and material tags.',
        'Etsy SEO tip: first 2-3 words of the title carry the most search weight. Repeat key phrases across tags.'
      ].join(' ');

    case 'generic':
    default:
      return [
        langRule,
        'Title: 60-100 characters, clear and descriptive, primary keyword first.',
        'Exactly 5 bullets, benefit-focused, each combining a feature with its advantage.',
        'Description: 150-300 words, natural and informative.',
        seoBase,
        'hashtags_or_tags: 5-8 relevant tags for general marketplace search.'
      ].join(' ');
  }
}
