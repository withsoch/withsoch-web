// components/diagrams/AgentDevWhoItsFor.tsx
//
// Coded rebuild of the "Who it's for" reference SVG (752x501, approved
// design - do not redesign). Same viewBox, same paths/rects/text/colors as
// the reference, root <svg> takes width="100%" height="100%" instead of the
// fixed 752x501 so it scales fluidly. Follows the same conventions as
// AgentDevHero.tsx: literal hex colors, content as props defaulted to the
// reference copy.

export type AgentDevWhoItsForProps = {
  rolePills?: [string, string, string];
  caption?: string;
  outcomeCaption?: string;
  sentenceLines?: [string, string, string];
  className?: string;
};

export function AgentDevWhoItsFor({
  rolePills = ["FOUNDERS", "OPS LEADS", "TEAM LEADS"],
  caption = "HOURS SPENT ON COGNITIVE WORK",
  outcomeCaption = "AN AGENT COULD HANDLE RELIABLY",
  sentenceLines = [
    "Founders, ops leads, and team leads at 10 to 150-person",
    "companies whose teams are spending hours on cognitive work",
    "that an AI agent could handle reliably.",
  ],
  className,
}: AgentDevWhoItsForProps) {
  const [pill1, pill2, pill3] = rolePills;
  const [line1, line2, line3] = sentenceLines;
  // Pill widths/positions were computed from each label's rendered length in
  // the reference - kept literal rather than re-measured at runtime so the
  // layout matches exactly for the default copy.
  const pills = [
    { label: pill1, x: 28, width: 79.6 },
    { label: pill2, x: 117.6, width: 86.8 },
    { label: pill3, x: 214.4, width: 94.0 },
  ];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Who it's for: ${pill1}, ${pill2}, ${pill3}. ${line1} ${line2} ${line3}`}
    >
      <defs>
        <pattern id="wif-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#wif-dots)" />

      {pills.map((pill) => (
        <g key={pill.label}>
          <rect x={pill.x} y="27" width={pill.width} height="28" rx="14" fill="#ffffff" stroke="#e8431b" strokeWidth="1.6" />
          <text
            x={pill.x + pill.width / 2}
            y="46"
            fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
            fontSize="11.5"
            fontWeight="700"
            letterSpacing="0.3"
            fill="#e8431b"
            textAnchor="middle"
          >
            {pill.label}
          </text>
        </g>
      ))}

      {/* Hourglass */}
      <path
        d="M321.0 135.0 h110 l-50.0 77.0 q5.0 8 0 16 l50.0 77.0 h-110 l50.0 -77.0 q-5.0 -8 0 -16 z"
        fill="none"
        stroke="#1c2b26"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="307.0" y="125.0" width="138" height="10" rx="4" fill="#1c2b26" />
      <rect x="307.0" y="305.0" width="138" height="10" rx="4" fill="#1c2b26" />
      <path d="M329.0 297.0 h94 l-42.0 -45.0 q5.0 6 0 12 z" fill="#ff7a59" />
      <line x1="376.0" y1="212" x2="376.0" y2="228" stroke="#e8431b" strokeWidth="3" strokeLinecap="round" />

      <text x="376.0" y="111.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.6" fill="#4c534f" textAnchor="middle">
        {caption}
      </text>
      <text x="376.0" y="347.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="800" fill="#e8431b" textAnchor="middle">
        {outcomeCaption}
      </text>

      <text x="28" y="383.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="700" fill="#1c2b26">
        {line1}
      </text>
      <text x="28" y="409.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="700" fill="#1c2b26">
        {line2}
      </text>
      <text x="28" y="435.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="700" fill="#1c2b26">
        {line3}
      </text>
    </svg>
  );
}
