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
          <h1 className="text-display text-[clamp(2.5rem,1.5rem+3.2vw,3.9rem)]">
            {ABOUT_HERO.headline}
          </h1>
          <p className="lead mt-2 max-w-2xl">{ABOUT_HERO.sub}</p>
          <div className="mt-4">
            <Button href={ABOUT_HERO.ctaHref} size="lg" arrow>
              {ABOUT_HERO.ctaLabel}
            </Button>
          </div>
        </div>

        {/* Collage row - asymmetric 3-up, real photography (hotlinked) */}
        <div
          className="mt-12 grid gap-4 sm:gap-6 lg:w-[calc(100%+6rem)] lg:-mx-12"
          style={{ gridTemplateColumns: "0.9fr 1.2fr 0.65fr" }}
        >
          <img
            src="/images/about/team-discussion.webp"
            alt="With Soch team collaborating with founders to build clarity and growth."
            className="h-80 w-full rounded-xl border border-line object-cover sm:h-[30rem]"
          />
          <img
            src="/images/about/team-table.webp"
            alt="With Soch strategists aligning teams for sustainable business growth."
            className="h-80 w-full rounded-xl border border-line object-cover sm:h-[30rem]"
          />
          <img
            src="/images/about/whiteboard-matrix.webp"
            alt="With Soch operators guiding founders through strategy and execution."
            className="h-80 w-full rounded-xl border border-line object-cover sm:h-[30rem]"
          />
        </div>

        {/* Industry tags footer row */}
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          {ABOUT_HERO.tags.map((tag, i) => (
            <span key={tag} className="flex items-center gap-3">
              {tag}
              {i < ABOUT_HERO.tags.length - 1 && (
                <span className="text-line" aria-hidden="true">
                  |
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
