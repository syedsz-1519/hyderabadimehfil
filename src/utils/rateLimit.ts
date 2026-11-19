/**
 * Rate Limiting & Throttling Utilities
 * 
 * Provides client-side rate limiting, debouncing, and throttling
 * to prevent accidental spam and quota exhaustion.
 */

/**
 * Simple rate limiter using sliding window with memory
 */
class RateLimiter {
  private attempts: number[] = [];
  private readonly windowMs: number;
  private readonly maxAttempts: number;

  constructor(windowMs: number = 60000, maxAttempts: number = 5) {
    this.windowMs = windowMs;
    this.maxAttempts = maxAttempts;
  }

  /**
   * Check if action is allowed and update rate limit window
   * @returns true if allowed, false if rate limit exceeded
   */
  isAllowed(): boolean {
    const now = Date.now();
    // Remove attempts older than window
    this.attempts = this.attempts.filter((time) => now - time < this.windowMs);

    if (this.attempts.length < this.maxAttempts) {
      this.attempts.push(now);
      return true;
    }

    return false;
  }

  /**
   * Get remaining attempts in current window
   */
  getRemaining(): number {
    const now = Date.now();
    this.attempts = this.attempts.filter((time) => now - time < this.windowMs);
    return Math.max(0, this.maxAttempts - this.attempts.length);
  }

  /**
   * Get milliseconds until next attempt is allowed
   */
  getRetryAfter(): number {
    if (this.attempts.length === 0) {
      return 0;
    }
    const oldestAttempt = this.attempts[0];
    const retryTime = oldestAttempt + this.windowMs - Date.now();
    return Math.max(0, retryTime);
  }

  /**
   * Reset rate limiter
   */
  reset(): void {
    this.attempts = [];
  }
}

/**
 * Debounce function - delays execution until calls stop
 * @param fn - Function to debounce
 * @param delayMs - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delayMs);
  };
}

/**
 * Throttle function - limits execution frequency
 * @param fn - Function to throttle
 * @param delayMs - Minimum delay between executions in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    const executeNow = timeSinceLastCall >= delayMs;

    if (executeNow) {
      lastCallTime = now;
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      fn(...args);
    } else if (timeoutId === null) {
      const timeUntilNextCall = delayMs - timeSinceLastCall;
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        timeoutId = null;
        fn(...args);
      }, timeUntilNextCall);
    }
  };
}

/**
 * Create a rate limiter instance for operations
 * Usage: const reviewLimiter = createRateLimiter(60000, 3); // 3 attempts per minute
 */
export function createRateLimiter(windowMs: number = 60000, maxAttempts: number = 5): RateLimiter {
  return new RateLimiter(windowMs, maxAttempts);
}

/**
 * Pre-configured rate limiters for common operations
 */
export const rateLimiters = {
  /**
   * Form submissions - 5 per minute
   */
  formSubmit: createRateLimiter(60000, 5),

  /**
   * Review submissions - 3 per minute (stricter)
   */
  reviewSubmit: createRateLimiter(60000, 3),

  /**
   * API calls - 10 per minute
   */
  apiCall: createRateLimiter(60000, 10),

  /**
   * Authentication attempts - 5 per minute
   */
  authAttempt: createRateLimiter(60000, 5),
};

/**
 * Check if action is rate limited
 * @param limiterKey - Key from rateLimiters object
 * @returns Object with isAllowed flag and remaining attempts
 */
export function checkRateLimit(limiterKey: keyof typeof rateLimiters): {
  isAllowed: boolean;
  remaining: number;
  retryAfterMs: number;
} {
  const limiter = rateLimiters[limiterKey];
  const isAllowed = limiter.isAllowed();
  const remaining = limiter.getRemaining();
  const retryAfterMs = isAllowed ? 0 : limiter.getRetryAfter();

  return { isAllowed, remaining, retryAfterMs };
}

/**
 * Async rate limit checker with delay
 * Useful for form submissions where you want to wait before allowing retry
 */
export async function checkRateLimitAsync(
  limiterKey: keyof typeof rateLimiters,
  throwOnLimited: boolean = false
): Promise<{ isAllowed: boolean; remaining: number; retryAfterMs: number }> {
  const check = checkRateLimit(limiterKey);

  if (!check.isAllowed && throwOnLimited) {
    const waitMs = Math.ceil(check.retryAfterMs / 1000);
    throw new Error(
      `Too many requests. Please wait ${waitMs} second${waitMs !== 1 ? 's' : ''} before trying again.`
    );
  }

  return check;
}
