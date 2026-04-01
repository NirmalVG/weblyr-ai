import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Container } from '@/components/layout/Container';
import { ProductsPageClient } from '@/components/home/ProductsPageClient';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore AI-powered products and platforms built by Weblyr AI — from learning platforms to 3D cinematic explorers.',
};

export default function ProductsPage() {
  return (
    <div className="pt-32 pb-20">
      <Container className="text-center mb-12">
        <h1 className="text-[length:var(--text-h1)] leading-[var(--leading-h1)] font-bold text-text-primary mb-4">
          Our Products
        </h1>
        <p className="text-text-secondary max-w-lg mx-auto">
          AI-powered platforms and services that push the boundaries of what&apos;s possible on the web.
        </p>
      </Container>
      <ProductsPageClient />
    </div>
  );
}
