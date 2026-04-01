'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { staggerContainer, fadeInUp } from '@/lib/animations';

/* ============================================================
   ValueProposition — 3-column feature grid
   ============================================================ */

const VALUES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'AI-Native Architecture',
    description: 'Built from the ground up for the intelligence era. Every component reasons, adapts, and learns from user behavior.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Craftsmanship & Code Quality',
    description: 'Production-grade code with obsessive attention to performance, accessibility, and beauty. Every line is intentional.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Real-Time Intelligence',
    description: 'Dynamic experiences that respond to users, data, and context instantly. No refresh needed — everything is alive.',
  },
];

export function ValueProposition(): ReactNode {
  return (
    <SectionWrapper id="value-proposition">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {VALUES.map((value, i) => (
            <motion.div key={value.title} variants={fadeInUp}>
              <GlassCard hover intensity="light" className="p-8 h-full">
                <div className="text-cyan mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
