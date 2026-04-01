import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { BlogListingClient } from '@/components/home/BlogListingClient';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on AI-native web development, Three.js performance, design systems, and the future of the web — from the Weblyr AI team.',
};

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-[length:var(--text-h1)] leading-[var(--leading-h1)] font-bold text-text-primary mb-4">
            Blog
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Thoughts on building for the intelligence era — from AI architecture to WebGL performance.
          </p>
        </div>
        <BlogListingClient />
      </Container>
    </div>
  );
}
