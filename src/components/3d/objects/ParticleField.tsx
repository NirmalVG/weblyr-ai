'use client';

import { type ReactNode, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createParticleGeometry } from '@/lib/three-utils';

/* ============================================================
   ParticleField — Reusable particle system
   ============================================================ */

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  speed?: number;
}

export function ParticleField({
  count = 3000,
  spread = 8,
  color = '#00d4ff',
  size = 0.02,
  speed = 0.3,
}: ParticleFieldProps): ReactNode {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(
    () => createParticleGeometry(count, spread),
    [count, spread]
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * speed * 0.1;
    pointsRef.current.rotation.x += delta * speed * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
