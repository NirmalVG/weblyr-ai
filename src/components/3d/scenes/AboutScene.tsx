'use client';

import { type ReactNode, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLCanvas } from '@/components/3d/WebGLCanvas';

/* ============================================================
   AboutScene — Starfield with connecting constellation lines
   ============================================================ */

export function AboutScene(): ReactNode {
  return (
    <div className="absolute inset-0">
      <WebGLCanvas camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 15] }}>
        <ambientLight intensity={0.2} />
        <Starfield count={3000} spread={30} />
      </WebGLCanvas>
    </div>
  );
}

/* ── Starfield ──────────────────────────────────────────────── */

function Starfield({
  count,
  spread,
}: {
  count: number;
  spread: number;
}): ReactNode {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = spread * Math.cbrt(Math.random());

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 0.03 + 0.005;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.5}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
