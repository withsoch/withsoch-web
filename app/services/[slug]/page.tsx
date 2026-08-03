// app/services/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <main className="flex-1">
      <PageHero eyebrow="Services" heading={service.title} sub={service.description} />

      <Section tight className="bg-mist border-b border-line">
        <nav className="text-sm text-muted">
          <Link href="/services" className="hover:text-ink">
            Services
          </Link>{" "}
          / <span className="text-ink">{service.title}</span>
        </nav>
      </Section>

      <Section className="bg-white">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="text-h3">Who it&rsquo;s for</h2>
            <p className="lead">{service.whoItsFor}</p>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-mist">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="text-h3">Common symptoms</h2>
            <ul className="flex flex-col gap-3">
              {service.commonSymptoms.map((symptom) => (
                <li key={symptom} className="flex items-start gap-3 text-slate">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-white">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            <h2 className="text-h3">Our approach</h2>
            <div className="flex flex-col gap-10">
              {service.ourApproach.map((step, i) => (
                <div key={step} className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-brand">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-slate">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-mist">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="text-h3">Deliverables</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-slate">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-white">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="text-h3">Outcomes</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex flex-col gap-2 border-l-2 border-brand pl-4">
                  <span className="text-slate">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-mist">
        <Reveal>
          <div className="flex flex-col gap-10">
            <div className="mx-auto max-w-2xl text-center flex flex-col gap-4">
              <h2 className="text-h2">What we can build for you</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.offerings.map((offering) => (
                <div
                  key={offering.title}
                  className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-peach text-brand">
                    <Icon name={offering.icon} className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="font-semibold text-ink">{offering.title}</h3>
                  <p className="text-sm text-slate">{offering.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-white">
        <Reveal>
          <div className="flex flex-col gap-8">
            <h2 className="text-h3">Explore our other services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-white p-5 transition-colors hover:border-ink/25"
                >
                  <span className="font-semibold text-ink">{other.title}</span>
                  <Icon
                    name="arrow"
                    className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-dark"
                  />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaBand />
    </main>
  );
}
