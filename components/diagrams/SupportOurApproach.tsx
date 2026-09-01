// components/diagrams/SupportOurApproach.tsx
//
// Coded rebuild of the "Our approach" reference SVG (752x501) for Customer
// Support Automation. Keeps the same top ruler/step-icon row as
// OpsOurApproach.tsx (shared 5-step scaffold across service pages), but the
// lower half is a distinct "ticket triage" mechanism instead of Ops's
// process-gears: tickets flow out of BUILD into an AI triage diamond that
// splits into an auto-reply chat bubble and a human-escalation path - the
// support-specific "what this step builds" payoff, so the two services no
// longer share the same lower-half visual. Root <svg> takes width="100%"
// height="100%" instead of the fixed 752x501, following the same
// conventions as SupportHero.tsx: literal hex colors, viewBox preserved,
// key text as props defaulted to reference copy.

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
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
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

      {/* Ticket-triage mechanism - fills the lower half of the canvas with a
          visual distinct from OpsOurApproach's process-gears. BUILD (step 3)
          feeds an AI triage diamond that splits tickets into an auto-reply
          path (chat bubble) and a human-escalation path, reading as "the
          system this step builds is what handles steps 4 and 5's tickets." */}
      <line x1="376" y1="243" x2="376" y2="288" stroke="#c7c0af" strokeWidth="1.6" strokeDasharray="3 4" />

      {/* Incoming ticket stack feeding the triage diamond */}
      <rect x="336" y="300" width="30" height="20" rx="3" fill="#ffffff" stroke="#c7c0af" strokeWidth="1.4" />
      <rect x="340" y="294" width="30" height="20" rx="3" fill="#ffffff" stroke="#c7c0af" strokeWidth="1.4" />
      <rect x="344" y="288" width="30" height="20" rx="3" fill="#f6f2ea" stroke="#7a817d" strokeWidth="1.4" />
      <line x1="349" y1="295" x2="367" y2="295" stroke="#7a817d" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="349" y1="300" x2="361" y2="300" stroke="#7a817d" strokeWidth="1.3" strokeLinecap="round" />

      {/* AI triage diamond */}
      <path d="M376 336 L414 372 L376 408 L338 372 Z" fill="#1c2b26" />
      <path d="M362 372 h6 l4 -8 l6 16 l4 -8 h6" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="376" y="425" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fontWeight="800" letterSpacing="0.4" fill="#4c534f" textAnchor="middle">
        AI TRIAGE
      </text>

      {/* Branch to auto-reply (toward TEST) */}
      <path d="M352 388 C 300 420 268 420 248 400" fill="none" stroke="#c7c0af" strokeWidth="1.6" strokeDasharray="3 4" />
      <path d="M248 400 L252 408 L260 400" fill="none" stroke="#c7c0af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="222" cy="392" r="26" fill="#e8431b" />
      <path d="M209 384 h20 a4 4 0 0 1 4 4 v9 a4 4 0 0 1 -4 4 h-15 l-6 5 v-5 h-1 a4 4 0 0 1 -4 -4 v-9 a4 4 0 0 1 4 -4 z" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <text x="222" y="436" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fontWeight="700" fill="#4c534f" textAnchor="middle">
        AUTO-REPLY
      </text>

      {/* Branch to human escalation (toward HANDOVER) */}
      <path d="M400 388 C 452 420 484 420 504 400" fill="none" stroke="#c7c0af" strokeWidth="1.6" strokeDasharray="3 4" />
      <path d="M504 400 L500 408 L492 400" fill="none" stroke="#c7c0af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="530" cy="392" r="26" fill="#ff7a59" />
      <circle cx="530" cy="384" r="6" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <path d="M517 402 a13 11 0 0 1 26 0" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <text x="530" y="436" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fontWeight="700" fill="#4c534f" textAnchor="middle">
        ESCALATE
      </text>

      <text x="376" y="472" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fill="#7a817d" textAnchor="middle">
        The triage built in step 3 keeps sorting tickets through test and handover.
      </text>
    </svg>
  );
}
