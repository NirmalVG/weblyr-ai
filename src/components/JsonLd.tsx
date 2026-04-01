import { type ReactNode } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

/* ============================================================
   JsonLd — Structured data component for SEO
   ============================================================ */

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── Pre-built schema generators ────────────────────────────── */

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.tagline,
    sameAs: [
      SITE_CONFIG.socials.twitter,
      SITE_CONFIG.socials.github,
      SITE_CONFIG.socials.linkedin,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.email,
      contactType: 'customer service',
    },
  };
}

export function productSchema(product: {
  name: string;
  description: string;
  url: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: product.url,
    brand: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
  };
}

export function blogPostSchema(post: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  author: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url,
    datePublished: post.datePublished,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}
