// components/diagrams/OpsHero.tsx
//
// Coded rebuild of the approved reference SVG for Operations & Process
// Automation's hero (interlocking gears - colors/layout/geometry final, do
// not redesign). Same viewBox (0 0 900 560), same paths/circles/rects/text
// as the reference, but the root <svg> takes width="100%" height="100%"
// instead of fixed 900x560 so it scales fluidly in its container instead
// of needing object-fit cropping. Follows the same conventions as
// AgentDevHero.tsx: literal hex colors, key content as props defaulted to
// the reference copy.
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
      viewBox="0 0 900 560"
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
      <rect x="10" y="16" width="880" height="540" rx="26" fill="#000000" opacity="0.05" />
      <rect x="6" y="10" width="888" height="548" rx="26" fill="#000000" opacity="0.05" />
      <rect x="0" y="0" width="900" height="560" rx="26" fill="#ffffff" />
      <rect x="22" y="22" width="856" height="516" rx="16" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1" />
      <rect x="23" y="23" width="854" height="514" rx="15" fill="url(#opsD1)" />
      <path d="M36 48 V36 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M852 36 H864 V48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M36 512 V524 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M852 524 H864 V512" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />

      {/* SYNC gear */}
      <GearTeeth cx={330.16} cy={304.0} radius={49.88} angles={SYNC_TEETH_ANGLES} fill="#103129" />
      <circle cx="330.16" cy="304.0" r="49.88" fill="#103129" />
      <circle cx="330.16" cy="304.0" r="18.56" fill="#f6f2ea" />
      <text
        x="330.16"
        y="396.0"
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
      <GearTeeth cx={569.84} cy={304.0} radius={49.88} angles={GENERATE_TEETH_ANGLES} fill="#e8431b" />
      <circle cx="569.84" cy="304.0" r="49.88" fill="#e8431b" />
      <circle cx="569.84" cy="304.0" r="18.56" fill="#f6f2ea" />
      <text
        x="569.84"
        y="396.0"
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
      <GearTeeth cx={450.0} cy={244.0} radius={67.08} angles={ROUTE_TEETH_ANGLES} fill="#1c2b26" />
      <circle cx="450.0" cy="244.0" r="67.08" fill="#1c2b26" />
      <circle cx="450.0" cy="244.0" r="24.96" fill="#f6f2ea" />
      <text
        x="450.0"
        y="356.0"
        fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
        fontSize="13"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#1c2b26"
        textAnchor="middle"
      >
        {routeLabel}
      </text>

      {/* Inputs (left column) */}
      <rect x="82" y="96" width="140" height="42" rx="21" fill="#ffe8dd" />
      <text x="152" y="123" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#1c2b26" textAnchor="middle">
        {crmLabel}
      </text>
      <path d="M222 117 h38.16" stroke="#7a817d" strokeWidth="1.4" />
      <path d="M252.16 111 l8 6 l-8 6" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="82" y="160" width="140" height="42" rx="21" fill="#ffe8dd" />
      <text x="152" y="187" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#1c2b26" textAnchor="middle">
        {sheetsLabel}
      </text>
      <path d="M222 181 h38.16" stroke="#7a817d" strokeWidth="1.4" />
      <path d="M252.16 175 l8 6 l-8 6" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="82" y="224" width="140" height="42" rx="21" fill="#ffe8dd" />
      <text x="152" y="251" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#1c2b26" textAnchor="middle">
        {docsLabel}
      </text>
      <path d="M222 245 h38.16" stroke="#7a817d" strokeWidth="1.4" />
      <path d="M252.16 239 l8 6 l-8 6" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Outputs (right column) */}
      <rect x="668" y="96" width="150" height="42" rx="21" fill="#ffffff" stroke="#e8431b" strokeWidth="1.8" />
      <text x="743" y="123" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#e8431b" textAnchor="middle">
        {cleanCrmLabel}
      </text>
      <path d="M619.84 117 h38.16" stroke="#e8431b" strokeWidth="1.4" />
      <path d="M650 111 l8 6 l-8 6" fill="none" stroke="#e8431b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="668" y="160" width="150" height="42" rx="21" fill="#ffffff" stroke="#e8431b" strokeWidth="1.8" />
      <text x="743" y="187" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#e8431b" textAnchor="middle">
        {reportsLabel}
      </text>
      <path d="M619.84 181 h38.16" stroke="#e8431b" strokeWidth="1.4" />
      <path d="M650 175 l8 6 l-8 6" fill="none" stroke="#e8431b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="668" y="224" width="150" height="42" rx="21" fill="#ffffff" stroke="#e8431b" strokeWidth="1.8" />
      <text x="743" y="251" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#e8431b" textAnchor="middle">
        {signedDocsLabel}
      </text>
      <path d="M619.84 245 h38.16" stroke="#e8431b" strokeWidth="1.4" />
      <path d="M650 239 l8 6 l-8 6" fill="none" stroke="#e8431b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      <text x="56" y="62" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="1.5" fill="#4c534f">
        {eyebrow}
      </text>
    </svg>
  );
}
