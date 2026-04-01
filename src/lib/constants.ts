import type {
  SiteConfig,
  NavItem,
  Product,
  Testimonial,
} from '@/types';

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
    id: 'skillsprint',
    slug: 'skillsprint',
    name: 'SkillSprint',
    tagline: 'AI-powered learning that adapts to you',
    description:
      'SkillSprint is a next-generation learning platform that uses artificial intelligence to create personalized curricula, adaptive assessments, and real-time progress tracking. The platform analyzes learning patterns, identifies knowledge gaps, and dynamically adjusts content difficulty to maximize retention and engagement.',
    features: [
      {
        icon: 'brain',
        title: 'Adaptive Learning Engine',
        description:
          'AI algorithms analyze your learning style and pace to create a personalized curriculum that evolves with you.',
      },
      {
        icon: 'chart',
        title: 'Real-Time Analytics',
        description:
          'Track progress with detailed dashboards showing mastery levels, time spent, and predicted outcomes.',
      },
      {
        icon: 'users',
        title: 'Collaborative Spaces',
        description:
          'Join study groups matched by skill level and learning goals for peer-to-peer knowledge exchange.',
      },
      {
        icon: 'zap',
        title: 'Micro-Assessments',
        description:
          'Bite-sized quizzes that reinforce learning without disrupting flow, powered by spaced repetition science.',
      },
      {
        icon: 'globe',
        title: 'Multi-Language Support',
        description:
          'Learn in 40+ languages with AI-powered translation that preserves technical accuracy and nuance.',
      },
      {
        icon: 'shield',
        title: 'Credential Verification',
        description:
          'Blockchain-backed certificates that employers can verify instantly, adding trust to your achievements.',
      },
    ],
    techStack: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    tags: ['AI', 'Education', 'Platform'],
    accentColor: '#00d4ff',
    accentGlow: 'rgba(0, 212, 255, 0.15)',
    shape: 'sphere',
  },
  {
    id: 'marvel-timeline',
    slug: 'marvel-timeline',
    name: 'Marvel Timeline',
    tagline: '3D cinematic universe explorer',
    description:
      'Marvel Timeline is an immersive 3D web experience that lets fans explore the entire Marvel Cinematic Universe through an interactive chronological timeline. Navigate through interconnected story arcs, character journeys, and pivotal moments with stunning WebGL-powered visualizations and real-time data from comprehensive MCU databases.',
    features: [
      {
        icon: 'cube',
        title: '3D Timeline Navigation',
        description:
          'Explore the MCU through a spatial timeline rendered in real-time 3D with Three.js and custom shaders.',
      },
      {
        icon: 'link',
        title: 'Story Arc Connections',
        description:
          'Visualize how storylines interweave across films with dynamic connection graphs and relationship maps.',
      },
      {
        icon: 'film',
        title: 'Rich Media Integration',
        description:
          'Access trailers, behind-the-scenes content, and curated trivia for every entry in the timeline.',
      },
      {
        icon: 'search',
        title: 'Semantic Search',
        description:
          'Find any character, event, or Infinity Stone with AI-powered search that understands natural language.',
      },
      {
        icon: 'layers',
        title: 'Multi-Dimensional Views',
        description:
          'Switch between chronological, release order, and character-focused perspectives instantly.',
      },
      {
        icon: 'share',
        title: 'Social Sharing',
        description:
          'Share your favorite moments and custom timelines with generated OG images and deep links.',
      },
    ],
    techStack: ['Three.js', 'React', 'GSAP', 'Node.js', 'MongoDB', 'WebGL'],
    tags: ['3D', 'Entertainment', 'WebGL'],
    accentColor: '#c46b62',
    accentGlow: 'rgba(196, 107, 98, 0.15)',
    shape: 'torusKnot',
  },
  {
    id: 'sage-ai',
    slug: 'sage-ai',
    name: 'Sage AI',
    tagline: 'Your intelligent coding companion',
    description:
      'Sage AI is an advanced coding assistant that goes beyond autocomplete. It understands your codebase architecture, suggests refactoring patterns, catches potential bugs before they ship, and generates comprehensive documentation. Built for professional developers who demand precision and context-awareness from their AI tools.',
    features: [
      {
        icon: 'code',
        title: 'Context-Aware Suggestions',
        description:
          'Understands your entire codebase architecture to provide suggestions that fit your patterns and conventions.',
      },
      {
        icon: 'bug',
        title: 'Proactive Bug Detection',
        description:
          'Identifies potential runtime errors, memory leaks, and edge cases before they reach production.',
      },
      {
        icon: 'book',
        title: 'Auto-Documentation',
        description:
          'Generates JSDoc, README files, and API documentation that stays in sync with your code changes.',
      },
      {
        icon: 'git',
        title: 'Git Integration',
        description:
          'Smart commit messages, PR descriptions, and code review comments generated from diff analysis.',
      },
      {
        icon: 'terminal',
        title: 'CLI Companion',
        description:
          'Terminal-native interface for quick queries, code generation, and project scaffolding without leaving your flow.',
      },
      {
        icon: 'lock',
        title: 'Privacy-First',
        description:
          'Your code never leaves your machine. All analysis runs locally with on-device models for maximum security.',
      },
    ],
    techStack: ['Python', 'Rust', 'TypeScript', 'LLaMA', 'Tree-sitter', 'LSP'],
    tags: ['AI', 'Developer Tools', 'CLI'],
    accentColor: '#8b5cf6',
    accentGlow: 'rgba(139, 92, 246, 0.15)',
    shape: 'octahedron',
  },
  {
    id: 'weblyr-studio',
    slug: 'weblyr-studio',
    name: 'Weblyr Studio',
    tagline: 'Custom AI-powered web experiences',
    description:
      'Weblyr Studio is our bespoke web development service where we partner with forward-thinking companies to build extraordinary digital experiences. From interactive product showcases to data-driven dashboards, every project is crafted with cutting-edge technology and obsessive attention to detail. We bring the same quality and innovation from our products into every client engagement.',
    features: [
      {
        icon: 'palette',
        title: 'Bespoke Design',
        description:
          'Every pixel is intentional. We create custom design systems that reflect your brand identity and values.',
      },
      {
        icon: 'rocket',
        title: 'Performance Obsessed',
        description:
          'Sub-second load times, perfect Lighthouse scores, and buttery-smooth animations on every device.',
      },
      {
        icon: 'sparkles',
        title: 'AI Integration',
        description:
          'We weave artificial intelligence into your user experience — from smart search to personalized content.',
      },
      {
        icon: 'monitor',
        title: '3D & WebGL',
        description:
          'Immersive 3D experiences that run natively in the browser without plugins or downloads.',
      },
      {
        icon: 'headphones',
        title: 'Ongoing Support',
        description:
          'Dedicated engineering support, performance monitoring, and iterative improvements post-launch.',
      },
      {
        icon: 'award',
        title: 'Award-Worthy Quality',
        description:
          'We build sites that win Awwwards, FWA, and CSS Design Awards — and more importantly, drive results.',
      },
    ],
    techStack: ['Next.js', 'Three.js', 'TypeScript', 'Vercel', 'Supabase', 'Figma'],
    tags: ['Services', 'Custom', 'Premium'],
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.15)',
    shape: 'icosahedron',
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
      'Working with Weblyr felt like having a senior engineering team embedded in our company. They didn\'t just build what we asked for — they challenged our assumptions and delivered something ten times better. The AI-powered search alone increased our user retention by 28%.',
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
      'The codebase Weblyr delivered was the cleanest I\'ve seen from any agency. TypeScript strict mode, comprehensive tests, and documentation that our team could actually maintain. Six months later, our developers still reference their patterns as the gold standard.',
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
