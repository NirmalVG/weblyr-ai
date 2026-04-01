import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* ── Security Headers ─────────────────────────────────── */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  /* ── Image domains (for external avatar URLs) ─────────── */
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  /* ── Transpile R3F ecosystem ──────────────────────────── */
  transpilePackages: ['three'],
};

export default nextConfig;
