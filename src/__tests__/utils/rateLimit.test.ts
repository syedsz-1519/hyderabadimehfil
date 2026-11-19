/**
 * Rate Limiting & Throttling Tests
 * 
 * Tests rate limiter, debounce, and throttle utilities
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  debounce,
  throttle,
  createRateLimiter,
  checkRateLimit,
  rateLimiters,
} from '../../utils/rateLimit';

describe('Rate Limiting Utilities', () => {
  describe('createRateLimiter', () => {
    it('should allow actions within rate limit', () => {
      const limiter = createRateLimiter(1000, 3); // 3 per second

      expect(limiter.isAllowed()).toBe(true);
      expect(limiter.isAllowed()).toBe(true);
      expect(limiter.isAllowed()).toBe(true);
    });

    it('should block actions exceeding rate limit', () => {
      const limiter = createRateLimiter(1000, 2); // 2 per second

      expect(limiter.isAllowed()).toBe(true);
      expect(limiter.isAllowed()).toBe(true);
      expect(limiter.isAllowed()).toBe(false);
    });

    it('should reset after window expires', async () => {
      const limiter = createRateLimiter(100, 1); // 1 per 100ms

      expect(limiter.isAllowed()).toBe(true);
      expect(limiter.isAllowed()).toBe(false);

      // Wait for window to expire
      await new Promise((resolve) => setTimeout(resolve, 150));

      expect(limiter.isAllowed()).toBe(true);
    });

    it('should track remaining attempts', () => {
      const limiter = createRateLimiter(1000, 3);

      limiter.isAllowed();
      expect(limiter.getRemaining()).toBe(2);

      limiter.isAllowed();
      expect(limiter.getRemaining()).toBe(1);

      limiter.isAllowed();
      expect(limiter.getRemaining()).toBe(0);

      expect(limiter.isAllowed()).toBe(false);
    });

    it('should provide retry-after timing', () => {
      const limiter = createRateLimiter(1000, 1);

      limiter.isAllowed();
      expect(limiter.isAllowed()).toBe(false);

      const retryAfter = limiter.getRetryAfter();
      expect(retryAfter).toBeGreaterThan(0);
      expect(retryAfter).toBeLessThanOrEqual(1000);
    });
  });

  describe('debounce', () => {
    it('should delay function execution', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      expect(fn).not.toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(fn).toHaveBeenCalledOnce();
    });

    it('should cancel previous execution if called again', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced();
      debounced();

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(fn).toHaveBeenCalledOnce();
    });
  });

  describe('throttle', () => {
    it('should limit execution frequency', async () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);

      throttled();
      throttled();
      throttled();

      expect(fn).toHaveBeenCalledOnce();

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(fn.mock.calls.length).toBeGreaterThan(1);
    });
  });

  describe('checkRateLimit', () => {
    it('should check form submission rate limit', () => {
      const result = checkRateLimit('formSubmit');

      expect(result).toHaveProperty('isAllowed');
      expect(result).toHaveProperty('remaining');
      expect(result).toHaveProperty('retryAfterMs');
    });

    it('should check review submission rate limit', () => {
      const result = checkRateLimit('reviewSubmit');
      expect(result.isAllowed).toBe(true);
    });
  });

  describe('Pre-configured rate limiters', () => {
    it('should have all required limiters', () => {
      expect(rateLimiters).toHaveProperty('formSubmit');
      expect(rateLimiters).toHaveProperty('reviewSubmit');
      expect(rateLimiters).toHaveProperty('apiCall');
      expect(rateLimiters).toHaveProperty('authAttempt');
    });
  });
});
