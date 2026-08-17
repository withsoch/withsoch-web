// components/sections/Stats.tsx
//
// Deliberately dark section — matches the real withsoch.com reference 1:1:
// black field, cream/gold copy, a low-poly "connected world" illustration on
// the left, intro → headline → stats on the right. Every other section on
// the site stays on the light Soch theme; this one intentionally breaks from
// it because the source design does too.

import { STATS, STATS_HEADING, STATS_INTRO } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { StatsWorldIllustration } from "@/components/sections/StatsWorldIllustration";

export function Stats({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <Section className="bg-charcoal">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="hidden lg:block">
          <StatsWorldIllustration />
        </div>

        <div className="flex flex-col items-start text-left">
          {showHeading && (
            <>
              <p className="lead max-w-md text-cream/80">{STATS_INTRO}</p>
              <h2 className="text-h2 mt-4 max-w-md text-cream">{STATS_HEADING}</h2>
            </>
          )}

          <div className="mt-10 grid grid-cols-2 gap-8 sm:gap-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-3">
                <span className="text-display text-brand-light">{stat.value}</span>
                <div className="border-t border-cream/20 pt-3">
                  <p className="text-cream/70">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
