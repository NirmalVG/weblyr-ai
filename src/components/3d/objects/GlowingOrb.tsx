'use client';

import { type ReactNode, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { fresnelVertex, fresnelFragment } from '@/lib/shaders';

/* ============================================================
   GlowingOrb — Floating sphere with fresnel edge glow
   ============================================================ */

interface GlowingOrbProps {
  color?: string;
  scale?: number;
  position?: [number, number, number];
  speed?: number;
}

export function GlowingOrb({
  color = '#00d4ff',
  scale = 1,
  position = [0, 0, 0],
  speed = 1,
}: GlowingOrbProps): ReactNode {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 1.5 },
    }),
    [color]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.x = t * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={fresnelVertex}
        fragmentShader={fresnelFragment}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
