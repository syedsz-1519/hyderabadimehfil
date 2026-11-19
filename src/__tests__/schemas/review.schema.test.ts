/**
 * Review Validation Schema Tests
 * 
 * Tests Zod schema validation for review submissions
 */

import { describe, it, expect } from 'vitest';
import { submitReviewSchema } from '../../schemas/review.schema';
import { REVIEW_CONSTRAINTS } from '../../services/reviews';

describe('Review Validation Schema', () => {
  describe('submitReviewSchema', () => {
    it('should validate correct review input', () => {
      const validInput = {
        name: 'John Doe',
        subtitle: 'Verified Diner · Ilford',
        stars: 5,
        quote: 'This was an amazing dining experience!',
      };

      const result = submitReviewSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject name below minimum length', () => {
      const invalidInput = {
        name: 'J', // Only 1 character
        subtitle: 'Verified Diner',
        stars: 5,
        quote: 'This was an amazing dining experience!',
      };

      const result = submitReviewSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject name exceeding maximum length', () => {
      const invalidInput = {
        name: 'a'.repeat(REVIEW_CONSTRAINTS.NAME_MAX + 1),
        subtitle: 'Verified Diner',
        stars: 5,
        quote: 'This was an amazing dining experience!',
      };

      const result = submitReviewSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject quote below minimum length', () => {
      const invalidInput = {
        name: 'John Doe',
        subtitle: 'Verified Diner',
        stars: 5,
        quote: 'Too short', // 9 characters, min is 10
      };

      const result = submitReviewSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should reject stars outside valid range', () => {
      const invalidLow = {
        name: 'John Doe',
        subtitle: 'Verified Diner',
        stars: 0, // Below minimum
        quote: 'This was an amazing dining experience!',
      };

      const invalidHigh = {
        name: 'John Doe',
        subtitle: 'Verified Diner',
        stars: 6, // Above maximum
        quote: 'This was an amazing dining experience!',
      };

      expect(submitReviewSchema.safeParse(invalidLow).success).toBe(false);
      expect(submitReviewSchema.safeParse(invalidHigh).success).toBe(false);
    });

    it('should reject non-integer stars', () => {
      const invalidInput = {
        name: 'John Doe',
        subtitle: 'Verified Diner',
        stars: 4.5, // Float, not integer
        quote: 'This was an amazing dining experience!',
      };

      const result = submitReviewSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it('should provide default subtitle if not provided', () => {
      const inputWithoutSubtitle = {
        name: 'John Doe',
        stars: 5,
        quote: 'This was an amazing dining experience!',
      };

      const result = submitReviewSchema.safeParse(inputWithoutSubtitle);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.subtitle).toBe('Verified Diner · Ilford');
      }
    });

    it('should trim whitespace from input', () => {
      const inputWithWhitespace = {
        name: '  John Doe  ',
        subtitle: '  Verified Diner  ',
        stars: 5,
        quote: '  Amazing experience!  ',
      };

      const result = submitReviewSchema.safeParse(inputWithWhitespace);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John Doe');
      }
    });

    it('should enforce all field constraints simultaneously', () => {
      const validInput = {
        name: 'Jo', // Minimum length
        subtitle: 'Ve', // Minimum length
        stars: 1, // Minimum stars
        quote: '0123456789', // Exactly 10 chars (minimum)
      };

      const result = submitReviewSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });
  });
});
