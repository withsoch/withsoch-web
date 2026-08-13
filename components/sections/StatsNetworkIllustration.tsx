// components/sections/StatsNetworkIllustration.tsx
//
// Decorative flat "connected world" illustration for the Stats section.
// Same flat-color, no-glow/no-gradient technique as HeroNetworkDiagram.tsx
// and ServiceCardDiagrams.tsx, but built for more visual weight: a card
// frame with the shared dot-grid texture (see .bg-dot-grid in globals.css),
// three node size tiers, an emphasis ring around the hub, gently curved
// connectors, a couple of looping signal-pulse dots (SMIL animateMotion,
// paused for prefers-reduced-motion), and a staggered scroll-in reveal via
// motion/react — matching the Reveal primitive's easing/duration exactly.

"use client";

import { motion, useReducedMotion } from "motion/react";

type Tier = "sm" | "md" | "lg";

const TIER_RADIUS: Record<Tier, number> = { sm: 3.5, md: 5.5, lg: 8.5 };

const NODES: { id: number; x: number; y: number; tier: Tier; hub?: boolean }[] = [
  { id: 0, x: 60, y: 70, tier: "sm" },
  { id: 1, x: 130, y: 40, tier: "md" },
  { id: 2, x: 200, y: 60, tier: "lg" },
  { id: 3, x: 150, y: 110, tier: "sm" },
  { id: 4, x: 260, y: 100, tier: "md" },
  { id: 5, x: 90, y: 150, tier: "sm" },
  { id: 6, x: 200, y: 170, tier: "lg", hub: true },
  { id: 7, x: 300, y: 160, tier: "sm" },
  { id: 8, x: 330, y: 220, tier: "md" },
  { id: 9, x: 250, y: 250, tier: "sm" },
  { id: 10, x: 160, y: 240, tier: "md" },
  { id: 11, x: 90, y: 220, tier: "sm" },
  { id: 12, x: 50, y: 280, tier: "sm" },
  { id: 13, x: 220, y: 320, tier: "md" },
  { id: 14, x: 300, y: 300, tier: "sm" },
];

const LINES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 6],
  [0, 5],
  [5, 3],
  [5, 11],
  [6, 4],
  [6, 7],
  [4, 7],
  [7, 8],
  [8, 9],
  [6, 9],
  [6, 10],
  [10, 11],
  [11, 12],
  [10, 13],
  [9, 14],
  [13, 14],
  [12, 13],
];

// Connector paths that carry a travelling signal-pulse dot (indices into LINES).
const PULSE_LINES = [5, 9, 15];

const NODE_BY_ID = new Map(NODES.map((n) => [n.id, n]));

// Nudge each connector into a shallow bezier curve — alternating sides keeps
// the network feeling organic instead of mechanically bowed one direction.
function curvedPath(from: { x: number; y: number }, to: { x: number; y: number }, bend: number) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const cx = mx + px * bend;
  const cy = my + py * bend;
  return `M ${from.x} ${from.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${to.x} ${to.y}`;
}

export function StatsNetworkIllustration() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 sm:p-8">
      <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />
      <motion.svg
        viewBox="0 0 380 380"
        className="relative h-full w-full"
        role="img"
        aria-label="Illustration of a connected network of automated workflows"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {LINES.map(([a, b], i) => {
          const from = NODE_BY_ID.get(a)!;
          const to = NODE_BY_ID.get(b)!;
          const bend = i % 2 === 0 ? 10 : -10;
          const d = curvedPath(from, to, bend);
          const pathId = `stats-net-line-${i}`;
          return (
            <motion.path
              key={i}
              id={pathId}
              d={d}
              fill="none"
              stroke="#e7e2d7"
              strokeWidth={1.4}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { duration: 0.6, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            />
          );
        })}

        {NODES.map((n, i) => {
          const r = TIER_RADIUS[n.tier];
          return (
            <motion.g
              key={n.id}
              variants={{
                hidden: { opacity: 0, scale: reduce ? 1 : 0.4 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              {n.hub && (
                <circle cx={n.x} cy={n.y} r={r + 6} fill="none" stroke="#ff5c35" strokeOpacity={0.35} strokeWidth={1.4} />
              )}
              <circle cx={n.x} cy={n.y} r={r} fill={n.hub ? "#ff5c35" : "#1c2b26"} opacity={n.hub ? 1 : 0.85} />
            </motion.g>
          );
        })}

        {!reduce &&
          PULSE_LINES.map((lineIndex, i) => (
            <circle key={lineIndex} r={2.4} fill="#ff5c35" opacity={0.8}>
              <animateMotion
                dur={`${4 + i * 0.6}s`}
                begin={`${i * 0.9}s`}
                repeatCount="indefinite"
                calcMode="linear"
              >
                <mpath href={`#stats-net-line-${lineIndex}`} />
              </animateMotion>
            </circle>
          ))}
      </motion.svg>
    </div>
  );
}
