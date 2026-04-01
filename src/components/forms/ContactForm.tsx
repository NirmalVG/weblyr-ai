'use client';

import { type ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ContactFormSchema, type ContactFormValues } from '@/lib/validations';
import { INTEREST_OPTIONS, BUDGET_RANGES } from '@/lib/constants';
import { fadeInUp } from '@/lib/animations';

/* ============================================================
   ContactForm — React Hook Form + Zod validated form
   ============================================================ */

export function ContactForm(): ReactNode {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      interest: undefined,
      message: '',
      budget: undefined,
      website: '',
    },
  });

  const onSubmit = async (data: ContactFormValues): Promise<void> => {
    setServerError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        router.push(`/contact/success?name=${encodeURIComponent(data.name)}`);
      } else {
        setServerError(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    }
  };

  return (
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <GlassCard intensity="medium" className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Honeypot — hidden from users */}
          <div className="hidden" aria-hidden="true">
            <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" />
          </div>

          {/* Name */}
          <FormField label="Name" error={errors.name?.message} required>
            <input
              type="text"
              {...register('name')}
              placeholder="Your name"
              className={inputClasses(!!errors.name)}
              aria-invalid={!!errors.name}
            />
          </FormField>

          {/* Email */}
          <FormField label="Email" error={errors.email?.message} required>
            <input
              type="email"
              {...register('email')}
              placeholder="you@company.com"
              className={inputClasses(!!errors.email)}
              aria-invalid={!!errors.email}
            />
          </FormField>

          {/* Company */}
          <FormField label="Company" error={errors.company?.message}>
            <input
              type="text"
              {...register('company')}
              placeholder="Your company (optional)"
              className={inputClasses(!!errors.company)}
            />
          </FormField>

          {/* Interest */}
          <FormField label="Area of Interest" error={errors.interest?.message} required>
            <select
              {...register('interest')}
              className={inputClasses(!!errors.interest)}
              defaultValue=""
              aria-invalid={!!errors.interest}
            >
              <option value="" disabled>Select an option</option>
              {INTEREST_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </FormField>

          {/* Message */}
          <FormField label="Message" error={errors.message?.message} required>
            <textarea
              {...register('message')}
              rows={5}
              placeholder="Tell us about your project (min. 50 characters)"
              className={cn(inputClasses(!!errors.message), 'resize-none')}
              aria-invalid={!!errors.message}
            />
          </FormField>

          {/* Budget */}
          <FormField label="Budget Range" error={errors.budget?.message}>
            <select
              {...register('budget')}
              className={inputClasses(false)}
              defaultValue=""
            >
              <option value="">Select a range (optional)</option>
              {BUDGET_RANGES.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </FormField>

          {/* Server Error */}
          {serverError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-text-error text-sm">
              {serverError}
            </div>
          )}

          {/* Submit */}
          <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full">
            Send Message
          </Button>
        </form>
      </GlassCard>
    </motion.div>
  );
}

/* ── Form Field Wrapper ─────────────────────────────────────── */

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}): ReactNode {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">
        {label}
        {required && <span className="text-terracotta ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-terracotta" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Input Style Helper ─────────────────────────────────────── */

function inputClasses(hasError: boolean): string {
  return cn(
    'w-full px-4 py-3 rounded-[var(--radius-btn)] text-sm',
    'bg-space border text-text-primary',
    'placeholder:text-text-muted',
    'focus:outline-none focus:ring-1 transition-all duration-300',
    hasError
      ? 'border-terracotta/50 focus:border-terracotta focus:ring-terracotta/20'
      : 'border-border-glass-md focus:border-cyan/50 focus:ring-cyan/20'
  );
}
