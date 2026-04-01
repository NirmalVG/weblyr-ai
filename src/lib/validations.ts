import { z } from 'zod';

/* ============================================================
   Weblyr AI — Zod Validation Schemas
   All form and API validation schemas.
   ============================================================ */

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be under 50 characters' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  company: z
    .string()
    .max(100, { message: 'Company name must be under 100 characters' })
    .optional()
    .or(z.literal('')),
  interest: z.enum(['custom-website', 'ai-integration', 'web-application', 'consultation'], {
    errorMap: () => ({ message: 'Please select an area of interest' }),
  }),
  message: z
    .string()
    .min(50, { message: 'Message must be at least 50 characters' })
    .max(2000, { message: 'Message must be under 2000 characters' })
    .transform((val) => val.trim()),
  budget: z
    .enum(['under-5k', '5k-15k', '15k-50k', 'over-50k'])
    .optional()
    .or(z.literal('')),
  website: z.string().optional(), // honeypot — should always be empty
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;

export const NewsletterSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
});

export type NewsletterFormValues = z.infer<typeof NewsletterSchema>;
