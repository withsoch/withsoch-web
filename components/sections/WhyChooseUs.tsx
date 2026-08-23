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
// change of voice rather than a fourth column. It used to sit over a photo
// behind an opaque bg-mist/85 scrim, which rendered as a smudge, and its
// avatar was a hardcoded Webflow stock portrait attached to a real named
// person. TESTIMONIALS[0] carries `initials`, so the chip uses those.

import { TESTIMONIALS } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/Icons";

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
    <Section className="bg-warm-wash" loose>
      <Reveal>
        <h2 className="text-h2 max-w-3xl">
          What makes us the right automation <span className="italic text-brand-deep">partner</span>
        </h2>
        <p className="lead mt-5 max-w-2xl text-ink-soft">
          We don&rsquo;t just identify automation opportunities. We build them, deploy them, and
          make sure they run.
        </p>
      </Reveal>

      <RevealGroup
        as="ul"
        className="mt-12 grid grid-cols-1 gap-10 border-t border-ink/12 pt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14"
        stagger={0.08}
      >
        {FEATURES.map((feature) => (
          <RevealItem as="li" key={feature.title}>
            <Icon name={feature.icon} className="h-6 w-6 text-brand-deep" strokeWidth={1.8} />
            <h3 className="text-h3 mt-5">{feature.title}</h3>
            <p className="mt-2.5 max-w-sm text-[0.95rem] text-ink-soft">{feature.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-14 lg:mt-16" delay={0.06}>
        <figure className="rounded-2xl bg-white p-8 sm:p-12">
          <blockquote className="max-w-4xl text-[clamp(1.05rem,0.95rem+0.5vw,1.35rem)] leading-[1.55] text-ink">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-peach text-sm font-semibold text-brand-dark">
              {testimonial.initials}
            </span>
            <span>
              <span className="block font-semibold text-ink">{testimonial.name}</span>
              <span className="block text-sm text-muted">{testimonial.role}</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
