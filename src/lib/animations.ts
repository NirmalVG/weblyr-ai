import type { Variants, Transition } from 'motion/react';

/* ============================================================
   Weblyr AI — Motion Animation Variants
   All animation presets used by UI components.
   Import from here — never define variants inline.
   ============================================================ */

/* ── Shared Transition Preset ───────────────────────────────── */

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

/* ── Fade In Variants ───────────────────────────────────────── */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: smoothTransition,
  },
};

/* ── Scale Variants ─────────────────────────────────────────── */

export const scaleIn: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: smoothTransition,
  },
};

/* ── Container Variants (Stagger Children) ──────────────────── */

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/* ── Hover Variants ─────────────────────────────────────────── */

export const glassHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const buttonPress: Variants = {
  rest: { scale: 1 },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
};

/* ── Page Transition Variants ───────────────────────────────── */

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

/* ── Draw Variants (for SVG paths) ──────────────────────────── */

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.3 },
    },
  },
};

/* ── Slide Variants (for carousels / overlays) ──────────────── */

export const slideIn: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: '0%',
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

/* ── Viewport Config ────────────────────────────────────────── */

export const viewportConfig = {
  once: true,
  margin: '-100px' as const,
};
