import type { SiteConfig, NavItem, Product, Testimonial } from '@/types';

/* ── Site Configuration ─────────────────────────────────────── */

export const SITE_CONFIG: SiteConfig = {
  name: 'Weblyr AI',
  tagline: 'Layering Intelligence into Every Web Experience',
  url: 'https://weblyr.ai',
  email: 'hello@weblyr.ai',
  socials: {
    twitter: 'https://twitter.com/weblyr_ai',
    github: 'https://github.com/weblyr-ai',
    linkedin: 'https://linkedin.com/company/weblyr-ai',
  },
};

/* ── Navigation ─────────────────────────────────────────────── */

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

/* ── Products ───────────────────────────────────────────────── */

export const PRODUCTS: Product[] = [
  {
    id: 'synapse-weave',
    slug: 'synapse-weave',
    name: 'SynapseWeave',
    tagline: 'Real-time 3D hand gesture visualization & tracking',
    description:
      'SynapseWeave is a browser-native, real-time 3D hand gesture tracking experience powered by MediaPipe Hands and React Three Fiber. It renders a live 3D skeleton of your hands with glowing synapse connections, ambient particle systems, and a fully interactive sci-fi control panel — all at 60 FPS, directly in the browser.',
    features: [
      {
        icon: 'hand',
        title: 'Real-Time Hand Tracking',
        description:
          'MediaPipe Hands detects and tracks 21 landmarks per hand at up to 30 FPS, with adaptive lerp smoothing to eliminate jitter.',
      },
      {
        icon: 'cube',
        title: '3D Skeleton Rendering',
        description:
          'React Three Fiber renders instanced sphere nodes and bone connections in a live 3D viewport with depth-extrapolated Z-axis.',
      },
      {
        icon: 'zap',
        title: 'SynapseWeb',
        description:
          'An inter-hand connection mesh that appears when both hands are in frame, with three binding protocols: Fingertips, Full Skeleton, and Palms.',
      },
      {
        icon: 'sparkles',
        title: 'Bloom Post-Processing',
        description:
          'EffectComposer with mipmapBlur Bloom gives every node and bone a cinematic glowing synapse aesthetic.',
      },
      {
        icon: 'sliders',
        title: 'Live Control Panel',
        description:
          'A sci-fi HUD with four tabbed panels lets you tune chroma, glow intensity, node scale, smoothing factor, and tracking confidence in real-time.',
      },
      {
        icon: 'smartphone',
        title: 'Mobile Optimized',
        description:
          'Dedicated mobile rendering path with reduced DPR, wake lock support, and iOS Safari-safe WebGL flags for a smooth experience on any device.',
      },
    ],
    techStack: ['Next.js', 'React Three Fiber', 'MediaPipe', 'Three.js', 'Zustand', 'Tailwind CSS'],
    tags: ['3D', 'AI', 'WebGL'],
    accentColor: '#00d4ff',
    accentGlow: 'rgba(0, 212, 255, 0.15)',
    shape: 'sphere',
  },
];

/* ── Testimonials ───────────────────────────────────────────── */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    author: 'Anika Chen',
    role: 'CTO',
    company: 'NovaBridge Technologies',
    quote:
      'Weblyr AI transformed our entire web presence. The 3D product configurator they built drives 40% more engagement than our previous static site. Their attention to performance and accessibility is unmatched — we hit a perfect Lighthouse score on day one.',
    avatar: '/avatars/anika.webp',
  },
  {
    id: 'testimonial-2',
    author: 'Marcus Okonkwo',
    role: 'Head of Product',
    company: 'Stratum Labs',
    quote:
      "Working with Weblyr felt like having a senior engineering team embedded in our company. They didn't just build what we asked for — they challenged our assumptions and delivered something ten times better. The AI-powered search alone increased our user retention by 28%.",
    avatar: '/avatars/marcus.webp',
  },
  {
    id: 'testimonial-3',
    author: 'Elena Vasquez',
    role: 'Founder & CEO',
    company: 'Prism Health',
    quote:
      'We needed a patient portal that was both HIPAA-compliant and genuinely beautiful. Weblyr delivered on both fronts without compromise. The real-time data visualization dashboard they created has become the feature our enterprise clients mention most during demos.',
    avatar: '/avatars/elena.webp',
  },
  {
    id: 'testimonial-4',
    author: 'Raj Patel',
    role: 'VP of Engineering',
    company: 'Quantum Dynamics',
    quote:
      "The codebase Weblyr delivered was the cleanest I've seen from any agency. TypeScript strict mode, comprehensive tests, and documentation that our team could actually maintain. Six months later, our developers still reference their patterns as the gold standard.",
    avatar: '/avatars/raj.webp',
  },
];

/* ── Brand Colors (for programmatic access) ─────────────────── */

export const BRAND_COLORS = {
  space: '#0a0a1a',
  spaceLight: '#16162a',
  spaceMid: '#1e1e35',
  cyan: '#00d4ff',
  cyanDark: '#0099aa',
  terracotta: '#c46b62',
  terracottaLight: '#e8a49e',
  purple: '#8b5cf6',
  purpleDark: '#6d28d9',
  gold: '#f59e0b',
  goldDark: '#d97706',
} as const;

/* ── Interest Options (for contact form) ────────────────────── */

export const INTEREST_OPTIONS = [
  { value: 'custom-website', label: 'Custom Website' },
  { value: 'ai-integration', label: 'AI Integration' },
  { value: 'web-application', label: 'Web Application' },
  { value: 'consultation', label: 'Consultation' },
] as const;

/* ── Budget Ranges (for contact form) ───────────────────────── */

export const BUDGET_RANGES = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-15k', label: '$5,000 – $15,000' },
  { value: '15k-50k', label: '$15,000 – $50,000' },
  { value: 'over-50k', label: '$50,000+' },
] as const;
