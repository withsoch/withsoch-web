// components/diagrams/RevOpsCommonSymptoms.tsx
//
// Coded rebuild of the "Common symptoms" reference SVG (752x501, approved
// design - do not redesign) for RevOps Automation. A "CRM HEALTH CHECK"
// eyebrow over a 2x2 grid of 4 outlined cards (CRM incomplete / Sales &
// marketing misaligned / Roadmaps keep shifting / Forecast is a guess) -
// unlike the other services' 3-row layout, this reference is a 2x2 grid and
// that exact 4-item layout is preserved. Root <svg> takes width="100%"
// height="100%" instead of the fixed 752x501, following the same
// conventions as SupportCommonSymptoms.tsx: literal hex colors, viewBox
// preserved, key text as props defaulted to reference copy.

export type RevOpsSymptomItem = {
  title: string;
  lines: string[];
};

export type RevOpsCommonSymptomsProps = {
  eyebrow?: string;
  items?: [RevOpsSymptomItem, RevOpsSymptomItem, RevOpsSymptomItem, RevOpsSymptomItem];
  className?: string;
};

// Literal 2x2 card geometry transcribed from the reference SVG.
const CARD_X = [28, 384.0];
const CARD_Y = [60, 260.5];
const CARD_W = 340.0;
const CARD_H = 184.5;

function SymptomIcon({ index, cx, cy }: { index: number; cx: number; cy: number }) {
  switch (index) {
    case 0:
      // Incomplete record card (dashed rows)
      return (
        <>
          <rect x={cx - 10} y={cy - 7} width="20" height="14" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.7" />
          <line x1={cx - 10} y1={cy - 2} x2={cx} y2={cy - 2} stroke="#e8431b" strokeWidth="1.7" strokeDasharray="3 2.5" />
          <line x1={cx} y1={cy + 3} x2={cx + 10} y2={cy + 3} stroke="#e8431b" strokeWidth="1.7" strokeDasharray="3 2.5" />
        </>
      );
    case 1:
      // Misaligned faces (frowning duo)
      return (
        <>
          <circle cx={cx - 7} cy={cy - 5} r="4.5" fill="none" stroke="#e8431b" strokeWidth="1.6" />
          <circle cx={cx + 7} cy={cy - 5} r="4.5" fill="none" stroke="#e8431b" strokeWidth="1.6" />
          <line x1={cx - 4} y1={cy - 2} x2={cx - 2} y2={cy + 8} stroke="#e8431b" strokeWidth="1.6" />
          <line x1={cx + 4} y1={cy - 2} x2={cx + 2} y2={cy + 8} stroke="#e8431b" strokeWidth="1.6" />
        </>
      );
    case 2:
      // Shifting arrows (roadmap wobble)
      return (
        <>
          <path d={`M${cx - 9} ${cy - 2} a9 9 0 0 1 16 -4`} fill="none" stroke="#e8431b" strokeWidth="1.8" strokeLinecap="round" />
          <path d={`M${cx + 9} ${cy + 2} a9 9 0 0 1 -16 4`} fill="none" stroke="#e8431b" strokeWidth="1.8" strokeLinecap="round" />
          <path d={`M${cx + 4} ${cy - 11} l4 -1.5 l1.5 4`} fill="none" stroke="#e8431b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 3:
    default:
      // Guesswork die (dotted box)
      return (
        <>
          <rect x={cx - 10} y={cy - 10} width="20" height="20" rx="4" fill="none" stroke="#e8431b" strokeWidth="1.7" />
          <circle cx={cx - 5} cy={cy - 5} r="1.8" fill="#e8431b" />
          <circle cx={cx + 5} cy={cy + 5} r="1.8" fill="#e8431b" />
          <circle cx={cx} cy={cy} r="1.8" fill="#e8431b" />
        </>
      );
  }
}

export function RevOpsCommonSymptoms({
  eyebrow = "CRM HEALTH CHECK",
  items = [
    { title: "CRM incomplete", lines: ["reps not logging activity", "consistently"] },
    { title: "Sales & marketing misaligned", lines: ["not aligned on lead", "definitions"] },
    { title: "Roadmaps keep shifting", lines: ["priorities aren't aligned"] },
    { title: "Forecast is a guess", lines: ["built on gut feel, not", "pipeline data"] },
  ],
  className,
}: RevOpsCommonSymptomsProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${eyebrow}: ${items.map((it) => `${it.title} - ${it.lines.join(" ")}`).join("; ")}`}
    >
      <defs>
        <pattern id="rcs-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#rcs-dots)" />

      <text x="28" y="40" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.6" fill="#4c534f">
        {eyebrow}
      </text>

      {items.map((item, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = CARD_X[col];
        const y = CARD_Y[row];
        const iconCx = x + 34;
        const iconCy = y + 92.25;
        const textX = x + 74;
        return (
          <g key={item.title}>
            <rect x={x} y={y} width={CARD_W} height={CARD_H} rx="14" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1.4" />
            <circle cx={iconCx} cy={iconCy} r="22" fill="#ffe8dd" />
            <SymptomIcon index={i} cx={iconCx} cy={iconCy} />
            <text x={textX} y={iconCy - 2} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16" fontWeight="800" fill="#1c2b26">
              {item.title}
            </text>
            {item.lines.map((line, li) => (
              <text
                key={li}
                x={textX}
                y={iconCy + 18 + li * 16}
                fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
                fontSize="12"
                fill="#7a817d"
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
