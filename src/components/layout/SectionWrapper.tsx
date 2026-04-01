'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { fadeInUp, viewportConfig } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useMediaQuery';

/* ============================================================
   SectionWrapper — Scroll-triggered animated section
   ============================================================ */

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export function SectionWrapper({
  children,
  id,
  className,
  delay = 0,
}: SectionWrapperProps): ReactNode {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return (
      <section id={id} className={cn('py-20 md:py-28', className)}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn('py-20 md:py-28', className)}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
}
