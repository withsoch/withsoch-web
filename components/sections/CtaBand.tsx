// components/sections/CtaBand.tsx

import { CTAS } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function CtaBand() {
  return (
    <Section tight className="bg-forest">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-h2 text-white">
          Most early-stage teams are 5 automations away from feeling in control.
        </h2>
        <p className="lead max-w-xl text-white/80">
          Book a free call and we&apos;ll show you where automation creates the most leverage
          in your business.
        </p>
        <Button href={CTAS.primary.href} variant="light" size="lg" arrow>
          {CTAS.primary.label}
        </Button>
      </div>
    </Section>
  );
}
