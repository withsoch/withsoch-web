// components/sections/Hero.tsx

import { HERO } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { HeroNetworkDiagram } from "@/components/sections/HeroNetworkDiagram";

export function Hero() {
  return (
    <section
      className="bg-mist relative overflow-hidden pt-4 pb-14 sm:pt-5 sm:pb-16 lg:pt-6 lg:pb-20"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 2rem), 0 100%)" }}
    >
      <div className="container-x relative h-[240px] sm:h-[280px] lg:h-[340px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />
        <HeroNetworkDiagram />
      </div>
      <div className="container-x relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mt-0 lg:mt-1">
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
