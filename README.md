# Listing Wizard + Telegram Bot (MVP)

Marketplace ilan metni olusturmak icin gorsel URL'leri ve satici notlarini kullanan monorepo MVP.

## Stack

- Node.js 20+ / TypeScript
- API: Express + Zod + express-rate-limit + pino-http
- Bot: grammY (Telegram)
- LLM: OpenRouter chat completions (JSON output)
- Vision/Image: Replicate predictions + exponential backoff polling
- Docker + docker-compose

## Mimari

### apps/api (Express API)
Tek endpoint: `POST /v1/listing`. Gelen istegi Zod ile validate eder, MOCK_MODE aciksa mock data doner, degilse Replicate'ten gorsel caption alir ve OpenRouter'dan ilan metni olusturur. Rate limiting (IP bazli, 60 req/dk), API key auth, request-id loglama icin pino-http kullanir.

### apps/bot (Telegram Bot)
grammY tabanli Telegram bot. In-memory session store ile kullanici state'i tutar (15 dk TTL). Kullanici /new ile oturum baslatir, platform/dil/gorsel/not ekler, /run ile ilan olusturur. Per-user rate limiting (20 req/dk). Tum kullanici mesajlari Turkce.

## Repo Layout

```
/apps/api       Express API (POST /v1/listing)
/apps/bot       Telegram bot (in-memory session)
/docker-compose.yml   iki servisin local setup'i
/.env.example   env sablonu
```

## Kurulum

### 1. Bagimliliklari yukle

```bash
npm install
```

### 2. Env dosyasi olustur

```bash
cp .env.example .env
```

### 3. Env degiskenlerini ayarla

| Degisken | Aciklama | Zorunlu |
|---|---|---|
| `API_KEY` | API kimlik dogrulama anahtari | Evet |
| `MOCK_MODE` | `true` ise sahte veri doner | Evet |
| `PORT` | API portu (varsayilan: 3000) | Hayir |
| `LOG_LEVEL` | Log seviyesi (varsayilan: info) | Hayir |
| `OPENROUTER_API_KEY` | OpenRouter API anahtari | MOCK_MODE=false ise |
| `OPENROUTER_MODEL` | LLM modeli (varsayilan: openai/gpt-4o-mini) | Hayir |
| `OPENROUTER_URL` | OpenRouter endpoint | Hayir |
| `OPENROUTER_TIMEOUT_MS` | OpenRouter istek zaman asimi | Hayir |
| `OPENROUTER_MAX_TOKENS` | Maks token butcesi | Hayir |
| `OPENROUTER_TEMPERATURE` | LLM sicakligi (0-1) | Hayir |
| `REPLICATE_API_TOKEN` | Replicate API token | MOCK_MODE=false ise |
| `REPLICATE_CAPTION_VERSION` | Caption model versiyonu | MOCK_MODE=false ise |
| `REPLICATE_UPSCALE_VERSION` | Upscale model versiyonu | Hayir |
| `REPLICATE_BGREMOVE_VERSION` | BG remove model versiyonu | Hayir |
| `REPLICATE_TIMEOUT_MS` | Replicate istek zaman asimi | Hayir |
| `REPLICATE_MAX_POLL_ATTEMPTS` | Maks polling denemesi | Hayir |
| `REPLICATE_POLL_INTERVAL_MS` | Polling baslangic araligi (exponential backoff) | Hayir |
| `TELEGRAM_BOT_TOKEN` | Telegram bot tokeni | Evet (bot icin) |
| `API_BASE_URL` | API URL (bot icin, varsayilan: http://api:3000) | Hayir |
| `API_TIMEOUT_MS` | Bot API istek zaman asimi | Hayir |
| `SESSION_TTL_MS` | Oturum suresi (varsayilan: 900000 = 15dk) | Hayir |

### 4. Docker ile calistir

```bash
docker compose up --build
```

API: `http://localhost:3000`
Bot: Telegram uzerinden erisim

### 5. Lokal gelistirme (Docker'siz)

```bash
# Terminal 1: API
npm run dev:api

# Terminal 2: Bot
npm run dev:bot
```

## API Sozlesmesi

### `POST /v1/listing`

**Header:** `x-api-key` (zorunlu)

**Body:**
```json
{
  "images": ["https://example.com/image.jpg"],
  "notes": "El yapimi seramik vazo, mat yuzey",
  "platform": "trendyol",
  "lang": "tr",
  "image_ops": ["caption"]
}
```

**Kurallar:**
- `images`: 1-5 adet, sadece http/https URL (base64/data URL reddedilir)
- `platform`: `trendyol` | `hepsiburada` | `etsy` | `generic`
- `lang`: `tr` | `en`
- `image_ops`: `caption` | `upscale` | `bg_remove` (opsiyonel)
- API key eksik/hatali: `401`
- Gecersiz body: `400`

### curl Ornegi

```bash
curl -X POST http://localhost:3000/v1/listing \
  -H "Content-Type: application/json" \
  -H "x-api-key: change-me" \
  -d '{
    "images": ["https://example.com/image.jpg"],
    "notes": "El yapimi seramik vazo, mat yuzey",
    "platform": "trendyol",
    "lang": "tr",
    "image_ops": ["caption"]
  }'
```

## Telegram Bot Kullanimi

Adim adim akis:

1. `/new` - Yeni ilan oturumu baslat
2. `/platform trendyol` - Platform sec
3. `/lang tr` - Dil sec
4. `/images` - Ardindan gorsel URL'lerini gonder
5. `/notes` - Ardindan urun notlarini yaz
6. `/run` - Ilani olustur

Diger komutlar:
- `/start` - Yardim mesaji
- `/ops caption,upscale` - Gorsel islemleri ayarla
- `/reset` - Oturumu sifirla

## Gercek Provider Modu

`MOCK_MODE=false` ile calistirmak icin:

1. `OPENROUTER_API_KEY` ve `OPENROUTER_MODEL` ayarla
2. `REPLICATE_API_TOKEN` ve `REPLICATE_CAPTION_VERSION` ayarla
3. Opsiyonel: `REPLICATE_UPSCALE_VERSION`, `REPLICATE_BGREMOVE_VERSION`

Akis:
1. Replicate ile gorsel caption (ve opsiyonel islemler)
2. OpenRouter ile ilan metni olusturma (strict JSON prompt)
3. Zod ile cikti validasyonu

## Guvenilirlik / Maliyet Korumalari

- API key auth
- Zod ile istek validasyonu
- API rate limit (IP bazli, 60 req/dk)
- Bot rate limit (kullanici bazli, 20 req/dk)
- Timeout + retry + exponential backoff (harici API cagrilari)
- Replicate polling icin exponential backoff (2^i carpani, maks 30sn)
- Yapilandirmali token butcesi ve sicaklik (OpenRouter)
- Request-id bazli loglama (pino-http)
- Session TTL (15 dk varsayilan)

## Testler

```bash
npm test
```

6 test (2 dosya):
- `listing.mock.test.ts`: MOCK_MODE=true ile 5 test (basarili listing, etsy 13 tag, 401 auth, 400 validasyon, data URL reddi)
- `listing.route.test.ts`: Nock ile provider mock'lanmis 1 entegrasyon testi

## Key Files

- `apps/api/src/routes/listing.ts` - API route handler
- `apps/api/src/services/listing.ts` - Orchestration (mock vs real)
- `apps/api/src/services/openrouter.ts` - LLM entegrasyonu
- `apps/api/src/services/replicate.ts` - Gorsel islemleri
- `apps/bot/src/index.ts` - Telegram bot komutlari
- `apps/bot/src/session/store.ts` - In-memory session yonetimi
# Tezgah
# Tezgah
