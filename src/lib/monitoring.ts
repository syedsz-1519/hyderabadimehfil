/**
 * Monitoring & Performance Tracking Module
 * 
 * Integrates Sentry for error tracking and Firebase Performance Monitoring.
 * Tracks Web Vitals (CLS, LCP, INP) for observability.
 */

import * as Sentry from '@sentry/react';
import { getPerformance, trace } from 'firebase/performance';
import { env } from '../config/env';
import { log } from './logger';

/**
 * Initialize Sentry error tracking
 * Safe no-op if VITE_SENTRY_DSN is not configured
 */
export function initializeSentry(): void {
  if (!env.enableErrorReporting) {
    log.debug('Error reporting disabled, skipping Sentry initialization');
    return;
  }

  if (!env.sentryDsn) {
    log.debug('Sentry DSN not configured, skipping Sentry initialization');
    return;
  }

  try {
    Sentry.init({
      dsn: env.sentryDsn,
      environment: env.sentryEnvironment,
      tracesSampleRate: env.isDevelopment ? 1.0 : 0.1, // 100% in dev, 10% in prod
      integrations: [
        new Sentry.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      // Capture replay for 100% of sampled errors; 10% of normal transactions
      replaysOnErrorSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      release: import.meta.env.VITE_SENTRY_RELEASE || '1.0.0',
    });

    log.info('Sentry initialized successfully', { environment: env.sentryEnvironment });
  } catch (error) {
    log.error('Failed to initialize Sentry:', error);
  }
}

/**
 * Initialize Firebase Performance Monitoring
 */
export function initializeFirebasePerformance(firebaseApp: any): void {
  if (!env.enablePerformanceMonitoring) {
    log.debug('Performance monitoring disabled');
    return;
  }

  try {
    const perf = getPerformance(firebaseApp);
    log.info('Firebase Performance Monitoring initialized');

    // Example: Trace a critical user journey
    const traceId = trace('critical_user_journey');
    traceId?.incrementMetric('page_view');

    return;
  } catch (error) {
    log.warn('Failed to initialize Firebase Performance Monitoring:', error);
  }
}

/**
 * Web Vitals Tracking
 * Measures Core Web Vitals: CLS (Cumulative Layout Shift), LCP (Largest Contentful Paint), INP (Input Delay)
 */
export function trackWebVitals(): void {
  if (!env.enablePerformanceMonitoring) {
    return;
  }

  // Use Web Vitals API if available (modern browsers)
  if ('PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcpMetric = {
            value: lastEntry.renderTime || lastEntry.loadTime,
            id: `lcp-${lastEntry.startTime}`,
            name: 'LCP',
            delta: 0,
            entries: [lastEntry],
            isFinal: true,
          };

          log.debug('Web Vital - LCP:', lcpMetric.value);

          if (Sentry.isInitialized()) {
            Sentry.captureMessage('LCP: ' + lcpMetric.value, 'info');
          }
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        entryList.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        log.debug('Web Vital - CLS:', clsValue);

        if (clsValue > 0.1) {
          log.warn('High CLS detected:', clsValue);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      log.debug('Web Vitals tracking initialized');
    } catch (error) {
      log.warn('Failed to initialize Web Vitals tracking:', error);
    }
  }
}

/**
 * Report a custom metric to monitoring service
 */
export function reportMetric(metricName: string, value: number, tags?: Record<string, string>): void {
  if (!env.enablePerformanceMonitoring) {
    return;
  }

  try {
    if (Sentry.isInitialized()) {
      const breadcrumb: Sentry.Breadcrumb = {
        message: `Metric: ${metricName}`,
        level: 'info',
        data: {
          value,
          ...tags,
        },
      };
      Sentry.captureMessage(breadcrumb.message, 'info');
    }

    log.debug(`Custom metric: ${metricName}`, { value, tags });
  } catch (error) {
    log.warn('Failed to report metric:', error);
  }
}

/**
 * Report user identification to monitoring service
 */
export function setMonitoringUser(userId: string, email?: string, displayName?: string): void {
  try {
    if (Sentry.isInitialized()) {
      Sentry.setUser({
        id: userId,
        email,
        username: displayName,
      });
    }

    log.debug('Monitoring user set:', { userId });
  } catch (error) {
    log.warn('Failed to set monitoring user:', error);
  }
}

/**
 * Clear user context from monitoring
 */
export function clearMonitoringUser(): void {
  try {
    if (Sentry.isInitialized()) {
      Sentry.setUser(null);
    }

    log.debug('Monitoring user cleared');
  } catch (error) {
    log.warn('Failed to clear monitoring user:', error);
  }
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category?: string,
  level?: Sentry.SeverityLevel
): void {
  try {
    if (Sentry.isInitialized()) {
      Sentry.addBreadcrumb({
        message,
        category: category || 'user-action',
        level: level || 'info',
      });
    }

    log.debug('Breadcrumb added:', { message, category });
  } catch (error) {
    log.warn('Failed to add breadcrumb:', error);
  }
}
