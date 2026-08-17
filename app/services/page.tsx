// app/services/page.tsx

import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICE_DIAGRAMS } from "@/components/sections/ServiceCardDiagrams";
import { ServicesFaqSection } from "@/components/sections/ServicesFaqSection";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Diagram = SERVICE_DIAGRAMS[service.slug];
            return (
            <Reveal key={service.slug} delay={i * 0.05}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col gap-4 rounded-xl border border-line bg-white p-6 transition-colors hover:border-ink/25"
              >
                {Diagram && (
                  <div className="h-28 w-full rounded-lg bg-mist">
                    <Diagram />
                  </div>
                )}
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-peach text-brand">
                  <Icon name={service.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-h3">{service.title}</h3>
                <p className="text-slate">{service.hook}</p>
                <ul className="mt-1 flex flex-col gap-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-slate">
                      <Icon name="check" className="h-4 w-4 shrink-0 text-leaf" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="rule-dashed my-1" />
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-brand-dark">
                  Explore service
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
            );
          })}
        </div>
      </Section>

      <Reveal as="section">
        <ServicesFaqSection />
      </Reveal>

      <Reveal as="section">
        <CtaBand />
      </Reveal>
    </main>
  );
}
