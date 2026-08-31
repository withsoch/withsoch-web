// components/diagrams/MarketingDeliverables.tsx
//
// Coded rebuild of the "Deliverables" reference SVG (752x501, approved
// design - do not redesign) for Marketing Automation. 5 solid-color cards
// laid out in a staggered "wave" (alternating vertical offset), each with
// an icon, index numeral, title, and a short description - not a grid. The
// exact y-offset per card from the reference is preserved (cards 1/3/5 sit
// higher, cards 2/4 sit lower). Root <svg> takes width="100%" height="100%"
// instead of the fixed 752x501, following the same conventions as
// SupportDeliverables.tsx: literal hex colors, viewBox preserved, key text
// as props defaulted to reference copy.

export type MarketingDeliverableItem = {
  title: string[];
  lines: string[];
};

export type MarketingDeliverablesProps = {
  items?: [
    MarketingDeliverableItem,
    MarketingDeliverableItem,
    MarketingDeliverableItem,
    MarketingDeliverableItem,
    MarketingDeliverableItem,
  ];
  className?: string;
};

// Literal per-card geometry transcribed from the reference SVG - the wave
// offset (y alternates 70/116) is the meaningful part, preserved exactly.
const CARD_X = [24.0, 169.5, 315.0, 460.5, 606.0];
const CARD_Y = [70, 116, 70, 116, 70];
const CARD_WIDTH = 122;
const CARD_HEIGHT = 200;
const CARD_FILL = ["#1c2b26", "#e8431b", "#103129", "#4c534f", "#ff5c35"];

function DeliverableIcon({ index, cx, cy }: { index: number; cx: number; cy: number }) {
  switch (index) {
    case 0:
      // magnifying glass (audit)
      return (
        <>
          <circle cx={cx - 2} cy={cy - 2} r="7" fill="none" stroke="#ffffff" strokeWidth="1.7" />
          <line x1={cx + 3} y1={cy + 3} x2={cx + 8} y2={cy + 8} stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" />
        </>
      );
    case 1:
      // envelope (nurture sequences)
      return (
        <>
          <rect x={cx - 10} y={cy - 7} width="20" height="14" rx="2" fill="none" stroke="#ffffff" strokeWidth="1.6" />
          <path d={`M${cx - 10} ${cy - 6} l10 8 l10 -8`} fill="none" stroke="#ffffff" strokeWidth="1.6" />
        </>
      );
    case 2:
      // target (lead scoring)
      return (
        <>
          <circle cx={cx} cy={cy} r="9" fill="none" stroke="#ffffff" strokeWidth="1.7" />
          <circle cx={cx} cy={cy} r="4" fill="none" stroke="#ffffff" strokeWidth="1.7" />
          <circle cx={cx} cy={cy} r="1.3" fill="#ffffff" />
        </>
      );
    case 3:
      // profile card (profile refresh)
      return (
        <>
          <rect x={cx - 11} y={cy - 8} width="22" height="16" rx="2" fill="none" stroke="#ffffff" strokeWidth="1.6" />
          <circle cx={cx - 5} cy={cy - 3} r="2" fill="#ffffff" />
          <path d={`M${cx - 11} ${cy + 4} l6 -6 l5 5 l7 -7 l6 6`} fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinejoin="round" />
        </>
      );
    case 4:
    default:
      // bar chart (reporting)
      return (
        <>
          <rect x={cx - 10} y={cy + 1} width="5" height="7" rx="1" fill="#ffffff" />
          <rect x={cx - 3} y={cy - 4} width="5" height="12" rx="1" fill="#ffffff" />
          <rect x={cx + 4} y={cy - 8} width="5" height="16" rx="1" fill="#ffffff" />
        </>
      );
  }
}

export function MarketingDeliverables({
  items = [
    { title: ["Marketing", "audit"], lines: ["opportunity map"] },
    { title: ["Nurture", "sequences"], lines: ["automated email", "flows"] },
    { title: ["Lead scoring"], lines: ["CRM integration"] },
    { title: ["Profile", "refresh"], lines: ["profile &", "banner"] },
    { title: ["Reporting"], lines: ["pipeline", "attribution"] },
  ],
  className,
}: MarketingDeliverablesProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Deliverables: ${items.map((it, i) => `${i + 1}. ${it.title.join(" ")} - ${it.lines.join(" ")}`).join("; ")}`}
    >
      <defs>
        <pattern id="mdl-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#mdl-dots)" />

      {items.map((item, i) => {
        const x = CARD_X[i];
        const y = CARD_Y[i];
        const cx = x + CARD_WIDTH / 2;
        const iconCy = y + 62;
        const titleStartY = y + 108 + (item.title.length > 1 ? -8 : 0);
        return (
          <g key={i}>
            <rect x={x} y={y} width={CARD_WIDTH} height={CARD_HEIGHT} rx="14" fill={CARD_FILL[i]} />
            <text x={x + 16} y={y + 26} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.5)">
              {`0${i + 1}`}
            </text>
            <circle cx={cx} cy={iconCy} r="20" fill="rgba(255,255,255,0.14)" />
            <DeliverableIcon index={i} cx={cx} cy={iconCy} />
            {item.title.map((line, li) => (
              <text
                key={li}
                x={cx}
                y={titleStartY + li * 17}
                fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
                fontSize="13.5"
                fontWeight="800"
                fill="#ffffff"
                textAnchor="middle"
              >
                {line}
              </text>
            ))}
            {item.lines.map((line, li) => (
              <text
                key={li}
                x={cx}
                y={titleStartY + item.title.length * 17 + 3 + li * 14}
                fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
                fontSize="10.5"
                fill="rgba(255,255,255,0.7)"
                textAnchor="middle"
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
