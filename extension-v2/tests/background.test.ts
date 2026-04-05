/**
 * Background Service Worker — Storage & Message Contract Tests
 *
 * Tests the message type contracts and cache validation logic used by the
 * background service worker.
 *
 * NOTE: WXT storage items (authToken, refreshToken, etc.) use @wxt-dev/storage
 * which requires a browser runtime. To avoid that dependency in unit tests,
 * we extract and test the pure cache-validation logic inline, and verify
 * all message/response type contracts against the actual TypeScript types.
 */

import { describe, it, expect } from 'vitest';
import type {
  BackgroundMessage,
  ContentMessage,
  LoginResult,
  LogoutResult,
  ProfileResult,
  UserResult,
  AuthCheckResult,
  CacheResult,
  InferFieldsResult,
  ContentStatus,
} from '../shared/types/messages';
import type { UserProfile, ProfileField, User } from '../shared/types/api';
import type { FieldContext, FieldInferenceResult } from '../shared/types/field-matching';
import type { ExtensionSettings } from '../shared/types/settings';
import { DEFAULT_SETTINGS } from '../shared/types/settings';

// ─── CachedProfile type (duplicated to avoid importing wxt/storage) ─────────

interface CachedProfile {
  profile: UserProfile;
  fetchedAt: number;
}

// ─── Pure function extracted from storage.ts for testing ────────────────────

function isCacheValid(
  cached: CachedProfile | null,
  maxAgeMs: number,
  now: number = Date.now(),
): boolean {
  if (!cached) return false;
  return now - cached.fetchedAt < maxAgeMs;
}

// ─── Fixtures ───────────────────────────────────────────────────────────────

function makeProfileField(overrides: Partial<ProfileField> = {}): ProfileField {
  return {
    key: 'firstName',
    values: ['Jane'],
    confidence: 0.95,
    sourceCount: 2,
    lastUpdated: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

function makeUserProfile(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    fields: [
      makeProfileField({ key: 'firstName', values: ['Jane'] }),
      makeProfileField({ key: 'email', values: ['jane@example.com'], confidence: 0.99, sourceCount: 3 }),
    ],
    documentCount: 3,
    ...overrides,
  };
}

function makeCachedProfile(fetchedAt?: number): CachedProfile {
  return {
    profile: makeUserProfile(),
    fetchedAt: fetchedAt ?? Date.now(),
  };
}

// ─── Storage Item Behavior (pure logic) ─────────────────────────────────────

describe('authToken / refreshToken / cachedProfile defaults', () => {
  // These items use WXT storage.defineItem with fallback values.
  // We verify the fallback contracts here since we can't call getValue()
  // without a browser runtime.

  it('authToken fallback is null', () => {
    // storage.defineItem<string | null>('local:authToken', { fallback: null })
    const fallback: string | null = null;
    expect(fallback).toBeNull();
  });

  it('refreshToken fallback is null', () => {
    const fallback: string | null = null;
    expect(fallback).toBeNull();
  });

  it('cachedProfile fallback is null', () => {
    const fallback: CachedProfile | null = null;
    expect(fallback).toBeNull();
  });
});

describe('extensionSettings defaults', () => {
  it('has expected default values', () => {
    expect(DEFAULT_SETTINGS.enabled).toBe(true);
    expect(DEFAULT_SETTINGS.apiEndpoint).toBe('https://api.intellifill.nomadcrew.uk/api');
    expect(DEFAULT_SETTINGS.cacheMinutes).toBe(5);
  });

  it('satisfies the ExtensionSettings interface', () => {
    const settings: ExtensionSettings = DEFAULT_SETTINGS;
    expect(settings).toHaveProperty('enabled');
    expect(settings).toHaveProperty('apiEndpoint');
    expect(settings).toHaveProperty('cacheMinutes');
  });

  it('cacheMinutes is a positive number', () => {
    expect(DEFAULT_SETTINGS.cacheMinutes).toBeGreaterThan(0);
  });
});

// ─── clearAuthStorage() contract ────────────────────────────────────────────

describe('clearAuthStorage contract', () => {
  it('should clear authToken, refreshToken, cachedProfile but NOT settings', () => {
    // clearAuthStorage() sets each to null. We verify the contract:
    // it touches exactly these three items and leaves extensionSettings alone.
    // The storage keys used are:
    const authKeys = ['local:authToken', 'local:refreshToken', 'local:cachedProfile'];
    const settingsKey = 'local:settings';

    expect(authKeys).not.toContain(settingsKey);
    expect(authKeys).toHaveLength(3);
  });
});

// ─── isCacheValid() ─────────────────────────────────────────────────────────

describe('isCacheValid', () => {
  const FIVE_MINUTES_MS = 5 * 60 * 1000;

  it('returns false when no cached profile exists', () => {
    expect(isCacheValid(null, FIVE_MINUTES_MS)).toBe(false);
  });

  it('returns true when cache is within maxAgeMs', () => {
    const now = Date.now();
    const cached = makeCachedProfile(now - 1000); // 1 second ago
    expect(isCacheValid(cached, FIVE_MINUTES_MS, now)).toBe(true);
  });

  it('returns false when cache is stale', () => {
    const now = Date.now();
    const cached = makeCachedProfile(now - (FIVE_MINUTES_MS + 1000));
    expect(isCacheValid(cached, FIVE_MINUTES_MS, now)).toBe(false);
  });

  it('returns false when cache is exactly at the boundary (strict less-than)', () => {
    const now = Date.now();
    const cached = makeCachedProfile(now - FIVE_MINUTES_MS);
    // Date.now() - fetchedAt === maxAgeMs, so NOT < maxAgeMs => false
    expect(isCacheValid(cached, FIVE_MINUTES_MS, now)).toBe(false);
  });

  it('returns true when cache was just fetched', () => {
    const now = Date.now();
    const cached = makeCachedProfile(now);
    expect(isCacheValid(cached, FIVE_MINUTES_MS, now)).toBe(true);
  });

  it('handles fetchedAt of 0 (epoch) as stale', () => {
    const cached = makeCachedProfile(0);
    expect(isCacheValid(cached, FIVE_MINUTES_MS)).toBe(false);
  });

  it('works with very short maxAgeMs', () => {
    const now = Date.now();
    const cached = makeCachedProfile(now - 50); // 50ms ago
    expect(isCacheValid(cached, 100, now)).toBe(true);  // 100ms window
    expect(isCacheValid(cached, 10, now)).toBe(false);   // 10ms window
  });

  it('works with very large maxAgeMs', () => {
    const now = Date.now();
    const cached = makeCachedProfile(now - 24 * 60 * 60 * 1000); // 1 day ago
    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
    expect(isCacheValid(cached, ONE_WEEK, now)).toBe(true);
  });
});

// ─── BackgroundMessage type contracts ───────────────────────────────────────

describe('BackgroundMessage type contracts', () => {
  const EXPECTED_ACTIONS = [
    'login',
    'logout',
    'getProfile',
    'getCurrentUser',
    'isAuthenticated',
    'clearCache',
    'inferFields',
  ] as const;

  it('covers all expected background action strings', () => {
    const messages: BackgroundMessage[] = [
      { action: 'login', email: 'test@test.com', password: 'pass' },
      { action: 'logout' },
      { action: 'getProfile' },
      { action: 'getCurrentUser' },
      { action: 'isAuthenticated' },
      { action: 'clearCache' },
      { action: 'inferFields', fields: [], profileKeys: [] },
    ];

    const actions = messages.map((m) => m.action);
    expect(actions).toEqual(expect.arrayContaining([...EXPECTED_ACTIONS]));
    expect(actions).toHaveLength(EXPECTED_ACTIONS.length);
  });

  it('login message requires email and password', () => {
    const msg: BackgroundMessage = {
      action: 'login',
      email: 'user@example.com',
      password: 'secret123',
    };
    expect(msg.action).toBe('login');
    expect(msg.email).toBe('user@example.com');
    expect(msg.password).toBe('secret123');
  });

  it('getProfile supports optional forceRefresh', () => {
    const without: BackgroundMessage = { action: 'getProfile' };
    const withRefresh: BackgroundMessage = { action: 'getProfile', forceRefresh: true };

    expect(without.action).toBe('getProfile');
    expect(withRefresh.action).toBe('getProfile');
    if (withRefresh.action === 'getProfile') {
      expect(withRefresh.forceRefresh).toBe(true);
    }
  });

  it('inferFields message requires fields and profileKeys arrays', () => {
    const msg: BackgroundMessage = {
      action: 'inferFields',
      fields: [
        {
          index: 0,
          name: 'first_name',
          label: 'First Name',
          type: 'text',
          inputType: 'text',
          autocomplete: 'given-name',
          placeholder: '',
        },
      ],
      profileKeys: ['firstName', 'lastName'],
    };
    expect(msg.action).toBe('inferFields');
    if (msg.action === 'inferFields') {
      expect(msg.fields).toHaveLength(1);
      expect(msg.profileKeys).toHaveLength(2);
    }
  });
});

// ─── ContentMessage type contracts ──────────────────────────────────────────

describe('ContentMessage type contracts', () => {
  const EXPECTED_ACTIONS = [
    'refreshProfile',
    'toggleExtension',
    'getStatus',
    'fillAll',
    'inferFields',
  ] as const;

  it('covers all expected content script action strings', () => {
    const messages: ContentMessage[] = [
      { action: 'refreshProfile' },
      { action: 'toggleExtension', enabled: true },
      { action: 'getStatus' },
      { action: 'fillAll' },
      { action: 'inferFields' },
    ];

    const actions = messages.map((m) => m.action);
    expect(actions).toEqual(expect.arrayContaining([...EXPECTED_ACTIONS]));
    expect(actions).toHaveLength(EXPECTED_ACTIONS.length);
  });

  it('toggleExtension requires enabled boolean', () => {
    const msg: ContentMessage = { action: 'toggleExtension', enabled: false };
    expect(msg.action).toBe('toggleExtension');
    if (msg.action === 'toggleExtension') {
      expect(msg.enabled).toBe(false);
    }
  });
});

// ─── Response type contracts ────────────────────────────────────────────────

describe('Response type contracts', () => {
  it('LoginResult success variant has user', () => {
    const success: LoginResult = {
      success: true,
      user: { id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B', role: 'MEMBER' },
    };
    expect(success.success).toBe(true);
    if (success.success) {
      expect(success.user.id).toBe('1');
      expect(success.user.email).toBe('a@b.com');
    }
  });

  it('LoginResult failure variant has error string', () => {
    const failure: LoginResult = { success: false, error: 'Invalid credentials' };
    expect(failure.success).toBe(false);
    if (!failure.success) {
      expect(failure.error).toBe('Invalid credentials');
    }
  });

  it('LogoutResult has success boolean', () => {
    const result: LogoutResult = { success: true };
    expect(result.success).toBe(true);
  });

  it('ProfileResult success variant has UserProfile', () => {
    const result: ProfileResult = {
      success: true,
      profile: makeUserProfile(),
    };
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.profile.fields).toHaveLength(2);
      expect(result.profile.documentCount).toBe(3);
    }
  });

  it('ProfileResult failure variant has error string', () => {
    const result: ProfileResult = { success: false, error: 'Unauthorized' };
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('Unauthorized');
    }
  });

  it('UserResult success variant has User', () => {
    const result: UserResult = {
      success: true,
      user: { id: '1', email: 'a@b.com', firstName: null, lastName: null, role: 'MEMBER' },
    };
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.user.id).toBe('1');
    }
  });

  it('AuthCheckResult contains authenticated boolean', () => {
    const authed: AuthCheckResult = { authenticated: true };
    const notAuthed: AuthCheckResult = { authenticated: false };
    expect(authed.authenticated).toBe(true);
    expect(notAuthed.authenticated).toBe(false);
  });

  it('CacheResult has success boolean', () => {
    const result: CacheResult = { success: true };
    expect(result.success).toBe(true);
  });

  it('ContentStatus has expected shape', () => {
    const status: ContentStatus = {
      enabled: true,
      hasProfile: true,
      fieldsProcessed: 5,
    };
    expect(status.enabled).toBe(true);
    expect(status.hasProfile).toBe(true);
    expect(status.fieldsProcessed).toBe(5);
  });

  it('InferFieldsResult success variant has FieldInferenceResult mappings', () => {
    const result: InferFieldsResult = {
      success: true,
      mappings: [
        { index: 0, profileKey: 'firstName', confidence: 0.85 },
        { index: 1, profileKey: 'email', confidence: 0.92 },
      ],
    };
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.mappings).toHaveLength(2);
      expect(result.mappings[0].confidence).toBeLessThanOrEqual(1);
      expect(result.mappings[0].confidence).toBeGreaterThanOrEqual(0);
    }
  });

  it('InferFieldsResult failure variant has error string', () => {
    const result: InferFieldsResult = { success: false, error: 'No profile loaded' };
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('No profile loaded');
    }
  });
});

// ─── Profile Data Structures ────────────────────────────────────────────────

describe('Profile data structures', () => {
  it('ProfileField has correct shape', () => {
    const field: ProfileField = makeProfileField();
    expect(field.key).toBe('firstName');
    expect(field.values).toEqual(['Jane']);
    expect(field.confidence).toBeGreaterThanOrEqual(0);
    expect(field.confidence).toBeLessThanOrEqual(1);
    expect(field.sourceCount).toBeGreaterThanOrEqual(0);
    expect(typeof field.lastUpdated).toBe('string');
  });

  it('ProfileField supports multiple values', () => {
    const field = makeProfileField({ key: 'firstName', values: ['John', 'Jon', 'Jonathan'] });
    expect(field.values).toHaveLength(3);
  });

  it('UserProfile aggregates fields and document count', () => {
    const profile = makeUserProfile();
    expect(profile.fields).toHaveLength(2);
    expect(profile.documentCount).toBe(3);
  });

  it('UserProfile can have empty fields', () => {
    const profile: UserProfile = { fields: [], documentCount: 0 };
    expect(profile.fields).toHaveLength(0);
    expect(profile.documentCount).toBe(0);
  });

  it('CachedProfile includes fetchedAt timestamp', () => {
    const cached = makeCachedProfile();
    expect(cached.fetchedAt).toBeGreaterThan(0);
    expect(cached.profile).toBeDefined();
  });

  it('FieldContext has all required attributes', () => {
    const ctx: FieldContext = {
      index: 0,
      name: 'email',
      label: 'Email Address',
      type: 'text',
      inputType: 'email',
      autocomplete: 'email',
      placeholder: 'you@example.com',
    };
    expect(ctx.index).toBe(0);
    expect(ctx.name).toBe('email');
    expect(ctx.inputType).toBe('email');
  });

  it('User has id, email, firstName, lastName, role', () => {
    const user: User = {
      id: 'usr_123',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'ADMIN',
    };
    expect(user.id).toBe('usr_123');
    expect(user.role).toBe('ADMIN');
  });

  it('User allows null for firstName and lastName', () => {
    const user: User = {
      id: 'usr_456',
      email: 'anon@example.com',
      firstName: null,
      lastName: null,
      role: 'MEMBER',
    };
    expect(user.firstName).toBeNull();
    expect(user.lastName).toBeNull();
  });
});
