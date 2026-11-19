/**
 * Test Setup File
 * 
 * Configures test environment, matchers, and mocks for Vitest
 */

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Suppress Sentry warnings in tests
vi.mock('@sentry/react', () => ({
  init: vi.fn(),
  setUser: vi.fn(),
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  addBreadcrumb: vi.fn(),
  isInitialized: vi.fn(() => false),
  Replay: class {},
}));

// Suppress Firebase initialization in tests
vi.mock('../lib/firebase', () => ({
  firebaseApp: {},
  db: {},
  auth: {},
  googleProvider: {},
  signInWithGoogleForReview: vi.fn(),
  signOutReviewer: vi.fn(),
  subscribeToAuth: vi.fn(() => () => {}),
}));

// Suppress monitoring in tests
vi.mock('../lib/monitoring', () => ({
  initializeSentry: vi.fn(),
  initializeFirebasePerformance: vi.fn(),
  trackWebVitals: vi.fn(),
  reportMetric: vi.fn(),
  setMonitoringUser: vi.fn(),
  clearMonitoringUser: vi.fn(),
  addBreadcrumb: vi.fn(),
}));
