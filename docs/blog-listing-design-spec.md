# Blog Pages — Design Spec (Portable)

Reusable spec for replicating the Soch-style blog listing page (1 large featured
card + a responsive grid of small cards) and the individual blog post page
(split hero + sticky table-of-contents article layout) in any Next.js +
Tailwind project. Copy this whole file into a new project and hand it to
Claude verbatim.

This file has two parts:
- **Part A — Blog listing page** (`/blog`)
- **Part B — Individual blog post page** (`/blog/[slug]`)

## Part A — Blog listing page

## Stack assumptions

- Next.js (App Router) + `next/image` + `next/link`
- Tailwind CSS v4 (`@theme` tokens in `globals.css`)
- Framer Motion (or equivalent) for the scroll-reveal effect
- Font: a single sans family, weight 500 for headings, weight 400 for body
  (reference used Wix Madefor Text — swap for your brand font)

## 1. Design tokens (`globals.css` `@theme` block)

```css
@theme {
  /* Brand */
  --color-brand: #ff5c35;
  --color-brand-light: #ff7a59;
  --color-brand-dark: #e8431b;

  /* Text */
  --color-ink: #1c2b26;      /* headings / dark text */
  --color-slate: #4c534f;    /* body / excerpt text */
  --color-muted: #636a66;    /* dates / meta text */

  /* Surfaces */
  --color-mist: #f6f2ea;     /* image placeholder bg */
  --color-cream: #fbf8f2;
  --color-peach: #ffe8dd;    /* category pill bg */
  --color-line: #e7e2d7;     /* card borders */

  /* Shadows — borders preferred over shadows; shadow only appears on hover */
  --shadow-card: 0 6px 22px -12px rgba(20, 30, 25, 0.18);

  /* Motion */
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Swap the hex values for your brand palette; keep the *roles* (`brand`,
`ink`, `slate`, `muted`, `mist`, `peach`, `line`) so the component classes
below need no renaming.

## 2. Heading/type scale (`@layer components`)

```css
@layer components {
  .text-h3 {
    font-size: clamp(1.625rem, 1.35rem + 1.1vw, 2.25rem);
    line-height: 1.12;
    letter-spacing: -0.013em;
    font-weight: 500;
  }
}
```
Used for the featured card's title. Small-card titles just use `text-16 font-medium`.

## 3. Page structure

```tsx
const [featured] = posts;
const gridPosts = posts.slice(1); // everything after the featured post

<main className="flex-1">
  <Section className="bg-white">
    {featured && (
      <Reveal><BlogCardFeatured post={featured} /></Reveal>
    )}
    {gridPosts.length > 0 && (
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gridPosts.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 0.08}>
            <BlogCardSmall post={post} />
          </Reveal>
        ))}
      </div>
    )}
  </Section>
</main>
```

- Grid: 1 col mobile → 2 col tablet (`sm`) → 3 col desktop (`lg`), `gap-6` (24px).
- `mt-8` (32px) gap between featured card and grid.
- Grid items stagger-fade in, delay `(i % 3) * 0.08` seconds — cascades each
  row of 3 left-to-right.

## 4. Featured card (`BlogCardFeatured`)

```tsx
<Link
  href={`/blog/${post.slug}`}
  className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-200 hover:border-ink/20 hover:shadow-card lg:flex-row"
>
  <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist lg:aspect-auto lg:w-[52%] lg:min-h-[30rem]">
    <Image
      src={post.image}
      alt={post.title}
      fill
      priority
      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      sizes="(min-width: 1024px) 52vw, 100vw"
    />
  </div>
  <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12">
    <CategoryPill category={post.category} />
    <h2 className="text-h3 transition-colors group-hover:text-brand">
      {post.title}
    </h2>
    <p className="text-slate line-clamp-3">{post.excerpt}</p>
    <span className="text-16 text-muted">{formatPostDate(post.date)}</span>
  </div>
</Link>
```

Key rules:
- Stacked (`flex-col`) on mobile/tablet; side-by-side (`lg:flex-row`) at desktop.
- Image: `aspect-[16/10]` on mobile/tablet; on desktop, fixed `52%` width +
  `min-h-[30rem]` (480px), no forced aspect ratio (fills the row height).
- Card: `rounded-xl`, `border border-line`, idle state has **no shadow**.
  On hover: `border-ink/20` + `shadow-card` (`duration-200`).
- Image zooms `scale-[1.02]` on hover (`duration-300`).
- Title recolors to brand on hover.
- Content padding scales `p-8 → sm:p-10 → lg:p-12`, vertically centered,
  `gap-4` between pill/title/excerpt/date.

## 5. Small grid card (`BlogCardSmall`)

```tsx
<Link
  href={`/blog/${post.slug}`}
  className="group flex h-full items-stretch gap-4 overflow-hidden rounded-xl border border-line bg-white p-3 transition-all duration-200 hover:border-ink/20 hover:shadow-card"
>
  <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-mist sm:w-28">
    <Image
      src={post.image}
      alt={post.title}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      sizes="120px"
    />
  </div>
  <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-1 pr-2">
    <CategoryPill category={post.category} />
    <h3 className="text-16 font-medium leading-snug text-ink line-clamp-2 transition-colors group-hover:text-brand">
      {post.title}
    </h3>
    <span className="text-14 text-muted">{formatPostDate(post.date)}</span>
  </div>
</Link>
```

Key rules:
- Horizontal layout: square thumbnail left (`w-24 sm:w-28`, ~96–112px),
  text right.
- Same border/hover treatment as the featured card (consistency is the point).
- Card padding `p-3` (12px), inner gap `gap-4`; text block `gap-2`, vertically centered.
- Title: `text-16 font-medium leading-snug line-clamp-2`, hover → brand color.
- Date: `text-14 text-muted`.

## 6. Category pill (shared component)

```tsx
function CategoryPill({ category }: { category: string }) {
  return (
    <span className="inline-block w-fit max-w-full shrink-0 truncate rounded-full bg-peach px-3.5 py-1.5 text-16 font-medium leading-none text-brand">
      {category}
    </span>
  );
}
```

## 7. Scroll-reveal wrapper (`Reveal`)

```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
```

## 8. Section shell

```tsx
export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`section-y ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
```

```css
@layer utilities {
  .container-x {
    width: 100%;
    max-width: 78rem;
    margin-inline: auto;
    padding-inline: 1.5rem;
  }
  @media (min-width: 1024px) {
    .container-x { padding-inline: 2.5rem; }
  }
  .section-y {
    padding-block: clamp(3.75rem, 2.5rem + 3.6vw, 5.5rem);
  }
}
```

## Design principles to preserve when porting

1. **Borders over shadows.** Cards are flat with a hairline border
   (`border-line`) at rest; a soft shadow only appears on hover, alongside a
   slightly darker border. Never give cards a resting shadow.
2. **One card treatment, two layouts.** The featured and small cards share
   identical border/radius/hover/transition rules — only the internal layout
   (stacked vs. horizontal) and image size differ. Keep this shared visual
   language when adapting.
3. **Subtle motion only.** Image zoom is capped at `scale-[1.02]`; hover
   transitions are `200–300ms`; scroll-reveal moves elements only `18px`
   vertically. Nothing should feel bouncy or large-scale.
4. **Category pill uses a tinted, not solid, background** (`peach` bg +
   `brand` text), never the solid brand color as a fill.
5. **Rounded-xl cards, rounded-lg thumbnails** — the thumbnail radius is one
   step smaller than the card radius.
6. **Stagger the grid reveal**, not the featured card, and cap the stagger
   pattern per-row (`i % columns`) so later rows don't have compounding delay.

---

## Part B — Individual blog post page (`/blog/[slug]`)

Split hero (text left, contained image right) on a tinted background,
followed by a two-column content zone: sticky "In this article" TOC rail +
the markdown article.

### 1. Hero section wrapper

```tsx
<section className="border-b border-line bg-mist">
  <div className="container-x grid grid-cols-1 items-center gap-10 py-10 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:py-14">
    {/* text column */}
    {/* image column */}
  </div>
</section>
```

- Background: `bg-mist` (tinted, not white) with a bottom hairline
  `border-b border-line` separating it from the content below.
- Single column on mobile → `lg:grid-cols-2` at desktop, vertically centered
  (`items-center`).
- Padding scales `py-10 → sm:py-12 → lg:py-14`; gap scales `gap-10 → lg:gap-14`.

### 2. Text column (left)

```tsx
<Reveal>
  <div className="flex max-w-2xl flex-col gap-4">
    <span className="eyebrow w-fit">{category}</span>
    <h1 className="text-h2">{title}</h1>
    <div className="flex items-center gap-2 text-sm text-slate">
      <span>{date}</span>
      <span aria-hidden="true">&middot;</span>
      <span>{readingTime} min read</span>
    </div>
  </div>
</Reveal>
```

- Category pill uses an `eyebrow` utility class (a badge/label style distinct
  from the listing page's `CategoryPill` — define one shared `eyebrow` class
  in your theme: rounded pill, brand-tinted, small caps or bold label look).
  `w-fit` keeps it from stretching full-width.
- Title is `<h1 className="text-h2">` — deliberately reuses the `h2` scale
  token rather than a dedicated `h1` size, since `h2` is already large enough
  for a single-post hero and keeps consistent visual weight with the rest of
  the site's H2s.
- Meta row: `flex items-center gap-2 text-sm text-slate`, date and reading
  time joined by a `&middot;` separator span (`aria-hidden`).
- Column capped at `max-w-2xl`; vertical rhythm via `flex flex-col gap-4`.
- Wrapped in `<Reveal>` (no delay) for the entrance fade/rise.

### 3. Image column (right)

```tsx
<Reveal delay={0.1}>
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line shadow-card">
    <Image
      src={image}
      alt={title}
      fill
      priority
      sizes="(min-width: 1024px) 42vw, 100vw"
      className="object-cover"
    />
  </div>
</Reveal>
```

- Container: `aspect-[4/3]`, `rounded-2xl` (one step larger radius than the
  listing-page cards' `rounded-xl`), `border border-line`, **and** a resting
  `shadow-card` — unlike the listing cards, the hero image carries a shadow
  at rest (it's a hero visual, not an interactive card, so the "shadow only
  on hover" rule doesn't apply here).
- `next/image` with `fill priority` (it's the LCP element) and responsive
  `sizes="(min-width: 1024px) 42vw, 100vw"`.
- Wrapped in `<Reveal delay={0.1}>` so it fades in slightly after the text
  column — a staggered pair, not a simultaneous reveal.

### 4. Responsive/spacing summary

| Element | Mobile | sm | lg |
|---|---|---|---|
| Hero grid | 1 col | — | 2 col (`lg:grid-cols-2`) |
| Hero padding | `py-10` | `py-12` | `py-14` |
| Hero gap | `gap-10` | — | `gap-14` |
| Hero image `sizes` | 100vw | — | 42vw at ≥1024px |

### 5. Principles to preserve (hero)

1. **Hero background is tinted (`mist`)**, distinct from the white page
   background below it — bottom hairline (`border-b border-line`) marks the
   handoff.
2. **Hero image gets a resting shadow** (`shadow-card` at rest, not just on
   hover) — it's a static visual, not an interactive card.
3. **Reuse the `h2` type scale for the post `h1`.** Don't introduce a bigger
   dedicated `h1` size just because it's technically the page's `h1`.
4. **Text and image reveal with a slight stagger** (`0` then `0.1s` delay)
   using the same `Reveal` component/easing as the rest of the site.
