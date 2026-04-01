/* ============================================================
   Weblyr AI — GLSL Shaders
   Template literal shader strings for Three.js materials.
   ============================================================ */

export const fresnelVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const fresnelFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);
    vec3 color = uColor * fresnel * uIntensity;
    gl_FragColor = vec4(color, fresnel * 0.8);
  }
`;

export const noiseVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // Simplex noise-like displacement
  vec3 displace(vec3 pos, float t) {
    float displacement = sin(pos.x * 2.0 + t) * cos(pos.y * 2.0 + t * 0.7) * sin(pos.z * 2.0 + t * 1.3);
    return pos + normal * displacement * uAmplitude;
  }

  void main() {
    vec3 newPosition = displace(position, uTime);
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const glowFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float rim = 1.0 - abs(dot(viewDir, vNormal));
    rim = pow(rim, 2.0);
    vec3 glow = uColor * rim * uIntensity;
    float alpha = rim * 0.6 + 0.1;
    gl_FragColor = vec4(glow, alpha);
  }
`;
