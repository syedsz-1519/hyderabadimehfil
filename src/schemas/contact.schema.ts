/**
 * Contact Form Validation Schemas
 * 
 * Zod schemas for validating contact form submissions
 */

import { z } from 'zod';

/**
 * Schema for contact form input
 * Validates before form submission
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Please enter your name (at least 2 characters)')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),

  email: z
    .string()
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),

  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(100, 'Subject must not exceed 100 characters')
    .trim(),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters')
    .trim()
    .optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
