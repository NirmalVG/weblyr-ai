'use client';

import { type ReactNode, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { Tag } from '@/components/ui/Tag';
import { BLOG_POSTS } from '@/data/posts';
import { formatDate } from '@/lib/utils';
import { staggerContainer, fadeInUp } from '@/lib/animations';

/* ============================================================
   Blog Listing Client — Tag filtering
   ============================================================ */

export function BlogListingClient(): ReactNode {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    BLOG_POSTS.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filtered = activeTag
    ? BLOG_POSTS.filter((p) => p.tags.includes(activeTag))
    : BLOG_POSTS;

  const featured = BLOG_POSTS.find((p) => p.featured);

  return (
    <>
      {/* Featured Post */}
      {featured && !activeTag && (
        <div className="mb-12">
          <Link href={`/blog/${featured.slug}`}>
            <GlassCard hover intensity="medium" className="p-8 md:p-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {featured.tags.map((tag) => (
                  <Tag key={tag} variant="cyan">{tag}</Tag>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                {featured.title}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4 max-w-2xl">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span>{formatDate(featured.date)}</span>
                <span>·</span>
                <span>{featured.readTime} min read</span>
              </div>
            </GlassCard>
          </Link>
        </div>
      )}

      {/* Tag Filter */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            !activeTag ? 'bg-cyan text-space' : 'glass-light text-text-secondary hover:text-text-primary'
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTag === tag ? 'bg-cyan text-space' : 'glass-light text-text-secondary hover:text-text-primary'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post Grid */}
      <motion.div
        key={activeTag ?? 'all'}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered
          .filter((p) => !(p.featured && !activeTag))
          .map((post) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <Link href={`/blog/${post.slug}`}>
                <GlassCard hover intensity="light" className="p-6 h-full flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Tag key={tag} variant="neutral">{tag}</Tag>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
      </motion.div>
    </>
  );
}
