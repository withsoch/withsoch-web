// components/sections/CtaBand.tsx

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
    <section className="bg-forest py-20 sm:py-24 lg:py-28">
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
