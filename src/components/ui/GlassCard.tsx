'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { glassHover } from '@/lib/animations';

/* ============================================================
   GlassCard — Frosted glass panel with optional hover + glow
   ============================================================ */

type GlassIntensity = 'light' | 'medium' | 'heavy';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  intensity?: GlassIntensity;
  hover?: boolean;
  glow?: boolean;
  glowColor?: string;
  as?: 'div' | 'article' | 'section';
}

const intensityMap: Record<GlassIntensity, string> = {
  light: 'glass-light',
  medium: 'glass-medium',
  heavy: 'glass-heavy',
};

export function GlassCard({
  children,
  className,
  intensity = 'medium',
  hover = false,
  glow = false,
  glowColor = 'var(--color-cyan)',
  as = 'div',
}: GlassCardProps): ReactNode {
  const Component = motion.create(as);

  return (
    <Component
      className={cn(
        'rounded-[var(--radius-card)]',
        intensityMap[intensity],
        className
      )}
      variants={hover ? glassHover : undefined}
      initial={hover ? 'rest' : undefined}
      whileHover={hover ? 'hover' : undefined}
      style={
        glow
          ? ({
              '--glow-color': glowColor,
            } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Component>
  );
}
