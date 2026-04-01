import { Hero } from '@/components/home/Hero';
import { ValueProposition } from '@/components/home/ValueProposition';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { CallToAction } from '@/components/home/CallToAction';

/* ============================================================
   Homepage — Assembles all home sections
   ============================================================ */

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <ProductShowcase />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </>
  );
}
