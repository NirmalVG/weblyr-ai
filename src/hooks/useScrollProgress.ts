'use client';

import { useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';

/**
 * Returns the scroll progress (0–1) of the page.
 * Uses Motion's useScroll for optimized tracking.
 */
export function useScrollProgress(): number {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest);
  });

  return progress;
}
