// components/diagrams/SupportOurApproach.tsx
//
// Coded rebuild of the "Our approach" reference SVG (752x501, approved
// design - do not redesign) for Customer Support Automation. Same
// structural pattern as OpsOurApproach.tsx (horizontal 5-step ruler flow,
// tick marks, progress rule, numbered step dots), with this service's own
// steps/icons (audit / KB review / build / test / handover). Root <svg>
// takes width="100%" height="100%" instead of the fixed 752x501, following
// the same conventions as SupportHero.tsx: literal hex colors, viewBox
// preserved, key text as props defaulted to reference copy.

export type SupportApproachStep = {
  label: string;
  lines: string[];
  done: boolean;
};

export type SupportOurApproachProps = {
  eyebrow?: string;
  steps?: [
    SupportApproachStep,
    SupportApproachStep,
    SupportApproachStep,
    SupportApproachStep,
    SupportApproachStep,
  ];
  className?: string;
};

const STEP_X = [44, 210, 376, 542, 708];

// Literal per-step icon geometry transcribed from the reference SVG
// (magnifier / open-book / wrench / check-box / play-box), positioned
// exactly as in the source rather than re-derived from a shared center.
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
      // Open book
      return (
        <>
          <path d="M201.0 96 h7 a2 2 0 0 1 2 2 v14 a2 2 0 0 0 -2 -2 h-7 z" fill="none" stroke="#4c534f" strokeWidth="1.6" />
          <path d="M219.0 96 h-7 a2 2 0 0 0 -2 2 v14 a2 2 0 0 1 2 -2 h7 z" fill="none" stroke="#4c534f" strokeWidth="1.6" />
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

export function SupportOurApproach({
  eyebrow = "PROCESS / 5 STEPS",
  steps = [
    { label: "AUDIT", lines: ["ticket data,", "workflow map"], done: true },
    { label: "KB REVIEW", lines: ["knowledge base", "gap fill"], done: true },
    { label: "BUILD", lines: ["response,", "routing,", "deflection"], done: true },
    { label: "TEST", lines: ["real ticket", "types, edge cases"], done: false },
    { label: "HANDOVER", lines: ["docs and Loom", "walkthrough"], done: false },
  ],
  className,
}: SupportOurApproachProps) {
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
        <pattern id="oa2-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#oa2-dots)" />

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
            <text x={x} y="192" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="800" fill="#1c2b26" textAnchor="middle">
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
    </svg>
  );
}
