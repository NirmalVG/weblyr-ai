'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { smoothTransition } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useMediaQuery';

/* ============================================================
   AnimatedText — Character or word-by-word text reveal
   ============================================================ */

interface AnimatedTextProps {
  text: string;
  by?: 'char' | 'word';
  delay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function AnimatedText({
  text,
  by = 'word',
  delay = 0,
  className,
  as: Tag = 'span',
}: AnimatedTextProps): ReactNode {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const units = by === 'char' ? text.split('') : text.split(' ');

  return (
    <Tag className={cn('inline-block', className)} aria-label={text}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: by === 'char' ? 0.03 : 0.08,
              delayChildren: delay,
            },
          },
        }}
        className="inline"
        aria-hidden="true"
      >
        {units.map((unit, i) => (
          <motion.span
            key={`${unit}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: smoothTransition,
              },
            }}
            className="inline-block"
          >
            {unit}
            {by === 'word' && i < units.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
