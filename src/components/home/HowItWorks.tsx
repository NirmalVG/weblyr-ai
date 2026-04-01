'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { staggerContainer, fadeInUp, drawLine } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useMediaQuery';

/* ============================================================
   HowItWorks — 3-step process with connecting lines
   ============================================================ */

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'We dive deep into your vision, audience, and technical requirements. No assumptions — just understanding.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Architect',
    description: 'We design systems, not just screens. Every decision optimizes for performance, scalability, and delight.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Launch',
    description: 'We ship production-ready code that\'s fast, accessible, and unforgettable. Then we iterate based on real data.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export function HowItWorks(): ReactNode {
  const shouldReduce = useReducedMotion();

  return (
    <SectionWrapper id="how-it-works">
      <Container size="md">
        <div className="text-center mb-16">
          <h2 className="text-[length:var(--text-h2)] leading-[var(--leading-h2)] font-bold text-text-primary mb-4">
            How We Work
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            A proven process that turns bold ideas into extraordinary digital experiences.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5">
            {!shouldReduce ? (
              <motion.svg className="w-full h-full" viewBox="0 0 100 2" preserveAspectRatio="none">
                <motion.line
                  x1="0" y1="1" x2="100" y2="1"
                  stroke="var(--color-cyan)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  variants={drawLine}
                />
              </motion.svg>
            ) : (
              <div className="w-full h-full border-t border-dashed border-cyan/30" />
            )}
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {STEPS.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                {/* Number Circle */}
                <div className="w-24 h-24 rounded-full border-2 border-cyan/30 flex items-center justify-center mb-6 bg-space relative">
                  <div className="text-cyan">{step.icon}</div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-cyan text-space text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
