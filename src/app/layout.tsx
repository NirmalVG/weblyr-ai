import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { LenisProvider } from '@/components/layout/LenisProvider';
import { JsonLd, organizationSchema } from '@/components/JsonLd';
import { SITE_CONFIG } from '@/lib/constants';

/* ── Fonts ──────────────────────────────────────────────────── */

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

/* ── Metadata ───────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: 'Weblyr AI — Layering Intelligence into Web Experiences',
    template: '%s | Weblyr AI',
  },
  description:
    'We build extraordinary AI-powered web experiences with immersive 3D, intelligent interfaces, and obsessive attention to craft. Premium web development studio.',
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    url: SITE_CONFIG.url,
    title: 'Weblyr AI — Layering Intelligence into Web Experiences',
    description:
      'Premium AI-powered web experiences with immersive 3D, intelligent interfaces, and obsessive attention to craft.',
    siteName: SITE_CONFIG.name,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weblyr AI — Layering Intelligence into Web Experiences',
    description:
      'Premium AI-powered web experiences with immersive 3D and intelligent interfaces.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
};

/* ── Root Layout ────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-space text-text-primary font-sans">
        <JsonLd data={organizationSchema()} />
        <LenisProvider>
          <CursorGlow />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
