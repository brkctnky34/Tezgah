import { ImageOp, Language, Platform, SessionData } from '../types';

const DEFAULT_TTL_MS = Number(process.env.SESSION_TTL_MS ?? 15 * 60 * 1000);

function createDefaultSession(): SessionData {
  return {
    images: [],
    notes: '',
    platform: 'generic',
    lang: 'en',
    imageOps: ['caption'],
    updatedAt: Date.now()
  };
}

export class SessionStore {
  private readonly sessions = new Map<number, SessionData>();

  get(userId: number): SessionData {
    const existing = this.sessions.get(userId);
    if (!existing) {
      const fresh = createDefaultSession();
      this.sessions.set(userId, fresh);
      return fresh;
    }

    if (Date.now() - existing.updatedAt > DEFAULT_TTL_MS) {
      const fresh = createDefaultSession();
      this.sessions.set(userId, fresh);
      return fresh;
    }

    return existing;
  }

  reset(userId: number): SessionData {
    const fresh = createDefaultSession();
    this.sessions.set(userId, fresh);
    return fresh;
  }

  setPlatform(userId: number, platform: Platform): SessionData {
    const session = this.get(userId);
    session.platform = platform;
    session.updatedAt = Date.now();
    this.sessions.set(userId, session);
    return session;
  }

  setLang(userId: number, lang: Language): SessionData {
    const session = this.get(userId);
    session.lang = lang;
    session.updatedAt = Date.now();
    this.sessions.set(userId, session);
    return session;
  }

  setImageOps(userId: number, ops: ImageOp[]): SessionData {
    const session = this.get(userId);
    session.imageOps = ops.length > 0 ? Array.from(new Set(ops)) : ['caption'];
    session.updatedAt = Date.now();
    this.sessions.set(userId, session);
    return session;
  }

  setAwaiting(userId: number, awaiting?: 'images' | 'notes'): SessionData {
    const session = this.get(userId);
    session.awaiting = awaiting;
    session.updatedAt = Date.now();
    this.sessions.set(userId, session);
    return session;
  }

  addImages(userId: number, imageUrls: string[]): SessionData {
    const session = this.get(userId);
    const merged = [...session.images, ...imageUrls];
    session.images = Array.from(new Set(merged)).slice(0, 5);
    session.updatedAt = Date.now();
    this.sessions.set(userId, session);
    return session;
  }

  setNotes(userId: number, notes: string): SessionData {
    const session = this.get(userId);
    session.notes = notes;
    session.updatedAt = Date.now();
    this.sessions.set(userId, session);
    return session;
  }
}
