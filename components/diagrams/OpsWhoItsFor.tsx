// components/diagrams/OpsWhoItsFor.tsx
//
// Coded rebuild of the "Who it's for" reference SVG (752x501, approved
// design - do not redesign) for Operations & Process Automation. 3 stacked
// solid-fill cards in a coral/orange progression (#ff7a59 -> #ff5c35 ->
// #e8431b), each with a peach icon circle, step number, title, description,
// and a BUILD/RUN/SCALE pill - replacing the white-card/black-pill
// WhoItsForCards treatment so this tab matches the rest of Operations'
// diagrams. Root <svg> takes width="100%" height="100%" instead of the
// fixed 752x501, following the same conventions as OpsCommonSymptoms.tsx /
// OpsOurApproach.tsx: literal hex colors, viewBox preserved, key text as
// props defaulted to reference copy.

export type OpsWhoItsForCard = {
  number: string;
  title: string;
  descriptionLines: [string, string];
  tag: string;
  fill: string;
};

export type OpsWhoItsForProps = {
  cards?: [OpsWhoItsForCard, OpsWhoItsForCard, OpsWhoItsForCard];
  className?: string;
};

const CARD_Y = [24, 178.33333333333334, 332.6666666666667];
const CARD_H = 144.33333333333334;
const ICON_CY_OFFSET = 72.16666666666667;

function CardIcon({ index, cx, cy }: { index: number; cx: number; cy: number }) {
  switch (index) {
    case 0:
      // Gear
      return (
        <>
          <circle cx={cx} cy={cy} r="8" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          <circle cx={cx} cy={cy} r="2.6" fill="#ffffff" />
          <line x1={cx + 11} y1={cy} x2={cx + 14.5} y2={cy} stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <line x1={cx + 5.5} y1={cy + 9.5} x2={cx + 7.2} y2={cy + 12.5} stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <line x1={cx - 5.5} y1={cy + 9.5} x2={cx - 7.2} y2={cy + 12.5} stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <line x1={cx - 11} y1={cy} x2={cx - 14.5} y2={cy} stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <line x1={cx - 5.5} y1={cy - 9.6} x2={cx - 7.3} y2={cy - 12.6} stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <line x1={cx + 5.5} y1={cy - 9.6} x2={cx + 7.2} y2={cy - 12.6} stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
        </>
      );
    case 1:
      // Sync arrows
      return (
        <>
          <path d={`M${cx - 9} ${cy - 2} a9 9 0 0 1 16 -4`} fill="none" stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" />
          <path d={`M${cx + 9} ${cy + 2} a9 9 0 0 1 -16 4`} fill="none" stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" />
          <path d={`M${cx + 4} ${cy - 11} l4 -1.5 l1.5 4`} fill="none" stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M${cx - 4} ${cy + 11} l-4 1.5 l-1.5 -4`} fill="none" stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 2:
    default:
      // Check + growth corner
      return (
        <>
          <path
            d={`M${cx - 11} ${cy + 8} l7 -9 l5.5 5.5 l11 -12`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d={`M${cx + 8} ${cy - 14} h6.5 v6.5`} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
  }
}

export function OpsWhoItsFor({
  cards = [
    {
      number: "01",
      title: "BUILDING THE OPERATING SYSTEM",
      descriptionLines: [
        "Founders wiring up the first tools and workflows before",
        "manual process becomes the bottleneck.",
      ],
      tag: "BUILD",
      fill: "#ff7a59",
    },
    {
      number: "02",
      title: "RUNNING THE DAY-TO-DAY",
      descriptionLines: [
        "Ops managers keeping data, tools, and handoffs in sync so",
        "nothing slips between platforms.",
      ],
      tag: "RUN",
      fill: "#ff5c35",
    },
    {
      number: "03",
      title: "SCALING WITHOUT BREAKING",
      descriptionLines: ["COOs who need the operational foundation to hold as", "headcount and volume grow."],
      tag: "SCALE",
      fill: "#e8431b",
    },
  ],
  className,
}: OpsWhoItsForProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Who it's for: ${cards
        .map((c) => `${c.title} - ${c.descriptionLines.join(" ")} (${c.tag})`)
        .join("; ")}`}
    >
      <defs>
        <pattern id="wf-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#wf-dots)" />

      {cards.map((card, i) => {
        const y = CARD_Y[i];
        const iconCy = y + ICON_CY_OFFSET;
        const tagWidth = card.tag.length > 4 ? 61.5 : 46.5;
        return (
          <g key={card.number}>
            <rect x="24" y={y} width="704" height={CARD_H} rx="12" fill={card.fill} />
            <text
              x="44"
              y={y + 24}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="11"
              fontWeight="700"
              fill="rgba(255,255,255,0.55)"
            >
              {card.number}
            </text>
            <circle cx="68" cy={iconCy} r="24" fill="rgba(255,255,255,0.16)" />
            <CardIcon index={i} cx={68} cy={iconCy} />
            <text
              x="112"
              y={y + 64}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="19"
              fontWeight="800"
              letterSpacing="0.2"
              fill="#ffffff"
            >
              {card.title}
            </text>
            <text
              x="112"
              y={y + 86}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="12.5"
              fill="rgba(255,255,255,0.82)"
            >
              {card.descriptionLines[0]}
            </text>
            <text
              x="112"
              y={y + 103}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="12.5"
              fill="rgba(255,255,255,0.82)"
            >
              {card.descriptionLines[1]}
            </text>
            <rect x={728 - 20 - tagWidth} y={y + 16} width={tagWidth} height="24" rx="12" fill="rgba(0,0,0,0.22)" />
            <text
              x={728 - 20 - tagWidth / 2}
              y={y + 32}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.5"
              fill="#ffffff"
              textAnchor="middle"
            >
              {card.tag}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
