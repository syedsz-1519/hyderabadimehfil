/**
 * Firebase Error Handler
 * 
 * Centralized error handling for Firebase operations.
 * Maps Firebase error codes to user-friendly messages.
 * Forwards errors to monitoring service when available.
 */

import { FirebaseError } from 'firebase/app';
import { captureException } from '@sentry/react';
import { env } from '../config/env';
import { log } from './logger';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
  READ = 'read',
  AUTH = 'auth',
}

/**
 * User-facing error messages mapped from Firebase error codes
 */
const ERROR_MESSAGE_MAP: Record<string, string> = {
  'permission-denied': 'You don\'t have permission to perform this action. Please sign in with a verified email.',
  'unauthenticated': 'Please sign in to complete this action.',
  'unavailable': 'The service is temporarily unavailable. Please check your connection and try again.',
  'resource-exhausted': 'Too many requests. Please wait a moment and try again.',
  'invalid-argument': 'The data you submitted is invalid. Please check your input and try again.',
  'not-found': 'The resource you\'re looking for no longer exists.',
  'internal': 'An internal error occurred. Our team has been notified.',
  'unknown': 'An unexpected error occurred. Please try again.',
  'network-error': 'Network error. Please check your internet connection.',
  'deadline-exceeded': 'The operation took too long. Please try again.',
};

interface FirestoreErrorContext {
  operationType: OperationType;
  collectionPath?: string;
  docId?: string;
  userId?: string;
  email?: string;
  userAgent?: string;
  timestamp: string;
}

/**
 * Handles Firebase errors with logging and user-friendly messages
 * 
 * @param error - The error to handle
 * @param context - Context information for logging
 * @returns User-friendly error message
 * @throws Never throws - always returns a message string
 */
export function handleFirebaseError(
  error: unknown,
  context: Omit<FirestoreErrorContext, 'timestamp' | 'userAgent'>
): string {
  const now = new Date().toISOString();
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';

  const errorContext: FirestoreErrorContext = {
    ...context,
    timestamp: now,
    userAgent,
  };

  let userMessage: string = ERROR_MESSAGE_MAP.unknown;
  let firebaseErrorCode: string | null = null;
  let originalError: Error | null = null;

  // Determine error type and extract code
  if (error instanceof FirebaseError) {
    firebaseErrorCode = error.code;
    userMessage = ERROR_MESSAGE_MAP[firebaseErrorCode] || ERROR_MESSAGE_MAP.unknown;
    originalError = error;
  } else if (error instanceof Error) {
    originalError = error;
    // Check if error message contains Firebase-like patterns
    if (error.message.includes('network') || error.message.includes('Network')) {
      userMessage = ERROR_MESSAGE_MAP['network-error'];
      firebaseErrorCode = 'network-error';
    } else if (error.message.includes('offline') || error.message.includes('Offline')) {
      userMessage = ERROR_MESSAGE_MAP['network-error'];
      firebaseErrorCode = 'network-error';
    } else {
      userMessage = error.message || ERROR_MESSAGE_MAP.unknown;
    }
  }

  // Log error for monitoring
  const logEntry = {
    type: 'FIREBASE_ERROR',
    code: firebaseErrorCode,
    operation: context.operationType,
    message: userMessage,
    context: errorContext,
    timestamp: now,
  };

  log.error('Firebase operation failed:', logEntry);

  // Send to Sentry if enabled
  if (env.enableErrorReporting && env.sentryDsn) {
    try {
      captureException(originalError || new Error(userMessage), {
        contexts: {
          firebase: {
            operationType: context.operationType,
            code: firebaseErrorCode,
            collection: context.collectionPath,
          },
        },
      });
    } catch (sentryError) {
      log.warn('Failed to report error to Sentry:', sentryError);
    }
  }

  return userMessage;
}

/**
 * Checks if error is a known, recoverable error
 */
export function isRecoverableError(error: unknown): boolean {
  if (!(error instanceof FirebaseError)) {
    return false;
  }

  const recoverableCodes = [
    'network-error',
    'unavailable',
    'deadline-exceeded',
    'resource-exhausted',
  ];

  return recoverableCodes.includes(error.code);
}

/**
 * Checks if error is an authentication-related error
 */
export function isAuthError(error: unknown): boolean {
  if (!(error instanceof FirebaseError)) {
    return false;
  }

  const authCodes = [
    'permission-denied',
    'unauthenticated',
    'auth/user-not-found',
    'auth/invalid-email',
    'auth/wrong-password',
  ];

  return authCodes.includes(error.code);
}
