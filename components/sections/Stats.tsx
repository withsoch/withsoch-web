// components/sections/Stats.tsx

import { STATS } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Stats() {
  return (
    <Section className="bg-mist">
      <SectionHeading
        title="Real results from automation-first engagements"
        intro="Our clients see measurable progress, faster decisions, steadier operations, and sharper products"
      />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-3">
            <span className="text-display text-brand">{stat.value}</span>
            <p className="text-slate">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
