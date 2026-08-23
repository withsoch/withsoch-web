// components/sections/Stats.tsx
//
// The page's proof anchor. This is the one section that breaks the homepage
// zone map (see app/page.tsx): it sits on bg-forest inside the otherwise-mist
// Zone C. On mist it had no contrast at all - mist tiles, mist surface, and
// hairline borders floating in nothing - so the numbers read as decoration
// rather than evidence. Its own surface is what makes it land.
//
// Layout is a left rail (heading + intro) against a stacked list of outcomes,
// not a tile grid. There are only two numbers, and two tiles in a 2-up grid
// reads as an unfinished third; two rows in a rail reads as deliberate.

import { STATS, STATS_HEADING, STATS_INTRO } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Stats({
  showHeading = true,
}: { showHeading?: boolean } = {}) {
  return (
    <Section className="bg-forest">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {showHeading && (
          <Reveal>
            {/* max-w-md, not max-w-sm: narrower and "automation-first" breaks
                across the hyphen, giving a five-line ragged heading. */}
            <h2 className="text-h2 max-w-md text-white">{STATS_HEADING}</h2>
            <p className="lead mt-5 max-w-md text-white/70">{STATS_INTRO}</p>
          </Reveal>
        )}

        {/* Generous row padding here is load-bearing: it brings the two-row
            stat column up to the height of the heading rail so neither side
            leaves a void, without padding the section itself. */}
        <RevealGroup
          className="flex flex-col divide-y divide-white/10"
          stagger={0.1}
        >
          {STATS.map((stat) => (
            <RevealItem
              key={stat.label}
              className="grid grid-cols-1 gap-4 py-10 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,10rem)_1fr] sm:items-baseline sm:gap-10 lg:py-12"
            >
              <CountUp
                value={stat.value}
                className="text-[clamp(2.8rem,2rem+3.5vw,4.6rem)] font-medium leading-[0.9] tracking-[-0.02em] text-brand-light"
              />
              <p className="max-w-md text-white/70">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
