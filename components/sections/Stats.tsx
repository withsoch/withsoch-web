// components/sections/Stats.tsx
//
// Dark section, per DESIGN.md §4 "dark zones" convention: bg-forest with the
// white opacity ramp (text-white → /75 → /70) and hairlines at border-white/10.
// A low-poly "connected world" illustration sits on the left, intro →
// headline → stats on the right.

import { STATS, STATS_HEADING, STATS_INTRO } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { StatsWorldIllustration } from "@/components/sections/StatsWorldIllustration";

export function Stats({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <Section className="bg-forest">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="hidden lg:block">
          <StatsWorldIllustration />
        </div>

        <div className="flex flex-col items-start text-left">
          {showHeading && (
            <>
              <p className="lead max-w-md text-white/75">{STATS_INTRO}</p>
              <h2 className="text-h2 mt-4 max-w-md text-white">{STATS_HEADING}</h2>
            </>
          )}

          <div className="mt-10 grid grid-cols-2 gap-8 sm:gap-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-3">
                <span className="text-display text-brand-light">{stat.value}</span>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-white/70">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
