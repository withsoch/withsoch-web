// components/sections/StatsWorldIllustration.tsx
//
// Dark-theme "connected world" illustration for the Stats section: two
// low-poly landmass meshes in the white opacity ramp (DESIGN.md §4) floating
// on the forest-green section background, with a scatter of faint square
// dust and a few brand-orange "signal" rings drifting between them - the
// site's single flat accent, used sparingly. No card frame, no dot grid - // the section background *is* the backdrop.

"use client";

import { motion, useReducedMotion } from "motion/react";

type Node = { id: number; x: number; y: number; r: number };

// Left landmass - a rough Americas-like silhouette.
const LEFT_NODES: Node[] = [
  { id: 0, x: 70, y: 40, r: 3.5 },
  { id: 1, x: 110, y: 25, r: 5.5 },
  { id: 2, x: 150, y: 45, r: 3.5 },
  { id: 3, x: 40, y: 75, r: 3.5 },
  { id: 4, x: 90, y: 85, r: 4.5 },
  { id: 5, x: 135, y: 90, r: 3.5 },
  { id: 6, x: 60, y: 120, r: 3.5 },
  { id: 7, x: 100, y: 135, r: 5.5 },
  { id: 8, x: 145, y: 130, r: 3.5 },
  { id: 9, x: 80, y: 175, r: 3.5 },
  { id: 10, x: 115, y: 190, r: 4.5 },
  { id: 11, x: 95, y: 225, r: 3.5 },
  { id: 12, x: 125, y: 245, r: 3.5 },
  { id: 13, x: 105, y: 280, r: 3.5 },
];

const LEFT_LINES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [2, 5],
  [3, 4], [4, 5], [3, 6], [4, 7], [5, 7], [5, 8],
  [6, 7], [7, 8], [6, 9], [7, 9], [7, 10], [8, 10],
  [9, 10], [9, 11], [10, 11], [10, 12], [11, 12], [12, 13],
];

// Right landmass - a rough Europe/Africa-like silhouette.
const RIGHT_NODES: Node[] = [
  { id: 0, x: 260, y: 55, r: 3.5 },
  { id: 1, x: 295, y: 35, r: 3.5 },
  { id: 2, x: 330, y: 55, r: 5.5 },
  { id: 3, x: 280, y: 85, r: 3.5 },
  { id: 4, x: 320, y: 95, r: 3.5 },
  { id: 5, x: 355, y: 90, r: 4.5 },
  { id: 6, x: 250, y: 110, r: 3.5 },
  { id: 7, x: 295, y: 135, r: 5.5 },
  { id: 8, x: 335, y: 145, r: 3.5 },
  { id: 9, x: 270, y: 170, r: 3.5 },
  { id: 10, x: 300, y: 200, r: 3.5 },
  { id: 11, x: 250, y: 200, r: 3.5 },
  { id: 12, x: 275, y: 245, r: 3.5 },
  { id: 13, x: 310, y: 260, r: 4.5 },
  { id: 14, x: 255, y: 285, r: 3.5 },
];

const RIGHT_LINES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [2, 5],
  [3, 4], [4, 5], [3, 6], [4, 7], [5, 7], [5, 8],
  [6, 7], [7, 8], [6, 9], [7, 9], [7, 10], [8, 10],
  [9, 11], [9, 10], [10, 11], [10, 12], [10, 13], [12, 13],
  [11, 12], [12, 14],
];

// Faint dust - square pixels scattered above/between the landmasses.
const DUST = [
  { x: 200, y: 30 }, { x: 215, y: 55 }, { x: 190, y: 80 }, { x: 225, y: 100 },
  { x: 205, y: 130 }, { x: 235, y: 150 }, { x: 195, y: 175 }, { x: 220, y: 200 },
  { x: 210, y: 230 }, { x: 240, y: 250 }, { x: 45, y: 25 }, { x: 370, y: 40 },
];

// Hollow rings - small "signal" pings drifting near the coastlines.
const RINGS = [
  { x: 170, y: 60 }, { x: 205, y: 155 }, { x: 190, y: 260 },
];

function buildMesh(nodes: Node[], lines: [number, number][]) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  return { nodes, lines, byId };
}

const LEFT = buildMesh(LEFT_NODES, LEFT_LINES);
const RIGHT = buildMesh(RIGHT_NODES, RIGHT_LINES);

function Mesh({ mesh, keyPrefix }: { mesh: ReturnType<typeof buildMesh>; keyPrefix: string }) {
  return (
    <>
      {mesh.lines.map(([a, b], i) => {
        const from = mesh.byId.get(a)!;
        const to = mesh.byId.get(b)!;
        return (
          <line
            key={`${keyPrefix}-line-${i}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#ffffff"
            strokeOpacity={0.22}
            strokeWidth={1}
          />
        );
      })}
      {mesh.nodes.map((n) => (
        <circle key={`${keyPrefix}-node-${n.id}`} cx={n.x} cy={n.y} r={n.r} fill="#ffffff" opacity={0.55} />
      ))}
    </>
  );
}

export function StatsWorldIllustration() {
  const reduce = useReducedMotion();

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <motion.svg
        viewBox="0 0 420 320"
        className="h-full w-full"
        role="img"
        aria-label="Illustration of a connected world network"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* faint square dust */}
        {DUST.map((d, i) => (
          <rect key={`dust-${i}`} x={d.x} y={d.y} width={3} height={3} fill="#ffffff" opacity={0.28} />
        ))}

        <motion.g
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
        >
          <Mesh mesh={LEFT} keyPrefix="left" />
        </motion.g>

        <motion.g
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <Mesh mesh={RIGHT} keyPrefix="right" />
        </motion.g>

        {!reduce &&
          RINGS.map((ring, i) => (
            <motion.circle
              key={`ring-${i}`}
              cx={ring.x}
              cy={ring.y}
              r={3}
              fill="none"
              stroke="#ff5c35"
              strokeWidth={1}
              initial={{ opacity: 0.6, scale: 0.6 }}
              animate={{ opacity: 0, scale: 2.2 }}
              transition={{ duration: 2.6, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
      </motion.svg>
    </div>
  );
}
