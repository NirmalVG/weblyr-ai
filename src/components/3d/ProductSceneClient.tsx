'use client';

import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { type Product } from '@/types';

const ProductScene = dynamic(
  () => import('@/components/3d/scenes/ProductScene').then((m) => ({ default: m.ProductScene })),
  { ssr: false, loading: () => <div className="w-full h-full bg-space-light rounded-lg" /> },
);

interface ProductSceneClientProps {
  shape: Product['shape'];
  color: string;
  className?: string;
}

export function ProductSceneClient({
  shape,
  color,
  className,
}: ProductSceneClientProps): ReactNode {
  return <ProductScene shape={shape} color={color} className={className} />;
}
