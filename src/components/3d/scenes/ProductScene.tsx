'use client';

import { type ReactNode, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLCanvas } from '@/components/3d/WebGLCanvas';
import { fresnelVertex, glowFragment } from '@/lib/shaders';
import type { ThreeDShape } from '@/types';

/* ============================================================
   ProductScene — 3D scene for product detail pages
   ============================================================ */

interface ProductSceneProps {
  shape: ThreeDShape;
  color?: string;
  className?: string;
}

export function ProductScene({
  shape,
  color = '#00d4ff',
  className,
}: ProductSceneProps): ReactNode {
  return (
    <div className={className}>
      <WebGLCanvas camera={{ fov: 50, near: 0.1, far: 50, position: [0, 0, 4] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[-5, 5, 5]} color={color} intensity={2} />
        <pointLight position={[5, -5, 5]} color="#ffffff" intensity={0.5} />
        <ProductMesh shape={shape} color={color} />
      </WebGLCanvas>
    </div>
  );
}

/* ── ProductMesh ────────────────────────────────────────────── */

function ProductMesh({
  shape,
  color,
}: {
  shape: ThreeDShape;
  color: string;
}): ReactNode {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 1.2 },
    }),
    [color]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[1.2, 64, 64]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1.2, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2, 0]} />;
    }
  }, [shape]);

  return (
    <mesh ref={meshRef}>
      {geometry}
      <shaderMaterial
        vertexShader={fresnelVertex}
        fragmentShader={glowFragment}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
