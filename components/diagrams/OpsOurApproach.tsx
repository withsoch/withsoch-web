// components/diagrams/OpsOurApproach.tsx
//
// Redesigned from the original reference SVG (752x501) for Operations &
// Process Automation: the reference only used the top ~250px of the 501-tall
// canvas for its 5-step ruler, leaving a large empty gap below it inside the
// panel. This version keeps the same ruler/step-icon row unchanged and fills
// the remaining height with a "process gears" mechanism diagram - three
// meshed gears fed by the BUILD step, with dashed drive-lines running out to
// TEST and HANDOVER - so the lower half reads as "the automation this
// process builds keeps running," not empty space. Root <svg> takes
// width="100%" height="100%" instead of the fixed 752x501, following the
// same conventions as OpsHero.tsx / AgentDevOurApproach.tsx: literal hex
// colors, viewBox preserved, key text as props defaulted to reference copy.

export type OpsApproachStep = {
  label: string;
  lines: string[];
  done: boolean;
};

export type OpsOurApproachProps = {
  eyebrow?: string;
  steps?: [OpsApproachStep, OpsApproachStep, OpsApproachStep, OpsApproachStep, OpsApproachStep];
  className?: string;
};

const STEP_X = [44, 210, 376, 542, 708];

// Literal per-step icon geometry transcribed from the reference SVG
// (magnifier / gear / wrench / check-box / play-box), positioned exactly as
// in the source rather than re-derived from a shared center.
function StepIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      // Magnifier
      return (
        <>
          <circle cx="42.0" cy="102" r="7" fill="none" stroke="#4c534f" strokeWidth="1.7" />
          <line x1="47.0" y1="107" x2="52.0" y2="112" stroke="#4c534f" strokeWidth="1.7" strokeLinecap="round" />
        </>
      );
    case 1:
      // Gear
      return (
        <>
          <circle cx="210.0" cy="104" r="7" fill="none" stroke="#4c534f" strokeWidth="1.7" />
          <line x1="219.0" y1="104.0" x2="222.0" y2="104.0" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="214.5" y1="111.8" x2="216.0" y2="114.4" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="205.5" y1="111.8" x2="204.0" y2="114.4" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="201.0" y1="104.0" x2="198.0" y2="104.0" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="205.5" y1="96.2" x2="204.0" y2="93.6" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="214.5" y1="96.2" x2="216.0" y2="93.6" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" />
        </>
      );
    case 2:
      // Wrench
      return (
        <path
          d="M368.0 112 l11 -11 a2.6 2.6 0 0 1 3.7 0 a2.6 2.6 0 0 1 0 3.7 l-11 11 z"
          fill="none"
          stroke="#4c534f"
          strokeWidth="1.7"
        />
      );
    case 3:
      // Checkmark box
      return (
        <>
          <rect x="534.0" y="96" width="16" height="16" rx="4" fill="none" stroke="#4c534f" strokeWidth="1.7" />
          <path d="M538.0 104 l3 3.3 l6 -7" fill="none" stroke="#4c534f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 4:
    default:
      // Play/handover box
      return (
        <>
          <rect x="699.0" y="95" width="18" height="18" rx="4" fill="none" stroke="#4c534f" strokeWidth="1.7" />
          <path d="M705.0 100 l7 4 l-7 4 z" fill="#4c534f" />
        </>
      );
  }
}

// A gear glyph: a hub circle ringed with evenly-spaced teeth (small rounded
// rects rotated around the center) and a punched-out center hole. Used for
// the "process gears" mechanism filling the lower half of the diagram -
// generated procedurally (like the arc paths in RevOpsWhoItsFor.tsx) rather
// than hand-plotted, since teeth count/size vary per gear.
function Gear({
  cx,
  cy,
  r,
  teeth,
  toothLength,
  toothWidth,
  holeR,
  fill,
  rotation = 0,
}: {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  toothLength: number;
  toothWidth: number;
  holeR: number;
  fill: string;
  rotation?: number;
}) {
  const step = 360 / teeth;
  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      {Array.from({ length: teeth }).map((_, i) => (
        <rect
          key={i}
          x={cx - toothWidth / 2}
          y={cy - r - toothLength}
          width={toothWidth}
          height={toothLength + 5}
          rx={1.5}
          fill={fill}
          transform={`rotate(${i * step} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={holeR} fill="#f6f2ea" />
    </g>
  );
}

export function OpsOurApproach({
  eyebrow = "PROCESS / 5 STEPS",
  steps = [
    { label: "AUDIT", lines: ["workflow audit", "and redesign"], done: true },
    { label: "ASSESS", lines: ["tool and", "integration", "check"], done: true },
    { label: "BUILD", lines: ["custom", "automation build"], done: true },
    { label: "TEST", lines: ["edge cases, high", "volume"], done: false },
    { label: "HANDOVER", lines: ["docs and Loom", "walkthrough"], done: false },
  ],
  className,
}: OpsOurApproachProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${eyebrow}: ${steps.map((s, i) => `${i + 1}. ${s.label} - ${s.lines.join(" ")}`).join("; ")}`}
    >
      <defs>
        <pattern id="oa-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#oa-dots)" />

      <text x="24" y="42" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="1" fill="#4c534f">
        {eyebrow}
      </text>
      <line x1="24" y1="56" x2="728" y2="56" stroke="#e7e2d7" strokeWidth="1.3" />
      {STEP_X.map((x) => (
        <line key={x} x1={x} y1="51" x2={x} y2="61" stroke="#7a817d" strokeWidth="1.3" />
      ))}

      {/* Ruler + progress rule */}
      <line x1="44" y1="150" x2="708" y2="150" stroke="#e7e2d7" strokeWidth="2" />
      <line x1="44" y1="150" x2="376" y2="150" stroke="#e8431b" strokeWidth="2" />

      {steps.map((step, i) => {
        const x = STEP_X[i];
        return (
          <g key={step.label}>
            <StepIcon index={i} />
            <circle
              cx={x}
              cy="150"
              r="19"
              fill={step.done ? "#e8431b" : "#ffffff"}
              stroke={step.done ? "none" : "#e8431b"}
              strokeWidth={step.done ? "0" : "2"}
            />
            <text
              x={x}
              y="155.5"
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="15"
              fontWeight="700"
              fill={step.done ? "#ffffff" : "#e8431b"}
              textAnchor="middle"
            >
              {i + 1}
            </text>
            <text x={x} y="192" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12.5" fontWeight="800" fill="#1c2b26" textAnchor="middle">
              {step.label}
            </text>
            {step.lines.map((line, li) => (
              <text
                key={li}
                x={x}
                y={208 + li * 13}
                fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
                fontSize="9.5"
                fill="#7a817d"
                textAnchor="middle"
              >
                {line}
              </text>
            ))}
            <circle
              cx={x}
              cy="240"
              r="3.5"
              fill={step.done ? "#e8431b" : "none"}
              stroke={step.done ? "none" : "#e8431b"}
              strokeWidth={step.done ? "0" : "1.4"}
            />
          </g>
        );
      })}

      {/* Process-gears mechanism - fills the empty lower half of the canvas.
          BUILD (step 3) drives a meshed three-gear cluster; dashed drive
          lines carry that motion out to TEST and HANDOVER, reading as "the
          automation this step builds is what runs steps 4 and 5." */}
      <line x1="376" y1="243" x2="376" y2="318" stroke="#c7c0af" strokeWidth="1.6" strokeDasharray="3 4" />
      <path d="M328 400 C 260 400 240 300 306 262" fill="none" stroke="#c7c0af" strokeWidth="1.6" strokeDasharray="3 4" />
      <path d="M424 400 C 500 400 520 300 454 262" fill="none" stroke="#c7c0af" strokeWidth="1.6" strokeDasharray="3 4" />
      <path d="M306 262 L300 268 L312 267" fill="none" stroke="#c7c0af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M454 262 L448 268 L460 267" fill="none" stroke="#c7c0af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      <Gear cx={306} cy={330} r={26} teeth={10} toothLength={7} toothWidth={7} holeR={9} fill="#1c2b26" />
      <Gear cx={376} cy={378} r={44} teeth={13} toothLength={9} toothWidth={9} holeR={15} fill="#e8431b" rotation={8} />
      <Gear cx={452} cy={330} r={20} teeth={8} toothLength={6} toothWidth={6} holeR={7} fill="#ff7a59" rotation={-6} />

      <text x="376" y="464" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12.5" fontWeight="800" letterSpacing="0.4" fill="#4c534f" textAnchor="middle">
        BUILD DRIVES THE AUTOMATION
      </text>
      <text x="376" y="482" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fill="#7a817d" textAnchor="middle">
        The workflow built in step 3 keeps running through test and handover.
      </text>
    </svg>
  );
}
