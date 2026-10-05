// components/AboutHero.tsx
//
// About page-specific hero - distinct from the shared PageHero (which stays
// untouched for Services/Team/Contact). Adds a headline + CTA, a 3-image
// collage row (asymmetric widths, hotlinked photography - same approach as
// the case study carousel), and an industry-tags footer row. Flat cream
// background, no gradients/glow.

import { ABOUT_HERO } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function AboutHero() {
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-4 text-center">
          <span className="eyebrow w-fit">About Soch</span>
          <h1 className="text-h1-page">
            {ABOUT_HERO.headline}
          </h1>
          <p className="text-lead mt-2 max-w-2xl">{ABOUT_HERO.sub}</p>
          <div className="mt-4">
            <Button href={ABOUT_HERO.ctaHref} size="lg" arrow>
              {ABOUT_HERO.ctaLabel}
            </Button>
          </div>
        </div>

        {/* Collage row - asymmetric 3-up, real photography (hotlinked).
            From md up: the 3-up row at a fixed 30rem height. Below md the
            three columns collapse to slivers (~55-120px wide at phone
            widths) that crop each photo to a strip, so instead the landscape
            shot runs full width on top and the two portraits sit side by
            side under it - each at its own 3:2 / 2:3 ratio, so nothing is
            cropped. */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-[0.9fr_1.2fr_0.65fr] lg:w-[calc(100%+6rem)] lg:-mx-12">
          <img
            src="/images/about/team-discussion.webp"
            alt="With Soch team collaborating with founders to build clarity and growth."
            className="aspect-[2/3] w-full rounded-xl border border-line object-cover md:aspect-auto md:h-[30rem]"
          />
          <img
            src="/images/about/team-table.webp"
            alt="With Soch strategists aligning teams for sustainable business growth."
            className="col-span-2 row-start-1 aspect-[3/2] w-full rounded-xl border border-line object-cover md:col-span-1 md:row-start-auto md:aspect-auto md:h-[30rem]"
          />
          <img
            src="/images/about/whiteboard-matrix.webp"
            alt="With Soch operators guiding founders through strategy and execution."
            className="aspect-[2/3] w-full rounded-xl border border-line object-cover md:aspect-auto md:h-[30rem]"
          />
        </div>

        {/* Industry tags footer row. Each tag carries a leading separator, and
            the row is pulled left by exactly separator + its gap (the row's
            own gap-x only sits between items, never before a line's first)
            inside an overflow-hidden wrapper - so whichever tag starts a line
            has its separator clipped. With trailing separators, every wrapped
            line ended in a dangling "|" (one per line on phones). */}
        <div className="mt-10 overflow-hidden">
          {/* 0.247em = advance width of "|" in Wix Madefor Text. */}
          <div className="-ml-[calc(0.75rem+0.247em)] flex flex-wrap items-center gap-x-3 gap-y-2 text-16 text-muted">
            {ABOUT_HERO.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="text-line" aria-hidden="true">
                  |
                </span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
