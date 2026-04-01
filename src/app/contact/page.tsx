import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { ContactForm } from '@/components/forms/ContactForm';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Weblyr AI. Let\'s discuss your next web project — from AI integration to immersive 3D experiences.',
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-[length:var(--text-h1)] leading-[var(--leading-h1)] font-bold text-text-primary mb-4">
            Get in Touch
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Have a project in mind? We&apos;d love to hear about it. Fill out the form and we&apos;ll get back within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Form (3/5) */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact Info (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard intensity="light" className="p-6">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                Email
              </h3>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-cyan hover:text-cyan-dark transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
            </GlassCard>

            <GlassCard intensity="light" className="p-6">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                Location
              </h3>
              <p className="text-text-secondary">Kerala, India 🇮🇳</p>
              <p className="text-xs text-text-muted mt-1">Available globally, remote-first</p>
            </GlassCard>

            <GlassCard intensity="light" className="p-6">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                Connect
              </h3>
              <div className="space-y-2">
                <a
                  href={SITE_CONFIG.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-text-secondary hover:text-cyan transition-colors"
                >
                  Twitter / X →
                </a>
                <a
                  href={SITE_CONFIG.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-text-secondary hover:text-cyan transition-colors"
                >
                  GitHub →
                </a>
                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-text-secondary hover:text-cyan transition-colors"
                >
                  LinkedIn →
                </a>
              </div>
            </GlassCard>

            <GlassCard intensity="light" className="p-6">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
                Response Time
              </h3>
              <p className="text-text-secondary text-sm">
                We typically respond within 24 hours on business days. For urgent inquiries, reach out via Twitter DM.
              </p>
            </GlassCard>
          </div>
        </div>
      </Container>
    </div>
  );
}
