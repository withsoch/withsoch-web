// components/diagrams/MarketingCommonSymptoms.tsx
//
// Coded rebuild of the "Common symptoms" reference SVG (752x501, approved
// design - do not redesign) for Marketing Automation. 3 sticky-note cards,
// each rotated at a distinct angle around its own pivot (a corkboard look),
// with a pushpin circle at the top of each. The exact rotation angles and
// pivot points from the reference are preserved here - each card keeps its
// own <g transform="rotate(...)"> rather than being flattened to an
// axis-aligned layout. Root <svg> takes width="100%" height="100%" instead
// of the fixed 752x501, following the same conventions as
// SupportCommonSymptoms.tsx: literal hex colors, viewBox preserved, key
// text as props defaulted to reference copy.

export type MarketingCommonSymptomCard = {
  lines: string[];
  fill: string;
};

export type MarketingCommonSymptomsProps = {
  boardLabel?: string;
  cards?: [MarketingCommonSymptomCard, MarketingCommonSymptomCard, MarketingCommonSymptomCard];
  className?: string;
};

// Literal geometry transcribed from the reference SVG - rect x/y/w/h, the
// rotate() angle + pivot, and the pin position are all per-card and not
// re-derived from a formula, since the pivots don't align with the rect
// centers exactly.
const CARD_GEOMETRY = [
  { rect: { x: 24, y: 90, width: 220, height: 260 }, rotate: "rotate(-5 134.0 220.0)", textCx: 134.0, textStartY: 150, pin: { cx: 134.0, cy: 94 } },
  { rect: { x: 266, y: 70, width: 220, height: 270 }, rotate: "rotate(3 376.0 205.0)", textCx: 376.0, textStartY: 130, pin: { cx: 376.0, cy: 74 } },
  { rect: { x: 508, y: 100, width: 220, height: 250 }, rotate: "rotate(-3 618.0 225.0)", textCx: 618.0, textStartY: 160, pin: { cx: 618.0, cy: 104 } },
] as const;

export function MarketingCommonSymptoms({
  boardLabel = "ON THE BOARD",
  cards = [
    { lines: ["Leads coming in", "with no automated", "follow-up behind", "them"], fill: "#ffe8dd" },
    { lines: ["One-off campaigns", "with no nurture", "logic carrying", "them forward"], fill: "#ffffff" },
    { lines: ["Content", "production", "inconsistent;", "pipeline", "unpredictable"], fill: "#ffe8dd" },
  ],
  className,
}: MarketingCommonSymptomsProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${boardLabel}: ${cards.map((c) => c.lines.join(" ")).join("; ")}`}
    >
      <defs>
        <pattern id="mcs-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#mcs-dots)" />

      <text x="30" y="46" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.6" fill="#4c534f">
        {boardLabel}
      </text>

      {cards.map((card, i) => {
        const g = CARD_GEOMETRY[i];
        return (
          <g key={i} transform={g.rotate}>
            <rect x={g.rect.x} y={g.rect.y} width={g.rect.width} height={g.rect.height} rx="4" fill={card.fill} stroke="#e7e2d7" strokeWidth="1.3" />
            {card.lines.map((line, li) => (
              <text
                key={li}
                x={g.textCx}
                y={g.textStartY + li * 24}
                fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
                fontSize="16"
                fontWeight="700"
                fill="#1c2b26"
                textAnchor="middle"
              >
                {line}
              </text>
            ))}
            <circle cx={g.pin.cx} cy={g.pin.cy} r="9" fill="#e8431b" />
            <circle cx={g.pin.cx - 2.5} cy={g.pin.cy - 2.5} r="2.5" fill="rgba(255,255,255,0.5)" />
          </g>
        );
      })}
    </svg>
  );
}
