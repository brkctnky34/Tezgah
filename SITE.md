# Kaspar Hauser — Site Dokümantasyonu

## Proje Özeti

**kasparhauser.xyz** — 6:45 yayınları bünyesinde çıkarılan bağımsız edebiyat ve kültür platformunun internet sitesi. Sayı bazlı değil, sürekli yayın modeli. Her metin kendi başına var olur.

---

## Teknik Altyapı

### Stack
- **Framework:** Next.js 14 (App Router) — TypeScript
- **Stil:** Tailwind CSS + CSS custom properties
- **İçerik:** Markdown dosyaları (`content/posts/*.md`) — gray-matter + marked
- **CMS:** Decap CMS (`/admin`) — Git Gateway üzerinden GitHub'a commit
- **Deploy:** Netlify — `main` branch'e her push'ta otomatik build
- **Repo:** `github.com/brkctnky34/Tezgah` (private)

### Klasör Yapısı

```
apps/web/
├── content/
│   ├── posts/          ← Markdown yazılar
│   ├── hakkinda.json   ← Hakkında sayfası içeriği
│   ├── iletisim.json   ← İletişim sayfası içeriği
│   └── settings.json   ← Site ayarları (altyazı, instagram vb.)
├── public/
│   ├── admin/          ← Decap CMS (index.html + config.yml)
│   ├── images/uploads/ ← CMS üzerinden yüklenen görseller
│   └── favicon.svg
└── src/
    ├── app/            ← Sayfalar (Next.js App Router)
    ├── components/     ← Header, Footer, PostCard
    └── lib/
        ├── posts.ts    ← Markdown okuma (server-only)
        └── types.ts    ← Post tipi, formatDate (client-safe)
```

### İçerik Sistemi

Her yazı `content/posts/` altında bir `.md` dosyasıdır:

```markdown
---
title: Beyrut
author: Burak Çetinkaya
type: hikaye
date: 2026-04-10
image: /images/uploads/beyrut1.jpg
excerpt: Macar bir ev sahibem olmasını dilerdim.
---

Metin buraya gelir...
```

Slug, dosya adından otomatik üretilir. Türkçe karakterler (`ş→s`, `ğ→g` vb.) ASCII'ye çevrilir.

### CMS Akışı

```
kasparhauser.xyz/admin → giriş → yazı yaz → "Yayınla"
→ GitHub'a commit → Netlify build (2-3 dk) → sitede görünür
```

Admin'de düzenlenebilir alanlar:
- **Metinler** — yeni yazı ekle, düzenle, sil
- **Sayfalar → Hakkında** — açılış cümlesi, paragraflar, yan panel, önceki yayınlar
- **Sayfalar → İletişim** — e-postalar, instagram, gönderim kuralları
- **Sayfalar → Site Ayarları** — altyazı, yayınevi adı, description

---

## Tasarım Dili

### Tipografi

| Kullanım | Font | Not |
|---|---|---|
| Başlıklar | Cormorant Garamond | Display, 300–600 weight |
| Metin gövdesi | EB Garamond | Okunabilirlik odaklı |
| UI elementleri | Inter | Nav, meta bilgi, etiketler |

### Renk Paleti

```
--bg:             #ede9df   ← Kirli beyaz, eski kağıt tonu
--surface:        #f0ece2   ← Kartlar için hafif açık
--border:         #d4cfc6
--text:           #1a1a1a
--text-secondary: #555555
--text-muted:     #999999
--accent:         #c8001e   ← Kırmızı — tek renk vurgusu
```

### Doku Katmanları

İki CSS katmanı tüm sayfada `position: fixed` olarak çalışır:

1. **Grain** — `feTurbulence fractalNoise` ile üretilen SVG noise, `opacity: 0.20`. Newsprint/mimeograf hissi.
2. **Vignette** — `radial-gradient` ile kenarlardan merkeze açılan koyu overlay. Eski fotoğraf, jazz kulübü hissi.

### Animasyonlar

- **KASPAR HAUSER başlığı** — her 8 saniyede bir 0.4 saniyelik chromatic aberration glitch (`text-shadow` kırmızı/mavi offset + `clip-path` slice)
- **Kart hover** — başlık kırmızıya döner
- **Widget hover** — ok sağa kayar (`translateX`)

---

## Sayfalar

### Ana Sayfa `/`
Masthead (başlık + altyazı + yayınevi) → yazı grid'i → Instagram widget → Dükkan widget

### Metin `/metin/[slug]`
Varsa kapak görseli (gradient overlay) → başlık + yazar + tarih → body (prose/şiir ayrımı) → önceki/sonraki navigasyon

### Hakkında `/hakkinda`
Açılış cümlesi (italik) → yan panel bilgileri + paragraflar → önceki yayınlar

### İletişim `/iletisim`
E-postalar + Instagram linki → gönderim kuralları

---

## Referanslar & Tarz

**Görsel referanslar:** Cabinet Magazine, The London Magazine, The White Review, BOMB, Triple Canopy, Interview Magazine, Underground Poetixi (önceki yayın)

**Estetik:** Elegant ama underground. Sade typografi ile kirli doku aynı sayfada. Beatnik hissiyat — mimeograf kağıdı, jazz kulübü köşesi, eski dergi. Kırmızı tek vurgu rengi, her yerde tutarlı. Tür ayrımı (deneme/şiir/hikaye) görünmez — her metin eşit ağırlıkta.

---

## Netlify Ayarları

| Alan | Değer |
|---|---|
| Base directory | `apps/web` |
| Build command | `npm run build` |
| Publish directory | `apps/web/out` |
| Identity | Aktif |
| Git Gateway | Aktif |

---

## Notlar

- Türkçe karakterli slug'lar otomatik ASCII'ye çevrilir
- Görselsiz kartlarda "kh" monogram placeholder gösterilir
- Footer yılı dinamik — her yıl otomatik güncellenir
- Netlify Identity widget kaldırıldı (150KB), yerine 3 satırlık redirect script var
- Google Fonts `@import` kaldırıldı, sadece `<link>` üzerinden yükleniyor (duplicate önlendi)
