<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# AGENTS.md — Weblyr AI
> This file is the single source of truth for all AI agents working on this project.
> Read this file completely before writing a single line of code.
> All rules here are non-negotiable unless explicitly overridden by the developer.

---

## 🧠 Project Identity

**Project:** Weblyr.ai — Premium 3D AI Web Experience
**Owner:** Nirmal V G
**Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · Three.js via R3F · Framer Motion · Zustand · Supabase · Vercel
**Goal:** A production-grade, performance-optimized, visually extraordinary website that positions Weblyr AI as a premium AI web studio.

---

## 📁 Repository Structure

```
weblyr-ai/
├── AGENTS.md                        ← You are here
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── src/
    ├── app/                         ← Next.js App Router pages
    │   ├── layout.tsx               ← Root layout (fonts, Header, Footer, Lenis)
    │   ├── page.tsx                 ← Homepage
    │   ├── not-found.tsx            ← Global 404
    │   ├── sitemap.ts               ← Dynamic sitemap
    │   ├── robots.ts
    │   ├── about/page.tsx
    │   ├── blog/
    │   │   ├── page.tsx
    │   │   └── [slug]/page.tsx
    │   ├── contact/
    │   │   ├── page.tsx
    │   │   └── success/page.tsx
    │   ├── products/
    │   │   ├── page.tsx
    │   │   └── [slug]/page.tsx
    │   └── api/
    │       ├── contact/route.ts
    │       └── newsletter/route.ts
    ├── components/
    │   ├── ui/                      ← Primitive UI components
    │   │   ├── Button.tsx
    │   │   ├── GlassCard.tsx
    │   │   ├── Tag.tsx
    │   │   ├── AnimatedText.tsx
    │   │   └── CursorGlow.tsx
    │   ├── layout/                  ← Structural layout components
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Container.tsx
    │   │   └── SectionWrapper.tsx
    │   ├── 3d/                      ← All Three.js / R3F components
    │   │   ├── WebGLCanvas.tsx      ← Canvas wrapper (ssr:false boundary)
    │   │   ├── scenes/
    │   │   │   ├── HeroScene.tsx
    │   │   │   ├── ProductScene.tsx
    │   │   │   └── AboutScene.tsx
    │   │   └── objects/
    │   │       ├── GlowingOrb.tsx
    │   │       └── ParticleField.tsx
    │   ├── home/                    ← Homepage section components
    │   │   ├── Hero.tsx
    │   │   ├── ValueProposition.tsx
    │   │   ├── ProductShowcase.tsx
    │   │   ├── HowItWorks.tsx
    │   │   ├── Testimonials.tsx
    │   │   └── CallToAction.tsx
    │   ├── forms/
    │   │   └── ContactForm.tsx
    │   └── JsonLd.tsx
    ├── hooks/                       ← Custom React hooks (all SSR-safe)
    │   ├── useScrollProgress.ts
    │   ├── useMousePosition.ts
    │   ├── useMediaQuery.ts
    │   └── useDevicePerformance.ts
    ├── lib/                         ← Pure utilities and config
    │   ├── constants.ts             ← PRODUCTS, TESTIMONIALS, NAV_ITEMS, SITE_CONFIG
    │   ├── utils.ts                 ← cn(), lerp(), clamp(), formatDate()
    │   ├── animations.ts            ← Framer Motion variant presets
    │   ├── validations.ts           ← Zod schemas
    │   ├── shaders.ts               ← GLSL as template literals
    │   ├── three-utils.ts           ← Three.js helper functions
    │   ├── supabase.ts              ← Supabase client + helpers
    │   └── env.ts                   ← Zod-validated env vars
    ├── stores/                      ← Zustand stores
    │   └── uiStore.ts               ← UI state only (nav open, cursor, etc.)
    ├── types/
    │   └── index.ts                 ← All shared TypeScript interfaces
    ├── data/
    │   └── posts.ts                 ← Static blog post data
    └── styles/
        └── globals.css
```

---

## ⚙️ Technical Conventions

### TypeScript
- `strict: true` in tsconfig. Zero `any`. Zero `@ts-ignore`. No exceptions.
- Use `unknown` when type is uncertain — narrow with type guards.
- All function parameters and return types must be explicitly typed.
- Prefer `interface` over `type` for object shapes. Use `type` for unions/intersections.
- Use discriminated unions for state machines (loading/success/error).

```typescript
// ✅ Correct
interface Product {
  id: string;
  slug: string;
  name: string;
}

// ❌ Never do this
const data: any = fetchSomething();
```

### React & Next.js
- **Server Components by default.** Only add `'use client'` when strictly necessary:
  - Component uses browser APIs (window, document, navigator)
  - Component uses React hooks (useState, useEffect, useRef, etc.)
  - Component uses event listeners
  - Component renders Three.js / R3F content
- **Never fetch data in Client Components.** Pass data as props from Server Components.
- **Named exports only** for all components except `page.tsx` and `layout.tsx` files.
- File naming: `PascalCase` for components, `camelCase` for utilities and hooks.
- Each component in its own file. No barrel index files.

```typescript
// ✅ Correct — named export
export function GlassCard({ children }: GlassCardProps) { ... }

// ❌ Wrong — default export on non-page component
export default function GlassCard() { ... }
```

### Styling
- **Tailwind CSS only.** Zero inline `style={{}}` props unless passing dynamic CSS variables.
- Dynamic CSS variables are the only valid use of inline style: `style={{ '--glow-color': color }}`
- No hardcoded hex colors in components. Use Tailwind design tokens from `tailwind.config.ts`.
- All colors reference tokens: `text-cyan`, `bg-space`, `border-terracotta`, etc.
- Responsive: always mobile-first. Order: base → `sm:` → `md:` → `lg:` → `xl:`.
- Use `cn()` from `@/lib/utils` for all conditional className merging.

```typescript
// ✅ Correct
<div className={cn('bg-space rounded-2xl', isActive && 'border border-cyan', className)}>

// ❌ Wrong
<div style={{ background: '#0a0a1a', color: '#00d4ff' }}>
```

### Animations (Framer Motion)
- Import animation variants from `@/lib/animations`. Never define variants inline.
- Use `<motion.div>` only in Client Components.
- Always respect reduced motion: `const shouldAnimate = !useReducedMotion()`.
- Use `viewport={{ once: true, margin: '-100px' }}` on all scroll-triggered animations.
- Transitions: use the preset from `animations.ts`. Default duration: 0.6s, ease: `[0.22,1,0.36,1]`.

```typescript
// ✅ Correct
import { fadeInUp, staggerContainer } from '@/lib/animations';

<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  <motion.h2 variants={fadeInUp}>Title</motion.h2>
</motion.div>

// ❌ Wrong — inline variant definition
<motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
```

---

## 🌐 3D / Three.js Rules

These rules are critical. Breaking them causes SSR crashes or hydration errors.

### The SSR Rule (Non-Negotiable)
Every file that imports from `three`, `@react-three/fiber`, or `@react-three/drei` **must**:
1. Have `'use client'` at the very top of the file
2. Be dynamically imported at its usage site with `{ ssr: false }`

```typescript
// In a page or parent component (Server or Client):
const HeroScene = dynamic(() => import('@/components/3d/scenes/HeroScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-space" />,
});

// Wrapped in Suspense:
<Suspense fallback={<div className="w-full h-screen bg-space" />}>
  <HeroScene />
</Suspense>
```

### WebGL Context Safety
Always check WebGL support before rendering. `WebGLCanvas.tsx` handles this — always use it as the canvas wrapper. Never use `<Canvas>` from R3F directly in scene files.

### Performance Rules
- Use `InstancedMesh` for any repeated geometry (>10 of the same shape).
- Dispose geometries, materials, and textures in `useEffect` cleanup:
  ```typescript
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, []);
  ```
- Use `useFrame`'s `delta` for all time-based animation — never `Date.now()`.
- Gate post-processing (Bloom, Vignette) behind `useDevicePerformance() === 'high'`.
- Gate particle counts: `count = isMobile ? 2000 : 5000`.
- Lazy-render product 3D thumbnails: only mount canvas when card is in viewport (IntersectionObserver).

### Scene Performance Budgets
| | Desktop | Mobile |
|---|---|---|
| Draw calls | < 50 | < 30 |
| Triangles | < 100K | < 50K |
| Heap memory | < 100MB | < 60MB |
| Particle count | 5,000 | 2,000 |
| Target FPS | 60 | 30+ |
| Bloom | ✅ | ❌ |

---

## 🔌 API Routes

### Pattern for All Route Handlers
```typescript
// src/app/api/[route]/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate
    const result = Schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // 2. Honeypot check (contact form only)
    // 3. Rate limiting
    // 4. Business logic
    // 5. Return success

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API /route]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

- **Never expose stack traces** in API responses.
- **Always validate** request body with Zod before processing.
- **Rate limiting:** max 3 contact submissions per IP per hour.
- **Honeypot:** reject silently (return 200) if `website` field is populated.
- **Structured errors:** always `{ success: false, error: string }` shape.

---

## 🗃️ Data Layer

### Supabase
- Import the client from `@/lib/supabase` — never instantiate directly in components.
- All DB operations in `lib/supabase.ts` as typed helper functions.
- Tables used:
  - `contact_submissions` — form submissions
  - `newsletter_subscribers` — email list

### Static Data
- Products, testimonials, nav items, and blog posts live in `src/lib/constants.ts` and `src/data/posts.ts`.
- No CMS for launch. Keep data co-located with the codebase.
- When adding a new product: update `PRODUCTS` array in `constants.ts` and add a corresponding static page.

### Environment Variables
- All env vars validated at startup via `src/lib/env.ts` (Zod schema).
- Required vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- Never access `process.env` directly in components — import from `@/lib/env`.

---

## ♿ Accessibility Standards (WCAG 2.1 AA)

Every component must meet these requirements. Non-negotiable.

- **Color contrast:** minimum 4.5:1 for body text, 3:1 for large text.
- **Focus indicators:** all interactive elements have a visible `focus-visible` ring (cyan, 2px offset).
- **ARIA:** all icon-only buttons have `aria-label`. All carousels have `role="region"` and `aria-label`.
- **Keyboard nav:** all interactive elements reachable and operable by keyboard alone.
- **Reduced motion:** wrap all animations in `shouldAnimate` check:
  ```typescript
  const shouldAnimate = !useReducedMotion();
  // and in Tailwind: motion-reduce:transition-none motion-reduce:animate-none
  ```
- **Images:** all `next/image` components have meaningful `alt` text. Decorative images: `alt=""`.
- **3D scenes:** always provide a static background fallback via the Error Boundary.
- **Screen readers:** `AnimatedText` uses `aria-label` on the wrapper to expose the full text at once.

---

## 🚀 Performance Budget

| Metric | Target |
|---|---|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 95 |
| Lighthouse SEO | 100 |
| LCP (desktop) | < 2.5s |
| LCP (mobile) | < 4.0s |
| CLS | 0 |
| Initial JS bundle (gzipped) | < 150KB |
| Three.js chunk | Lazy, split |
| Time to Interactive | < 3.5s |

### Optimization Checklist (run before every commit)
- [ ] All images use `next/image` with `sizes` prop
- [ ] All heavy components dynamically imported
- [ ] No `console.log` statements left in code
- [ ] No unused imports
- [ ] TypeScript reports zero errors (`npx tsc --noEmit`)
- [ ] ESLint reports zero errors (`npx eslint src/`)

---

## 🧪 Testing Protocol

### Before Marking Any Task Complete
Run the following via the browser agent:

1. **Navigation:** Click every nav link. Verify correct page loads. No 404s.
2. **Contact Form:** Submit with valid data. Verify redirect to `/contact/success`. Verify email received.
3. **Contact Form Validation:** Submit with empty fields. Verify inline errors appear. No page reload.
4. **3D Scenes:** Verify HeroScene renders. Scroll to trigger camera animation. Move mouse for parallax.
5. **Mobile:** Resize to 375px. Verify hamburger menu. Verify 3D scene simplified. No horizontal scroll.
6. **Console:** Zero errors. Zero WebGL warnings.

### Lighthouse
Run Lighthouse on homepage via browser agent after every Task Group 5+ completion.
Save the score to a `LIGHTHOUSE.md` file at project root.

---

## 🔒 Security Rules

- **Never commit secrets.** `.env.local` is gitignored. Use `.env.local.example` for documentation.
- **Input sanitization:** all user input validated with Zod before use. Never pass raw user input to DB queries.
- **API exposure:** no sensitive env vars prefixed with `NEXT_PUBLIC_`. Only Supabase anon key and site URL are public.
- **Headers:** configure security headers in `next.config.ts`:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 🚫 Hard Prohibitions

The following are never acceptable in this codebase:

| Prohibition | Why |
|---|---|
| `any` TypeScript type | Defeats type safety |
| `@ts-ignore` or `@ts-expect-error` | Hides real bugs |
| Inline `style={{}}` (except CSS vars) | Breaks design system |
| Hardcoded hex colors in components | Breaks theme consistency |
| `default export` on non-page files | Breaks tree-shaking and discoverability |
| Direct `process.env` access in components | Bypasses validation in `env.ts` |
| Importing Three.js in Server Components | Causes SSR crash |
| `<Canvas>` from R3F without `ssr:false` | Causes hydration error |
| `console.log` in production code | Use structured logging or remove |
| Fetching data in Client Components | Pass from Server Components as props |
| `WidthType.PERCENTAGE` in docx tables | Breaks in Google Docs |
| Defining Framer Motion variants inline | Breaks reusability, use `animations.ts` |

---

## 🗓️ Development Phases Reference

| Phase | Scope | Depends On |
|---|---|---|
| 1 — Foundation | Project setup, design tokens, env | Nothing |
| 2 — Type System | Types, constants, utils, hooks | Phase 1 |
| 3 — UI Components | GlassCard, Button, Tag, AnimatedText | Phase 2 |
| 4 — Layout | Header, Footer, SectionWrapper | Phase 3 |
| 5 — 3D Engine | WebGLCanvas, HeroScene, scenes, objects | Phase 2 |
| 6 — Homepage | All home sections, Hero, CTA | Phase 3, 4, 5 |
| 7 — Inner Pages | Products, About, Blog, Contact | Phase 3, 4 |
| 8 — Forms & API | ContactForm, API routes, Supabase | Phase 2, 7 |
| 9 — SEO & Meta | Layout metadata, JSON-LD, sitemap | Phase 6, 7 |
| 10 — QA & Launch | Lighthouse, a11y, bundle, cross-browser | All |

---

## 💬 Agent Communication Protocol

When working on this project, agents must:

1. **Before starting any task:** state which task group and subtask you are implementing.
2. **Before writing code:** output the list of files you will create or modify.
3. **After completing a task group:** generate a Deliverable Artifact summarizing:
   - Files created/modified
   - Key decisions made and why
   - Any deviations from the plan (with justification)
   - Open questions for the developer
4. **When blocked:** do not guess. State the blocker clearly and propose 2–3 options.
5. **When making architectural decisions** not covered by this file: prefer simplicity and explicitness over cleverness.

---

*Last updated: 2026 — Nirmal V G / Weblyr AI*
*Any agent reading this: the goal is a site so good it makes developers stop and stare.*
<!-- END:nextjs-agent-rules -->
