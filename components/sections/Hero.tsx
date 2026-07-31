// components/sections/Hero.tsx

import { HERO } from "@/lib/content";
import { CTAS } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-white py-24 sm:py-28 lg:py-32">
      <div className="container-x flex flex-col items-center text-center gap-6">
        <span className="eyebrow">{HERO.eyebrow}</span>
        <h1 className="text-display max-w-3xl">
          {HERO.headline}{" "}
          <span className="italic text-brand">{HERO.headlineEmphasis}</span>
        </h1>
        <p className="lead max-w-2xl">{HERO.sub}</p>
        <Button href={CTAS.primary.href} variant="primary" size="lg" arrow>
          {CTAS.primary.label}
        </Button>
      </div>
    </section>
  );
}
