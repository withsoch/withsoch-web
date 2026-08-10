// components/sections/Stats.tsx
//
// Asymmetric 2-column layout matching the real withsoch.com structure: a
// decorative network illustration on the left, intro → headline → stats on
// the right. Kept fully on the light/cream Soch theme — layout is borrowed
// from the live site, not its dark visual treatment.

import { STATS, STATS_HEADING, STATS_INTRO } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { StatsNetworkIllustration } from "@/components/sections/StatsNetworkIllustration";

export function Stats({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <Section className="bg-mist">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="hidden lg:block">
          <StatsNetworkIllustration />
        </div>

        <div className="flex flex-col items-start text-left">
          {showHeading && (
            <>
              <p className="lead max-w-md">{STATS_INTRO}</p>
              <h2 className="text-h2 mt-4 max-w-md">{STATS_HEADING}</h2>
            </>
          )}

          <div className="mt-10 grid grid-cols-2 gap-8 sm:gap-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-3">
                <span className="text-display text-brand">{stat.value}</span>
                <div className="border-t border-line pt-3">
                  <p className="text-slate">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
