// components/diagrams/AgentDevDeliverables.tsx
//
// Coded rebuild of the "Deliverables" reference SVG (752x501, approved
// design - do not redesign). 4 stacked rows, each a dark shadow card behind
// a colored card with an icon, title, description, index numeral, and a
// decorative progress-bar mark. Root <svg> takes width="100%" height="100%"
// instead of the fixed 752x501.
//
// Row geometry (shadow/card offsets, alternating fill color, icon glyph per
// row) is literal from the reference - only title/description text is data.
// The 4 icon glyphs are fixed per row position (bookmark / gear / checklist
// / play), matching the approved visual; they don't change with the text
// props, same as AgentDevHero's fixed icon-per-chip treatment.

export type AgentDevDeliverableItem = {
  title: string;
  lines: string[];
};

export type AgentDevDeliverablesProps = {
  eyebrow?: string;
  items?: [AgentDevDeliverableItem, AgentDevDeliverableItem, AgentDevDeliverableItem, AgentDevDeliverableItem];
  className?: string;
};

// Per-row literal geometry from the reference.
const ROWS = [
  { shadowY: 66, cardX: 66, cardY: 72, fill: "#e8431b", numeral: "01" },
  { shadowY: 172, cardX: 86, cardY: 178, fill: "#4c534f", numeral: "02" },
  { shadowY: 278, cardX: 66, cardY: 284, fill: "#e8431b", numeral: "03" },
  { shadowY: 384, cardX: 86, cardY: 390, fill: "#4c534f", numeral: "04" },
];
const CARD_W = 632;
const CARD_H = 84;
const SHADOW_X = 40;
const SHADOW_W = 672;
const SHADOW_H = 96;

function RowIcon({ index, cx, cy }: { index: number; cx: number; cy: number }) {
  switch (index) {
    case 0:
      // Bookmark/map glyph
      return (
        <g>
          <path d={`M${cx - 12} ${cy - 8} l8 -3 l8 4 l8 -4 v16 l-8 4 l-8 -4 l-8 3 z`} fill="none" stroke="#ffffff" strokeWidth="1.6" strokeLinejoin="round" />
          <line x1={cx - 4} y1={cy - 7} x2={cx - 4} y2={cy + 9} stroke="#ffffff" strokeWidth="1.3" />
          <line x1={cx + 4} y1={cy - 7} x2={cx + 4} y2={cy + 9} stroke="#ffffff" strokeWidth="1.3" />
        </g>
      );
    case 1:
      // Gear glyph
      return (
        <g>
          <rect x={cx - 11} y={cy - 7} width="22" height="16" rx="4" fill="none" stroke="#ffffff" strokeWidth="1.7" />
          <circle cx={cx - 4} cy={cy} r="2" fill="#ffffff" />
          <circle cx={cx + 4} cy={cy} r="2" fill="#ffffff" />
          <line x1={cx} y1={cy - 7} x2={cx} y2={cy - 12} stroke="#ffffff" strokeWidth="1.7" />
        </g>
      );
    case 2:
      // Checklist glyph
      return (
        <g>
          <rect x={cx - 10} y={cy - 10} width="20" height="20" rx="5" fill="none" stroke="#ffffff" strokeWidth="1.7" />
          <path d={`M${cx - 5} ${cy} l3.5 4 l7 -8`} fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case 3:
    default:
      // Play glyph
      return (
        <g>
          <circle cx={cx} cy={cy} r="13" fill="none" stroke="#ffffff" strokeWidth="1.7" />
          <path d={`M${cx - 4} ${cy - 7} l11 7 l-11 7 z`} fill="#ffffff" />
        </g>
      );
  }
}

export function AgentDevDeliverables({
  eyebrow = "WHAT YOU GET",
  items = [
    { title: "Use case map", lines: ["Use case map and agent specifications"] },
    { title: "Agent, built", lines: ["Custom AI agent built, integrated,", "deployed"] },
    { title: "Eval suite", lines: ["Evaluation suite and prompt library"] },
    { title: "Handover", lines: ["Documentation, Loom walkthrough, handover", "session"] },
  ],
  className,
}: AgentDevDeliverablesProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${eyebrow}: ${items.map((it, i) => `${i + 1}. ${it.title} - ${it.lines.join(" ")}`).join("; ")}`}
    >
      <defs>
        <pattern id="dl-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#dl-dots)" />

      <text x="40" y="40" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.6" fill="#4c534f">
        {eyebrow}
      </text>

      {ROWS.map((row, i) => {
        const item = items[i];
        const iconCx = row.cardX + 44;
        const iconCy = row.cardY + 42;
        const titleY = iconCy - 4;
        const barX = row.cardX + 558;
        const barY = iconCy - 4;
        return (
          <g key={item.title}>
            <rect x={SHADOW_X} y={row.shadowY} width={SHADOW_W} height={SHADOW_H} rx="10" fill="#1c2b26" opacity="0.92" />
            <rect x={row.cardX} y={row.cardY} width={CARD_W} height={CARD_H} rx="8" fill={row.fill} />
            <circle cx={iconCx} cy={iconCy} r="22" fill="rgba(255,255,255,0.15)" />
            <RowIcon index={i} cx={iconCx} cy={iconCy} />
            <text x={iconCx + 40} y={titleY} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16" fontWeight="800" fill="#ffffff">
              {item.title}
            </text>
            {item.lines.map((line, li) => (
              <text
                key={li}
                x={iconCx + 40}
                y={titleY + 20 + li * 15}
                fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
                fontSize="11.5"
                fill="rgba(255,255,255,0.72)"
              >
                {line}
              </text>
            ))}
            <text x="696" y={row.cardY + 16} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.5)" textAnchor="end">
              {row.numeral}
            </text>
            <rect x={barX} y={barY} width="60" height="8" rx="4" fill="rgba(255,255,255,0.3)" />
          </g>
        );
      })}
    </svg>
  );
}
