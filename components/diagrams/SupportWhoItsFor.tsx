// components/diagrams/SupportWhoItsFor.tsx
//
// Coded rebuild of the "Who it's for" reference SVG (752x501, approved
// design - do not redesign) for Customer Support Automation. Role pills,
// a diverging ticket-volume-vs-team-capacity line chart with a dashed gap
// marker, and the audience sentence below. Root <svg> takes width="100%"
// height="100%" instead of the fixed 752x501, following the same
// conventions as SupportHero.tsx / OpsOurApproach.tsx: literal hex colors,
// viewBox preserved, key text as props defaulted to reference copy.

export type SupportWhoItsForProps = {
  roles?: string[];
  ticketVolumeLabel?: string;
  teamCapacityLabel?: string;
  sentenceLines?: string[];
  className?: string;
};

// Literal pill geometry transcribed from the reference SVG - width per pill
// grows with its label rather than being re-derived from a fixed formula.
const PILL_WIDTHS = [79.6, 50.8, 115.6];
const PILL_GAP = 10;

export function SupportWhoItsFor({
  roles = ["FOUNDERS", "COOS", "SUPPORT LEADS"],
  ticketVolumeLabel = "Ticket volume",
  teamCapacityLabel = "Team capacity",
  sentenceLines = [
    "Founders, COOs, and support leads at 10 to 150-person",
    "companies whose ticket volume is growing faster than their",
    "team.",
  ],
  className,
}: SupportWhoItsForProps) {
  let pillX = 28;
  const pills = roles.map((label, i) => {
    const width = PILL_WIDTHS[i] ?? 90;
    const x = pillX;
    pillX += width + PILL_GAP;
    return { label, x, width };
  });

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Who it's for: ${roles.join(", ")}. ${sentenceLines.join(" ")}`}
    >
      <defs>
        <pattern id="wf-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#wf-dots)" />

      {pills.map((pill) => (
        <g key={pill.label}>
          <rect x={pill.x} y="29" width={pill.width} height="28" rx="14" fill="#ffffff" stroke="#e8431b" strokeWidth="1.6" />
          <text
            x={pill.x + pill.width / 2}
            y="48"
            fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
            fontSize="12"
            fontWeight="700"
            letterSpacing="0.3"
            fill="#e8431b"
            textAnchor="middle"
          >
            {pill.label}
          </text>
        </g>
      ))}

      <line x1="28" y1="290" x2="724" y2="290" stroke="#e7e2d7" strokeWidth="1.4" />
      <line x1="28" y1="100" x2="28" y2="290" stroke="#e7e2d7" strokeWidth="1.4" />

      <path
        d="M28.0 290.0 L167.2 276.3 L306.4 248.5 L445.6 210.5 L584.8 164.0 L724.0 110.0"
        fill="none"
        stroke="#e8431b"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="724.0" cy="110.0" r="5" fill="#e8431b" />
      <text x="716.0" y="96.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" fill="#e8431b" textAnchor="end">
        {ticketVolumeLabel}
      </text>

      <path
        d="M28.0 290.0 L167.2 277.8 L306.4 265.7 L445.6 253.5 L584.8 241.4 L724.0 229.2"
        fill="none"
        stroke="#4c534f"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 8"
      />
      <circle cx="724.0" cy="229.2" r="5" fill="#4c534f" />
      <text x="716.0" y="249.2" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" fill="#4c534f" textAnchor="end">
        {teamCapacityLabel}
      </text>

      <line x1="626.56" y1="148.59" x2="626.56" y2="237.71" stroke="#e8431b" strokeWidth="1.4" strokeDasharray="3 3" />

      {sentenceLines.map((line, i) => (
        <text
          key={i}
          x="28"
          y={340 + i * 28}
          fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
          fontSize="19"
          fontWeight="700"
          fill="#1c2b26"
        >
          {line}
        </text>
      ))}
    </svg>
  );
}
