/**
 * Firebase Initialization Module
 * 
 * Initializes Firebase with environment variables.
 * Provides centralized auth and database access.
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDocFromServer, getFirestore } from 'firebase/firestore';
import { env } from '../config/env';
import { log } from './logger';

/**
 * Initialize Firebase app with environment config
 */
const firebaseConfig = {
  apiKey: env.firebaseApiKey,
  authDomain: env.firebaseAuthDomain,
  projectId: env.firebaseProjectId,
  storageBucket: env.firebaseStorageBucket,
  messagingSenderId: env.firebaseMessagingSenderId,
  appId: env.firebaseAppId,
};

let firebaseApp: any;
let db: any;
let auth: any;

try {
  firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp, env.firebaseFirestoreDbId);
  auth = getAuth(firebaseApp);

  log.debug('Firebase initialized successfully', {
    projectId: env.firebaseProjectId,
  });
} catch (error) {
  log.error('Failed to initialize Firebase:', error);
  throw error;
}

export { firebaseApp, db, auth };

export const googleProvider = new GoogleAuthProvider();

/**
 * Test Firebase connectivity on app start
 */
async function testFirebaseConnection() {
  try {
    // Try to read a non-existent document (checking connectivity, not data)
    await getDocFromServer(doc(db, '__connectivity__', 'test'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('offline')) {
      log.warn('Firebase may be offline - check your connection');
    } else {
      log.debug('Firebase connectivity check completed');
    }
  }
}

// Run connectivity test in background (non-blocking)
void testFirebaseConnection();

/**
 * Google Sign-In for reviews
 */
export async function signInWithGoogleForReview(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    log.info('User signed in with Google');
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user') {
      log.debug('User closed Google sign-in popup');
      throw new Error('popup-closed-by-user');
    }
    log.error('Google sign-in failed:', error.code);
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function signOutReviewer(): Promise<void> {
  try {
    await signOut(auth);
    log.info('User signed out');
  } catch (error) {
    log.error('Sign out failed:', error);
    throw error;
  }
}

/**
 * Subscribe to auth state changes
 */
export function subscribeToAuth(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}
