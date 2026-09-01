// components/sections/CtaBand.tsx
//
// Closes every page. Deliberately the hardest edge on the site: forest
// against a light surface is an ~85% lightness jump, and that contrast is
// the point - it marks the end of the page rather than another section.

import { CTAS, CTA_BAND } from "@/lib/content";
import { Button } from "@/components/ui/Button";

type CtaBandProps = {
  override?: { heading?: string; buttonLabel?: string; buttonHref?: string };
};

export function CtaBand({ override }: CtaBandProps = {}) {
  const heading = override?.heading ?? CTA_BAND.heading;
  const buttonLabel = override?.buttonLabel ?? CTAS.primary.label;
  const buttonHref = override?.buttonHref ?? CTAS.primary.href;

  return (
    // Asymmetric padding: the band closes the page, so it needs air above the
    // heading but not a large gap under the button before the footer.
    <section className="bg-forest pt-[var(--space-section)] pb-[calc(var(--space-section)*0.72)]">
      <div className="container-x mx-auto max-w-3xl text-center">
        <h2 className="text-h2 text-white">{heading}</h2>
        <p className="lead mt-4 text-white/75">{CTA_BAND.lead}</p>
        <div className="mt-8">
          <Button href={buttonHref} variant="light" size="lg" arrow>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
