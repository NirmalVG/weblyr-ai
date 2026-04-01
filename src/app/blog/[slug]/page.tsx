import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { JsonLd, blogPostSchema } from '@/components/JsonLd';
import { BLOG_POSTS } from '@/data/posts';
import { SITE_CONFIG } from '@/lib/constants';
import { formatDate } from '@/lib/utils';

/* ── Static Params ──────────────────────────────────────────── */

export function generateStaticParams(): { slug: string }[] {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

/* ── Dynamic Metadata ───────────────────────────────────────── */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

/* ── Page Component ─────────────────────────────────────────── */

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={blogPostSchema({
          title: post.title,
          description: post.excerpt,
          url: `${SITE_CONFIG.url}/blog/${post.slug}`,
          datePublished: post.date,
          author: 'Nirmal V G',
        })}
      />

      <article className="pt-32 pb-20">
        <Container size="sm">
          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Tag key={tag} variant="cyan">{tag}</Tag>
              ))}
            </div>
            <h1 className="text-[length:var(--text-h1)] leading-[var(--leading-h1)] font-bold text-text-primary mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime} min read</span>
              <span>·</span>
              <span>Nirmal V G</span>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose-weblyr"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/^/, '<p>')
                .replace(/$/, '</p>'),
            }}
          />

          {/* Back */}
          <div className="mt-16 pt-8 border-t border-border-glass">
            <Button href="/blog" variant="ghost">
              ← Back to Blog
            </Button>
          </div>
        </Container>
      </article>
    </>
  );
}
