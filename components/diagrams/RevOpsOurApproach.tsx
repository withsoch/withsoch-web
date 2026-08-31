// components/diagrams/RevOpsOurApproach.tsx
//
// Coded rebuild of the "Our approach" reference SVG (752x501, approved
// design - do not redesign) for RevOps Automation. Unlike the other
// services' straight ruler-flow, this reference is a switchback/snake path:
// 3 steps left-to-right on a top row, then the connector curves down and
// continues right-to-left for 2 more steps on a second row. The curved
// connector and two-row zigzag layout are preserved exactly. Root <svg>
// takes width="100%" height="100%" instead of the fixed 752x501, following
// the same conventions as OpsOurApproach.tsx: literal hex colors, viewBox
// preserved, key text as props defaulted to reference copy.

export type RevOpsApproachStep = {
  label: string;
  lines: string[];
  done: boolean;
};

export type RevOpsOurApproachProps = {
  eyebrow?: string;
  steps?: [RevOpsApproachStep, RevOpsApproachStep, RevOpsApproachStep, RevOpsApproachStep, RevOpsApproachStep];
  className?: string;
};

// Literal step geometry transcribed from the reference SVG - top row runs
// left to right at y=150, bottom row runs right to left at y=320 (steps 4
// and 5 share the top row's rightmost/leftmost x positions).
const STEP_POS = [
  { x: 90, y: 150 },
  { x: 376.0, y: 150 },
  { x: 662, y: 150 },
  { x: 662, y: 320 },
  { x: 90, y: 320 },
];

export function RevOpsOurApproach({
  eyebrow = "FULL REVOPS AUDIT / 5 STEPS",
  steps = [
    { label: "AUDIT", lines: ["Full audit, lead to", "renewal (weeks 1-2)"], done: true },
    { label: "CRM CLEANUP", lines: ["Pipeline", "architecture rebuild"], done: true },
    { label: "ROUTE", lines: ["Lead routing, deal", "stage automation"], done: true },
    { label: "HANDOFF", lines: ["Sales-to-CS context", "passing"], done: false },
    { label: "DASHBOARD", lines: ["Pipeline and", "forecast setup"], done: false },
  ],
  className,
}: RevOpsOurApproachProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${eyebrow}: ${steps.map((s, i) => `${i + 1}. ${s.label} - ${s.lines.join(" ")}`).join("; ")}`}
    >
      <defs>
        <pattern id="roa-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#roa-dots)" />

      <text x="30" y="40" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="1" fill="#4c534f">
        {eyebrow}
      </text>

      {/* Full switchback track (unfinished) + progress overlay (steps 1-3
          done, solid) - the curved connector between the two rows is
          preserved exactly from the reference. */}
      <path
        d="M90 150 L376.0 150 L662 150 C702 220 702 250 662 320 L90 320"
        fill="none"
        stroke="#e7e2d7"
        strokeWidth="3"
      />
      <path d="M90 150 L376.0 150 L662 150" fill="none" stroke="#e8431b" strokeWidth="3" />

      {steps.map((step, i) => {
        const { x, y } = STEP_POS[i];
        const labelAbove = y === 150;
        const titleY = labelAbove ? y - 66 : y + 46;
        const descY1 = labelAbove ? y - 46 : y + 66;
        const descY2 = labelAbove ? y - 31 : y + 81;
        return (
          <g key={step.label}>
            <circle
              cx={x}
              cy={y}
              r="22"
              fill={step.done ? "#e8431b" : "#ffffff"}
              stroke="#e8431b"
              strokeWidth={step.done ? "2" : "2"}
            />
            <text
              x={x}
              y={y + 6}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="16"
              fontWeight="700"
              fill={step.done ? "#ffffff" : "#e8431b"}
              textAnchor="middle"
            >
              {i + 1}
            </text>
            <text x={x} y={titleY} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="800" fill="#1c2b26" textAnchor="middle">
              {step.label}
            </text>
            <text x={x} y={descY1} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fill="#7a817d" textAnchor="middle">
              {step.lines[0]}
            </text>
            {step.lines[1] && (
              <text x={x} y={descY2} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fill="#7a817d" textAnchor="middle">
                {step.lines[1]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
