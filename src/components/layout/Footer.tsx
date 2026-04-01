'use client';

import { type ReactNode, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

/* ============================================================
   Footer — Site footer with nav, socials, newsletter
   ============================================================ */

export function Footer(): ReactNode {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletter = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-space-light border-t border-border-glass py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1: Logo + Tagline + Socials */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-xl font-bold text-text-primary">WEBLYR</span>
              <span className="text-xl font-bold text-cyan">AI</span>
            </Link>
            <p className="text-text-secondary text-sm max-w-xs leading-relaxed">
              {SITE_CONFIG.tagline}
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon href={SITE_CONFIG.socials.twitter} label="Twitter / X">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </SocialIcon>
              <SocialIcon href={SITE_CONFIG.socials.github} label="GitHub">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </SocialIcon>
              <SocialIcon href={SITE_CONFIG.socials.linkedin} label="LinkedIn">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </SocialIcon>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-cyan transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Get the latest on AI, web development, and what we&apos;re building.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className={cn(
                  'flex-1 px-4 py-2.5 rounded-[var(--radius-btn)] text-sm',
                  'bg-space border border-border-glass-md text-text-primary',
                  'placeholder:text-text-muted',
                  'focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20',
                  'transition-all duration-300'
                )}
                aria-label="Email address for newsletter"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                loading={status === 'loading'}
                disabled={status === 'loading'}
              >
                Join
              </Button>
            </form>
            {status === 'success' && (
              <p className="text-text-success text-xs mt-2">Welcome aboard! 🎉</p>
            )}
            {status === 'error' && (
              <p className="text-text-error text-xs mt-2">Something went wrong. Try again.</p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-glass flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} Weblyr AI. All rights reserved.</p>
          <p>Built with Three.js &amp; Next.js</p>
        </div>
      </Container>
    </footer>
  );
}

/* ── Social Icon Helper ─────────────────────────────────────── */

interface SocialIconProps {
  href: string;
  label: string;
  children: ReactNode;
}

function SocialIcon({ href, label, children }: SocialIconProps): ReactNode {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-text-muted hover:text-cyan transition-colors duration-300"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        {children}
      </svg>
    </motion.a>
  );
}
