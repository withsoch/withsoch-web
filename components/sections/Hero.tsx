// components/sections/Hero.tsx

import { HERO } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { HeroNetworkDiagram } from "@/components/sections/HeroNetworkDiagram";

export function Hero() {
  return (
    <section className="relative bg-mist pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24 overflow-hidden">
      <div className="container-x relative h-[300px] sm:h-[360px] lg:h-[440px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />
        <HeroNetworkDiagram />
      </div>
      <div className="container-x relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mt-1 lg:mt-2">
        <div className="flex flex-col items-start text-left gap-4 min-w-0 max-w-2xl lg:max-w-3xl">
          <h1 className="text-display lg:text-[clamp(2.2rem,1.5rem+3vw,4rem)]">
            {HERO.headline}{" "}
            <span className="italic text-brand">{HERO.headlineEmphasis}</span>
          </h1>
        </div>
        <Button
          href="/services"
          variant="primary"
          size="lg"
          arrow
          className="shrink-0 lg:mb-2"
        >
          Explore our services
        </Button>
      </div>
    </section>
  );
}
