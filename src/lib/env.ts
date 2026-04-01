import { z } from 'zod';

/**
 * Environment variable schema and validation.
 * Supabase + Resend are optional for graceful degradation
 * during development without credentials.
 */

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://weblyr.ai'),
});

type Env = z.infer<typeof envSchema>;

function getEnv(): Env {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });

  if (!parsed.success) {
    const formatted = parsed.error.flatten().fieldErrors;
    const messages = Object.entries(formatted)
      .map(([key, errors]) => `  ${key}: ${(errors ?? []).join(', ')}`)
      .join('\n');

    console.warn(
      `⚠️  [Weblyr] Some environment variables are invalid:\n${messages}\n` +
      `   See .env.local.example for required variables.\n` +
      `   Running in degraded mode — some features may be unavailable.`
    );

    // Return defaults for graceful degradation
    return {
      NEXT_PUBLIC_SUPABASE_URL: undefined,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: undefined,
      RESEND_API_KEY: undefined,
      NEXT_PUBLIC_SITE_URL: 'https://weblyr.ai',
    };
  }

  return parsed.data;
}

export const env = getEnv();

/**
 * Check if Supabase is configured and available.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

/**
 * Check if Resend email is configured and available.
 */
export function isResendConfigured(): boolean {
  return Boolean(env.RESEND_API_KEY);
}
