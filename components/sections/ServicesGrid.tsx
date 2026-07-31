// components/sections/ServicesGrid.tsx

import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";

export function ServicesGrid() {
  return (
    <Section className="bg-mist">
      <SectionHeading
        title="Services that turn strategy into results"
        intro="Five areas where AI automation replaces manual work with systems that run on their own."
      />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex flex-col gap-4 rounded-2xl bg-white p-7 shadow-soft ring-1 ring-line hover:shadow-card hover:ring-ink/15 transition-all duration-200"
          >
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
          </Link>
        ))}
      </div>
    </Section>
  );
}
