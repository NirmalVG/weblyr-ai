'use client';

import { type ReactNode, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { smoothTransition } from '@/lib/animations';

/* ============================================================
   Contact Success Page
   ============================================================ */

function SuccessContent(): ReactNode {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'there';

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-20">
      <Container size="sm" className="text-center">
        {/* Animated Checkmark */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 rounded-full border-2 border-cyan flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ...smoothTransition, delay: 0.2 }}
        >
          <motion.svg
            className="w-12 h-12 text-cyan"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
          </motion.svg>
        </motion.div>

        <motion.h1
          className="text-[length:var(--text-h1)] leading-[var(--leading-h1)] font-bold text-text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothTransition, delay: 0.8 }}
        >
          Thank you, {name}!
        </motion.h1>

        <motion.p
          className="text-lg text-text-secondary mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothTransition, delay: 1 }}
        >
          We&apos;ve received your message and will get back to you within 24 hours. 
          Check your email for a confirmation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothTransition, delay: 1.2 }}
        >
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}

export default function ContactSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center pt-20">
        <Container size="sm" className="text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full border-2 border-cyan/20" />
        </Container>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
