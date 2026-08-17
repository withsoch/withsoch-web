// components/sections/AboutStats.tsx
//
// About page-only overview/stats section — distinct from the homepage
// Stats component (different metrics; see ABOUT_STATS in content.ts). Flat
// cream background, no video/gradient, 3 stat cards + a linked CTA row.

import { ABOUT_STATS, ABOUT_STATS_BOTTOM } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";
import Link from "next/link";

export function AboutStats() {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {ABOUT_STATS.map((stat) => (
          <div
            key={stat.value}
            className="flex flex-col gap-3 rounded-xl border border-line bg-mist p-6"
          >
            <span className="text-display text-brand">{stat.value}</span>
            <div className="border-t border-line pt-3">
              <p className="text-slate">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href={ABOUT_STATS_BOTTOM.href}
        className="mt-10 flex items-center justify-between gap-4 rounded-xl border border-line bg-mist px-6 py-5 transition-colors hover:border-ink/25"
      >
        <div>
          <h4 className="text-h3">{ABOUT_STATS_BOTTOM.title}</h4>
          <p className="text-muted mt-1">{ABOUT_STATS_BOTTOM.sub}</p>
        </div>
        <Icon name="arrow" className="h-5 w-5 shrink-0 text-brand" />
      </Link>
    </Section>
  );
}
