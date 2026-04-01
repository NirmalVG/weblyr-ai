'use client';

import { type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery';

/* ============================================================
   CursorGlow — Desktop-only radial gradient following cursor
   ============================================================ */

export function CursorGlow(): ReactNode {
  const isMobile = useIsMobile();
  const shouldReduce = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (isMobile || shouldReduce) return;

    const handleMouseMove = (e: MouseEvent): void => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, shouldReduce, mouseX, mouseY]);

  if (isMobile || shouldReduce) return null;

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
