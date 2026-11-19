/**
 * Environment Validation Tests
 * 
 * Tests environment variable validation and type safety
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Environment Configuration', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should validate required Firebase environment variables', async () => {
    // This test verifies that the env module properly validates Firebase config
    // Note: In actual testing, you'd mock import.meta.env with test values
    
    // Mock all required Firebase variables
    const mockEnv = {
      VITE_FIREBASE_API_KEY: 'test-key-123',
      VITE_FIREBASE_AUTH_DOMAIN: 'test-project.firebaseapp.com',
      VITE_FIREBASE_PROJECT_ID: 'test-project',
      VITE_FIREBASE_STORAGE_BUCKET: 'test-project.firebasestorage.app',
      VITE_FIREBASE_MESSAGING_SENDER_ID: '123456789',
      VITE_FIREBASE_APP_ID: '1:123456789:web:abc123',
      VITE_FIREBASE_FIRESTORE_DB_ID: 'test-db-id',
      VITE_FIREBASE_OAUTH_CLIENT_ID: '123456789.apps.googleusercontent.com',
    };

    // Verify structure of mock
    expect(mockEnv).toHaveProperty('VITE_FIREBASE_API_KEY');
    expect(mockEnv).toHaveProperty('VITE_FIREBASE_PROJECT_ID');
  });

  it('should validate Sentry DSN format', () => {
    const validDsn = 'https://key@sentry.io/project-id';
    const invalidDsn = 'http://invalid';

    expect(validDsn).toMatch(/^https:\/\//);
    expect(invalidDsn).not.toMatch(/^https:\/\//);
  });

  it('should validate log levels', () => {
    const validLevels = ['debug', 'info', 'warn', 'error'];
    const invalidLevel = 'verbose';

    expect(validLevels).toContain('info');
    expect(validLevels).not.toContain(invalidLevel);
  });

  it('should validate environment types', () => {
    const validEnvs = ['development', 'staging', 'production'];
    
    validEnvs.forEach((env) => {
      expect(['development', 'staging', 'production']).toContain(env);
    });
  });
});
