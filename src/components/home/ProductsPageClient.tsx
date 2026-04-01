'use client';

import { type ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { PRODUCTS } from '@/lib/constants';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const ProductScene = dynamic(
  () => import('@/components/3d/scenes/ProductScene').then((m) => ({ default: m.ProductScene })),
  { ssr: false, loading: () => <div className="w-full h-64 bg-space-light rounded-lg" /> }
);

/* ============================================================
   Products Listing Page (Client wrapper for filters)
   ============================================================ */

type FilterTab = 'all' | 'platforms' | 'services' | 'tools';

const FILTER_MAP: Record<FilterTab, string[]> = {
  all: [],
  platforms: ['Platform', 'Education', 'Entertainment'],
  services: ['Services', 'Custom', 'Premium'],
  tools: ['Developer Tools', 'CLI', 'AI'],
};

export function ProductsPageClient(): ReactNode {
  const [filter, setFilter] = useState<FilterTab>('all');

  const filtered = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.tags.some((t) => FILTER_MAP[filter].includes(t)));

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'platforms', label: 'Platforms' },
    { key: 'services', label: 'Services' },
    { key: 'tools', label: 'Tools' },
  ];

  return (
    <Container>
      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === tab.key
                ? 'bg-cyan text-space'
                : 'glass-light text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        key={filter}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((product) => (
          <motion.div key={product.id} variants={fadeInUp}>
            <GlassCard
              hover
              glow
              glowColor={product.accentColor}
              intensity="light"
              className="p-6 h-full flex flex-col"
              as="article"
            >
              {/* 3D */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-5 bg-space-light">
                <ProductScene
                  shape={product.shape}
                  color={product.accentColor}
                  className="absolute inset-0"
                />
              </div>

              <h3 className="text-xl font-semibold text-text-primary mb-1">{product.name}</h3>
              <p className="text-sm text-text-secondary mb-3">{product.tagline}</p>
              <p className="text-sm text-text-muted mb-4 line-clamp-3">{product.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {product.techStack.slice(0, 4).map((tech) => (
                  <Tag key={tech} variant="neutral">{tech}</Tag>
                ))}
              </div>

              <Button href={`/products/${product.slug}`} variant="outline" size="sm" className="mt-auto w-full">
                View Details
              </Button>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
}
