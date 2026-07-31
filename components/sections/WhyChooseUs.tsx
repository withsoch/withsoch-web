// components/sections/WhyChooseUs.tsx
//
// 3 feature cards + the first TESTIMONIALS entry as a pull-quote, in one
// section per the homepage rebuild spec.

import { TESTIMONIALS } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon, type IconName } from "@/components/Icons";

const FEATURES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "check",
    title: "Automation that actually runs",
    description: "We don't hand you a strategy deck. Every engagement ends with a live system deployed into your stack.",
  },
  {
    icon: "compass",
    title: "Your stack, your rules",
    description: "We build inside the tools your team already uses instead of pushing migrations that add cost and delay.",
  },
  {
    icon: "spark",
    title: "We build, we don't just advise",
    description: "We stay in the engagement until the automation is live and your team knows how to use it.",
  },
];

const accentBg: Record<string, string> = {
  brand: "bg-brand text-white",
  forest: "bg-forest text-white",
  teal: "bg-teal text-white",
  leaf: "bg-leaf text-white",
};

export function WhyChooseUs() {
  const testimonial = TESTIMONIALS[0];

  return (
    <Section className="bg-white">
      <SectionHeading title="Why teams choose Soch" />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-4 rounded-2xl bg-mist p-7 ring-1 ring-line"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-peach text-brand">
              <Icon name={feature.icon} className="h-5.5 w-5.5" />
            </span>
            <h3 className="text-h3">{feature.title}</h3>
            <p className="text-slate">{feature.description}</p>
          </div>
        ))}
      </div>
      <figure className="mt-6 flex flex-col gap-6 rounded-2xl bg-mist p-8 ring-1 ring-line">
        <blockquote className="lead text-ink">&ldquo;{testimonial.quote}&rdquo;</blockquote>
        <figcaption className="flex items-center gap-3">
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
              accentBg[testimonial.accent] ?? accentBg.brand
            }`}
          >
            {testimonial.initials}
          </span>
          <span>
            <span className="block font-semibold text-ink">{testimonial.name}</span>
            <span className="block text-sm text-muted">{testimonial.role}</span>
          </span>
        </figcaption>
      </figure>
    </Section>
  );
}
