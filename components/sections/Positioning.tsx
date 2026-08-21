// components/sections/Positioning.tsx

import { HERO } from "@/lib/content";
import { Section } from "@/components/ui/Section";
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
    <Section className="bg-charcoal !py-14 sm:!py-16 lg:!py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <h2 className="text-h2 text-white lg:text-[2.3rem] lg:leading-[1.2] max-w-none">
          AI Automation Consulting and Implementation for Startups
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-stretch">
        <img
          src="https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a325b9b6232e8946bee738b_6a0d81a48529c31b17d78093_replicate-prediction-5ahpghne0nrmw0cy87dskem7qg.webp"
          alt="Soch team collaborating"
          className="w-full h-full min-h-[36rem] lg:min-h-[44rem] rounded-2xl object-cover"
        />
        <div className="flex flex-col justify-between gap-8 h-full">
          <p className="lead text-white/75 max-w-xl">{HERO.sub}</p>
          <ul className="flex flex-col">
            {POINTS.map((point) => (
              <li
                key={point.lead}
                className="flex items-start gap-3 py-5 border-b border-white/10 first:pt-0 last:border-b-0"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span className="text-white/80">
                  <strong className="font-semibold text-white">{point.lead}</strong>{" "}
                  {point.rest}
                </span>
              </li>
            ))}
          </ul>
          <div>
            <Button href="/about" variant="primary" arrow>
              Inside Our Mission
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
