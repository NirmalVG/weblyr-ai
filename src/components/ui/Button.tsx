'use client';

import { type ReactNode, forwardRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonPress } from '@/lib/animations';

/* ============================================================
   Button — Primary interactive element
   ============================================================ */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-cyan text-space font-semibold hover:shadow-[var(--shadow-glow-cyan-strong)] active:bg-cyan-dark',
  secondary:
    'glass-medium border-cyan/30 text-cyan hover:border-cyan/60 hover:bg-cyan/5',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5',
  outline:
    'bg-transparent border border-border-glass-md text-text-primary hover:border-cyan/40 hover:text-cyan',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-body gap-2',
  lg: 'px-8 py-4 text-body gap-2.5',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className,
  href,
  onClick,
  type = 'button',
}: ButtonProps): ReactNode {
  const classes = cn(
    'inline-flex items-center justify-center rounded-[var(--radius-btn)] font-medium',
    'transition-colors duration-[var(--duration-fast)]',
    'focus-visible:outline-2 focus-visible:outline-cyan focus-visible:outline-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    (disabled || loading) && 'opacity-50 pointer-events-none',
    className
  );

  const content = (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </>
  );

  if (href) {
    return (
      <motion.div variants={buttonPress} initial="rest" whileTap="tap">
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      variants={buttonPress}
      initial="rest"
      whileTap="tap"
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {content}
    </motion.button>
  );
}

function LoadingSpinner(): ReactNode {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
