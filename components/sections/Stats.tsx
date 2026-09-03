// components/sections/Stats.tsx
//
// The page's proof anchor. This is the one section that breaks the homepage
// zone map (see app/page.tsx): it sits on bg-forest inside the otherwise-mist
// Zone C. On mist it had no contrast at all - mist tiles, mist surface, and
// hairline borders floating in nothing - so the numbers read as decoration
// rather than evidence. Its own surface is what makes it land.
//
// Layout is a left rail (heading + intro) against two floating white cards,
// dashboard-style: label + big headline number + a two-up metric footer.
// White-on-forest is what makes them read as evidence rather than a tile
// grid - the same "flat surface changes the voice" trick as the
// WhyChooseUs testimonial panel.
//
// The footer used to be a decorative bar sparkline - a shape with no real
// data behind it. It looked like a chart but proved nothing, and both cards
// ended up reading as the same illustration. It's replaced with the two
// concrete numbers already implied by each stat's label (a dollar figure,
// a timeframe, a cycle count), given their own row so the card closes on a
// second real fact instead of decoration.

import { STATS, STATS_HEADING, STATS_INTRO } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icons";

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
            <p className="text-lead mt-5 max-w-md text-white/70">{STATS_INTRO}</p>
          </Reveal>
        )}

        <RevealGroup
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-6"
          stagger={0.1}
        >
          {STATS.map((stat) => (
            <RevealItem
              key={stat.label}
              className="group flex flex-col gap-6 rounded-2xl border border-line bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-card"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-14 font-semibold uppercase tracking-wide text-muted">
                  <Icon name="trend" className="h-4 w-4 text-brand-dark" strokeWidth={1.8} />
                  {stat.tag}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition-colors duration-300 group-hover:bg-peach group-hover:text-brand-dark">
                  <Icon name="arrow" className="h-4 w-4 -rotate-45" strokeWidth={1.8} />
                </span>
              </div>

              <div>
                <CountUp
                  value={stat.value}
                  className="text-[clamp(2.2rem,1.8rem+2vw,3.1rem)] font-medium leading-[0.95] tracking-[-0.02em] text-ink"
                />
                <p className="mt-2 text-16 leading-relaxed text-slate">{stat.label}</p>
              </div>

              <div className="mt-auto grid grid-cols-2 divide-x divide-line border-t border-line pt-5">
                {stat.metrics.map((metric) => (
                  <div key={metric.label} className="px-4 first:pl-0 last:pr-0">
                    <p className="text-18 font-medium leading-none tracking-[-0.01em] text-brand-dark">
                      {metric.value}
                    </p>
                    <p className="mt-1.5 text-14 leading-snug text-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
