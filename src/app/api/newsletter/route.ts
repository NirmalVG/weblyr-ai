import { NextResponse } from 'next/server';
import { NewsletterSchema } from '@/lib/validations';
import { saveNewsletterSubscriber } from '@/lib/supabase';

/* ============================================================
   POST /api/newsletter — Newsletter subscription handler
   ============================================================ */

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();

    // Validate
    const result = NewsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Save to Supabase
    try {
      const status = await saveNewsletterSubscriber({
        email,
        source: 'website-footer',
      });

      if (status === 'already-subscribed') {
        return NextResponse.json({
          success: true,
          message: 'You\'re already subscribed!',
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Welcome aboard! You\'re now subscribed.',
      });
    } catch {
      return NextResponse.json(
        { success: false, error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[API /newsletter]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
