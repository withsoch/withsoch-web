// components/AboutHero.tsx
//
// About page-specific hero — distinct from the shared PageHero (which stays
// untouched for Services/Team/Contact). Adds a headline + CTA, a 3-image
// collage row (bg-mist placeholders per DESIGN.md/IndustriesSlider pattern,
// swap for real photography once assets are handed over), and an
// industry-tags footer row. Flat cream background, no gradients/glow.

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

        {/* Collage row — placeholder imagery, real photography TODO */}
        <div className="mt-12 flex gap-4 sm:gap-6">
          <div className="aspect-square h-56 shrink-0 rounded-2xl border border-line bg-cream sm:h-64" />
          <div className="aspect-[16/10] h-56 flex-1 rounded-2xl border border-line bg-cream sm:h-64" />
          <div className="aspect-[3/4] h-56 shrink-0 rounded-2xl border border-line bg-cream sm:h-64" />
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
