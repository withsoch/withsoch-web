// app/services/[slug]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceProcessPanel } from "@/components/sections/ServiceProcessPanel";
import { ServiceTestimonial } from "@/components/ServiceTestimonial";
import { Button } from "@/components/ui/Button";
import { SERVICE_DIAGRAMS } from "@/components/sections/ServiceCardDiagrams";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

// marketing-automation's third point ("Lead Nurturing") is real, audited
// content used elsewhere (services grid/pills) — trimmed to 2 tags here only
// because a garbled third tag on the reference layout couldn't be confirmed.
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
  const descriptionParagraphs = Array.isArray(service.description)
    ? service.description
    : [service.description];
  // Standard template across all 5 services — offerings count determines
  // grid columns: 9 items (operations) uses 3 columns, 8 items uses 4.
  const offeringsColsClass =
    service.offerings.length === 8 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <main className="flex-1">
      <section className="border-b border-line bg-mist">
        <div className="container-x py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col gap-4">
              <span className="eyebrow w-fit">Services</span>
              <h1 className="text-display text-[clamp(2.5rem,1.5rem+3.2vw,3.9rem)]">
                {service.title}
              </h1>
              {descriptionParagraphs.map((p) => (
                <p key={p} className="lead mt-2 max-w-xl">
                  {p}
                </p>
              ))}
              <div className="mt-4">
                <Button href="/contact" variant="primary" size="lg" arrow>
                  Get started
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4">
              <Image
                src={service.heroImage ?? `/images/services/${service.slug}/hero-diagram.png`}
                alt={`${service.title} diagram`}
                width={640}
                height={520}
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-mist">
        <div className="container-x py-4">
          <nav className="text-sm text-muted">
            <Link href="/services" className="hover:text-ink">
              Services
            </Link>{" "}
            / <span className="text-ink">{service.title}</span>
          </nav>
        </div>
      </section>

      <Section className="bg-white">
        <Reveal>
          <div className="flex flex-col gap-10">
            <h2 className="text-h2 max-w-3xl">{service.hook}</h2>
            <ServiceProcessPanel service={service} />
          </div>
        </Reveal>

        {service.audienceCards && (
          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {service.audienceCards.map((card) => (
                <div
                  key={card.no}
                  className="flex flex-col gap-3 rounded-xl border border-line bg-white p-6 transition-colors hover:border-ink/25"
                >
                  <span className="text-sm font-semibold text-brand">{card.no}</span>
                  <h3 className="font-semibold text-ink">{card.title}</h3>
                  <p className="text-sm text-slate">{card.description}</p>
                  <span className="mt-2 w-fit rounded-full bg-peach px-3 py-1 text-xs font-semibold tracking-wide text-brand">
                    {card.tag}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </Section>

      <Section className="bg-mist">
        <Reveal>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center lg:w-[calc(100%+10rem)] lg:-mx-20">
              <h2 className="text-h2 max-w-2xl">What you get in {service.title}</h2>
              <Button href="/contact" variant="secondary" size="lg" className="shrink-0">
                Get Started
              </Button>
            </div>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${offeringsColsClass} gap-7 lg:w-[calc(100%+10rem)] lg:-mx-20`}
            >
              {service.offerings.map((offering) => (
                <div
                  key={offering.title}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-peach text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <Icon name={offering.icon} className="h-7 w-7" />
                    </span>
                    <h3 className="pt-2 text-lg font-semibold leading-snug text-ink">{offering.title}</h3>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-slate">{offering.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Reveal as="section">
        <CtaBand override={{ ...service.ctaOverride, buttonHref: "/contact" }} />
      </Reveal>

      {service.testimonial && (
        <Section className="bg-white">
          <Reveal>
            <ServiceTestimonial testimonial={service.testimonial} />
          </Reveal>
        </Section>
      )}

      <Section className="bg-mist">
        <Reveal>
          <div className="flex flex-col gap-8">
            <h2 className="text-h3">Explore our other services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
              {otherServices.map((other) => {
                const description = Array.isArray(other.description)
                  ? other.description[0]
                  : other.description;
                const tags = other.points;
                const Diagram = SERVICE_DIAGRAMS[other.slug];
                return (
                  <Link
                    key={other.slug}
                    href={`/services/${other.slug}`}
                    className="group flex flex-col h-full rounded-xl border border-line bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-ink/25"
                  >
                    <div className="relative flex aspect-[21/9] items-center justify-center bg-mist p-4">
                      <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />
                      <span className="relative w-full max-w-[160px]">
                        {Diagram ? <Diagram /> : <Icon name={other.icon} className="h-10 w-10 text-brand" />}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                      <span className="text-lg font-serif font-semibold leading-snug text-ink">
                        {other.title}
                      </span>
                      <div className="flex flex-1 flex-col gap-2">
                        <p className="text-sm text-slate line-clamp-2">{description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-peach px-2.5 py-1 text-xs font-semibold text-brand"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto pt-1">
                        <Button
                          type="button"
                          variant="secondary"
                          size="md"
                          arrow
                          className="pointer-events-none"
                        >
                          Learn more
                        </Button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
