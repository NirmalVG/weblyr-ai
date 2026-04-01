import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

/* ============================================================
   404 — Not Found Page
   ============================================================ */

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-20">
      <Container size="sm" className="text-center">
        <h1 className="text-[8rem] md:text-[12rem] font-bold text-text-primary/5 leading-none select-none">
          404
        </h1>
        <div className="-mt-12 relative z-10">
          <h2 className="text-[length:var(--text-h2)] leading-[var(--leading-h2)] font-bold text-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/" variant="primary">
              Go Home
            </Button>
            <Button href="/products" variant="outline">
              View Products
            </Button>
            <Button href="/contact" variant="ghost">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
