// components/diagrams/MarketingOutcomes.tsx
//
// Coded rebuild of the "Outcomes" reference SVG (752x501, approved design -
// do not redesign) for Marketing Automation. A winding journey path from
// "FIRST TOUCH" through 3 waypoints (check / target / funnel icons) to
// "SALES-READY", plus 3 text cards below. Root <svg> takes width="100%"
// height="100%" instead of the fixed 752x501, following the same
// conventions as SupportWhoItsFor.tsx / OpsOutcomes.tsx: literal hex
// colors, viewBox preserved, key text as props defaulted to reference copy.

export type MarketingOutcomeCard = {
  lines: string[];
};

export type MarketingOutcomesProps = {
  headline?: string;
  firstTouchLabel?: string;
  cards?: [MarketingOutcomeCard, MarketingOutcomeCard, MarketingOutcomeCard];
  className?: string;
};

const WAYPOINTS = [
  { cx: 261.52, cy: 80 },
  { cx: 477.76, cy: 170 },
  { cx: 681.28, cy: 110 },
];

const CARD_X = [28.0, 268.0, 508.0];
const CARD_WIDTH = 216.0;
const CARD_Y = 250;
const CARD_HEIGHT = 200;

export function MarketingOutcomes({
  headline = "FIRST TOUCH → SALES-READY",
  firstTouchLabel = "FIRST TOUCH",
  cards = [
    { lines: ["Leads nurtured", "automatically from first", "touch to sales-ready"] },
    { lines: ["Consistent output", "without the production", "burden"] },
    { lines: ["Clear visibility into", "which campaigns drive", "pipeline"] },
  ],
  className,
}: MarketingOutcomesProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${headline}: ${cards.map((c) => c.lines.join(" ")).join("; ")}`}
    >
      <defs>
        <pattern id="mo-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#mo-dots)" />

      <text x="28" y="46" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.6" fill="#4c534f">
        {headline}
      </text>

      <path
        d="M70.72 130 Q166.12 130 261.52 80 Q369.64 80 477.76 170 Q579.52 170 681.28 110"
        fill="none"
        stroke="#e7e2d7"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx="70.72" cy="130" r="8" fill="#1c2b26" />
      <text x="70.72" y="112" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fontWeight="700" fill="#4c534f" textAnchor="start">
        {firstTouchLabel}
      </text>

      {/* waypoint 1 - check mark */}
      <circle cx={WAYPOINTS[0].cx} cy={WAYPOINTS[0].cy} r="26" fill="#ffffff" stroke="#e8431b" strokeWidth="2.5" />
      <path
        d={`M${WAYPOINTS[0].cx - 10} ${WAYPOINTS[0].cy + 6} l7 -8 l5.5 5.5 l10 -11`}
        fill="none"
        stroke="#e8431b"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M${WAYPOINTS[0].cx + 7} ${WAYPOINTS[0].cy - 11} h6 v6`}
        fill="none"
        stroke="#e8431b"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* waypoint 2 - target with check */}
      <circle cx={WAYPOINTS[1].cx} cy={WAYPOINTS[1].cy} r="26" fill="#ffffff" stroke="#e8431b" strokeWidth="2.5" />
      <circle cx={WAYPOINTS[1].cx} cy={WAYPOINTS[1].cy} r="12" fill="none" stroke="#e8431b" strokeWidth="2.2" />
      <path
        d={`M${WAYPOINTS[1].cx - 5.5} ${WAYPOINTS[1].cy} l4 4.4 l8 -9.4`}
        fill="none"
        stroke="#e8431b"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* waypoint 3 - funnel */}
      <circle cx={WAYPOINTS[2].cx} cy={WAYPOINTS[2].cy} r="26" fill="#ffffff" stroke="#e8431b" strokeWidth="2.5" />
      <path
        d={`M${WAYPOINTS[2].cx - 14} ${WAYPOINTS[2].cy} q14 -15 28 0 q-14 15 -28 0 z`}
        fill="none"
        stroke="#e8431b"
        strokeWidth="2.1"
      />
      <circle cx={WAYPOINTS[2].cx} cy={WAYPOINTS[2].cy} r="5.5" fill="none" stroke="#e8431b" strokeWidth="2.1" />

      {cards.map((card, i) => (
        <g key={i}>
          <rect x={CARD_X[i]} y={CARD_Y} width={CARD_WIDTH} height={CARD_HEIGHT} rx="12" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1.3" />
          <text x={CARD_X[i] + 18} y={CARD_Y + 22} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fontWeight="700" fill="#c9c4b6">
            {`0${i + 1}`}
          </text>
          {card.lines.map((line, li) => (
            <text
              key={li}
              x={CARD_X[i] + 18}
              y={CARD_Y + 52 + li * 21}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="14.5"
              fontWeight="600"
              fill="#1c2b26"
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}
