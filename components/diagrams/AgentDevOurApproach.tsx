// components/diagrams/AgentDevOurApproach.tsx
//
// Coded rebuild of the "Our approach" reference SVG (752x560, approved
// design - do not redesign). Radial clock-face, 5 steps evenly spaced
// around a circle (angle = -90 + i*72 degrees, radius 130, center
// 376,290 - verified against every circle's coordinates in the reference).
// Root <svg> takes width="100%" height="100%" instead of the fixed
// 752x560.
//
// Per-step label positions (x/y/text-anchor) are literal, copied from the
// reference exactly - they alternate side/anchor by position around the
// circle (top: centered above; right side: anchor start; bottom-left:
// anchor end) in a way that doesn't reduce to one clean formula, so like
// AgentDevHero this keeps the reference's per-node coordinates instead of
// re-deriving them. Same for which steps render filled vs. outline
// (steps 1-3 filled/"done", 4-5 outline/"upcoming") and the progress arc
// (fixed sweep from step 1 to step 3, exactly as in the reference) - these
// are baked into the approved visual, not derived from step count.

export type AgentDevApproachStep = {
  title: string;
  lines: string[];
};

export type AgentDevOurApproachProps = {
  eyebrow?: string;
  centerLines?: [string, string];
  steps?: [
    AgentDevApproachStep,
    AgentDevApproachStep,
    AgentDevApproachStep,
    AgentDevApproachStep,
    AgentDevApproachStep,
  ];
  className?: string;
};

const CENTER_X = 376;
const CENTER_Y = 290;
const RADIUS = 130;
const NODE_R = 24;

function nodeCenter(i: number) {
  const angle = ((-90 + i * 72) * Math.PI) / 180;
  return {
    x: CENTER_X + RADIUS * Math.cos(angle),
    y: CENTER_Y + RADIUS * Math.sin(angle),
  };
}

// Literal per-step label geometry from the reference - title y, first desc
// line y, line height, and text-anchor.
const LABEL_LAYOUT: { titleY: number; descY: number; anchor: "start" | "middle" | "end" }[] = [
  { titleY: 94.0, descY: 114.0, anchor: "middle" },
  { titleY: 226.6687370800101, descY: 246.6687370800101, anchor: "start" },
  { titleY: 441.3312629199899, descY: 461.3312629199899, anchor: "start" },
  { titleY: 441.3312629199899, descY: 461.3312629199899, anchor: "end" },
  { titleY: 226.66873708001012, descY: 246.66873708001012, anchor: "end" },
];
const LABEL_X = [376.0, 558.6028511286695, 488.8547684401548, 263.1452315598452, 193.3971488713305];
const LINE_HEIGHT = 14;
// Steps 0-2 render as the "done" filled style, 3-4 as the "upcoming" outline
// style - matches the reference exactly.
const FILLED = [true, true, true, false, false];

export function AgentDevOurApproach({
  eyebrow = "AGENT ROLLOUT / 5 STEPS",
  centerLines = ["AGENT", "LIVE"],
  steps = [
    { title: "AUDIT", lines: ["Use case audit, agent", "design (weeks 1-2)"] },
    { title: "MODEL SELECT", lines: ["Model & tool", "integration scoping"] },
    { title: "BUILD", lines: ["Prompts, tools, and", "guardrails"] },
    { title: "EVAL", lines: ["Edge cases,", "high-volume scenarios"] },
    { title: "HANDOVER", lines: ["Docs, Loom", "walkthrough, live", "handover"] },
  ],
  className,
}: AgentDevOurApproachProps) {
  const [centerLine1, centerLine2] = centerLines;
  const p1 = nodeCenter(0);
  const p3 = nodeCenter(2);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 560"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${eyebrow}: ${steps.map((s, i) => `${i + 1}. ${s.title}`).join(", ")}`}
    >
      <defs>
        <pattern id="oa-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="560" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="560" fill="url(#oa-dots)" />

      <text x="28" y="40" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="1" fill="#4c534f">
        {eyebrow}
      </text>

      <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS} fill="none" stroke="#e7e2d7" strokeWidth="3" />
      <path
        d={`M${p1.x} ${p1.y} A${RADIUS} ${RADIUS} 0 0 1 ${p3.x} ${p3.y}`}
        fill="none"
        stroke="#e8431b"
        strokeWidth="3.5"
      />

      <circle cx={CENTER_X} cy={CENTER_Y} r="46" fill="#1c2b26" />
      <text x={CENTER_X} y={CENTER_Y - 4} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fontWeight="800" fill="#ffffff" textAnchor="middle">
        {centerLine1}
      </text>
      <text x={CENTER_X} y={CENTER_Y + 12} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fontWeight="800" fill="#ffffff" textAnchor="middle">
        {centerLine2}
      </text>

      {steps.map((step, i) => {
        const c = nodeCenter(i);
        const filled = FILLED[i];
        const layout = LABEL_LAYOUT[i];
        const labelX = LABEL_X[i];
        return (
          <g key={step.title}>
            <circle
              cx={c.x}
              cy={c.y}
              r={NODE_R}
              fill={filled ? "#e8431b" : "#ffffff"}
              stroke="#e8431b"
              strokeWidth="2"
            />
            <text
              x={c.x}
              y={c.y + 6}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="17"
              fontWeight="700"
              fill={filled ? "#ffffff" : "#e8431b"}
              textAnchor="middle"
            >
              {i + 1}
            </text>

            <text
              x={labelX}
              y={layout.titleY}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="13.5"
              fontWeight="800"
              fill="#1c2b26"
              textAnchor={layout.anchor}
            >
              {step.title}
            </text>
            {step.lines.map((line, li) => (
              <text
                key={li}
                x={labelX}
                y={layout.descY + li * LINE_HEIGHT}
                fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
                fontSize="10.5"
                fill="#7a817d"
                textAnchor={layout.anchor}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
