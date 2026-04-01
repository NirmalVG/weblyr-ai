'use client';

import { type ReactNode, useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { Tag } from '@/components/ui/Tag';
import { PRODUCTS } from '@/lib/constants';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const ProductScene = dynamic(
  () => import('@/components/3d/scenes/ProductScene').then((m) => ({ default: m.ProductScene })),
  { ssr: false, loading: () => <div className="w-full h-48 bg-space-light rounded-lg" /> }
);

/* ============================================================
   ProductShowcase — Bento grid of product cards with 3D
   ============================================================ */

export function ProductShowcase(): ReactNode {
  return (
    <SectionWrapper id="products">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-[length:var(--text-h2)] leading-[var(--leading-h2)] font-bold text-text-primary mb-4">
            What We&apos;ve Built
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Products and platforms that showcase the intersection of AI, design, and engineering excellence.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PRODUCTS.map((product) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}

/* ── ProductCard ────────────────────────────────────────────── */

interface ProductCardProps {
  product: (typeof PRODUCTS)[number];
}

function ProductCard({ product }: ProductCardProps): ReactNode {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tagVariant = product.accentColor === '#c46b62'
    ? 'terracotta' as const
    : product.accentColor === '#8b5cf6'
    ? 'purple' as const
    : product.accentColor === '#f59e0b'
    ? 'gold' as const
    : 'cyan' as const;

  return (
    <div ref={cardRef}>
      <GlassCard
        hover
        glow
        glowColor={product.accentColor}
        intensity="light"
        className="p-6 h-full flex flex-col"
        as="article"
      >
        {/* 3D Thumbnail */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-5 bg-space-light">
          {isVisible && (
            <ProductScene
              shape={product.shape}
              color={product.accentColor}
              className="absolute inset-0"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-text-primary mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            {product.tagline}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {product.tags.map((tag) => (
              <Tag key={tag} variant={tagVariant}>{tag}</Tag>
            ))}
          </div>

          {/* Link */}
          <Link
            href={`/products/${product.slug}`}
            className="mt-auto inline-flex items-center gap-1 text-sm font-medium transition-colors duration-300 hover:gap-2"
            style={{ color: product.accentColor }}
          >
            Learn More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
