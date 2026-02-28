import { Bot, Context } from 'grammy';
import { createListing } from './api/client';
import { SessionStore } from './session/store';
import { ImageOp, Language, ListingRequest, ListingResponse, Platform } from './types';
import { mockListing } from './utils/mock';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error('Missing TELEGRAM_BOT_TOKEN');
}

const MOCK_MODE = (process.env.MOCK_MODE ?? 'false').toLowerCase() === 'true';
const store = new SessionStore();
const userRequestTimestamps = new Map<number, number[]>();

const bot = new Bot(token);

function getUserId(ctx: Context): number | null {
  return ctx.from?.id ?? null;
}

function parseArgs(text: string): string[] {
  return text.split(' ').slice(1).map((v) => v.trim()).filter(Boolean);
}

function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function extractImageUrls(text: string): string[] {
  return text
    .split(/[\n,\s]+/)
    .map((v) => v.trim())
    .filter(Boolean)
    .filter((v) => isValidHttpUrl(v) && !v.startsWith('data:'));
}

function enforceUserRateLimit(userId: number): boolean {
  const now = Date.now();
  const timestamps = userRequestTimestamps.get(userId) ?? [];
  const recent = timestamps.filter((t) => now - t <= 60_000);
  if (recent.length >= 20) {
    userRequestTimestamps.set(userId, recent);
    return false;
  }
  recent.push(now);
  userRequestTimestamps.set(userId, recent);
  return true;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatListingOutput(payload: ListingResponse): string {
  const lines: string[] = [];

  lines.push(`<b>${escapeHtml(payload.listing.title)}</b>`);
  lines.push('');

  for (const b of payload.listing.bullets) {
    lines.push(`\u2022 ${escapeHtml(b)}`);
  }
  lines.push('');

  lines.push(escapeHtml(payload.listing.description));
  lines.push('');

  if (payload.listing.seo_keywords.length > 0) {
    lines.push(`<b>SEO:</b> ${escapeHtml(payload.listing.seo_keywords.join(', '))}`);
  }

  lines.push(`<b>Etiketler:</b> ${escapeHtml(payload.listing.hashtags_or_tags.join(' '))}`);

  if (payload.captions.length > 0) {
    lines.push('');
    lines.push('<b>Goersel Aciklamalari:</b>');
    for (let i = 0; i < payload.captions.length; i++) {
      lines.push(`${i + 1}. ${escapeHtml(payload.captions[i])}`);
    }
  }

  if (payload.processed_images.length > 0) {
    lines.push('');
    lines.push('<b>Islenmis Gorseller:</b>');
    for (let i = 0; i < payload.processed_images.length; i++) {
      lines.push(`${i + 1}. ${payload.processed_images[i]}`);
    }
  }

  return lines.join('\n');
}

function buildRequest(userId: number): { error?: string; request?: ListingRequest } {
  const session = store.get(userId);

  if (session.images.length < 1 || session.images.length > 5) {
    return { error: 'Lutfen once 1-5 arasi gorsel URL\'si ekleyin (/images).' };
  }

  if (!session.notes.trim()) {
    return { error: 'Lutfen once urun notlarini girin (/notes).' };
  }

  return {
    request: {
      images: session.images,
      notes: session.notes,
      platform: session.platform,
      lang: session.lang,
      image_ops: session.imageOps
    }
  };
}

bot.command('start', async (ctx) => {
  await ctx.reply(
    [
      'Tezgah\u0131n\u0131za hosgeldiniz!',
      '',
      '/new - Yeni ilan oturumu baslat',
      '/platform <trendyol|hepsiburada|etsy|generic> - Platform sec',
      '/lang <tr|en> - Dil sec',
      '/images - Gorsel URL\'lerini gonder (1-5 adet)',
      '/notes - Urun notlarini gonder',
      '/ops <caption|upscale|bg_remove> - Gorsel islemleri',
      '/run - Ilan olustur',
      '/reset - Oturumu sifirla'
    ].join('\n')
  );
});

bot.command('new', async (ctx) => {
  const userId = getUserId(ctx);
  if (!userId) return;
  store.reset(userId);
  await ctx.reply('Yeni oturum baslatildi. /platform ve /lang ayarlayin, sonra /images ve /notes ile devam edin.');
});

bot.command('reset', async (ctx) => {
  const userId = getUserId(ctx);
  if (!userId) return;
  store.reset(userId);
  await ctx.reply('Oturum sifirlandi.');
});

bot.command('platform', async (ctx) => {
  const userId = getUserId(ctx);
  if (!userId) return;

  const args = parseArgs(ctx.msg?.text ?? '');
  const value = args[0] as Platform | undefined;
  const valid: Platform[] = ['trendyol', 'hepsiburada', 'etsy', 'generic'];

  if (!value || !valid.includes(value)) {
    await ctx.reply('Kullanim: /platform trendyol|hepsiburada|etsy|generic');
    return;
  }

  store.setPlatform(userId, value);
  await ctx.reply(`Platform ayarlandi: ${value}`);
});

bot.command('lang', async (ctx) => {
  const userId = getUserId(ctx);
  if (!userId) return;

  const args = parseArgs(ctx.msg?.text ?? '');
  const value = args[0] as Language | undefined;
  const valid: Language[] = ['tr', 'en'];

  if (!value || !valid.includes(value)) {
    await ctx.reply('Kullanim: /lang tr|en');
    return;
  }

  store.setLang(userId, value);
  await ctx.reply(`Dil ayarlandi: ${value}`);
});

bot.command('ops', async (ctx) => {
  const userId = getUserId(ctx);
  if (!userId) return;

  const args = parseArgs(ctx.msg?.text ?? '');
  const raw = args.join(' ');
  const parsed = raw.split(/[\s,]+/).filter(Boolean) as ImageOp[];
  const valid = new Set<ImageOp>(['caption', 'upscale', 'bg_remove']);

  if (parsed.length === 0 || parsed.some((op) => !valid.has(op))) {
    await ctx.reply('Kullanim: /ops caption|upscale|bg_remove (bosluk veya virgul ile ayirin)');
    return;
  }

  const session = store.setImageOps(userId, parsed);
  await ctx.reply(`Gorsel islemleri ayarlandi: ${session.imageOps.join(', ')}`);
});

bot.command('images', async (ctx) => {
  const userId = getUserId(ctx);
  if (!userId) return;

  store.setAwaiting(userId, 'images');
  await ctx.reply('1-5 arasi gorsel URL\'si gonderin (bosluk/virgul/satir ile ayirin).');
});

bot.command('notes', async (ctx) => {
  const userId = getUserId(ctx);
  if (!userId) return;

  store.setAwaiting(userId, 'notes');
  await ctx.reply('Urun notlarini duz metin olarak gonderin.');
});

bot.command('run', async (ctx) => {
  const userId = getUserId(ctx);
  if (!userId) return;

  if (!enforceUserRateLimit(userId)) {
    await ctx.reply('Istek limiti asildi. Lutfen bir dakika bekleyip tekrar deneyin.');
    return;
  }

  const { error, request } = buildRequest(userId);
  if (error || !request) {
    await ctx.reply(error ?? 'Oturum bilgileri eksik.');
    return;
  }

  await ctx.reply('Ilan olusturuluyor, lutfen bekleyin...');

  try {
    const output = MOCK_MODE ? mockListing(request) : await createListing(request);
    await ctx.reply(formatListingOutput(output), { parse_mode: 'HTML' });
  } catch {
    await ctx.reply('Ilan olusturma basarisiz oldu. Lutfen kisa bir sure sonra tekrar deneyin.');
  }
});

bot.on('message:photo', async (ctx) => {
  await ctx.reply('MVP suruemunde lutfen gorsel URL\'sini metin olarak yapistin.');
});

bot.on('message:text', async (ctx) => {
  const userId = getUserId(ctx);
  if (!userId) return;

  const text = ctx.msg.text;
  if (text.startsWith('/')) {
    return;
  }

  const session = store.get(userId);

  if (session.awaiting === 'images') {
    const urls = extractImageUrls(text);
    if (urls.length === 0) {
      await ctx.reply('Gecerli gorsel URL\'si bulunamadi. Lutfen http/https ile baslayan URL gonderin.');
      return;
    }

    const updated = store.addImages(userId, urls);
    store.setAwaiting(userId, undefined);
    await ctx.reply(`${updated.images.length} gorsel kaydedildi. Hazir oldugunuzda /run yazin.`);
    return;
  }

  if (session.awaiting === 'notes') {
    store.setNotes(userId, text.trim());
    store.setAwaiting(userId, undefined);
    await ctx.reply('Notlar kaydedildi. Hazir oldugunuzda /run yazin.');
    return;
  }

  await ctx.reply('Baslamak icin /new yazin veya /images ve /notes ile devam edin.');
});

bot.catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Bot hatasi', err.error);
});

bot.start();

// eslint-disable-next-line no-console
console.log('Telegram bot baslatildi');
