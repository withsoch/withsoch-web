// components/sections/Positioning.tsx

import { HERO } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";
import { Button } from "@/components/ui/Button";

const POINTS = [
  "AI should do the boring work — we build the systems so your team never has to",
  "Speed is a real advantage — strategy is what you stop doing",
  "Systems compound — one good automation saves hundreds of hours over time",
  "We build for your stack — integration with the tools you already use, not against them.",
];

export function Positioning() {
  return (
    <Section className="bg-white !py-14 sm:!py-16 lg:!py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <h2 className="text-h2 text-ink lg:text-[2.3rem] lg:leading-[1.2] max-w-none">
          AI Automation Consulting and Implementation for Startups
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-stretch">
        <img
          src="https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a325b9b6232e8946bee738b_6a0d81a48529c31b17d78093_replicate-prediction-5ahpghne0nrmw0cy87dskem7qg.webp"
          alt="Soch team collaborating"
          className="w-full h-full min-h-[38rem] lg:min-h-[44rem] rounded-2xl object-cover"
        />
        <div className="flex flex-col justify-between">
          <p className="lead max-w-xl">{HERO.sub}</p>
          <ul className="flex flex-col">
            {POINTS.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 py-6 border-b border-line first:pt-0 last:border-b-0"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peach text-brand">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                <span className="text-ink">{point}</span>
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
