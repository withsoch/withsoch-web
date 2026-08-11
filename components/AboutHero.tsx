// components/AboutHero.tsx
//
// About page-specific hero — distinct from the shared PageHero (which stays
// untouched for Services/Team/Contact). Adds a headline + CTA, a 3-image
// collage row (asymmetric widths, hotlinked photography — same approach as
// the case study carousel), and an industry-tags footer row. Flat cream
// background, no gradients/glow.

import { ABOUT_HERO } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function AboutHero() {
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl flex flex-col gap-4">
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

        {/* Collage row — asymmetric 3-up, real photography (hotlinked) */}
        <div
          className="mt-12 grid gap-4 sm:gap-6"
          style={{ gridTemplateColumns: "0.9fr 1.2fr 0.65fr" }}
        >
          <img
            src="https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/694e79f2275434728f3dd265_Team%20disscussion.webp"
            alt="With Soch team collaborating with founders to build clarity and growth."
            className="h-56 w-full rounded-xl border border-line object-cover sm:h-64"
          />
          <img
            src="https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/694e7967b85d6f317982e567_Team%20sitting%20on%20the%20table.webp"
            alt="With Soch strategists aligning teams for sustainable business growth."
            className="h-56 w-full rounded-xl border border-line object-cover sm:h-64"
          />
          <img
            src="https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/694e797d64ddbcf428d8f7fc_White%20board%20matrixs%20disscused%20with%20team.webp"
            alt="With Soch operators guiding founders through strategy and execution."
            className="h-56 w-full rounded-xl border border-line object-cover sm:h-64"
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
