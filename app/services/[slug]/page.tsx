// app/services/[slug]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICES, CTAS } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceProcessPanel } from "@/components/sections/ServiceProcessPanel";
import { ServiceTestimonial } from "@/components/ServiceTestimonial";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

// Cross-link thumbnail placeholders — real assets pending, one per service slug.
const OTHER_SERVICE_THUMBS: Record<string, string> = {
  "ai-agent-development": "/images/services/other-services-thumbs/ai-agent-development.png",
  "operations-process-automation": "/images/services/other-services-thumbs/operations-process-automation.png",
  "customer-support-automation": "/images/services/other-services-thumbs/customer-support-automation.png",
  "marketing-automation": "/images/services/other-services-thumbs/marketing-automation.png",
  "revops-automation": "/images/services/other-services-thumbs/revops-automation.png",
};

// marketing-automation's third point ("Lead Nurturing") is real, audited
// content used elsewhere (services grid/pills) — trimmed to 2 tags here only
// because a garbled third tag on the reference layout couldn't be confirmed.
const CROSS_LINK_TAG_LIMIT: Record<string, number> = {
  "marketing-automation": 2,
};

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
                <Button href={CTAS.primary.href} variant="primary" size="lg" arrow>
                  Get started
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4">
              {/* placeholder — real asset pending */}
              <Image
                src={`/images/services/${service.slug}/hero-diagram.png`}
                alt={`${service.title} diagram`}
                width={640}
                height={520}
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

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
          <div className="flex flex-col gap-10">
            <h2 className="text-h2 mx-auto max-w-3xl text-center">{service.hook}</h2>
            <ServiceProcessPanel service={service} />
          </div>
        </Reveal>

        {service.audienceCards && (
          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {service.audienceCards.map((card) => (
                <div
                  key={card.no}
                  className="flex flex-col gap-3 rounded-xl border border-line bg-white p-6"
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
            <div className="mx-auto max-w-2xl text-center flex flex-col gap-4">
              <h2 className="text-h2">What we can build for you</h2>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${offeringsColsClass} gap-6`}>
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

      <CtaBand override={service.ctaOverride} />

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherServices.map((other) => {
                const description = Array.isArray(other.description)
                  ? other.description[0]
                  : other.description;
                const tags = other.points.slice(0, CROSS_LINK_TAG_LIMIT[other.slug] ?? other.points.length);
                return (
                  <Link
                    key={other.slug}
                    href={`/services/${other.slug}`}
                    className="group flex flex-col gap-4 rounded-xl border border-line bg-white overflow-hidden transition-colors hover:border-ink/25"
                  >
                    <div className="bg-mist p-4">
                      {/* placeholder — real asset pending */}
                      <Image
                        src={OTHER_SERVICE_THUMBS[other.slug]}
                        alt={other.title}
                        width={400}
                        height={220}
                        className="h-32 w-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-3 px-5 pb-5">
                      <span className="text-h3 font-semibold text-ink">{other.title}</span>
                      <p className="text-sm text-slate">{description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-peach px-2.5 py-1 text-xs font-semibold text-brand"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                        Learn more
                        <Icon
                          name="arrow"
                          className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-dark"
                        />
                      </span>
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
