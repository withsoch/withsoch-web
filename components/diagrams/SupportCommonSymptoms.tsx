// components/diagrams/SupportCommonSymptoms.tsx
//
// Coded rebuild of the "Common symptoms" reference SVG (752x501, approved
// design - do not redesign) for Customer Support Automation. A "SUPPORT
// INBOX" header bar over 3 stacked ticket rows (clock / question-bubble /
// misrouted-envelope icons + title). Root <svg> takes width="100%"
// height="100%" instead of the fixed 752x501, following the same
// conventions as SupportHero.tsx / OpsCommonSymptoms.tsx: literal hex
// colors, viewBox preserved, key text as props defaulted to reference copy.

export type SupportCommonSymptomsProps = {
  inboxLabel?: string;
  rows?: [string, string, string];
  className?: string;
};

function ClockIcon() {
  return (
    <>
      <circle cx="72" cy="140" r="13" fill="none" stroke="#e8431b" strokeWidth="2" />
      <line x1="72" y1="140" x2="72" y2="132" stroke="#e8431b" strokeWidth="2" strokeLinecap="round" />
      <line x1="72" y1="140" x2="79" y2="143" stroke="#e8431b" strokeWidth="2" strokeLinecap="round" />
      <path d="M87 125 a20 20 0 0 1 5 8" fill="none" stroke="#e8431b" strokeWidth="2" strokeLinecap="round" />
      <path d="M94 132 l2 -4 l4 2" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function RepeatQuestionIcon() {
  return (
    <>
      <path d="M61 255 a11 11 0 0 1 20 -5" fill="none" stroke="#e8431b" strokeWidth="2" strokeLinecap="round" />
      <path d="M83 261 a11 11 0 0 1 -20 5" fill="none" stroke="#e8431b" strokeWidth="2" strokeLinecap="round" />
      <path d="M77 244 l5 -2 l2 5" fill="none" stroke="#e8431b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M67 272 l-5 2 l-2 -5" fill="none" stroke="#e8431b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="72" y="262" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="9" fontWeight="700" fill="#e8431b" textAnchor="middle">
        ?
      </text>
    </>
  );
}

function MisroutedIcon() {
  return (
    <>
      <rect x="59" y="366" width="26" height="16" rx="3" fill="none" stroke="#e8431b" strokeWidth="1.8" />
      <circle cx="59" cy="376" r="2" fill="#e8431b" />
      <circle cx="85" cy="376" r="2" fill="#e8431b" />
      <path d="M68 386 q10 8 18 2" fill="none" stroke="#e8431b" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M84 385 l4 3 l-2 4.5" fill="none" stroke="#e8431b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

const ROW_Y = [88, 206, 324];
const ICON_CY = [140, 258, 376];
const ICONS = [ClockIcon, RepeatQuestionIcon, MisroutedIcon];

export function SupportCommonSymptoms({
  inboxLabel = "SUPPORT INBOX",
  rows = [
    "Response times slipping as volume grows",
    "The same questions answered over and over",
    "Tickets routing to the wrong person or sitting unassigned",
  ],
  className,
}: SupportCommonSymptomsProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Common symptoms - ${inboxLabel}: ${rows.join("; ")}`}
    >
      <defs>
        <pattern id="cs2-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#cs2-dots)" />

      <rect x="28" y="40" width="696" height="34" rx="8" fill="#1c2b26" />
      <text x="46" y="62" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.5" fill="#ffffff">
        {inboxLabel}
      </text>
      <circle cx="700" cy="57" r="5" fill="#e8431b" />

      {rows.map((row, i) => {
        const Icon = ICONS[i];
        return (
          <g key={i}>
            <rect x="28" y={ROW_Y[i]} width="696" height="104" rx="10" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1.3" />
            <circle cx="72" cy={ICON_CY[i]} r="26" fill="#ffe8dd" />
            <Icon />
            <text
              x="114"
              y={ICON_CY[i] + 6}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="16"
              fontWeight="700"
              fill="#1c2b26"
            >
              {row}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
