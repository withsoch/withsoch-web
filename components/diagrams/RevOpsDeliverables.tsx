// components/diagrams/RevOpsDeliverables.tsx
//
// Coded rebuild of the "Deliverables" reference SVG (752x501, approved
// design - do not redesign) for RevOps Automation. 4 solid-color cards in a
// row (Audit & map / CRM rebuild / Routing & triggers / Dashboard), each
// with an icon badge, index numeral, title, and description - connected by
// a chain-link icon (two rotated rounded rectangles) in the gap between
// each pair of cards. Root <svg> takes width="100%" height="100%" instead
// of the fixed 752x501, following the same conventions as
// MarketingDeliverables.tsx: literal hex colors, viewBox preserved, key
// text as props defaulted to reference copy.

export type RevOpsDeliverableItem = {
  title: string[];
  lines: string[];
};

export type RevOpsDeliverablesProps = {
  eyebrow?: string;
  items?: [RevOpsDeliverableItem, RevOpsDeliverableItem, RevOpsDeliverableItem, RevOpsDeliverableItem];
  className?: string;
};

// Literal per-card geometry transcribed from the reference SVG.
const CARD_X = [26.0, 208.5, 391.0, 573.5];
const CARD_W = 152.5;
const CARD_H = 260;
const CARD_Y = 90;
const CARD_FILL = ["#1c2b26", "#e8431b", "#103129", "#4c534f"];
const LINK_X = [188.5, 371.0, 553.5];
const LINK_CY = 220.0;

function DeliverableIcon({ index, cx, cy }: { index: number; cx: number; cy: number }) {
  switch (index) {
    case 0:
      // Magnifier over target (audit & map)
      return (
        <>
          <circle cx={cx - 2} cy={cy - 2} r="8" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <line x1={cx + 4} y1={cy + 4} x2={cx + 10} y2={cy + 10} stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case 1:
      // 2x2 grid (CRM rebuild)
      return (
        <>
          <rect x={cx - 9} y={cy - 9} width="7" height="7" rx="1.5" fill="#ffffff" />
          <rect x={cx + 1} y={cy - 9} width="7" height="7" rx="1.5" fill="#ffffff" />
          <rect x={cx - 9} y={cy + 1} width="7" height="7" rx="1.5" fill="#ffffff" />
          <rect x={cx + 1} y={cy + 1} width="7" height="7" rx="1.5" fill="#ffffff" />
        </>
      );
    case 2:
      // Routing nodes (routing & triggers)
      return (
        <>
          <circle cx={cx - 8} cy={cy - 6} r="3" fill="none" stroke="#ffffff" strokeWidth="1.6" />
          <circle cx={cx + 8} cy={cy - 6} r="3" fill="none" stroke="#ffffff" strokeWidth="1.6" />
          <circle cx={cx} cy={cy + 8} r="3" fill="none" stroke="#ffffff" strokeWidth="1.6" />
          <line x1={cx - 8} y1={cy - 3} x2={cx - 1.5} y2={cy + 6} stroke="#ffffff" strokeWidth="1.4" />
          <line x1={cx + 8} y1={cy - 3} x2={cx + 1.5} y2={cy + 6} stroke="#ffffff" strokeWidth="1.4" />
        </>
      );
    case 3:
    default:
      // Bar chart (dashboard)
      return (
        <>
          <rect x={cx - 11} y={cy + 1} width="6" height="8" rx="1.2" fill="#ffffff" />
          <rect x={cx - 3} y={cy - 5} width="6" height="14" rx="1.2" fill="#ffffff" />
          <rect x={cx + 5} y={cy - 2} width="6" height="11" rx="1.2" fill="#ffffff" />
        </>
      );
  }
}

// Chain-link glyph - two rotated rounded rectangles, matching the
// reference's connector between cards exactly.
function ChainLink({ x, cy }: { x: number; cy: number }) {
  return (
    <>
      <rect x={x} y={cy - 5.5} width="12" height="11" rx="5.5" fill="none" stroke="#1c2b26" strokeWidth="2.2" transform={`rotate(-45 ${x + 6} ${cy})`} />
      <rect x={x + 10} y={cy - 5.5} width="12" height="11" rx="5.5" fill="none" stroke="#1c2b26" strokeWidth="2.2" transform={`rotate(-45 ${x + 16} ${cy})`} />
    </>
  );
}

export function RevOpsDeliverables({
  eyebrow = "ONE CONNECTED SYSTEM",
  items = [
    { title: ["Audit &", "map"], lines: ["RevOps audit and", "revenue workflow", "map"] },
    { title: ["CRM rebuild"], lines: ["Pipeline stages", "and automations"] },
    { title: ["Routing &", "triggers"], lines: ["Lead, handoff,", "and renewal", "workflows"] },
    { title: ["Dashboard"], lines: ["Pipeline and", "sales forecast", "reporting"] },
  ],
  className,
}: RevOpsDeliverablesProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${eyebrow}: ${items.map((it, i) => `${i + 1}. ${it.title.join(" ")} - ${it.lines.join(" ")}`).join("; ")}`}
    >
      <defs>
        <pattern id="rdl-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#rdl-dots)" />

      <text x="26" y="42" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.6" fill="#4c534f">
        {eyebrow}
      </text>

      {items.map((item, i) => {
        const x = CARD_X[i];
        const cx = x + CARD_W / 2;
        const iconCy = CARD_Y + 56;
        const titleStartY = CARD_Y + 106 + (item.title.length > 1 ? -8 : 0);
        return (
          <g key={i}>
            <rect x={x} y={CARD_Y} width={CARD_W} height={CARD_H} rx="14" fill={CARD_FILL[i]} />
            <text x={x + 16} y={CARD_Y + 24} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.45)">
              {`0${i + 1}`}
            </text>
            <circle cx={cx} cy={iconCy} r="22" fill="rgba(255,255,255,0.14)" />
            <DeliverableIcon index={i} cx={cx} cy={iconCy} />
            {item.title.map((line, li) => (
              <text
                key={li}
                x={cx}
                y={titleStartY + li * 19}
                fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
                fontSize="15"
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
                y={titleStartY + item.title.length * 19 + 10 + li * 14}
                fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
                fontSize="10.5"
                fill="rgba(255,255,255,0.68)"
                textAnchor="middle"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {LINK_X.map((x) => (
        <ChainLink key={x} x={x} cy={LINK_CY} />
      ))}
    </svg>
  );
}
