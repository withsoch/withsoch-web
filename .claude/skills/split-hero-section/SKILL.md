---
name: split-hero-section
description: >-
  Two-column "text left, contained photo right" hero pattern for inner pages
  (e.g. /blog). Covers sizing rules that keep the section from looking empty
  or oversized, when to keep the image full-bleed vs. contained, and the
  Reveal-based entrance animation. Use when building or redesigning a page
  hero that pairs a heading/subheading block with a supporting photo, or when
  a hero "looks empty", "too tall", or the image "looks too small".
---

# Split Hero Section (text + contained image)

A two-column inner-page hero: heading/subheading on one side, a real
photographic image on the other. Built and tuned on `/blog`
(`components/sections/BlogHero.tsx`) in the withsoch-web repo — read that file
as the reference implementation.

## The failure modes this pattern avoids

Three broken variants were tried, in this order, before landing on the fix:

1. **Diagram/illustration instead of a real photo** — an SVG built from
   in-house shapes read as decoration, not content. If the request calls for
   an image "representing" the section, use a real photo, not an abstract
   diagram.
2. **Image capped small (`max-w-lg`) inside a tall, loosely-padded section** —
   this leaves visible empty space around the image and makes the whole
   section feel oversized and half-empty. Symptom: user says "the section
   looks empty" / "too big".
3. **Image bled full-height to the viewport edge, overlapping the header** —
   overcorrecting for #2 by stretching the image edge-to-edge (matching some
   agency reference sites) instead looked broken here because it collided
   with the fixed header and had no visual containment. Symptom: user says
   "this totally looks bad, scrap the image."

## The fix: contained, proportioned, height-matched

```tsx
<section className="border-b border-line bg-mist">
  <div className="container-x grid grid-cols-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-20">
    <Reveal>
      <div className="flex max-w-xl flex-col gap-5">
        <span className="eyebrow w-fit">Blog</span>
        <h1 className="text-h1-page">
          Our <span className="italic text-brand">Blog</span>
        </h1>
        <p className="text-lead max-w-lg">Subheading copy.</p>
      </div>
    </Reveal>

    <Reveal delay={0.1}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line shadow-card lg:aspect-[5/4]">
        <Image src="/images/..." alt="..." fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
      </div>
    </Reveal>
  </div>
</section>
```

Rules that make this hold together:

- **Keep the image inside `container-x`** — never let it bleed to the
  viewport edge on an inner page with a fixed header; there's nothing to
  visually contain it and it collides with the header.
- **Give the image a real aspect ratio** (`aspect-[4/3]`/`aspect-[5/4]`), not
  a fixed pixel height and not `fill` with no ratio — this is what keeps it
  from reading as "too small" inside a tall box.
- **Card-ify it**: `rounded-2xl border border-line shadow-card` so it reads
  as a deliberate photo card matching the site's existing card language, not
  a stray image tag.
- **`items-center` on the grid**, not `items-stretch` with the image
  force-stretched to match text height — let the aspect ratio set the height
  and let the grid center both columns instead.
- **Section padding stays moderate** (`py-16 sm:py-20 lg:py-20`, not
  `lg:py-24`+) — the previous "empty" complaint was as much about excess
  section padding as it was about the small image.
- Wrap each column in its own `Reveal` (see `components/ui/Reveal.tsx`) with
  a small stagger (`delay={0.1}` on the image) — fade+rise, once, respects
  reduced motion.
- Reference photos should be real, on-brand images (warm neutrals, brand-orange
  accents read naturally against `bg-mist`/`bg-white`) — not stock-looking
  generic shots, and not abstract graphics standing in for "an image."

## When the user asks for full-bleed / agency-reference styling instead

Some reference screenshots (e.g. an agency "About" hero) show the image
bleeding to the full viewport edge with only the leading corner rounded. That
pattern only works when: the header is not fixed/sticky over the hero, the
image column has no competing card border, and the section is allowed to
extend to the true edge of the layout. Don't reach for it as the default fix
for "image looks too small" — check with the user first, since on this
codebase it collided with the fixed header and was explicitly rejected.
