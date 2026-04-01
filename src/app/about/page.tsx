import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { AboutSceneClient } from '@/components/3d/AboutSceneClient';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Weblyr AI — a premium web studio building AI-powered digital experiences from Kerala, India. Our mission, values, and approach.',
};

const VALUES = [
  {
    title: 'Intelligence',
    description:
      'We embed AI thoughtfully — where it genuinely improves the experience, not as a checkbox.',
  },
  {
    title: 'Craft',
    description:
      "Every line of code is reviewed, every pixel is deliberate. We ship work we're proud of.",
  },
  {
    title: 'Beauty',
    description:
      'Interfaces should inspire. We create visual experiences that make people pause and appreciate.',
  },
  {
    title: 'Speed',
    description:
      "Performance isn't an afterthought. Our sites load fast and run smooth on every device.",
  },
  {
    title: 'Transparency',
    description: 'No black boxes. Our clients understand every decision we make and why.',
  },
  {
    title: 'Impact',
    description: 'We measure success by outcomes — engagement, conversion, and lasting impression.',
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      {/* 3D Background */}
      <div className="fixed inset-0 -z-10">
        <AboutSceneClient />
      </div>

      {/* Mission */}
      <section className="min-h-[70vh] flex items-center pt-32">
        <Container size="md" className="text-center">
          <p className="text-sm text-cyan font-medium uppercase tracking-widest mb-6">
            Our Mission
          </p>
          <h1 className="font-serif text-[length:var(--text-h1)] leading-[var(--leading-h1)] text-text-primary italic mb-8">
            We believe the web should be intelligent, beautiful, and alive.
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Weblyr AI is a premium web studio that creates extraordinary digital experiences at the
            intersection of artificial intelligence, 3D immersion, and meticulous engineering.
          </p>
        </Container>
      </section>

      {/* Founder */}
      <SectionWrapper>
        <Container size="md">
          <GlassCard intensity="medium" className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan/20 to-terracotta/20 flex items-center justify-center shrink-0">
                <span className="text-4xl font-serif text-text-primary">N</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-1">Nirmal V G</h2>
                <p className="text-sm text-cyan mb-4">Founder & Lead Engineer</p>
                <p className="text-text-secondary leading-relaxed">
                  Based in Kerala, India 🇮🇳 — Nirmal is a full-stack engineer and designer with a
                  passion for pushing the boundaries of what&apos;s possible on the web. He founded
                  Weblyr AI to bring together his love for artificial intelligence, immersive 3D
                  experiences, and production-grade engineering into a studio that creates work
                  developers and designers actually admire.
                </p>
              </div>
            </div>
          </GlassCard>
        </Container>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper>
        <Container>
          <h2 className="text-[length:var(--text-h2)] leading-[var(--leading-h2)] font-bold text-text-primary mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value) => (
              <GlassCard key={value.title} intensity="light" hover className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <Container size="sm" className="text-center">
          <h2 className="text-[length:var(--text-h2)] leading-[var(--leading-h2)] font-bold text-text-primary mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-text-secondary mb-8">
            We&apos;re selective about the projects we take on — because every project gets our full
            attention.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Start a Conversation
          </Button>
        </Container>
      </SectionWrapper>
    </div>
  );
}
