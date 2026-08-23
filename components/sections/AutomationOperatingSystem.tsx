// components/sections/AutomationOperatingSystem.tsx
//
// The three phases plotted as a rising curve, then written out as columns
// underneath. The curve is the argument - leverage compounds across the
// engagement - and the columns are the detail; neither repeats the other.
//
// History worth knowing before changing this. Version one auto-cycled tabs and
// drew a "growth wedge" by animating the *width* of a clip-path'd div - the
// clip-path recomputed against the narrower box and rendered as an orange
// triangle stuck in the bottom-left corner. Version two dropped the panel for
// flat editorial rows; version three stood cards on a CSS staircase. Both were
// stable but neither actually drew the climb.
//
// How this one avoids the original bug: nothing is clipped and nothing is
// measured. The plot is a 0-100 viewBox with preserveAspectRatio="none", so it
// stretches to whatever box it is given, and every stroke carries
// vector-effect="non-scaling-stroke" so the stretch never thickens a line.
// The curve draws itself with pathLength (0 -> 1), which is resolution- and
// size-independent - it cannot disagree with the box the way a clip-path can.
//
// The node markers are HTML, not SVG, positioned at the same percentages the
// path uses. That keeps their type at real font sizes instead of scaling with
// the plot, and it is why POINTS and CURVE must be edited together: the
// numbers in the path string are the same coordinates the markers read.
//
// STEPS[].outputs is optional and currently unwritten; when it lands, each
// column gains a deliverables list without any layout change.

"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { STEPS } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icons";

// Plot geometry, in viewBox percent. BASE is the axis the area fill closes to
// and the droplines hang from; the gridlines are spaced to land on it.
const BASE = 88;
const GRIDLINES = [25, 46, 67, BASE];

// One node per step. Keep in sync with CURVE below - these are the on-curve
// coordinates, and the markers are placed from them.
//
// The x values are the centres of the three phase bands (1/6, 1/2, 5/6) - the
// same thirds the columns below are laid out on. That is what joins the two
// halves: a node, its dropline and its column all live inside one band, walled
// by the same dashed rule running from the top of the plot to the bottom of
// the copy. Move a node off its band centre and the section comes apart again.
//
// The top node stops at 26 rather than riding to the ceiling: each node carries
// a flag above it (~46px of stem + pill), and that has to clear the caption
// even in the 240px-tall mobile box.
const POINTS = [
  { x: 16.7, y: 78 },
  { x: 50, y: 54 },
  { x: 83.3, y: 26 },
];

// The curve runs the full axis, 0 to 100, rather than starting and stopping at
// the outer nodes - a line floating between 16.7 and 83.3 leaves the axis bare
// at both ends and reads as a fragment. So it enters flat at the left edge,
// passes through the three nodes, and keeps climbing off the right edge, which
// is also the honest picture: the last node is handover, not the ceiling.
//
// Control points are Catmull-Rom tangents ((P[i+1] - P[i-1]) / 6), so each
// segment's outgoing handle mirrors the previous one's incoming handle and the
// four cubics meet without a kink at any node. Re-derive them the same way if
// a node moves; eyeballing the handles is what put a crease in the curve.
const CURVE = [
  "M0,84",
  "C2.8,83 8.4,83 16.7,78",
  "C25,73 38.9,62.7 50,54",
  "C61.1,45.3 75,32.3 83.3,26",
  "C91.6,19.7 97.2,17.7 100,16",
].join(" ");
const AREA = `${CURVE} L100,${BASE} L0,${BASE} Z`;

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-10% 0px -8% 0px" } as const;

// Width of one phase band, in viewBox percent. The highlight clip is one band
// wide and slides between them.
const BAND = 100 / POINTS.length;

export function AutomationOperatingSystem() {
  // Which step is emphasised. Null until a column is hovered/focused - the
  // plot's resting state is the whole curve, not one highlighted stretch.
  const [active, setActive] = useState<number | null>(null);
  // The band the highlight clip is parked over. Held separately so the
  // highlight fades out *where it was* on mouse-leave; driving the clip off
  // `active` would snap it back to band 0 mid-fade.
  const [lastActive, setLastActive] = useState(0);
  const reduce = useReducedMotion();

  function focusStep(i: number) {
    setActive(i);
    setLastActive(i);
  }

  return (
    <Section className="bg-white">
      <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <div className="max-w-2xl">
          <h2 className="text-h2">The Soch Automation Operating System</h2>
          <p className="lead mt-4">
            A clear, repeatable process for deploying AI automation in your business.
          </p>
        </div>
        <Button href="/services" variant="primary" size="lg" arrow className="shrink-0">
          Explore our services
        </Button>
      </Reveal>

      <Reveal className="mt-12 lg:mt-16" delay={0.06}>
        <p className="text-sm font-medium text-muted">Automation leverage, compounding &rarr;</p>

        <div className="relative mt-6 h-[240px] sm:h-[300px] lg:h-[340px]">
          {/* Phase bands. Behind everything, and the reason the plot and the
              columns read as one object: these dashed rules sit at exactly the
              thirds the column grid divides on, so each band is visibly the
              same territory as the column beneath it. Hovering a column washes
              its band. lg only - below that the columns reflow to one or two
              per row and the thirds stop meaning anything. */}
          <div aria-hidden="true" className="absolute inset-0 hidden lg:flex">
            {POINTS.map((point, i) => (
              <div
                key={point.x}
                className={`flex-1 transition-colors duration-300 ${
                  i > 0 ? "border-l border-dashed border-ink/10" : ""
                } ${i === active ? "bg-brand/[0.045]" : ""}`}
              />
            ))}
          </div>

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="aos-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.16" />
                <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
              </linearGradient>

              {/* The draw-in. A left-to-right wipe rather than a pathLength
                  dash animation: dash offsets are normalised against the path's
                  user-space length, which stops matching what you see once
                  preserveAspectRatio="none" scales x and y by different
                  factors. Clipping is pure geometry, so it survives the
                  stretch - and on a curve that only ever rises left to right,
                  a wipe and a drawn stroke look identical. */}
              <clipPath id="aos-reveal">
                <motion.rect
                  x="0"
                  y="-20"
                  height="140"
                  initial={{ width: reduce ? 100 : 0 }}
                  whileInView={{ width: 100 }}
                  viewport={VIEWPORT}
                  transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
                />
              </clipPath>

              {/* One band wide, slid to whichever phase is hovered. Animating
                  x rather than swapping a static rect means the highlight
                  travels along the curve when the pointer moves column to
                  column, which is the whole point - it shows the stretch of
                  climb that phase is responsible for. */}
              <clipPath id="aos-band">
                <motion.rect
                  y="-20"
                  height="140"
                  width={BAND}
                  initial={false}
                  animate={{ x: lastActive * BAND }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                />
              </clipPath>

              <linearGradient id="aos-band-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {GRIDLINES.map((y) => (
              <line
                key={y}
                x1="0"
                x2="100"
                y1={y}
                y2={y}
                stroke="var(--color-line)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {POINTS.map((point) => (
              <line
                key={point.x}
                x1={point.x}
                x2={point.x}
                y1={point.y}
                y2={BASE}
                stroke="var(--color-brand)"
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            <g clipPath="url(#aos-reveal)">
              <path d={AREA} fill="url(#aos-area)" />

              {/* The curve steps back while a phase is held, so the
                  highlighted stretch is the brightest line on the plot
                  without having to shout. */}
              <motion.path
                d={CURVE}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="2.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{ opacity: active !== null ? 0.4 : 1 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
              />

              <motion.g
                clipPath="url(#aos-band)"
                initial={false}
                animate={{ opacity: active !== null ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
              >
                <path d={AREA} fill="url(#aos-band-area)" />
                <path
                  d={CURVE}
                  fill="none"
                  stroke="var(--color-brand)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </motion.g>
            </g>
          </svg>

          {/* Markers ride the same coordinates as the path. Each is a flag on a
              stem above its node, so a glance at the curve says which phase is
              which - the numbered discs alone made you cross-reference the
              columns below to read the plot at all.

              Flags are sm-and-up: a ~130px pill centred on the 12% node runs
              off the left edge of a phone-width box, and at that size the
              columns underneath are the label anyway. */}
          {POINTS.map((point, i) => {
            const step = STEPS[i];
            const isLast = i === POINTS.length - 1;
            const isActive = i === active;
            return (
              <motion.span
                key={step?.no ?? i}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                // flex, not the default inline: an inline box carries
                // line-height below the disc, which would push the whole
                // marker a few px off the coordinate it is centred on.
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                initial={{ opacity: 0, scale: reduce ? 1 : 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{
                  duration: 0.45,
                  delay: reduce ? 0 : 0.35 + i * 0.5,
                  ease: EASE,
                }}
              >
                {step && (
                  <>
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-full left-1/2 hidden h-4 w-px -translate-x-1/2 transition-colors duration-300 sm:block ${
                        isActive ? "bg-brand" : "bg-brand/30"
                      }`}
                    />
                    <span
                      className={`absolute bottom-full left-1/2 mb-4 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border bg-white py-1.5 pl-2.5 pr-3.5 text-xs font-medium transition-all duration-300 sm:inline-flex ${
                        isActive || isLast
                          ? "border-brand/45 text-ink shadow-card"
                          : "border-line text-ink shadow-soft"
                      } ${isActive ? "-translate-y-0.5" : ""}`}
                    >
                      <span className="tabular-nums text-brand">{step.no}</span>
                      <span aria-hidden="true" className="h-3 w-px bg-line" />
                      {step.title}
                    </span>
                  </>
                )}

                {isLast ? (
                  // Arrival marker: solid brand disc with a punched-out ring,
                  // the one filled node on the plot, over a soft bloom that
                  // makes the end of the climb the brightest thing on it.
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-xl"
                    />
                    <span
                      className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-brand shadow-card ring-4 ring-white transition-transform duration-300 ${
                        isActive ? "scale-110" : ""
                      }`}
                    >
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-white" />
                    </span>
                  </>
                ) : (
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border bg-white text-[0.8rem] font-medium tabular-nums shadow-soft ring-4 ring-white transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-brand text-brand shadow-card"
                        : "border-line text-ink"
                    }`}
                  >
                    {step?.no}
                  </span>
                )}
              </motion.span>
            );
          })}
          {/* Axis labels live inside the plot, just under the baseline, rather
              than in a row of their own below it - a row there would break the
              band rules in half on their way down to the columns. */}
          <div
            className="absolute inset-x-0 flex items-center justify-between text-sm text-muted"
            style={{ top: `${BASE}%` }}
          >
            <span className="pt-2">Day 0</span>
            <span className="pt-2">Running in days, not months</span>
          </div>
        </div>
      </Reveal>

      <RevealGroup
        as="ol"
        stagger={0.1}
        delay={0.08}
        // No gap at lg: the columns are the bands, so the rule between them has
        // to fall on the band edge, not float in the middle of a gutter. Cells
        // are padded instead, and the outer edges unpadded, which keeps the
        // first column's copy flush with the heading above it.
        className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-x-0"
      >
        {STEPS.map((step, i) => (
          <RevealItem
            as="li"
            key={step.no}
            y={16}
            className={`lg:px-8 lg:first:pl-0 lg:last:pr-0 ${
              i > 0 ? "lg:border-l lg:border-dashed lg:border-ink/10" : ""
            }`}
          >
            <div
              onMouseEnter={() => focusStep(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => focusStep(i)}
              onBlur={() => setActive(null)}
            >
              {/* Number, rule, icon - the rule is what ties the column head to
                  the plot above rather than letting it start as loose type,
                  and it takes the brand colour with the node it points at. */}
              <div className="flex items-center gap-4">
                <span
                  className={`text-[1.4rem] font-medium tabular-nums leading-none transition-colors duration-300 ${
                    i === active ? "text-brand" : "text-ink"
                  }`}
                >
                  {step.no}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-px flex-1 transition-colors duration-300 ${
                    i === active ? "bg-brand/45" : "bg-line"
                  }`}
                />
                <Icon name={step.icon} className="h-5 w-5 shrink-0 text-brand" />
              </div>

              <h3 className="mt-5 text-h3">{step.title}</h3>
              <p className="mt-3 text-slate">{step.description}</p>

              {step.outputs && step.outputs.length > 0 && (
                <ul className="mt-4 flex flex-col gap-1.5">
                  {step.outputs.map((output) => (
                    <li key={output} className="flex items-center gap-2 text-sm text-ink-soft">
                      <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {output}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
