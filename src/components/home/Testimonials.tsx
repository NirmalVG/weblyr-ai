'use client';

import { type ReactNode, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { TESTIMONIALS } from '@/lib/constants';
import { fadeIn } from '@/lib/animations';

/* ============================================================
   Testimonials — Auto-advancing carousel
   ============================================================ */

export function Testimonials(): ReactNode {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  const testimonial = TESTIMONIALS[current];

  return (
    <SectionWrapper id="testimonials">
      <Container size="md">
        <div className="text-center mb-12">
          <h2 className="text-[length:var(--text-h2)] leading-[var(--leading-h2)] font-bold text-text-primary mb-4">
            What Our Clients Say
          </h2>
        </div>

        <div
          role="region"
          aria-label="Testimonials"
          aria-roledescription="carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.id}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute inset-0"
              >
                <GlassCard
                  intensity="light"
                  className="p-8 md:p-12 text-center h-full flex flex-col items-center justify-center"
                >
                  <blockquote>
                    <p className="text-lg md:text-xl text-text-primary font-serif italic leading-relaxed mb-8 max-w-2xl">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{testimonial.author}</p>
                    <p className="text-xs text-text-muted mt-1">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Prev */}
            <button
              onClick={prev}
              className="p-2 text-text-muted hover:text-cyan transition-colors"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-cyan w-6' : 'bg-text-muted/30 hover:bg-text-muted'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              className="p-2 text-text-muted hover:text-cyan transition-colors"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
