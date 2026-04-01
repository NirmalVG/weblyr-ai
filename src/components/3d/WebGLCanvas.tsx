'use client';

import { type ReactNode, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { cn } from '@/lib/utils';

/* ============================================================
   WebGLCanvas — Wrapper around R3F Canvas with WebGL detection
   ============================================================ */

interface WebGLCanvasProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  eventSource?: React.RefObject<HTMLElement>;
  camera?: {
    fov?: number;
    near?: number;
    far?: number;
    position?: [number, number, number];
  };
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function WebGLCanvas({
  children,
  className,
  style,
  camera = { fov: 60, near: 0.1, far: 100, position: [0, 0, 5] },
}: WebGLCanvasProps): ReactNode {
  const [supported, setSupported] = useState(true);
  const performance = useDevicePerformance();

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  if (!supported) {
    return (
      <div
        className={cn(
          'w-full h-full bg-gradient-to-br from-space via-space-light to-space-mid',
          'flex items-center justify-center',
          className
        )}
        style={style}
        aria-label="3D scene (WebGL not available)"
      >
        <div className="mesh-gradient absolute inset-0" />
      </div>
    );
  }

  return (
    <Canvas
      className={cn('!absolute inset-0', className)}
      style={style}
      gl={{
        antialias: performance === 'high',
        alpha: true,
        powerPreference: performance === 'high' ? 'high-performance' : 'default',
      }}
      dpr={[1, performance === 'high' ? 2 : 1.5]}
      camera={camera}
      flat={false}
      aria-label="3D scene"
    >
      {children}
    </Canvas>
  );
}
