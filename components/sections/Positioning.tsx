// components/sections/Positioning.tsx

import { HERO } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";

const POINTS = [
  "AI should do the boring work — we build the systems so your team never has to",
  "Speed is a real advantage — strategy is what you stop doing",
  "Systems compound — one good automation saves hundreds of hours over time",
  "We build for your stack — integration with the tools you already use, not against them.",
];

export function Positioning() {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex flex-col gap-8">
          <h2 className="text-h2 max-w-md">
            AI Automation Consulting and Implementation for Startups
          </h2>
          <p className="lead max-w-xl">{HERO.sub}</p>
          <ul className="flex flex-col gap-4">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-peach text-brand">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                <span className="text-slate">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="aspect-4/3 w-full rounded-2xl bg-mist" />
      </div>
    </Section>
  );
}
