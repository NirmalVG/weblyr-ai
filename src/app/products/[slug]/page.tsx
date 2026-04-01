import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { JsonLd, productSchema } from '@/components/JsonLd';
import { PRODUCTS, SITE_CONFIG } from '@/lib/constants';

const ProductScene = dynamic(
  () => import('@/components/3d/scenes/ProductScene').then((m) => ({ default: m.ProductScene })),
  { ssr: false, loading: () => <div className="w-full h-full bg-space-light rounded-lg" /> }
);

/* ── Static Params ──────────────────────────────────────────── */

export function generateStaticParams(): { slug: string }[] {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

/* ── Dynamic Metadata ───────────────────────────────────────── */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: `${product.name} — ${SITE_CONFIG.name}`,
      description: product.tagline,
    },
  };
}

/* ── Page Component ─────────────────────────────────────────── */

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const tagVariant = product.accentColor === '#c46b62'
    ? 'terracotta' as const
    : product.accentColor === '#8b5cf6'
    ? 'purple' as const
    : product.accentColor === '#f59e0b'
    ? 'gold' as const
    : 'cyan' as const;

  return (
    <>
      <JsonLd
        data={productSchema({
          name: product.name,
          description: product.description,
          url: `${SITE_CONFIG.url}/products/${product.slug}`,
        })}
      />

      <div className="pt-32 pb-20">
        {/* Hero: Split Layout */}
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-20">
            {/* Content (3/5) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Tag key={tag} variant={tagVariant}>{tag}</Tag>
                ))}
              </div>

              <h1 className="text-[length:var(--text-h1)] leading-[var(--leading-h1)] font-bold text-text-primary">
                {product.name}
              </h1>

              <p className="text-lg text-text-secondary leading-relaxed">
                {product.tagline}
              </p>

              <p className="text-text-muted leading-relaxed">
                {product.description}
              </p>

              <Button href="/contact" variant="primary" size="lg">
                Request a Demo
              </Button>
            </div>

            {/* 3D Scene (2/5) */}
            <div className="lg:col-span-2 relative h-80 lg:h-[400px] rounded-2xl overflow-hidden bg-space-light">
              <ProductScene
                shape={product.shape}
                color={product.accentColor}
                className="absolute inset-0"
              />
            </div>
          </div>
        </Container>

        {/* Features Grid */}
        <SectionWrapper>
          <Container>
            <h2 className="text-[length:var(--text-h2)] leading-[var(--leading-h2)] font-bold text-text-primary mb-12 text-center">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature) => (
                <GlassCard key={feature.title} intensity="light" className="p-6">
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </Container>
        </SectionWrapper>

        {/* Tech Stack */}
        <SectionWrapper>
          <Container size="md" className="text-center">
            <h2 className="text-[length:var(--text-h2)] leading-[var(--leading-h2)] font-bold text-text-primary mb-8">
              Built With
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {product.techStack.map((tech) => (
                <Tag key={tech} variant="neutral">{tech}</Tag>
              ))}
            </div>
          </Container>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper>
          <Container size="sm" className="text-center">
            <GlassCard intensity="heavy" className="p-12">
              <h2 className="text-[length:var(--text-h2)] leading-[var(--leading-h2)] font-bold text-text-primary mb-4">
                Interested in {product.name}?
              </h2>
              <p className="text-text-secondary mb-6">
                Let&apos;s discuss how this can work for your team.
              </p>
              <Button href="/contact" variant="primary" size="lg">
                Request a Demo
              </Button>
            </GlassCard>
          </Container>
        </SectionWrapper>
      </div>
    </>
  );
}
