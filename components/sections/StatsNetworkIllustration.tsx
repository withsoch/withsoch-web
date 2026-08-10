// components/sections/StatsNetworkIllustration.tsx
//
// Decorative flat line-and-node "connected world" illustration for the Stats
// section. Same flat-color, no-glow/no-gradient conversion approach used by
// HeroNetworkDiagram.tsx, but static (no canvas, no animation) — this is a
// quiet supporting graphic, not the hero's live data-flow visualization.

const NODES = [
  { id: 0, x: 60, y: 70, r: 5 },
  { id: 1, x: 130, y: 40, r: 4 },
  { id: 2, x: 200, y: 60, r: 6 },
  { id: 3, x: 150, y: 110, r: 4 },
  { id: 4, x: 260, y: 100, r: 5 },
  { id: 5, x: 90, y: 150, r: 4 },
  { id: 6, x: 200, y: 170, r: 8 }, // core
  { id: 7, x: 300, y: 160, r: 4 },
  { id: 8, x: 330, y: 220, r: 5 },
  { id: 9, x: 250, y: 250, r: 4 },
  { id: 10, x: 160, y: 240, r: 5 },
  { id: 11, x: 90, y: 220, r: 4 },
  { id: 12, x: 50, y: 280, r: 4 },
  { id: 13, x: 220, y: 320, r: 4 },
  { id: 14, x: 300, y: 300, r: 4 },
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

export function StatsNetworkIllustration() {
  return (
    <svg
      viewBox="0 0 380 380"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a connected network of automated workflows"
    >
      {LINES.map(([a, b], i) => {
        const from = NODES[a];
        const to = NODES[b];
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#e7e2d7"
            strokeWidth={1.4}
          />
        );
      })}
      {NODES.map((n) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.id === 6 ? "#ff5c35" : "#1c2b26"}
          opacity={n.id === 6 ? 1 : 0.85}
        />
      ))}
    </svg>
  );
}
