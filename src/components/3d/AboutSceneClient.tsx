'use client';

import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';

const AboutScene = dynamic(
  () => import('@/components/3d/scenes/AboutScene').then((m) => ({ default: m.AboutScene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-space" /> },
);

export function AboutSceneClient(): ReactNode {
  return <AboutScene />;
}
