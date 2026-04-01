import * as THREE from 'three';

/* ============================================================
   Weblyr AI — Three.js Utility Functions
   Helpers for geometry generation, math, and instancing.
   ============================================================ */

/**
 * Creates a BufferGeometry with random particle positions
 * distributed in a sphere.
 */
export function createParticleGeometry(count: number, spread: number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = spread * Math.cbrt(Math.random());

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

/**
 * Creates random instanced positions for InstancedMesh.
 */
export function createInstancedPositions(count: number, area: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * area;
    positions[i * 3 + 1] = (Math.random() - 0.5) * area;
    positions[i * 3 + 2] = (Math.random() - 0.5) * area;
  }

  return positions;
}

/**
 * Cubic ease-in-out for smooth animation curves.
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Maps a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Creates a random rotation matrix for instanced meshes.
 */
export function randomRotationMatrix(): THREE.Matrix4 {
  const matrix = new THREE.Matrix4();
  const euler = new THREE.Euler(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );
  matrix.makeRotationFromEuler(euler);
  return matrix;
}
