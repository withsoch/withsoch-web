// components/sections/WhyChooseUs.tsx
//
// The page's one warm accent section: a full-bleed peach-to-orange ground
// (.bg-warm-wash in globals.css) carrying the claim, three differentiators,
// and one piece of proof.
//
// Why the whole section rather than cards on white: every card fill we tried
// against a white section - mist, cream, peach - landed within a few percent
// of the background and washed out. Tinting the ground instead means the
// content needs no card at all. The columns sit directly on the colour,
// separated by a hairline, and ink on the warm wash clears 7:1 everywhere.
//
// Icons are deliberately plain outline marks - shield / compass / check.
// `spark`, `pinwheel`, `clover` and `burst` are all in the icon set but they
// read as generic AI-startup filigree, and `spark` in particular is the
// four-point sparkle that signals "an AI wrote this page". They also carry no
// relationship to the claims they'd sit above. No chips or tinted squares
// behind them either; the mark alone is enough on a coloured ground.
//
// The quote panel is white - the only flat surface here, so proof reads as a
// change of voice rather than a fourth column. Quote/attribution sit left,
// a portrait frame sits right - same split and same image-or-initials
// fallback as Testimonials.tsx, so a testimonial with no `image` degrades
// identically wherever it's rendered.

import Image from "next/image";
import { TESTIMONIALS } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/Icons";

// Same accent->fallback-fill mapping as Testimonials.tsx, so a testimonial
// with no `image` degrades the same way everywhere it's rendered.
const accentBg: Record<string, string> = {
  brand: "bg-brand text-white",
  forest: "bg-forest text-white",
  teal: "bg-teal text-white",
  leaf: "bg-leaf text-white",
};

const FEATURES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "shield",
    title: "Automation that actually runs",
    description: "We build systems that work in the real world, with proper error handling, documentation, and monitoring from day one.",
  },
  {
    icon: "compass",
    title: "Your stack, your rules",
    description: "We work with the tools you already have. No forced migrations, no rip-and-replace, no unnecessary complexity.",
  },
  {
    icon: "check",
    title: "We build, we don't just advise",
    description: "Strategy only matters when it ships. We stay in the engagement until the system is live and running.",
  },
];

export function WhyChooseUs() {
  const testimonial = TESTIMONIALS[0];

  return (
    <Section className="bg-warm-wash" tight>
      <Reveal>
        <h2 className="text-h2 max-w-3xl">
          What makes us the right automation <span className="italic text-brand-deep">partner</span>
        </h2>
        <p className="text-lead mt-5 max-w-2xl text-ink-soft">
          We don&rsquo;t just identify automation opportunities. We build them, deploy them, and
          make sure they run.
        </p>
      </Reveal>

      <RevealGroup
        as="ul"
        className="mt-12 grid grid-cols-1 divide-y divide-ink/12 border-t border-ink/12 pt-0 sm:grid-cols-2 sm:divide-y-0 sm:border-t-0 lg:grid-cols-3"
        stagger={0.08}
      >
        {FEATURES.map((feature, i) => (
          <RevealItem
            as="li"
            key={feature.title}
            className={`py-8 sm:py-0 sm:pt-0 ${
              i === 0 ? "" : "sm:border-l sm:border-ink/12 sm:pl-8 lg:pl-10"
            } ${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft">
              <Icon
                name={feature.icon}
                className="h-6 w-6 text-brand-deep"
                strokeWidth={1.8}
              />
            </span>
            <h3 className="text-h4 mt-4">
              {feature.title}
            </h3>
            <p className="mt-2.5 max-w-sm text-16 text-ink-soft">{feature.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-14 lg:mt-16" delay={0.06}>
        <figure className="group grid grid-cols-1 items-center gap-6 overflow-hidden rounded-2xl bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-card sm:grid-cols-[1.6fr_0.4fr] sm:gap-8 sm:p-8">
          <div className="flex flex-col gap-5">
            <blockquote className="text-lead max-w-none text-ink">
              {testimonial.quote}
            </blockquote>
            <div className="flex flex-col gap-2">
              <span className="h-px w-8 bg-ink/12" aria-hidden="true" />
              <cite className="not-italic">
                <span className="block font-semibold text-ink">{testimonial.name}</span>
                <span className="block text-16 text-muted">{testimonial.role}</span>
              </cite>
            </div>
          </div>
          <div className="relative mx-auto h-52 w-40 shrink-0 overflow-hidden rounded-3xl sm:h-64 sm:w-48">
            {testimonial.image ? (
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                sizes="(min-width: 640px) 12rem, 10rem"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <span
                className={`flex h-full w-full items-center justify-center text-22 font-semibold transition-transform duration-300 group-hover:scale-105 ${
                  accentBg[testimonial.accent] ?? accentBg.brand
                }`}
              >
                {testimonial.initials || testimonial.name.charAt(0)}
              </span>
            )}
          </div>
        </figure>
      </Reveal>
    </Section>
  );
}
