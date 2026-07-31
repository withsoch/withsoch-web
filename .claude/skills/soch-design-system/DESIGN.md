# Soch Ecosystem — Design System

This document is the **portable design language** behind Soch Catalyst
(`sochcatalystweb`). Its purpose is to let any new site in the Soch ecosystem
reproduce this look and feel — *"HubSpot brand language: editorial serif
headlines · warm cream · flat orange · forest CTA"* — without re-deriving it each
time.

It is exhaustive and copy-paste ready. If you just want the fast path, an
agent-facing condensed version lives at
`.claude/skills/soch-design-system/SKILL.md`; this file is the full reference it
points back to.

> **The golden rule.** Content → `lib/content.ts`. Structure → components. Design
> tokens → the Tailwind v4 `@theme` block in `app/globals.css`. There is **no
> `tailwind.config.js`**. Keep those three concerns separated and everything else
> falls into place.

---

## 1. Stack & foundations

| Piece | Choice |
|---|---|
| Framework | **Next.js 16** (App Router) — `app/*/page.tsx`, one route per folder |
| UI | **React 19**, **TypeScript** |
| Styling | **Tailwind CSS v4**, CSS-first. Tokens live in an `@theme` block; **no config file** |
| Motion | **`motion/react`** (Motion v12) for scroll reveals |
| Import alias | `@/` → repo root (`@/components/…`, `@/lib/content`) |
| Rendering | **Server components by default.** Add `"use client"` only for interactivity/hooks (reveals, carousels, modals, scroll listeners) |

Fonts are loaded once in `app/layout.tsx` via `next/font/google` and exposed as
CSS variables that `@theme` maps to `--font-sans` / `--font-display`:

```tsx
import { Inter, Fraunces } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

// Editorial serif for headlines — the HubSpot brand voice.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// on <html>:
<html className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
  <body className="min-h-full flex flex-col overflow-x-hidden bg-white">…</body>
</html>
```

---

## 2. Design tokens

Paste this `@theme` block verbatim at the top of `app/globals.css` (right after
`@import "tailwindcss";`). Every `--color-*` token automatically generates
`bg-*`, `text-*`, `border-*`, and `ring-*` utilities — that is how you use them.

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
  --color-mist: #f6f2ea;   /* warm off-white section bg */
  --color-cream: #fbf8f2;  /* lighter warm */
  --color-peach: #ffe8dd;  /* soft accent bg */
  --color-line: #e7e2d7;   /* warm hairline */

  /* Dark sections */
  --color-forest: #103129; /* CTA / accent dark green */
  --color-charcoal: #171814; /* footer near-black */

  /* Accents (used sparingly) */
  --color-teal: #1f7a8c;
  --color-leaf: #1f8a66;
  --color-linkedin: #0a66c2;

  /* Fonts */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-fraunces), Georgia, "Times New Roman", serif;

  /* Shadows - subtle, HubSpot uses borders not big shadows */
  --shadow-soft: 0 1px 2px rgba(20, 30, 25, 0.04);
  --shadow-card: 0 6px 22px -12px rgba(20, 30, 25, 0.18);
  --shadow-lift: 0 22px 48px -22px rgba(20, 30, 25, 0.28);

  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
}
```

**Token reference:**

| Token | Hex | Role |
|---|---|---|
| `--color-brand` | `#ff5c35` | The one flat accent — CTAs, icons, links, the emphasis word |
| `--color-brand-light` | `#ff7a59` | Lighter orange (on-dark link hover) |
| `--color-brand-dark` | `#e8431b` | Primary-button + link hover |
| `--color-brand-deep` | `#c9350f` | Deepest orange, rare |
| `--color-ink` | `#1c2b26` | Headings & primary text |
| `--color-ink-soft` | `#33403b` | Strong body text |
| `--color-slate` | `#4c534f` | Default body text |
| `--color-muted` | `#7a817d` | Captions / meta |
| `--color-mist` | `#f6f2ea` | Warm off-white section background |
| `--color-cream` | `#fbf8f2` | Lighter warm surface |
| `--color-peach` | `#ffe8dd` | Soft accent wash (hero radial, chips) |
| `--color-line` | `#e7e2d7` | Warm hairline / border — used everywhere |
| `--color-forest` | `#103129` | Dark-green CTA band |
| `--color-charcoal` | `#171814` | Footer near-black |
| `--color-teal` `--color-leaf` | `#1f7a8c` `#1f8a66` | Sparing accents |
| `--color-linkedin` | `#0a66c2` | LinkedIn brand blue |

> **Important:** the page `body` is pure white `#ffffff`, *not* a warm token. The
> warm tones (`mist`/`cream`/`peach`) are for **sections**, layered on white.

---

## 3. Typography

Two families, wired in §1: **Fraunces** (editorial serif) for display,
**Inter** (sans) for body/UI. All `h1–h4` default to the serif automatically.

Add this to `app/globals.css` after the `@theme` block:

```css
@layer base {
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  body {
    background: #ffffff;
    color: var(--color-slate);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  h1, h2, h3, h4 {
    font-family: var(--font-display);
    color: var(--color-ink);
    font-weight: 540;              /* signature variable-font weight */
    letter-spacing: -0.012em;
    line-height: 1.08;
    text-wrap: balance;
  }
  p { text-wrap: pretty; }
  ::selection { background: var(--color-brand); color: #fff; }
  :focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 3px;
    border-radius: 4px;
  }
}
```

The **fluid type scale** — use these classes for headings/lead everywhere instead
of raw Tailwind text sizes:

```css
@layer components {
  .text-display {
    font-size: clamp(2.7rem, 1.5rem + 4.4vw, 4.7rem);
    line-height: 1.02; letter-spacing: -0.018em; font-weight: 540;
  }
  .text-h2 {
    font-size: clamp(2.05rem, 1.4rem + 2.3vw, 3.3rem);
    line-height: 1.06; letter-spacing: -0.014em; font-weight: 540;
  }
  .text-h3 {
    font-size: clamp(1.35rem, 1.15rem + 0.7vw, 1.7rem);
    line-height: 1.16; font-weight: 560;
  }
  .lead {
    font-size: clamp(1.075rem, 1rem + 0.4vw, 1.28rem);
    line-height: 1.62; color: var(--color-slate);
  }
}
```

Signature moves: **weight `540`** on display headings (not 500/600), tight
negative tracking, and `text-wrap: balance`. Headlines routinely carry **one word
or phrase in italic brand orange** for emphasis:

```tsx
<h1 className="text-display">
  Your LinkedIn should be your most credible business asset.{" "}
  <span className="italic text-brand">We make it one.</span>
</h1>
```

---

## 4. Color usage

- **Text:** headings `text-ink`; body `text-slate`; strong body `text-ink-soft`;
  captions/meta `text-muted`.
- **Accent:** `text-brand` / `bg-brand` (`#ff5c35`) is the *only* accent. Hover to
  `brand-dark`. **No gradients, no glow** — `.text-gradient` is deliberately just
  solid orange.
- **Surfaces:** white base; warm `bg-mist` for alternating sections; `bg-cream`
  lighter; `bg-peach` for soft washes/chips.
- **Borders over shadows.** Warm `border-line` hairlines carry the structure;
  shadows (`--shadow-soft/-card/-lift`) are subtle and rare.
- **Dark zones** (`bg-forest` CTA, `bg-charcoal` footer) use a white opacity ramp:
  text `text-white` → `text-white/75` → `/70` → `/60`; hairlines `border-white/10`;
  rings `ring-white/15`; link hover `text-brand-light`.

---

## 5. Layout system

**Container** — one canonical width wrapper used by every section:

```css
@layer utilities {
  .container-x {
    width: 100%; max-width: 78rem; margin-inline: auto; padding-inline: 1.5rem;
  }
  @media (min-width: 1024px) { .container-x { padding-inline: 2.5rem; } }
}
```

**Vertical rhythm** — sections use `py-20 sm:py-24 lg:py-28` (tight variant
`py-16 sm:py-20`; the `Section` primitive's default is `py-20 sm:py-24 lg:py-32`).

**Section shell** (most sections inline this rather than using the primitive):

```tsx
<section id="…" className="bg-white py-20 sm:py-24 lg:py-28">
  <div className="container-x">…</div>
</section>
```

**Background alternation** down a page: `bg-white` ↔ `bg-mist` ↔ occasional dark
`bg-forest` / `bg-charcoal`.

**Asymmetric grids** are a signature — avoid perfectly even columns:
`lg:grid-cols-[1.05fr_0.95fr]` (hero), `lg:grid-cols-[0.85fr_1.4fr]` (intro +
cards), `lg:grid-cols-[14rem_1fr]` (sticky rail + content),
`lg:grid-cols-[2fr_3fr]` (testimonial).

**Sticky rails:** `lg:sticky lg:top-28 lg:self-start` on the intro column;
targets get `scroll-mt-28`.

**Dividers, not boxes.** Separate content with hairlines rather than nesting
cards: `.rule-dashed` (a dashed top border), `divide-y divide-line`, and dashed
column separators `md:border-l md:border-dashed md:border-line md:pl-10`.

```css
@layer components {
  .rule-dashed { border-top: 1px dashed var(--color-line); }
}
```

---

## 6. Component recipes

### Buttons (`components/ui/Button.tsx`)

Flat, square-ish, no gradients/glow. Renders a `<Link>` when `href` is set, else a
`<button>`. Four variants × two sizes, optional hover-arrow.

```tsx
const variants = {
  primary:   "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-white text-ink ring-1 ring-ink/20 hover:ring-ink/45",
  dark:      "bg-ink text-white hover:bg-ink-soft",
  light:     "bg-transparent text-white ring-1 ring-white/45 hover:bg-white/10",
};
const sizes = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-6 py-3 text-base",
};
// base:
"group inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200"
```

The `arrow` prop appends an icon that slides on hover via the parent `group`:

```tsx
<Icon name="arrow" className="h-[1.05em] w-[1.05em] transition-transform duration-200 group-hover:translate-x-0.5" />
```

### Eyebrow tag

Small bordered pill with a rotated orange square — the standard section kicker.

```css
@layer components {
  .eyebrow {
    display: inline-flex; align-items: center; gap: 0.45rem;
    font-family: var(--font-sans); font-size: 0.8rem; font-weight: 600;
    color: var(--color-ink); background: #fff;
    border: 1px solid var(--color-line); border-radius: 8px;
    padding: 0.32rem 0.72rem; text-transform: none;
  }
  .eyebrow::before {
    content: ""; width: 0.5rem; height: 0.5rem; border-radius: 2px;
    background: var(--color-brand); transform: rotate(45deg);
  }
}
```

### Card

```tsx
<div className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-colors hover:border-ink/25">
  …
  <div className="rule-dashed my-4" />   {/* divide with a hairline, not a nested box */}
  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-brand-dark">
    Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
  </span>
</div>
```

### Check-list row

```tsx
<li className="flex items-start gap-2.5 text-sm text-slate">
  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.4} />
  Conversion-led headline, about & banner
</li>
```

### Section heading (`components/ui/Section.tsx`)

```tsx
export function SectionHeading({ title, intro, align = "center" }) {
  const alignment = align === "center"
    ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <h2 className="text-h2">{title}</h2>
      {intro && <p className="lead">{intro}</p>}
    </div>
  );
}
```

### CTA band — always closes a page

```tsx
<section className="bg-forest py-20 sm:py-24 lg:py-28">
  <div className="container-x mx-auto max-w-3xl text-center">
    <h2 className="text-h2 text-white">
      Ready when you are<span className="text-brand">.</span>
    </h2>
    <p className="lead mt-4 text-white/75">…</p>
    <div className="mt-8"><Button href="/book" arrow>Book a Discovery Call</Button></div>
  </div>
</section>
```

### Interior page hero (`PageHero`)

```tsx
<section className="border-b border-line bg-mist">
  <div className="container-x py-16 sm:py-20 lg:py-24">
    <div className="max-w-3xl">
      <h1 className="text-display text-[clamp(2.5rem,1.5rem+3.2vw,3.9rem)]">{title}</h1>
      {intro && <p className="lead mt-6 max-w-2xl">{intro}</p>}
    </div>
  </div>
</section>
```

### Sticky, blur header

`sticky top-0 z-50`, height `h-[4.5rem]`. A scroll listener toggles a transparent
bar into `border-b border-line/80 bg-white/85 backdrop-blur-md` (`transition-all
duration-300`). Nav links are pills: `rounded-full px-4 py-2 text-[0.95rem]
font-medium`; active `bg-[#1a1a1a] text-white`, inactive `text-slate
hover:bg-mist hover:text-ink`.

### Dark footer

`bg-charcoal text-white/70`, grid `lg:grid-cols-[1.4fr_1fr_1fr_1fr]`, `py-14`.
Column headings `text-sm font-semibold uppercase tracking-wider text-white`; links
`text-white/60 hover:text-brand-light`; bottom bar split by `border-t
border-white/10`.

**Radii convention:** pills/chips/nav `rounded-full`; buttons & cards
`rounded-lg` / `rounded-xl`; media & large cards `rounded-2xl`.

---

## 7. Icons (`components/Icons.tsx`)

A bespoke line-icon set — **no icon library, no emoji.** One `<Icon>` component
switches on a typed `IconName` and renders a 24×24 stroked path.

- Base props: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`,
  `strokeWidth={1.6}`, rounded caps/joins, `aria-hidden="true"`.
- Color via text utilities (`text-brand`), size via `h-/w-` classes; `strokeWidth`
  is overridable per use (checks use `strokeWidth={2.4}`).

```tsx
<Icon name="check" className="h-4 w-4 text-brand" strokeWidth={2.4} />
```

The exported `IconName` union is the allow-list (content references icons by these
strings, so they are compile-time safe):

```
profile · pen · target · spark · compass · audit · trend · arrow ·
check · linkedin · menu · close · shield · clock · chat
```

Add new icons by extending the union and the `PATHS` record — keep the 1.6-stroke,
rounded, single-color style.

---

## 8. Motion

Use the `Reveal` primitive for scroll-triggered fade+rise. It respects reduced
motion and fires once.

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, className, delay = 0, y = 24, as = "div" }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
```

Staggering convention: `delay={i * 0.08}` down a list; `delay={(i % 2) * 0.08}`
in two-column grids.

Above-the-fold heroes use **CSS** stagger instead of Motion — `.animate-fade-up`
with inline arbitrary delays (`[animation-delay:80ms]`, `160ms`, `240ms`, `340ms`)
and `.animate-pop` for the hero visual. Add the keyframes/utilities:

```css
@layer utilities {
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .animate-marquee { animation: marquee 42s linear infinite; }

  @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-up { opacity: 0; animation: fade-up 0.7s var(--ease-out-soft) forwards; }
  .animate-pop { opacity: 0; animation: fade-up 0.8s var(--ease-out-soft) 0.15s forwards; }

  @keyframes float-soft { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  .animate-float-a { animation: float-soft 6s ease-in-out infinite; }
  .animate-float-b { animation: float-soft 7s ease-in-out 0.6s infinite; }
  .animate-float-c { animation: float-soft 5.5s ease-in-out 1s infinite; }

  @media (prefers-reduced-motion: reduce) {
    .animate-marquee, .animate-float-a, .animate-float-b, .animate-float-c { animation: none; }
    .animate-fade-up, .animate-pop { animation: none; opacity: 1; }
    html { scroll-behavior: auto; }
  }
}
```

> **Note.** The reference repo also contains a legacy `AnimateIn` reveal (custom
> hook + inline styles). For new sites, **standardize on `Reveal`** and drop
> `AnimateIn`.

---

## 9. Content architecture (`lib/content.ts`)

All copy and config live in one typed module. Components import from
`@/lib/content` and `.map()` over the arrays. The shape:

**Singletons** — `HERO { eyebrow, headline, headlineEmphasis }` (headline split so
the emphasis fragment can be styled italic/brand), `SITE { name, tagline, email,
linkedin }`, `CTAS { primary{label,href}, secondary{label,href} }`, `NAV
[{label,href}]`.

**Typed collections** — each has an exported `type`:

```ts
export type Service = { slug: string; icon: IconName; title: string; hook: string; description: string; points: string[]; };
export type Step = { no: string; icon: IconName; title: string; description: string; };
export type Testimonial = { quote: string; name: string; role: string; initials: string; accent: string; };
export type CaseStudy = { company; industry; region; duration; scope; metrics: {value,label}[]; quote; author; authorRole; accent; initials; image?; href?; };
// plus STATS [{value,label}], CLIENT_LOGOS [{name,src}], FAQS [{q,a}]
```

Conventions to copy: icons are the typed `IconName` union (never free strings);
the reused `{ value, label }` shape carries every stat/metric; `initials`+`accent`
avoid needing photos.

**Scheduler env + fallback** — the one env-driven value:

```ts
export const SCHEDULER_URL = process.env.NEXT_PUBLIC_SCHEDULER_URL ?? "";
```

When unset, a styled fallback card must still render. Keep that working.

---

## 10. Page composition rhythm

**Homepage** — a flat list of sections, each (except the hero) wrapped in a
reveal:

```
Hero → LogoMarquee (social proof) → Positioning → ServicesGrid →
HowWeWork (process) → Stats → Testimonials → CtaBand
```

**Interior pages** export their own `metadata`, render an inline hero
(`bg-mist`) or `PageHero`, then reuse shared sections (`Stats`, `Testimonials`,
`CtaBand`). Every page **closes with the shared `CtaBand`.** Copy unique to a
single page may live in a page-local array rather than `content.ts`.

---

## 11. Voice & tone

Confident, plain-spoken, second-person, benefit-first. Each service leads with a
short punchy **hook** ("Post every week without writing a word.") then a
**description** that names the pain, then the mechanism. Anti-hype: substance over
hacks, outcomes over vanity, partners not vendors. Metrics are always paired
`value` + `label` and framed as business outcomes.

Recurring motif line: *"We don't make you go viral. We make you credible to the
people who can say yes."*

> **Placeholder data is deliberate.** Testimonials, client logos, and some stats
> are owned by the client and intentionally fake. Do not replace them with
> invented "real" content — swap only when given genuine assets.

---

## 12. New-site quickstart checklist

1. Scaffold **Next.js 16 (App Router) + React 19 + TypeScript**; add
   **Tailwind v4** (`tailwindcss` + `@tailwindcss/postcss`, PostCSS plugin only —
   **no `tailwind.config.js`**) and **`motion`**. Set the `@/` alias to repo root.
2. In `app/globals.css`: `@import "tailwindcss";` then paste the **§2 `@theme`
   block**, the **§3 base + typography** layers, `.container-x` (§5), `.eyebrow` /
   `.rule-dashed` (§6), and the **§8 animation utilities**.
3. In `app/layout.tsx`: load **Inter** + **Fraunces** exactly as §1, apply the
   variables on `<html>`, set the metadata shell (title template `"%s · <Site>"`).
4. Port the primitives: `components/ui/Button.tsx`, `Section.tsx`, `Reveal.tsx`,
   and `components/Icons.tsx` (extend `IconName` for new glyphs).
5. Create `lib/content.ts` following the **§9** shape — all copy + config there.
6. Build section components and compose pages in the **§10 rhythm**; use §5–§6
   layout patterns (asymmetric grids, hairline dividers, sticky rails); wrap
   sections in `Reveal`; always end with `CtaBand`.
7. Verify: `npm run lint` **and** `npm run build` both pass.

Swap the brand palette only when a sibling brand truly differs — the *structure*
(serif+sans pairing, flat single accent, warm surfaces, borders-over-shadows,
dividers-not-boxes, reveal rhythm) is what makes it read as part of the Soch
ecosystem.
