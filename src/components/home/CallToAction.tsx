'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { fadeInUp } from '@/lib/animations';

/* ============================================================
   CallToAction — Bottom CTA section
   ============================================================ */

export function CallToAction(): ReactNode {
  return (
    <SectionWrapper id="cta" className="relative">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <Container size="md" className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <GlassCard intensity="heavy" className="p-12 md:p-16 text-center">
            <h2 className="text-[length:var(--text-h2)] leading-[var(--leading-h2)] font-bold text-text-primary mb-4">
              Ready to Build Something{' '}
              <span className="text-gradient-cyan">Extraordinary</span>?
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto mb-8">
              Let&apos;s discuss your vision. We&apos;ll explore how AI and immersive 3D can 
              transform your digital presence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="lg">
                Start a Conversation
              </Button>
              <Button href="/products" variant="outline" size="lg">
                View Our Work
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
