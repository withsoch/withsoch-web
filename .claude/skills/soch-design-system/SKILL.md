---
name: soch-design-system
description: >-
  Soch ecosystem design system — the HubSpot-style brand language behind Soch
  Catalyst (Fraunces serif headlines, Inter body, flat #ff5c35 orange, warm cream
  surfaces, forest-green CTA, borders over shadows). Use when creating a new Soch
  marketing site, scaffolding one from scratch, restyling or building a page to
  match Soch Catalyst, or applying Soch branding, tokens, typography, buttons, or
  section layouts. Covers Tailwind v4 @theme tokens, the fluid type scale,
  component recipes, motion, the content model, and page composition rhythm.
---

# Soch Ecosystem Design System

Reproduce the Soch look — *"editorial serif headlines · warm cream · flat orange ·
forest CTA"* — on any site in the ecosystem. This is the fast path; the exhaustive
reference (every recipe, the footer/header/testimonial patterns, the full content
schema) is **`DESIGN.md`** at the repo root — read it when you need more than the
essentials below.

## Golden rule

- **Content** → `lib/content.ts` (typed singletons + collections; the single
  source of copy/config).
- **Structure** → components (`components/` sections, `components/ui/` primitives).
- **Tokens** → the Tailwind v4 `@theme` block in `app/globals.css`. **There is no
  `tailwind.config.js`** — the `@theme` block is the source of truth, and each
  `--color-*` auto-generates `bg-*`/`text-*`/`border-*`/`ring-*`.
- Server components by default; `"use client"` only for interactivity.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 (CSS-first) ·
`motion/react`. `@/` alias = repo root. Fonts via `next/font/google`: **Inter**
(`--font-inter`, sans) + **Fraunces** (`--font-fraunces`, serif, weights 400/500/600,
normal+italic), variables applied on `<html>`.

## Tokens — paste verbatim into `app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* Brand - HubSpot red-orange */
  --color-brand: #ff5c35;
  --color-brand-light: #ff7a59;
  --color-brand-dark: #e8431b;
  --color-brand-deep: #c9350f;
  /* Text - warm near-black */
  --color-ink: #1c2b26;
  --color-ink-soft: #33403b;
  --color-slate: #4c534f;
  --color-muted: #7a817d;
  /* Surfaces - warm */
  --color-mist: #f6f2ea;   /* section bg */
  --color-cream: #fbf8f2;
  --color-peach: #ffe8dd;  /* soft accent */
  --color-line: #e7e2d7;   /* warm hairline */
  /* Dark sections */
  --color-forest: #103129; /* CTA green */
  --color-charcoal: #171814; /* footer */
  /* Accents (sparingly) */
  --color-teal: #1f7a8c;
  --color-leaf: #1f8a66;
  --color-linkedin: #0a66c2;
  /* Fonts */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-fraunces), Georgia, "Times New Roman", serif;
  /* Shadows - subtle; borders preferred over big shadows */
  --shadow-soft: 0 1px 2px rgba(20, 30, 25, 0.04);
  --shadow-card: 0 6px 22px -12px rgba(20, 30, 25, 0.18);
  --shadow-lift: 0 22px 48px -22px rgba(20, 30, 25, 0.28);
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Body is white `#ffffff`; warm tones are for **sections**. `h1–h4` default to the
serif at **font-weight 540**, tracking `-0.012em`, `text-wrap: balance`. Fluid type
classes (in `@layer components`): `.text-display`
`clamp(2.7rem,1.5rem+4.4vw,4.7rem)`/540, `.text-h2`
`clamp(2.05rem,1.4rem+2.3vw,3.3rem)`/540, `.text-h3`
`clamp(1.35rem,1.15rem+0.7vw,1.7rem)`/560, `.lead`
`clamp(1.075rem,1rem+0.4vw,1.28rem)` in `text-slate`. Headlines put one word in
`italic text-brand`.

## Class cheat-sheet

| Concern | Pattern |
|---|---|
| Page width | `.container-x` (max-w 78rem, padding-inline 1.5rem → 2.5rem @ lg) |
| Section padding | `py-20 sm:py-24 lg:py-28` (tight `py-16 sm:py-20`) |
| Headings / lead | `text-display` · `text-h2` · `text-h3` · `lead` |
| Text colors | head `text-ink`, body `text-slate`, strong `text-ink-soft`, meta `text-muted` |
| Accent | `text-brand`/`bg-brand`, hover `brand-dark` — **flat, no gradients/glow** |
| Surfaces | white ↔ `bg-mist` ↔ dark `bg-forest`/`bg-charcoal` |
| Card | `rounded-xl border border-line bg-white p-6 transition-colors hover:border-ink/25` |
| Hairlines | `border-line` (often `border-dashed`); `.rule-dashed`; `divide-y divide-line` |
| Radii | pills `rounded-full`, buttons/cards `rounded-lg`/`rounded-xl`, media `rounded-2xl` |
| Asymmetric grids | `lg:grid-cols-[1.05fr_0.95fr]` · `[0.85fr_1.4fr]` · `[14rem_1fr]` · `[2fr_3fr]` |
| Sticky rail | `lg:sticky lg:top-28 lg:self-start` (+ `scroll-mt-28` on targets) |
| Dark ramp | `text-white/75 //70 //60`, `border-white/10`, `ring-white/15`, hover `text-brand-light` |

## Component recipes

**Button** (`ui/Button.tsx`) — base `group inline-flex items-center justify-center
gap-2 rounded-lg font-semibold transition-colors duration-200`; variants
`primary: bg-brand text-white hover:bg-brand-dark`, `secondary: bg-white text-ink
ring-1 ring-ink/20 hover:ring-ink/45`, `dark: bg-ink text-white hover:bg-ink-soft`,
`light: bg-transparent text-white ring-1 ring-white/45 hover:bg-white/10`; sizes
`md: px-5 py-2.5 text-[0.95rem]`, `lg: px-6 py-3 text-base`. Optional hover-arrow
`<Icon name="arrow" className="h-[1.05em] w-[1.05em] transition-transform group-hover:translate-x-0.5" />`.

**Eyebrow** — bordered pill kicker: white bg, `1px solid var(--color-line)`,
`border-radius: 8px`, `0.8rem/600`, with a `::before` 0.5rem orange square rotated
45°.

**Check-row** — `<li className="flex items-start gap-2.5 text-sm text-slate">` +
`<Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.4} />`.

**CtaBand** (closes every page) — `bg-forest`, centered `mx-auto max-w-3xl
text-center`, `text-h2 text-white` with optional trailing `<span
className="text-brand">.</span>`, `lead text-white/75`, then a Button.

**Icons** (`components/Icons.tsx`) — bespoke set, no library. `<Icon>` on a typed
`IconName` union; `viewBox 0 0 24 24`, `fill=none`, `stroke=currentColor`,
`strokeWidth 1.6`, rounded caps, `aria-hidden`. Color via `text-*`, size via
`h-/w-`. Names: `profile pen target spark compass audit trend arrow check linkedin
menu close shield clock chat`.

## Motion

Prefer the `Reveal` primitive (`motion/react`): `initial {opacity:0, y:24}`,
`whileInView {opacity:1, y:0}`, `viewport {once:true, margin:"-80px"}`, `transition
{duration:0.6, delay, ease:[0.22,1,0.36,1]}`, and `useReducedMotion` fallback.
Stagger `delay={i*0.08}` (grids `(i%2)*0.08`). Above-the-fold heroes use CSS
`.animate-fade-up`/`.animate-pop` with inline `[animation-delay:…ms]`. Add the
`marquee`/`fade-up`/`float-soft` keyframes and gate all of it behind
`@media (prefers-reduced-motion: reduce)`. (Reference repo has a legacy `AnimateIn`
— standardize on `Reveal` for new sites.)

## Content model (`lib/content.ts`)

Typed singletons `HERO {eyebrow, headline, headlineEmphasis}`, `SITE`, `CTAS`,
`NAV`; typed collections `SERVICES: Service[]`, `STEPS: Step[]`, `STATS
[{value,label}]`, `TESTIMONIALS`, `CASE_STUDIES`, `CLIENT_LOGOS`, `FAQS`. Icons are
the `IconName` union, never free strings. Scheduler:
`export const SCHEDULER_URL = process.env.NEXT_PUBLIC_SCHEDULER_URL ?? "";` — keep
the fallback card working when unset. Placeholder testimonials/logos/stats are
deliberately fake and client-owned — never replace them with invented content.

## Page rhythm

Homepage: **Hero → LogoMarquee → Positioning → ServicesGrid → HowWeWork → Stats →
Testimonials → CtaBand**. Interior pages: own `metadata` → `PageHero`/inline
`bg-mist` hero → reused shared sections → **always close with `CtaBand`**. Voice:
confident, second-person, benefit-first, anti-hype; short hook + mechanism;
metrics as value+label outcomes.

## New-site quickstart

1. Scaffold Next 16 + React 19 + TS; add Tailwind v4 (PostCSS plugin only, **no
   config file**) + `motion`; set `@/` alias.
2. `app/globals.css`: `@import "tailwindcss";` → paste `@theme` → add base +
   typography + `.container-x` + `.eyebrow`/`.rule-dashed` + animation utilities.
3. `app/layout.tsx`: load Inter + Fraunces, apply vars on `<html>`, set metadata
   (title template `"%s · <Site>"`).
4. Port `components/ui/{Button,Section,Reveal}.tsx` + `components/Icons.tsx`.
5. Create `lib/content.ts` (all copy/config).
6. Compose sections in the page rhythm; asymmetric grids, hairline dividers,
   sticky rails, `Reveal` wrappers; end with `CtaBand`.
7. Verify: `npm run lint` **and** `npm run build` pass.

## Reusing this skill

Skills load from `.claude/skills/` in the working repo. To reuse in a new Soch
project, copy the `.claude/skills/soch-design-system/` folder (and, ideally,
`DESIGN.md`) into that repo.
