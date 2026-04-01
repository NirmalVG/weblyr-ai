/* ============================================================
   Weblyr AI — Shared Type Definitions
   All interfaces and types used across the application.
   ============================================================ */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: ProductFeature[];
  techStack: string[];
  tags: string[];
  accentColor: string;
  accentGlow: string;
  shape: ThreeDShape;
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export type ThreeDShape = 'sphere' | 'torusKnot' | 'octahedron' | 'icosahedron';

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  interest: InterestOption;
  message: string;
  budget?: BudgetRange;
  website?: string; // honeypot field
}

export type InterestOption =
  | 'custom-website'
  | 'ai-integration'
  | 'web-application'
  | 'consultation';

export type BudgetRange =
  | 'under-5k'
  | '5k-15k'
  | '15k-50k'
  | 'over-50k';

export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  email: string;
  socials: SocialLinks;
}

export interface SocialLinks {
  twitter: string;
  github: string;
  linkedin: string;
}

export type DevicePerformanceTier = 'high' | 'medium' | 'low';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}

export interface ContactSubmission extends ContactFormData {
  id?: string;
  created_at?: string;
  ip_address?: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribed_at?: string;
  source?: string;
}
