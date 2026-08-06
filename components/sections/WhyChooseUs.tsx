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
    description: "We build systems that work in the real world, with proper error handling, documentation, and monitoring from day one.",
  },
  {
    icon: "compass",
    title: "Your stack, your rules",
    description: "We work with the tools you already have. No forced migrations, no rip-and-replace, no unnecessary complexity.",
  },
  {
    icon: "spark",
    title: "We build, we don't just advise",
    description: "Strategy only matters when it ships. We stay in the engagement until the system is live and running.",
  },
];

export function WhyChooseUs() {
  const testimonial = TESTIMONIALS[0];

  return (
    <Section className="bg-white">
      <SectionHeading
        title="What makes us the right automation partner"
        intro="We don't just identify automation opportunities. We build them, deploy them, and make sure they run."
      />
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
      <figure className="relative mt-6 overflow-hidden rounded-2xl ring-1 ring-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/68e7ded717d0693d2c345401_why-choose-bg-image.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-mist/85" />
        <div className="relative flex flex-col gap-6 p-8">
          <blockquote className="lead text-ink">&ldquo;{testimonial.quote}&rdquo;</blockquote>
          <figcaption className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/68e7ded717d0693d2c34544c_testimonial-image-03.webp"
              alt={testimonial.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span>
              <span className="block font-semibold text-ink">{testimonial.name}</span>
              <span className="block text-sm text-muted">{testimonial.role}</span>
            </span>
          </figcaption>
        </div>
      </figure>
    </Section>
  );
}
