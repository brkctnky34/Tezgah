import { config } from '../config';
import { ListingResult, Platform, Language, AppError } from '../types';
import { parseStrictJson } from '../utils/json';
import { withRetry } from '../utils/retry';
import { buildPlatformRules } from './platform-rules';

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

function buildSchemaExample(platform: Platform, lang: Language): object {
  return {
    listing: {
      title: lang === 'tr' ? 'Ornek Baslik' : 'Sample Title',
      bullets: platform === 'hepsiburada' ? ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'] : ['b1', 'b2', 'b3', 'b4', 'b5'],
      description: lang === 'tr' ? 'Aciklama' : 'Description',
      seo_keywords: ['keyword1', 'keyword2'],
      hashtags_or_tags: platform === 'etsy' ? Array.from({ length: 13 }, (_, i) => `tag${i + 1}`) : ['#tag1', '#tag2'],
      claims_to_avoid: ['No medical claims'],
      assumptions: ['Assumption 1']
    }
  };
}

export async function generateListingFromOpenRouter(params: {
  platform: Platform;
  lang: Language;
  notes: string;
  captions: string[];
  processedImages: string[];
}): Promise<ListingResult['listing']> {
  if (!config.OPENROUTER_API_KEY) {
    throw new AppError('Missing OPENROUTER_API_KEY', 500);
  }

  const platformRules = buildPlatformRules(params.platform, params.lang);
  const schemaExample = buildSchemaExample(params.platform, params.lang);

  const payload = {
    model: config.OPENROUTER_MODEL,
    temperature: config.OPENROUTER_TEMPERATURE,
    max_tokens: config.OPENROUTER_MAX_TOKENS,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: [
          'You are an expert e-commerce SEO copywriter and listing optimization specialist.',
          'You deeply understand marketplace search algorithms (Trendyol, Hepsiburada, Etsy).',
          'Your listings rank high in search because you:',
          '- Place the most important keyword in the first 40 chars of the title',
          '- Use natural keyword density (2-3%) in descriptions without stuffing',
          '- Generate long-tail keywords that match real buyer search intent',
          '- Include synonyms and related terms buyers actually type',
          '- Adapt tone and structure to each marketplace\'s ranking algorithm',
          '- Write compelling copy that converts browsers into buyers',
          'Output STRICT JSON only. Follow the provided schema exactly.'
        ].join(' ')
      },
      {
        role: 'user',
        content: JSON.stringify({
          instructions: platformRules,
          notes: params.notes,
          captions: params.captions,
          processed_images: params.processedImages,
          required_schema: {
            title: 'string',
            bullets: 'string[]',
            description: 'string',
            seo_keywords: 'string[]',
            hashtags_or_tags: 'string[]',
            claims_to_avoid: 'string[]',
            assumptions: 'string[]'
          },
          output_root_key: 'listing',
          schema_example: schemaExample
        })
      }
    ]
  };

  const res = await withRetry(
    async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), config.OPENROUTER_TIMEOUT_MS);

      try {
        return await fetch(config.OPENROUTER_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${config.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
      } catch {
        throw new AppError('OpenRouter request failed', 502);
      } finally {
        clearTimeout(timeout);
      }
    },
    { retries: 2 }
  );

  if (!res.ok) {
    throw new AppError('OpenRouter returned an error', 502);
  }

  const json = (await res.json()) as OpenRouterResponse;
  const content = json.choices?.[0]?.message?.content;

  if (!content) {
    throw new AppError('OpenRouter response missing content', 502);
  }

  const parsed = parseStrictJson<{ listing?: ListingResult['listing'] }>(content);

  if (!parsed.listing) {
    throw new AppError('OpenRouter JSON missing listing field', 502);
  }

  return parsed.listing;
}
