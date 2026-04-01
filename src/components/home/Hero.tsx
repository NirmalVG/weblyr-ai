'use client';

import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Button } from '@/components/ui/Button';
import { staggerContainer, fadeInUp, fadeIn } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useMediaQuery';

const HeroScene = dynamic(
  () => import('@/components/3d/scenes/HeroScene').then((m) => ({ default: m.HeroScene })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-space via-space-light to-space-mid">
        <div className="mesh-gradient absolute inset-0" />
      </div>
    ),
  }
);

/* ============================================================
   Hero — Full viewport hero with 3D background
   ============================================================ */

export function Hero(): ReactNode {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>

      {/* Content Overlay */}
      <Container className="relative z-10 text-center py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light"
          >
            <span className="w-2 h-2 rounded-full bg-cyan animate-[dot-pulse_2s_ease-in-out_infinite]" />
            <span className="text-sm text-text-secondary font-medium">
              Introducing Weblyr AI
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeInUp}>
            <AnimatedText
              text="Layering Intelligence"
              as="h1"
              by="word"
              className="text-[length:var(--text-hero)] leading-[var(--leading-hero)] font-bold text-text-primary block"
            />
            <AnimatedText
              text="into Every Web Experience"
              as="h1"
              by="word"
              delay={0.4}
              className="text-[length:var(--text-hero)] leading-[var(--leading-hero)] font-bold text-gradient-cyan block"
            />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed"
          >
            We build extraordinary AI-powered web experiences with immersive 3D, 
            intelligent interfaces, and obsessive attention to craft.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <Button href="/products" variant="primary" size="lg">
              Explore Products
            </Button>
            <Button href="/contact" variant="ghost" size="lg">
              Contact Us
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          {!shouldReduce && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              variants={fadeIn}
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <svg
                className="w-6 h-6 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
