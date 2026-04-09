# Sanity Studio — Admin Panel Kurulumu

## 1. Sanity hesabı aç

https://sanity.io/get-started adresine git → ücretsiz hesap aç.

## 2. Proje oluştur

```bash
cd apps/studio
npx sanity init --env
```

Bu komut sana bir `projectId` verecek. Bunu iki dosyada güncelle:
- `apps/studio/sanity.config.ts` → `projectId: "YOUR_PROJECT_ID"` satırını değiştir
- `apps/studio/sanity.cli.ts` → aynı şekilde

## 3. Bağımlılıkları yükle

```bash
npm install
```

## 4. Studio'yu çalıştır

```bash
npm run dev:studio   # → http://localhost:3333
```

## 5. Sanity web sitesinden içerik yönet

- Sayı ekle / düzenle → **Sayı** dökümanı
- Metin ekle / düzenle → **Metin** dökümanı  
- Site ayarları → **Site Ayarları** dökümanı

## 6. Web sitesini Sanity'den besle (isteğe bağlı ileriki adım)

Şu an web sitesi `src/data/issues.ts` dosyasından okuyor.
Sanity'den gerçek zamanlı veri almak için `@sanity/client` entegrasyonu yapabiliriz.
