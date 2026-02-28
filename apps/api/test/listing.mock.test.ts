import { describe, expect, it, beforeAll } from 'vitest';
import type { Express } from 'express';
import request from 'supertest';

process.env.API_KEY = 'test-api-key';
process.env.MOCK_MODE = 'true';

let createApp: () => Express;

beforeAll(async () => {
  const mod = await import('../src/app');
  createApp = mod.createApp;
});

describe('POST /v1/listing (MOCK_MODE)', () => {
  it('returns mock listing for trendyol TR', async () => {
    const app = createApp();
    const res = await request(app)
      .post('/v1/listing')
      .set('x-api-key', 'test-api-key')
      .send({
        images: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
        notes: 'El yapimi seramik vazo, mat yuzey',
        platform: 'trendyol',
        lang: 'tr',
        image_ops: ['caption']
      });

    expect(res.status).toBe(200);
    expect(res.body.listing).toBeDefined();
    expect(res.body.listing.title).toBeTruthy();
    expect(res.body.listing.bullets.length).toBeGreaterThanOrEqual(5);
    expect(res.body.captions).toHaveLength(2);
    expect(res.body.meta.platform).toBe('trendyol');
    expect(res.body.meta.lang).toBe('tr');
  });

  it('returns mock listing for etsy EN with 13 tags', async () => {
    const app = createApp();
    const res = await request(app)
      .post('/v1/listing')
      .set('x-api-key', 'test-api-key')
      .send({
        images: ['https://example.com/img1.jpg'],
        notes: 'Handmade wooden bowl',
        platform: 'etsy',
        lang: 'en'
      });

    expect(res.status).toBe(200);
    expect(res.body.listing.hashtags_or_tags).toHaveLength(13);
  });

  it('returns 401 without API key', async () => {
    const app = createApp();
    const res = await request(app).post('/v1/listing').send({
      images: ['https://example.com/img1.jpg'],
      notes: 'Test',
      platform: 'generic',
      lang: 'en'
    });
    expect(res.status).toBe(401);
  });

  it('returns 400 for invalid body', async () => {
    const app = createApp();
    const res = await request(app)
      .post('/v1/listing')
      .set('x-api-key', 'test-api-key')
      .send({ images: [], notes: '', platform: 'invalid' });
    expect(res.status).toBe(400);
  });

  it('returns 400 for data: URL', async () => {
    const app = createApp();
    const res = await request(app)
      .post('/v1/listing')
      .set('x-api-key', 'test-api-key')
      .send({
        images: ['data:image/png;base64,abc123'],
        notes: 'Test product',
        platform: 'generic',
        lang: 'en'
      });
    expect(res.status).toBe(400);
  });
});
