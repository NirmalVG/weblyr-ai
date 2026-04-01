'use client';

import { type ReactNode, useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { ParticleField } from '@/components/3d/objects/ParticleField';
import { GlowingOrb } from '@/components/3d/objects/GlowingOrb';
import { WebGLCanvas } from '@/components/3d/WebGLCanvas';

/* ============================================================
   HeroScene — Primary 3D scene for homepage hero
   ============================================================ */

export function HeroScene(): ReactNode {
  const performance = useDevicePerformance();

  if (performance === 'low') {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-space via-space-light to-space-mid">
        <div className="mesh-gradient absolute inset-0" />
      </div>
    );
  }

  const particleCount = performance === 'high' ? 5000 : 2000;
  const cubeCount = performance === 'high' ? 500 : 200;

  return (
    <div className="absolute inset-0">
      <WebGLCanvas camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 5] }}>
        {/* Lighting */}
        <ambientLight intensity={0.3} color="#0a0a1a" />
        <pointLight position={[-10, 10, 10]} color="#00d4ff" intensity={2.5} />
        <pointLight position={[10, -10, 10]} color="#c46b62" intensity={1.8} />
        <pointLight position={[0, 0, 5]} color="#ffffff" intensity={0.3} />

        {/* Background Icosahedron */}
        <BackgroundIcosahedron />

        {/* Fragment Cubes */}
        <FragmentCubes count={cubeCount} />

        {/* Particle Field */}
        <ParticleField count={particleCount} spread={8} color="#00d4ff" size={0.02} speed={0.3} />

        {/* Central Orb */}
        <GlowingOrb color="#00d4ff" scale={0.8} position={[0, 0, 0]} speed={0.5} />

        {/* Camera Controller */}
        <CameraController />
      </WebGLCanvas>
    </div>
  );
}

/* ── Background Icosahedron ─────────────────────────────────── */

function BackgroundIcosahedron(): ReactNode {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.001;
    meshRef.current.rotation.x = t * 0.0005;
    const breathe = 0.98 + Math.sin(t * 0.3) * 0.02;
    meshRef.current.scale.setScalar(breathe);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[12, 1]} />
      <meshBasicMaterial color="#16162a" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

/* ── Fragment Cubes (Instanced) ─────────────────────────────── */

function FragmentCubes({ count }: { count: number }): ReactNode {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rot = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      rot[i * 3] = Math.random() * Math.PI * 2;
      rot[i * 3 + 1] = Math.random() * Math.PI * 2;
      rot[i * 3 + 2] = Math.random() * 0.02;
    }
    return { pos, rot };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      dummy.position.set(
        positions.pos[idx],
        positions.pos[idx + 1],
        positions.pos[idx + 2]
      );
      dummy.rotation.set(
        positions.rot[idx] + t * positions.rot[idx + 2],
        positions.rot[idx + 1] + t * positions.rot[idx + 2] * 0.5,
        0
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshPhongMaterial color="#1e1e35" shininess={80} transparent opacity={0.7} />
    </instancedMesh>
  );
}

/* ── Camera Controller ──────────────────────────────────────── */

function CameraController(): ReactNode {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent): void => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame(() => {
    camera.position.x += (mouseRef.current.x * 0.3 - camera.position.x) * 0.05;
    camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
