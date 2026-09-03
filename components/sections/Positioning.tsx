// components/sections/Positioning.tsx

import { HERO } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const POINTS: { lead: string; rest: string }[] = [
  {
    lead: "AI should do the boring work.",
    rest: "We build the systems so your team never has to.",
  },
  {
    lead: "Speed is a real advantage.",
    rest: "Strategy is what you stop doing.",
  },
  {
    lead: "Systems compound.",
    rest: "One good automation saves hundreds of hours over time.",
  },
  {
    lead: "We build for your stack.",
    rest: "Integration with the tools you already use, not against them.",
  },
];

export function Positioning() {
  return (
    <Section className="bg-mist rounded-t-[2rem]" tight>
      {/* The heading used to sit in a two-column grid whose second cell was
          empty - it just needs a width constraint. */}
      <Reveal>
        <h2 className="text-h2 text-ink lg:text-[2.3rem] lg:leading-[1.2] max-w-3xl">
          AI Automation Consulting and Implementation for Businesses
        </h2>
      </Reveal>

      {/* items-stretch so the text column matches the photo's rendered
          height, then justify-between on that column pins the CTA to the
          photo's bottom edge instead of trailing below it. */}
      <Reveal className="mt-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-stretch" delay={0.08}>
        <img
          src="https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a325b9b6232e8946bee738b_6a0d81a48529c31b17d78093_replicate-prediction-5ahpghne0nrmw0cy87dskem7qg.webp"
          alt="Soch team collaborating"
          className="w-full aspect-[4/3] lg:aspect-[5/4] rounded-2xl object-cover"
        />
        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-8">
            <p className="lead text-slate max-w-xl">{HERO.sub}</p>
            <ul className="flex flex-col">
              {POINTS.map((point) => (
                <li
                  key={point.lead}
                  className="flex items-start gap-3 py-5 border-b border-line first:pt-0 last:border-b-0"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="text-ink-soft">
                    <strong className="font-semibold text-ink">{point.lead}</strong>{" "}
                    {point.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Button href="/about" variant="primary" arrow>
              Inside Our Mission
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
