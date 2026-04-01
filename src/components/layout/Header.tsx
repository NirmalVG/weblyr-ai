'use client';

import { type ReactNode, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { fadeInDown, staggerContainerFast } from '@/lib/animations';
import { useUIStore } from '@/stores/uiStore';
import { Button } from '@/components/ui/Button';

/* ============================================================
   Header — Fixed glassmorphism navigation bar
   ============================================================ */

export function Header(): ReactNode {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { isNavOpen, setNavOpen, isScrolled, setScrolled } = useUIStore();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  // Close nav on route change
  useEffect(() => {
    setNavOpen(false);
  }, [pathname, setNavOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isNavOpen) {
        setNavOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isNavOpen, setNavOpen]);

  // Lock body scroll when nav is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'py-3 shadow-lg shadow-black/20 backdrop-blur-lg' : 'bg-transparent py-5',
        )}
        style={isScrolled ? { background: 'var(--color-surface-glass-md)' } : undefined}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-[var(--container-lg)] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group" aria-label="Weblyr AI Home">
            <span className="text-xl font-bold text-text-primary tracking-tight">WEBLYR</span>
            <span className="text-xl font-bold text-cyan">AI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-300',
                  pathname === item.href
                    ? 'text-cyan'
                    : 'text-text-secondary hover:text-text-primary',
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan rounded-full"
                    layoutId="nav-indicator"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/contact" variant="primary" size="sm">
              Get in Touch
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setNavOpen(!isNavOpen)}
            aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isNavOpen}
          >
            <motion.span
              className="block w-6 h-0.5 bg-text-primary origin-center"
              animate={isNavOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-text-primary"
              animate={isNavOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-text-primary origin-center"
              animate={isNavOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-space/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="flex flex-col items-center gap-8"
              variants={staggerContainerFast}
              initial="hidden"
              animate="visible"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item) => (
                <motion.div key={item.href} variants={fadeInDown}>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-2xl font-medium transition-colors',
                      pathname === item.href
                        ? 'text-cyan'
                        : 'text-text-secondary hover:text-text-primary',
                    )}
                    onClick={() => setNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeInDown}>
                <Button href="/contact" variant="primary" size="lg">
                  Get in Touch
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
