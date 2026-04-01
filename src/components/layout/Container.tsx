import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ============================================================
   Container — Centered max-width wrapper
   ============================================================ */

type ContainerSize = 'sm' | 'md' | 'lg' | 'full';

interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article';
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-[var(--container-sm)]',
  md: 'max-w-[var(--container-md)]',
  lg: 'max-w-[var(--container-lg)]',
  full: 'max-w-full',
};

export function Container({
  children,
  size = 'lg',
  className,
  as: Tag = 'div',
}: ContainerProps): ReactNode {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
