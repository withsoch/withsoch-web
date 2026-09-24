# Blog Post Hero — Design Spec (Portable)

Split hero (text left, contained image right) on a tinted background, used
at the top of an individual blog post page (`/blog/[slug]`). Copy this file
into a new project and hand it to Claude verbatim.

## Stack assumptions

- Next.js (App Router) + `next/image`
- Tailwind CSS v4 (`@theme` tokens in `globals.css`)
- Framer Motion (or equivalent) for the entrance animation
- Tokens referenced below (`mist`, `line`, `slate`, `brand-dark`, `card` shadow,
  `text-h2`, `container-x`, `eyebrow`) should already exist in your theme —
  swap values, keep the roles.

## 1. Hero section wrapper

```tsx
<section className="border-b border-line bg-mist">
  <div className="container-x grid grid-cols-1 items-center gap-10 py-10 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:py-14">
    {/* text column */}
    {/* image column */}
  </div>
</section>
```

- Background: `bg-mist` (tinted, not white), with a bottom hairline
  `border-b border-line` separating it from the content below.
- Single column on mobile → `lg:grid-cols-2` at desktop, vertically centered
  (`items-center`).
- Padding scales `py-10 → sm:py-12 → lg:py-14`; gap scales `gap-10 → lg:gap-14`.

## 2. Text column (left)

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

- Category pill uses an `eyebrow` utility class (rounded pill, brand-tinted
  label look). `w-fit` keeps it from stretching full-width.
- Title is `<h1 className="text-h2">` — deliberately reuses the `h2` scale
  token rather than a dedicated `h1` size; keeps consistent visual weight
  with the rest of the site's H2s.
- Meta row: `flex items-center gap-2 text-sm text-slate`, date and reading
  time joined by a `&middot;` separator span (`aria-hidden`).
- Column capped at `max-w-2xl`; vertical rhythm via `flex flex-col gap-4`.
- Wrapped in `<Reveal>` (no delay) for the entrance fade/rise.

## 3. Image column (right)

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

- Container: `aspect-[4/3]`, `rounded-2xl`, `border border-line`, **and** a
  resting `shadow-card` — the hero image carries a shadow at rest (it's a
  static visual, not an interactive hover card).
- `next/image` with `fill priority` (it's the LCP element) and responsive
  `sizes="(min-width: 1024px) 42vw, 100vw"`.
- Wrapped in `<Reveal delay={0.1}>` so it fades in slightly after the text
  column — a staggered pair, not a simultaneous reveal.

## 4. Responsive/spacing summary

| Element | Mobile | sm | lg |
|---|---|---|---|
| Hero grid | 1 col | — | 2 col (`lg:grid-cols-2`) |
| Hero padding | `py-10` | `py-12` | `py-14` |
| Hero gap | `gap-10` | — | `gap-14` |
| Hero image `sizes` | 100vw | — | 42vw at ≥1024px |

## 5. Principles to preserve

1. **Hero background is tinted (`mist`)**, distinct from the white page
   background below it — bottom hairline (`border-b border-line`) marks the
   handoff.
2. **Hero image gets a resting shadow** (`shadow-card` at rest, not just on
   hover) — it's a static visual, not an interactive card.
3. **Reuse the `h2` type scale for the post `h1`.** Don't introduce a bigger
   dedicated `h1` size just because it's technically the page's `h1`.
4. **Text and image reveal with a slight stagger** (`0` then `0.1s` delay)
   using the same `Reveal` component/easing as the rest of the site.
