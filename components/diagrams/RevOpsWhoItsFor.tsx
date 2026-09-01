// components/diagrams/RevOpsWhoItsFor.tsx
//
// Coded rebuild of the "Who it's for" reference SVG (752x501, approved
// design - do not redesign) for RevOps Automation. Role pills, a
// "FORECAST CONFIDENCE" trust gauge/dial (3-band arc: low/mid/high) with a
// needle pointing into the low band, and the audience sentence below. Root
// <svg> takes width="100%" height="100%" instead of the fixed 752x501,
// following the same conventions as RevOpsHero.tsx / SupportWhoItsFor.tsx:
// literal hex colors, viewBox preserved, key text as props defaulted to
// reference copy.

export type RevOpsWhoItsForProps = {
  roles?: string[];
  gaugeLabel?: string;
  lowLabel?: string;
  highLabel?: string;
  needleLabel?: string;
  sentenceLines?: string[];
  className?: string;
};

// Literal pill geometry transcribed from the reference SVG - width per pill
// grows with its label rather than being re-derived from a fixed formula.
const PILL_WIDTHS = [130.0, 79.6, 122.8];
const PILL_GAP = 10;

export function RevOpsWhoItsFor({
  roles = ["REVENUE LEADERS", "FOUNDERS", "SALES MANAGERS"],
  gaugeLabel = "FORECAST CONFIDENCE",
  lowLabel = "LOW",
  highLabel = "HIGH",
  needleLabel = "NOBODY TRUSTS IT",
  sentenceLines = [
    "Revenue leaders, founders, and sales managers at scaling",
    "businesses where GTM teams are working hard but not in sync.",
  ],
  className,
}: RevOpsWhoItsForProps) {
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
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Who it's for: ${roles.join(", ")}. ${gaugeLabel}: ${needleLabel}. ${sentenceLines.join(" ")}`}
    >
      <defs>
        <pattern id="rwf-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#rwf-dots)" />

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

      <text x="376.0" y="96" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.6" fill="#4c534f" textAnchor="middle">
        {gaugeLabel}
      </text>

      <path d="M246.0 250.00000000000003 A130 130 0 0 1 310.99999999999994 137.416697508023" fill="none" stroke="#1c2b26" strokeWidth="26" />
      <path d="M310.99999999999994 137.416697508023 A130 130 0 0 1 441.0 137.416697508023" fill="none" stroke="#4c534f" strokeWidth="26" />
      <path d="M441.0 137.416697508023 A130 130 0 0 1 506.0 249.99999999999997" fill="none" stroke="#ffe8dd" strokeWidth="26" />

      <text x="256.0" y="272" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fontWeight="700" fill="#7a817d">
        {lowLabel}
      </text>
      <text x="496.0" y="272" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fontWeight="700" fill="#7a817d" textAnchor="end">
        {highLabel}
      </text>

      <line x1="376.0" y1="250" x2="263.6178344074554" y2="197.59533554415327" stroke="#e8431b" strokeWidth="4" strokeLinecap="round" />
      <circle cx="376.0" cy="250" r="10" fill="#e8431b" stroke="#ffffff" strokeWidth="2.5" />
      <text x="376.0" y="288" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="800" fill="#e8431b" textAnchor="middle">
        {needleLabel}
      </text>

      {sentenceLines.map((line, i) => (
        <text
          key={i}
          x="28"
          y={360 + i * 26}
          fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
          fontSize="17"
          fontWeight="700"
          fill="#1c2b26"
        >
          {line}
        </text>
      ))}
    </svg>
  );
}
