import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ============================================================
   Tag — Small pill badge for tech tags and categories
   ============================================================ */

type TagVariant = 'cyan' | 'terracotta' | 'neutral' | 'purple' | 'gold';

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

const variantClasses: Record<TagVariant, string> = {
  cyan: 'bg-cyan/10 text-cyan border-cyan/20',
  terracotta: 'bg-terracotta/10 text-terracotta-light border-terracotta/20',
  neutral: 'bg-white/5 text-text-secondary border-white/10',
  purple: 'bg-purple/10 text-purple border-purple/20',
  gold: 'bg-gold/10 text-gold border-gold/20',
};

export function Tag({
  children,
  variant = 'cyan',
  className,
}: TagProps): ReactNode {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
        'transition-colors duration-[var(--duration-fast)]',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
