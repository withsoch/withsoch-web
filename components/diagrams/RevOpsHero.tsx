// components/diagrams/RevOpsHero.tsx
//
// Coded rebuild of the approved reference SVG for RevOps Automation's hero
// (3-circle Venn diagram - Sales/Marketing/Customer Success overlapping into
// Revenue; colors/layout/geometry final, do not redesign). Same viewBox
// (0 0 800 800), same circles/paths/text as the reference, but the root
// <svg> takes width="100%" height="100%" instead of fixed 800x800 so it
// scales fluidly in its container instead of needing object-fit cropping.
// Follows the same conventions as the other Hero components: literal hex
// colors, key content as props defaulted to the reference copy.
//
// The three circles use fill-opacity (not solid fills) so their overlap
// zones blend - preserved exactly from the reference, not flattened.
//
// Wired in for revops-automation only (see app/services/[slug]/page.tsx,
// app/services/page.tsx, components/sections/ServicesGrid.tsx).

export type RevOpsHeroProps = {
  eyebrow?: string;
  circleLabels?: [string, string, string];
  overlapLabels?: [string, string, string];
  centerLabel?: string;
  className?: string;
};

export function RevOpsHero({
  eyebrow = "GTM / OPERATING SYSTEM",
  circleLabels = ["SALES", "MARKETING", "CUSTOMER SUCCESS"],
  overlapLabels = ["PIPELINE", "EXPANSION", "ADVOCACY"],
  centerLabel = "REVENUE",
  className,
}: RevOpsHeroProps) {
  const [salesLabel, marketingLabel, successLabel] = circleLabels;
  const [pipelineLabel, expansionLabel, advocacyLabel] = overlapLabels;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Diagram: ${salesLabel}, ${marketingLabel}, and ${successLabel} overlapping into ${centerLabel}, with overlap zones ${pipelineLabel}, ${expansionLabel}, and ${advocacyLabel}.`}
    >
      <defs>
        <pattern id="revopsD1" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="10" y="16" width="780" height="780" rx="26" fill="#000000" opacity="0.05" />
      <rect x="6" y="10" width="788" height="788" rx="26" fill="#000000" opacity="0.05" />
      <rect x="0" y="0" width="800" height="800" rx="26" fill="#ffffff" />
      <rect x="22" y="22" width="756" height="756" rx="16" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1" />
      <rect x="23" y="23" width="754" height="754" rx="15" fill="url(#revopsD1)" />
      <path d="M36 48 V36 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M752 36 H764 V48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M36 752 V764 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M752 764 H764 V752" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <text
        x="56"
        y="68"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="12"
        fontWeight="700"
        letterSpacing="2"
        fill="#4c534f"
      >
        {eyebrow}
      </text>

      {/* Background dot/rect ornaments (reference decoration, two clusters) */}
      <rect x="460.5668233959622" y="342.1694847953407" width="8" height="8" fill="#4c534f" opacity="0.55" />
      <circle cx="242.83051520465932" cy="449.56682339596216" r="4" fill="#e8431b" opacity="0.55" />
      <rect x="134.43317660403784" y="225.83051520465932" width="10" height="4" fill="#7a817d" opacity="0.55" />
      <rect x="358.16948479534074" y="121.43317660403787" width="6" height="6" fill="#103129" opacity="0.4" />
      <rect x="656.5668233959622" y="342.1694847953407" width="8" height="8" fill="#4c534f" opacity="0.55" />
      <circle cx="438.8305152046593" cy="449.56682339596216" r="4" fill="#e8431b" opacity="0.55" />
      <rect x="330.43317660403784" y="225.83051520465932" width="10" height="4" fill="#7a817d" opacity="0.55" />
      <rect x="554.1694847953407" y="121.43317660403787" width="6" height="6" fill="#103129" opacity="0.4" />
      <rect x="558.5668233959622" y="492.1694847953407" width="8" height="8" fill="#4c534f" opacity="0.55" />
      <circle cx="340.8305152046593" cy="599.5668233959622" r="4" fill="#e8431b" opacity="0.55" />
      <rect x="232.43317660403784" y="375.8305152046593" width="10" height="4" fill="#7a817d" opacity="0.55" />
      <rect x="456.16948479534074" y="271.43317660403784" width="6" height="6" fill="#103129" opacity="0.4" />

      {/* The three overlapping circles - semi-transparent fills create the
          blended overlap zones; opacity values preserved exactly. */}
      <circle cx="302.0" cy="287" r="155" fill="#4c534f" opacity="0.82" />
      <circle cx="498.0" cy="287" r="155" fill="#ff5c35" opacity="0.82" />
      <circle cx="400.0" cy="437" r="155" fill="#103129" opacity="0.88" />

      {/* SALES */}
      <text
        x="302.0"
        y="217"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#ffffff"
        textAnchor="middle"
      >
        {salesLabel}
      </text>
      <circle cx="302.0" cy="257" r="16" fill="none" stroke="#ffffff" strokeWidth="2" />
      <circle cx="302.0" cy="257" r="8" fill="none" stroke="#ffffff" strokeWidth="2" />
      <circle cx="302.0" cy="257" r="2.5" fill="#ffffff" />

      {/* MARKETING */}
      <text
        x="498.0"
        y="217"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#ffffff"
        textAnchor="middle"
      >
        {marketingLabel}
      </text>
      <path d="M484.0 251 l14 -7 v22 l-14 -7 z" fill="#ffffff" />
      <rect x="480.0" y="251" width="4" height="7" fill="#ffffff" />
      <line x1="508.0" y1="249" x2="516.0" y2="245" stroke="#ffffff" strokeWidth="1.4" />
      <line x1="508.0" y1="257" x2="516.0" y2="257" stroke="#ffffff" strokeWidth="1.4" />
      <line x1="508.0" y1="265" x2="516.0" y2="269" stroke="#ffffff" strokeWidth="1.4" />

      {/* CUSTOMER SUCCESS */}
      <text
        x="400.0"
        y="532"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#ffffff"
        textAnchor="middle"
      >
        {successLabel}
      </text>
      <path
        d="M400.0 574 c-7 -6 -15 -2 -15 5 c0 6 9 10 15 15 c6 -5 15 -9 15 -15 c0 -7 -8 -11 -15 -5 z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
      />

      {/* Overlap-zone labels */}
      <text
        x="400.0"
        y="279"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.4"
        fill="#ffffff"
        textAnchor="middle"
      >
        {pipelineLabel}
      </text>
      <text
        x="321.0"
        y="392.0"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.4"
        fill="#ffffff"
        textAnchor="middle"
      >
        {expansionLabel}
      </text>
      <text
        x="479.0"
        y="392.0"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.4"
        fill="#ffffff"
        textAnchor="middle"
      >
        {advocacyLabel}
      </text>

      {/* Center REVENUE label */}
      <text
        x="400.0"
        y="345.0"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="24"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#ffffff"
        textAnchor="middle"
      >
        {centerLabel}
      </text>
      <line x1="400.0" y1="379.0" x2="400.0" y2="361.0" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M392.0 369.0 l8 -10 l8 10"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
