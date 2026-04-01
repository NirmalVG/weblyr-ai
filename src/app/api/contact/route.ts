import { NextResponse } from 'next/server';
import { ContactFormSchema } from '@/lib/validations';
import { saveContactSubmission } from '@/lib/supabase';
import { env, isResendConfigured } from '@/lib/env';

/* ============================================================
   POST /api/contact — Contact form submission handler
   ============================================================ */

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();

    // 1. Validate
    const result = ContactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // 2. Honeypot — silent reject
    if (data.website) {
      return NextResponse.json({ success: true, message: 'Message sent!' });
    }

    // 3. Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // 4. Send email via Resend
    if (isResendConfigured()) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(env.RESEND_API_KEY);

        // Email to team
        await resend.emails.send({
          from: 'Weblyr AI <onboarding@resend.dev>',
          to: ['hello@weblyr.ai'],
          subject: `New inquiry from ${data.name} — ${data.interest}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
            <p><strong>Interest:</strong> ${data.interest}</p>
            <p><strong>Budget:</strong> ${data.budget || 'N/A'}</p>
            <h3>Message:</h3>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          `,
        });

        // Auto-reply to user
        await resend.emails.send({
          from: 'Weblyr AI <onboarding@resend.dev>',
          to: [data.email],
          subject: 'We received your message — Weblyr AI',
          html: `
            <h2>Thank you, ${data.name}!</h2>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <p>In the meantime, feel free to explore our <a href="https://weblyr.ai/products">products</a> or <a href="https://weblyr.ai/blog">blog</a>.</p>
            <p>Best,<br>The Weblyr AI Team</p>
          `,
        });
      } catch (emailError) {
        console.error('[API /contact] Email send failed:', emailError);
        // Don't fail the request — just log it
      }
    }

    // 5. Save to Supabase
    try {
      await saveContactSubmission({
        name: data.name,
        email: data.email,
        company: data.company,
        interest: data.interest,
        message: data.message,
        budget: data.budget as 'under-5k' | '5k-15k' | '15k-50k' | 'over-50k' | undefined,
        ip_address: ip,
      });
    } catch (dbError) {
      console.error('[API /contact] DB save failed:', dbError);
      // Don't fail the request — email was already sent
    }

    // 6. Return success
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
    });
  } catch (error) {
    console.error('[API /contact]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
