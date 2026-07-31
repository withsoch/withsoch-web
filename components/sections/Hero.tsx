// components/sections/Hero.tsx

import { HERO } from "@/lib/content";
import { CTAS } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { HeroNetworkDiagram } from "@/components/sections/HeroNetworkDiagram";

export function Hero() {
  return (
    <section className="relative bg-white py-24 sm:py-28 lg:py-32 overflow-hidden">
      <HeroNetworkDiagram />
      <div className="container-x relative flex flex-col items-start text-left gap-6 lg:min-h-[460px] lg:justify-end lg:pb-12">
        <span className="eyebrow">{HERO.eyebrow}</span>
        <h1 className="text-display max-w-2xl min-w-0 lg:max-w-4xl lg:text-[clamp(2.2rem,1.5rem+3vw,4rem)]">
          {HERO.headline}{" "}
          <span className="italic text-brand">{HERO.headlineEmphasis}</span>
        </h1>
        <Button
          href={CTAS.primary.href}
          variant="primary"
          size="lg"
          arrow
          className="lg:absolute lg:bottom-12 lg:right-12"
        >
          {CTAS.primary.label}
        </Button>
      </div>
    </section>
  );
}
