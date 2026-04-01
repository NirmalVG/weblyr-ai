import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env, isSupabaseConfigured } from '@/lib/env';
import type { ContactSubmission, NewsletterSubscriber } from '@/types';

/* ============================================================
   Weblyr AI — Supabase Client
   Graceful degradation: returns null operations when
   Supabase credentials are not configured.
   ============================================================ */

let supabaseClient: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  if (!supabaseClient) {
    supabaseClient = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL!,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return supabaseClient;
}

export { getClient as supabase };

/**
 * Saves a contact form submission to Supabase.
 * Returns the inserted row or null if Supabase is not configured.
 */
export async function saveContactSubmission(
  data: ContactSubmission
): Promise<ContactSubmission | null> {
  const client = getClient();
  if (!client) {
    console.warn('[Weblyr] Supabase not configured — skipping contact submission save');
    return null;
  }

  const { data: result, error } = await client
    .from('contact_submissions')
    .insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      interest: data.interest,
      message: data.message,
      budget: data.budget || null,
      ip_address: data.ip_address || null,
    })
    .select()
    .single();

  if (error) {
    console.error('[Weblyr] Failed to save contact submission:', error.message);
    throw new Error('Failed to save submission');
  }

  return result as ContactSubmission;
}

/**
 * Saves a newsletter subscriber to Supabase.
 * Returns 'subscribed' | 'already-subscribed' | null.
 */
export async function saveNewsletterSubscriber(
  data: NewsletterSubscriber
): Promise<'subscribed' | 'already-subscribed' | null> {
  const client = getClient();
  if (!client) {
    console.warn('[Weblyr] Supabase not configured — skipping newsletter subscription');
    return null;
  }

  // Check if already subscribed
  const { data: existing } = await client
    .from('newsletter_subscribers')
    .select('email')
    .eq('email', data.email)
    .single();

  if (existing) {
    return 'already-subscribed';
  }

  const { error } = await client
    .from('newsletter_subscribers')
    .insert({
      email: data.email,
      subscribed_at: new Date().toISOString(),
      source: data.source || 'website',
    });

  if (error) {
    console.error('[Weblyr] Failed to save newsletter subscriber:', error.message);
    throw new Error('Failed to save subscription');
  }

  return 'subscribed';
}
