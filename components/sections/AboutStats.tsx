// components/sections/AboutStats.tsx
//
// About page-only overview/stats section — distinct from the homepage
// Stats component (different metrics; see ABOUT_STATS in content.ts). Flat
// cream background, no video/gradient, 3 stat cards + a linked CTA row.

import { ABOUT_STATS, ABOUT_STATS_BOTTOM } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";
import Link from "next/link";

// Small looping "automation" motif — nodes pulsing and a signal travelling
// along connecting lines. Pure SVG/CSS, no JS, so it's inert to reduced-motion
// users via the .animate-* utilities defined in globals.css.
function AutomationAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl border border-line bg-white">
      {/* Ambient drifting glow, brand-only wash — matches the site's "one flat accent" rule */}
      <div
        className="animate-drift-a absolute -left-1/4 top-0 h-3/4 w-3/4 rounded-full bg-peach blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-drift-b absolute -right-1/4 bottom-0 h-3/4 w-3/4 rounded-full bg-mist blur-3xl"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 320 320"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <g stroke="#e7e2d7" strokeWidth="1.5" fill="none">
          <path d="M64 96 L160 160 L256 96" />
          <path d="M64 224 L160 160 L256 224" />
          <path d="M160 160 L160 40" />
        </g>
        <g stroke="#ff5c35" strokeWidth="2" fill="none" strokeLinecap="round">
          <path
            className="animate-dash-flow"
            d="M64 96 L160 160 L256 96"
            strokeDasharray="6 10"
          />
          <path
            className="animate-dash-flow"
            d="M160 160 L160 40"
            strokeDasharray="6 10"
          />
        </g>
        {[
          [64, 96],
          [256, 96],
          [64, 224],
          [256, 224],
          [160, 40],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#1c2b26" fillOpacity="0.3" />
        ))}
        <circle cx={160} cy={160} r="10" fill="#ff5c35" className="animate-pulse-dot" />
        <circle cx={160} cy={160} r="5" fill="#ffffff" />
      </svg>
    </div>
  );
}

// Tiny n8n-style workflow strip — two connected nodes with a signal running
// the wire between them. Sits in the corner of each stat card as a quiet
// automation motif rather than the whole-panel version on the left.
function WorkflowNodes() {
  return (
    <svg
      viewBox="0 0 96 28"
      className="h-6 w-20 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M10 14 L44 14 M52 14 L86 14"
        stroke="#e7e2d7"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M10 14 L86 14"
        stroke="#ff5c35"
        strokeWidth="1.5"
        strokeDasharray="4 7"
        className="animate-dash-flow"
        fill="none"
      />
      <rect x="4" y="8" width="12" height="12" rx="3.5" fill="#fff" stroke="#e7e2d7" strokeWidth="1.5" />
      <rect x="80" y="8" width="12" height="12" rx="3.5" fill="#fff" stroke="#e7e2d7" strokeWidth="1.5" />
      <rect x="42" y="8" width="12" height="12" rx="3.5" fill="#ffe8dd" stroke="#ff5c35" strokeWidth="1.5" />
      <circle cx="48" cy="14" r="2" fill="#ff5c35" className="animate-pulse-dot" />
    </svg>
  );
}

export function AboutStats() {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
        {/* Left: animated automation panel */}
        <div className="relative min-h-64 overflow-hidden rounded-2xl lg:min-h-0">
          <AutomationAnimation />
        </div>

        {/* Right: stat cells stacked over a CTA bar */}
        <div className="flex flex-col gap-4">
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
            {ABOUT_STATS.map((stat, i) => (
              <div
                key={stat.value}
                className="group flex flex-col justify-between gap-6 rounded-2xl border border-line bg-white p-7 transition-colors duration-300 hover:border-brand/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-h2 text-ink tracking-tight transition-colors duration-300 group-hover:text-brand">
                    {stat.value}
                  </span>
                  <span className="mt-1 shrink-0 font-mono text-xs font-medium tracking-widest text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-slate">{stat.label}</p>
                  <WorkflowNodes />
                </div>
              </div>
            ))}
          </div>

          <Link
            href={ABOUT_STATS_BOTTOM.href}
            className="group flex items-center gap-4 rounded-2xl border border-line bg-white px-7 py-6 transition-colors duration-300 hover:border-brand/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-peach text-brand">
              <Icon name="spark" className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <h4 className="text-h3 text-ink">{ABOUT_STATS_BOTTOM.title}</h4>
              <p className="mt-1 text-sm text-slate">{ABOUT_STATS_BOTTOM.sub}</p>
            </div>
            <Icon
              name="arrow"
              className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand"
            />
          </Link>
        </div>
      </div>
    </Section>
  );
}
