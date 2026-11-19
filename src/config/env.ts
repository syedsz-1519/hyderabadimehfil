/**
 * Environment Variable Validation Module
 * 
 * Validates and exports all VITE_* environment variables at startup.
 * Throws descriptive errors immediately if any required variable is missing or malformed.
 * 
 * Usage: import { env } from '@/config/env';
 */

// Using native Zod-like validation with descriptive error messages
// (Zod will be installed as dependency, but we'll validate manually for safety)

interface EnvironmentConfig {
  // Firebase Configuration
  firebaseApiKey: string;
  firebaseAuthDomain: string;
  firebaseProjectId: string;
  firebaseStorageBucket: string;
  firebaseMessagingSenderId: string;
  firebaseAppId: string;
  firebaseFirestoreDbId: string;
  firebaseOAuthClientId: string;

  // Monitoring & Error Tracking
  sentryDsn: string | null;
  sentryEnvironment: 'development' | 'staging' | 'production';

  // Feature Flags
  enablePerformanceMonitoring: boolean;
  enableErrorReporting: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';

  // Derived/Computed Values
  isDevelopment: boolean;
  isProduction: boolean;
  isStaging: boolean;
}

/**
 * Validates required environment variables and returns config object.
 * Throws Error with clear messages if validation fails.
 */
function validateEnv(): EnvironmentConfig {
  const errors: string[] = [];

  // Firebase Configuration - All Required
  const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  if (!firebaseApiKey?.trim()) {
    errors.push('VITE_FIREBASE_API_KEY: Firebase API Key is required (get from Firebase Console)');
  }

  const firebaseAuthDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  if (!firebaseAuthDomain?.trim()) {
    errors.push('VITE_FIREBASE_AUTH_DOMAIN: Firebase Auth Domain is required (format: your-project.firebaseapp.com)');
  }

  const firebaseProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  if (!firebaseProjectId?.trim()) {
    errors.push('VITE_FIREBASE_PROJECT_ID: Firebase Project ID is required (get from Firebase Console)');
  }

  const firebaseStorageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
  if (!firebaseStorageBucket?.trim()) {
    errors.push('VITE_FIREBASE_STORAGE_BUCKET: Firebase Storage Bucket is required');
  }

  const firebaseMessagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
  if (!firebaseMessagingSenderId?.trim()) {
    errors.push('VITE_FIREBASE_MESSAGING_SENDER_ID: Firebase Messaging Sender ID is required');
  }

  const firebaseAppId = import.meta.env.VITE_FIREBASE_APP_ID;
  if (!firebaseAppId?.trim()) {
    errors.push('VITE_FIREBASE_APP_ID: Firebase App ID is required (format: 1:000000000:web:xxxxxxxxxxxxxxx)');
  }

  const firebaseFirestoreDbId = import.meta.env.VITE_FIREBASE_FIRESTORE_DB_ID;
  if (!firebaseFirestoreDbId?.trim()) {
    errors.push('VITE_FIREBASE_FIRESTORE_DB_ID: Firebase Firestore Database ID is required');
  }

  const firebaseOAuthClientId = import.meta.env.VITE_FIREBASE_OAUTH_CLIENT_ID;
  if (!firebaseOAuthClientId?.trim()) {
    errors.push('VITE_FIREBASE_OAUTH_CLIENT_ID: Firebase OAuth Client ID is required (for Google Sign-In)');
  }

  // Optional: Sentry Configuration
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN || null;
  if (sentryDsn && !sentryDsn.startsWith('https://')) {
    errors.push('VITE_SENTRY_DSN: Sentry DSN must be HTTPS URL if provided');
  }

  const sentryEnvRaw = import.meta.env.VITE_SENTRY_ENVIRONMENT || 'development';
  const validSentryEnvs = ['development', 'staging', 'production'];
  if (!validSentryEnvs.includes(sentryEnvRaw)) {
    errors.push(`VITE_SENTRY_ENVIRONMENT: Must be one of ${validSentryEnvs.join(', ')}, got "${sentryEnvRaw}"`);
  }
  const sentryEnvironment = sentryEnvRaw as 'development' | 'staging' | 'production';

  // Feature Flags
  const enablePerfMonRaw = import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING ?? 'true';
  const enablePerformanceMonitoring = enablePerfMonRaw === 'true' || enablePerfMonRaw === true;

  const enableErrReportRaw = import.meta.env.VITE_ENABLE_ERROR_REPORTING ?? 'true';
  const enableErrorReporting = enableErrReportRaw === 'true' || enableErrReportRaw === true;

  const logLevelRaw = import.meta.env.VITE_LOG_LEVEL || 'info';
  const validLogLevels = ['debug', 'info', 'warn', 'error'];
  if (!validLogLevels.includes(logLevelRaw)) {
    errors.push(`VITE_LOG_LEVEL: Must be one of ${validLogLevels.join(', ')}, got "${logLevelRaw}"`);
  }
  const logLevel = logLevelRaw as 'debug' | 'info' | 'warn' | 'error';

  // Environment Detection
  const isDevelopment = import.meta.env.DEV || sentryEnvironment === 'development';
  const isProduction = import.meta.env.PROD || sentryEnvironment === 'production';
  const isStaging = sentryEnvironment === 'staging';

  // Report all validation errors at once
  if (errors.length > 0) {
    const errorMessage = [
      '❌ Environment Configuration Validation Failed:',
      ...errors.map((e) => `  • ${e}`),
      '',
      'Fix these issues:',
      '  1. Copy .env.example to .env.local (or .env.development.local)',
      '  2. Replace placeholder values with real Firebase credentials',
      '  3. Get credentials from https://console.firebase.google.com',
    ].join('\n');

    throw new Error(errorMessage);
  }

  return {
    firebaseApiKey,
    firebaseAuthDomain,
    firebaseProjectId,
    firebaseStorageBucket,
    firebaseMessagingSenderId,
    firebaseAppId,
    firebaseFirestoreDbId,
    firebaseOAuthClientId,
    sentryDsn,
    sentryEnvironment,
    enablePerformanceMonitoring,
    enableErrorReporting,
    logLevel,
    isDevelopment,
    isProduction,
    isStaging,
  };
}

/**
 * Singleton instance - validates once at module load
 */
let envInstance: EnvironmentConfig | null = null;
let envError: Error | null = null;

try {
  envInstance = validateEnv();
  if (import.meta.env.DEV) {
    console.log('✅ Environment configuration validated successfully');
  }
} catch (error) {
  envError = error instanceof Error ? error : new Error(String(error));
  console.error(envError.message);
  if (import.meta.env.PROD) {
    // In production, we must exit/halt
    throw envError;
  }
}

/**
 * Export validated environment config
 * Throws if validation failed
 */
export function getEnv(): EnvironmentConfig {
  if (envError) {
    throw envError;
  }
  if (!envInstance) {
    throw new Error('Environment configuration not initialized');
  }
  return envInstance;
}

/**
 * Type-safe convenience export
 */
export const env = envInstance || ({} as EnvironmentConfig);

// Validate at build-time (catches issues in development immediately)
if (!envInstance && import.meta.env.PROD) {
  throw new Error('Environment validation failed - cannot start application');
}
