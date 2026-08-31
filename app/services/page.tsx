// app/services/page.tsx

import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { ServicesFaqSection } from "@/components/sections/ServicesFaqSection";
import { AgentDevHero } from "@/components/diagrams/AgentDevHero";
import { OpsHero } from "@/components/diagrams/OpsHero";
import { SupportHero } from "@/components/diagrams/SupportHero";
import { MarketingHero } from "@/components/diagrams/MarketingHero";
import { RevOpsHero } from "@/components/diagrams/RevOpsHero";
import { getHeroAspectRatio } from "@/lib/heroAspectRatio";

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Services"
        heading="Services that turn strategy into results"
        sub="Five areas where AI automation replaces manual work with systems that run on their own."
        align="center"
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {SERVICES.map((service, i) => {
            const heroImage = service.heroImage;
            const firstDescription = Array.isArray(service.description)
              ? service.description[0]
              : service.description;
            const cardCopy = `${service.hook} ${firstDescription.split(". ")[0]}.`;
            const heroAspect = getHeroAspectRatio(service.slug) ?? "aspect-square";
            return (
            <Reveal key={service.slug} delay={i * 0.05} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-line bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-lg"
              >
                {service.slug === "ai-agent-development" ? (
                  // Proof-of-concept coded replacement for the baked hero PNG -
                  // scoped to this one service only. See AgentDevHero.tsx.
                  <div className={`relative ${heroAspect} w-full overflow-hidden rounded-2xl bg-mist p-1`}>
                    <AgentDevHero />
                  </div>
                ) : service.slug === "operations-process-automation" ? (
                  // Coded replacement for the baked hero PNG - scoped to
                  // this one service only. See OpsHero.tsx.
                  <div className={`relative ${heroAspect} w-full overflow-hidden rounded-2xl bg-mist p-1`}>
                    <OpsHero />
                  </div>
                ) : service.slug === "customer-support-automation" ? (
                  // Coded replacement for the baked hero PNG - scoped to
                  // this one service only. See SupportHero.tsx.
                  <div className={`relative ${heroAspect} w-full overflow-hidden rounded-2xl bg-mist p-1`}>
                    <SupportHero />
                  </div>
                ) : service.slug === "marketing-automation" ? (
                  // Coded replacement for the baked hero PNG - scoped to
                  // this one service only. See MarketingHero.tsx.
                  <div className={`relative ${heroAspect} w-full overflow-hidden rounded-2xl bg-mist p-1`}>
                    <MarketingHero />
                  </div>
                ) : service.slug === "revops-automation" ? (
                  // Coded replacement for the baked hero PNG - scoped to
                  // this one service only. See RevOpsHero.tsx.
                  <div className={`relative ${heroAspect} w-full overflow-hidden rounded-2xl bg-mist p-1`}>
                    <RevOpsHero />
                  </div>
                ) : (
                  heroImage && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-mist">
                      <Image
                        src={heroImage}
                        alt={`${service.title} hero`}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  )
                )}
                <div className="flex flex-1 flex-col gap-4">
                  <h3 className="text-h3">{service.title}</h3>
                  <p className="line-clamp-2 min-h-[3lh] text-slate">{cardCopy}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.points.map((point) => (
                      <span
                        key={point}
                        className="rounded-full bg-peach px-2.5 py-1 text-xs font-semibold text-brand"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="rule-dashed" />
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-brand-dark">
                    Explore service
                    <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
            );
          })}
        </div>
      </Section>

        <ServicesFaqSection />

        <CtaBand />
    </main>
  );
}
