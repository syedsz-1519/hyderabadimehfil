/**
 * Review Validation Schemas
 * 
 * Zod schemas for validating guest review submissions.
 * Mirrors Firestore security rules for client-side validation.
 */

import { z } from 'zod';
import { REVIEW_CONSTRAINTS } from '../services/reviews';

/**
 * Schema for review submission form input
 * Validates before sending to Firestore
 */
export const submitReviewSchema = z.object({
  name: z
    .string()
    .min(REVIEW_CONSTRAINTS.NAME_MIN, `Name must be at least ${REVIEW_CONSTRAINTS.NAME_MIN} characters`)
    .max(REVIEW_CONSTRAINTS.NAME_MAX, `Name must not exceed ${REVIEW_CONSTRAINTS.NAME_MAX} characters`)
    .trim(),

  subtitle: z
    .string()
    .min(REVIEW_CONSTRAINTS.SUBTITLE_MIN, `Location/visit label must be at least ${REVIEW_CONSTRAINTS.SUBTITLE_MIN} characters`)
    .max(REVIEW_CONSTRAINTS.SUBTITLE_MAX, `Location/visit label must not exceed ${REVIEW_CONSTRAINTS.SUBTITLE_MAX} characters`)
    .trim()
    .optional()
    .default(`Verified Diner · Ilford`),

  stars: z
    .number()
    .int('Star rating must be a whole number')
    .min(REVIEW_CONSTRAINTS.STARS_MIN, `Star rating must be at least ${REVIEW_CONSTRAINTS.STARS_MIN}`)
    .max(REVIEW_CONSTRAINTS.STARS_MAX, `Star rating must not exceed ${REVIEW_CONSTRAINTS.STARS_MAX}`),

  quote: z
    .string()
    .min(REVIEW_CONSTRAINTS.QUOTE_MIN, `Review must be at least ${REVIEW_CONSTRAINTS.QUOTE_MIN} characters`)
    .max(REVIEW_CONSTRAINTS.QUOTE_MAX, `Review must not exceed ${REVIEW_CONSTRAINTS.QUOTE_MAX} characters`)
    .trim(),
});

export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;

/**
 * Schema for Firestore review document (read from database)
 * Validates structure of data returned from Firestore
 */
export const firestoreReviewDocSchema = z.object({
  authorUid: z.string(),
  name: z.string(),
  subtitle: z.string(),
  stars: z.number().int(),
  quote: z.string(),
  createdAt: z.object({}).optional(), // Firestore Timestamp - we don't validate the actual type here
});

export type FirestoreReviewDoc = z.infer<typeof firestoreReviewDocSchema>;
