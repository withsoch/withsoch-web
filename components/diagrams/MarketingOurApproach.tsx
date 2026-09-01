// components/diagrams/MarketingOurApproach.tsx
//
// Coded rebuild of the "Our approach" reference SVG (752x501, approved
// design - do not redesign) for Marketing Automation. 5 ascending bars of
// increasing height (a "building momentum" staircase), each with its own
// icon, label, step number, and description lines. Root <svg> takes
// width="100%" height="100%" instead of the fixed 752x501, following the
// same conventions as OpsOurApproach.tsx: literal hex colors, viewBox
// preserved, key text as props defaulted to reference copy.

export type MarketingApproachStep = {
  label: string;
  stepLabel: string;
  lines: string[];
};

export type MarketingOurApproachProps = {
  headline?: string;
  steps?: [
    MarketingApproachStep,
    MarketingApproachStep,
    MarketingApproachStep,
    MarketingApproachStep,
    MarketingApproachStep,
  ];
  className?: string;
};

// Literal per-bar geometry transcribed from the reference SVG - ascending
// height staircase, all bars share the same bottom (y=371) and width.
const BAR_X = [28.0, 170.8, 313.6, 456.4, 599.2];
const BAR_Y = [301, 261, 221, 181, 141];
const BAR_HEIGHT = [70, 110, 150, 190, 230];
const BAR_WIDTH = 124.8;
const BAR_FILL = ["#ffe8dd", "#ff7a59", "#ff5c35", "#e8431b", "#1c2b26"];
const BAR_TEXT_FILL = ["#1c2b26", "#1c2b26", "#ffffff", "#ffffff", "#ffffff"];
const STEP_LABEL_Y = 389;
const DESC_START_Y = 411;
const DESC_LINE_HEIGHT = 15;

function StepIcon({ index, cx, iconTopY }: { index: number; cx: number; iconTopY: number }) {
  const stroke = index < 2 ? "#1c2b26" : "#ffffff";
  switch (index) {
    case 0:
      // magnifying glass (audit)
      return (
        <>
          <circle cx={cx} cy={iconTopY} r="8" fill="none" stroke={stroke} strokeWidth="1.8" />
          <line x1={cx + 5} y1={iconTopY + 5} x2={cx + 11} y2={iconTopY + 11} stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case 1:
      // target / crosshair (capture)
      return (
        <>
          <circle cx={cx} cy={iconTopY} r="9" fill="none" stroke={stroke} strokeWidth="1.7" />
          <circle cx={cx} cy={iconTopY} r="4" fill="none" stroke={stroke} strokeWidth="1.7" />
          <circle cx={cx} cy={iconTopY} r="1.3" fill={stroke} />
        </>
      );
    case 2:
      // heart (nurture)
      return (
        <path
          d={`M${cx} ${iconTopY + 12} c-3.5 -4.5 -9 -1.3 -9 3 c0 4 5.5 6.3 9 9.3 c3.5 -3 9 -5.3 9 -9.3 c0 -4.3 -5.5 -7.5 -9 -3 z`}
          fill="none"
          stroke={stroke}
          strokeWidth="1.6"
        />
      );
    case 3:
      // sparkle (generate)
      return (
        <path
          d={`M${cx} ${iconTopY - 6} L${cx + 2.5} ${iconTopY + 0.5} L${cx + 9} ${iconTopY + 3} L${cx + 2.5} ${iconTopY + 5.5} L${cx} ${iconTopY + 12} L${cx - 2.5} ${iconTopY + 5.5} L${cx - 9} ${iconTopY + 3} L${cx - 2.5} ${iconTopY + 0.5} Z`}
          fill={stroke}
        />
      );
    case 4:
    default:
      // bar chart (report)
      return (
        <>
          <rect x={cx - 9} y={iconTopY + 8} width="5" height="6" rx="1" fill={stroke} />
          <rect x={cx - 2} y={iconTopY + 4} width="5" height="10" rx="1" fill={stroke} />
          <rect x={cx + 5} y={iconTopY} width="5" height="14" rx="1" fill={stroke} />
        </>
      );
  }
}

export function MarketingOurApproach({
  headline = "BUILDING MOMENTUM / 5 STEPS",
  steps = [
    { label: "AUDIT", stepLabel: "STEP 1", lines: ["Marketing and", "lead flow audit", "(week 1)"] },
    { label: "CAPTURE", stepLabel: "STEP 2", lines: ["Lead capture,", "scoring,", "segmentation"] },
    { label: "NURTURE", stepLabel: "STEP 3", lines: ["Automated", "sequences", "across stages"] },
    { label: "GENERATE", stepLabel: "STEP 4", lines: ["AI-assisted", "content", "workflow"] },
    { label: "REPORT", stepLabel: "STEP 5", lines: ["Reporting tied", "to pipeline", "outcomes"] },
  ],
  className,
}: MarketingOurApproachProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${headline}: ${steps.map((s) => `${s.stepLabel} ${s.label} - ${s.lines.join(" ")}`).join("; ")}`}
    >
      <defs>
        <pattern id="moa-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#moa-dots)" />

      <text x="28" y="42" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="1" fill="#4c534f">
        {headline}
      </text>

      {steps.map((step, i) => {
        const cx = BAR_X[i] + BAR_WIDTH / 2;
        const iconTopY = BAR_Y[i] + 24;
        const labelY = BAR_Y[i] + 58;
        return (
          <g key={step.label}>
            <rect x={BAR_X[i]} y={BAR_Y[i]} width={BAR_WIDTH} height={BAR_HEIGHT[i]} rx="10" fill={BAR_FILL[i]} />
            <StepIcon index={i} cx={cx} iconTopY={iconTopY} />
            <text x={cx} y={labelY} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12.5" fontWeight="800" letterSpacing="0.4" fill={BAR_TEXT_FILL[i]} textAnchor="middle">
              {step.label}
            </text>
            <text x={cx} y={STEP_LABEL_Y} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10" fontWeight="700" fill="#e8431b" textAnchor="middle">
              {step.stepLabel}
            </text>
            {step.lines.map((line, li) => (
              <text
                key={li}
                x={cx}
                y={DESC_START_Y + li * DESC_LINE_HEIGHT}
                fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
                fontSize="10.5"
                fill="#7a817d"
                textAnchor="middle"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      <line x1="28" y1="371" x2="724" y2="371" stroke="#e7e2d7" strokeWidth="1.4" />
    </svg>
  );
}
