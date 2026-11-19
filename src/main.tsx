import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Initialize monitoring and environment validation
import { env } from './config/env';
import { initializeSentry, trackWebVitals } from './lib/monitoring';
import { log } from './lib/logger';

// Validate environment at startup
try {
  log.info('Application starting', {
    environment: env.sentryEnvironment,
    isDevelopment: env.isDevelopment,
  });
} catch (error) {
  log.error('Environment validation failed:', error);
  if (import.meta.env.PROD) {
    throw error;
  }
}

// Initialize error tracking
initializeSentry();

// Initialize performance monitoring
trackWebVitals();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
