// components/diagrams/OpsHero.tsx
//
// Coded rebuild of the approved reference SVG for Operations & Process
// Automation's hero (interlocking gears - colors/layout/geometry final, do
// not redesign). viewBox is 0 0 800 800, a vertical flow (inputs top, gears
// center, outputs bottom) replacing the earlier 900x460 horizontal layout,
// so the panel now reads as a square like AgentDevHero/RevOpsHero. The root
// <svg> takes width="100%" height="100%" so it scales fluidly in its
// container instead of needing object-fit cropping. Follows the same
// conventions as AgentDevHero.tsx: literal hex colors, key content as props
// defaulted to the reference copy.
//
// Gear teeth are individual rotated rects reproduced exactly from the
// reference (not approximated/regenerated), since their rotation math is
// what makes the gears read correctly.
//
// Wired in for operations-process-automation only (see
// app/services/[slug]/page.tsx, app/services/page.tsx,
// components/sections/ServicesGrid.tsx).

export type OpsHeroProps = {
  eyebrow?: string;
  gearLabels?: [string, string, string];
  inputItems?: [string, string, string];
  outputItems?: [string, string, string];
  className?: string;
};

const SYNC_TEETH_ANGLES = [8, 44, 80, 116, 152, 188, 224, 260, 296, 332];
const GENERATE_TEETH_ANGLES = [-4, 32, 68, 104, 140, 176, 212, 248, 284, 320];
const ROUTE_TEETH_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

function GearTeeth({
  cx,
  cy,
  radius,
  angles,
  fill,
}: {
  cx: number;
  cy: number;
  radius: number;
  angles: number[];
  fill: string;
}) {
  return (
    <>
      {angles.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = cx + radius * Math.cos(rad) - 9;
        const y = cy + radius * Math.sin(rad) - 9;
        return (
          <rect
            key={angle}
            x={x}
            y={y}
            width="18"
            height="18"
            rx="4"
            fill={fill}
            transform={`rotate(${angle} ${x + 9} ${y + 9})`}
          />
        );
      })}
    </>
  );
}

export function OpsHero({
  eyebrow = "AUTOMATION ENGINE",
  gearLabels = ["SYNC", "GENERATE", "ROUTE"],
  inputItems = ["CRM", "SHEETS", "DOCS"],
  outputItems = ["CLEAN CRM", "REPORTS", "SIGNED DOCS"],
  className,
}: OpsHeroProps) {
  const [syncLabel, generateLabel, routeLabel] = gearLabels;
  const [crmLabel, sheetsLabel, docsLabel] = inputItems;
  const [cleanCrmLabel, reportsLabel, signedDocsLabel] = outputItems;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Diagram: ${crmLabel}, ${sheetsLabel}, and ${docsLabel} flow through the ${eyebrow} (${syncLabel}, ${routeLabel}, ${generateLabel}), producing ${cleanCrmLabel}, ${reportsLabel}, and ${signedDocsLabel}.`}
    >
      <defs>
        <pattern id="opsD1" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="10" y="16" width="780" height="780" rx="26" fill="#000000" opacity="0.05" />
      <rect x="6" y="10" width="788" height="788" rx="26" fill="#000000" opacity="0.05" />
      <rect x="0" y="0" width="800" height="800" rx="26" fill="#ffffff" />
      <rect x="22" y="22" width="756" height="756" rx="16" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1" />
      <rect x="23" y="23" width="754" height="754" rx="15" fill="url(#opsD1)" />
      <path d="M36 48 V36 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M752 36 H764 V48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M36 752 V764 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M752 764 H764 V752" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <text x="56" y="66" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="1.5" fill="#4c534f">
        {eyebrow}
      </text>

      {/* Inputs (top row) */}
      <rect x="152" y="112" width="148" height="46" rx="23" fill="#ffe8dd" />
      <text x="226" y="140" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="14" fontWeight="700" fill="#1c2b26" textAnchor="middle">
        {crmLabel}
      </text>
      <rect x="326" y="112" width="148" height="46" rx="23" fill="#ffe8dd" />
      <text x="400" y="140" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="14" fontWeight="700" fill="#1c2b26" textAnchor="middle">
        {sheetsLabel}
      </text>
      <rect x="500" y="112" width="148" height="46" rx="23" fill="#ffe8dd" />
      <text x="574" y="140" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="14" fontWeight="700" fill="#1c2b26" textAnchor="middle">
        {docsLabel}
      </text>

      <line x1="226" y1="168" x2="226" y2="214" stroke="#7a817d" strokeWidth="1.6" />
      <path d="M220 208 l6 8 l6 -8" fill="none" stroke="#7a817d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="400" y1="168" x2="400" y2="214" stroke="#7a817d" strokeWidth="1.6" />
      <path d="M394 208 l6 8 l6 -8" fill="none" stroke="#7a817d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="574" y1="168" x2="574" y2="214" stroke="#7a817d" strokeWidth="1.6" />
      <path d="M568 208 l6 8 l6 -8" fill="none" stroke="#7a817d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      {/* SYNC gear */}
      <GearTeeth cx={255} cy={398} radius={58.48} angles={SYNC_TEETH_ANGLES} fill="#103129" />
      <circle cx="255" cy="398" r="58.48" fill="#103129" />
      <circle cx="255" cy="398" r="21.76" fill="#f6f2ea" />
      <text
        x="255"
        y="500"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="13"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#1c2b26"
        textAnchor="middle"
      >
        {syncLabel}
      </text>

      {/* GENERATE gear */}
      <GearTeeth cx={545} cy={398} radius={58.48} angles={GENERATE_TEETH_ANGLES} fill="#e8431b" />
      <circle cx="545" cy="398" r="58.48" fill="#e8431b" />
      <circle cx="545" cy="398" r="21.76" fill="#f6f2ea" />
      <text
        x="545"
        y="500"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="13"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#1c2b26"
        textAnchor="middle"
      >
        {generateLabel}
      </text>

      {/* ROUTE gear (larger, center) */}
      <GearTeeth cx={400} cy={328} radius={79.12} angles={ROUTE_TEETH_ANGLES} fill="#1c2b26" />
      <circle cx="400" cy="328" r="79.12" fill="#1c2b26" />
      <circle cx="400" cy="328" r="29.44" fill="#f6f2ea" />
      <text
        x="400"
        y="454"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="13"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#1c2b26"
        textAnchor="middle"
      >
        {routeLabel}
      </text>

      {/* Outputs (bottom row) */}
      <line x1="206" y1="530" x2="206" y2="628" stroke="#e8431b" strokeWidth="1.6" />
      <path d="M200 622 l6 8 l6 -8" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="400" y1="530" x2="400" y2="628" stroke="#e8431b" strokeWidth="1.6" />
      <path d="M394 622 l6 8 l6 -8" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="594" y1="530" x2="594" y2="628" stroke="#e8431b" strokeWidth="1.6" />
      <path d="M588 622 l6 8 l6 -8" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="122" y="642" width="168" height="46" rx="23" fill="#ffffff" stroke="#e8431b" strokeWidth="1.8" />
      <text x="206" y="670" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#e8431b" textAnchor="middle">
        {cleanCrmLabel}
      </text>
      <rect x="316" y="642" width="168" height="46" rx="23" fill="#ffffff" stroke="#e8431b" strokeWidth="1.8" />
      <text x="400" y="670" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#e8431b" textAnchor="middle">
        {reportsLabel}
      </text>
      <rect x="510" y="642" width="168" height="46" rx="23" fill="#ffffff" stroke="#e8431b" strokeWidth="1.8" />
      <text x="594" y="670" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#e8431b" textAnchor="middle">
        {signedDocsLabel}
      </text>
    </svg>
  );
}
