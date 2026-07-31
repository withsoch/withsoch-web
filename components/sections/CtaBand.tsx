// components/sections/CtaBand.tsx

import { CTAS, CTA_BAND } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section className="bg-forest py-20 sm:py-24 lg:py-28">
      <div className="container-x mx-auto max-w-3xl text-center">
        <h2 className="text-h2 text-white">{CTA_BAND.heading}</h2>
        <p className="lead mt-4 text-white/75">{CTA_BAND.lead}</p>
        <div className="mt-8">
          <Button href={CTAS.primary.href} variant="light" size="lg" arrow>
            {CTAS.primary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
