// components/diagrams/AgentDevOutcomes.tsx
//
// Coded rebuild of the "Outcomes" reference SVG (752x501, approved design -
// do not redesign). Hero stat card (dark panel + bar-chart flourish) plus 2
// supporting outcome rows. Root <svg> takes width="100%" height="100%"
// instead of the fixed 752x501. Same conventions as AgentDevHero.tsx:
// literal hex colors, content as props defaulted to the reference copy.

export type AgentDevOutcomesProps = {
  heroStat?: string;
  heroCaption?: string;
  outcomes?: [string, string];
  className?: string;
};

export function AgentDevOutcomes({
  heroStat = "10–30+",
  heroCaption = "hours per week back in team capacity",
  outcomes = [
    "Consistent output quality across high-volume cognitive tasks",
    "AI deployed into your existing stack without replacing it",
  ],
  className,
}: AgentDevOutcomesProps) {
  const [outcome1, outcome2] = outcomes;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Outcomes: ${heroStat} ${heroCaption}. ${outcome1}. ${outcome2}.`}
    >
      <defs>
        <pattern id="oc-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#oc-dots)" />

      <rect x="28" y="40" width="696" height="220" rx="18" fill="#1c2b26" />
      <text x="60" y="145.6" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="72" fontWeight="800" fill="#ffffff">
        {heroStat}
      </text>
      <text x="60" y="183.6" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="19" fontWeight="700" fill="#ff7a59">
        {heroCaption}
      </text>
      <rect x="534" y="190" width="26" height="40" rx="4" fill="#e8431b" />
      <rect x="574" y="168" width="26" height="62" rx="4" fill="#e8431b" />
      <rect x="614" y="142" width="26" height="88" rx="4" fill="#e8431b" />
      <rect x="654" y="112" width="26" height="118" rx="4" fill="#ff5c35" />

      <rect x="28" y="294.0" width="696" height="86.5" rx="14" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1.3" />
      <circle cx="66" cy="337.25" r="20" fill="#ffe8dd" />
      <circle cx="66" cy="337.25" r="10" fill="none" stroke="#e8431b" strokeWidth="2" />
      <path d="M61.5 337.25 l3.3 3.6 l6.7 -7.8" fill="none" stroke="#e8431b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="104" y="343.25" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16" fontWeight="700" fill="#1c2b26">
        {outcome1}
      </text>

      <rect x="28" y="394.5" width="696" height="86.5" rx="14" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1.3" />
      <circle cx="66" cy="437.75" r="20" fill="#ffe8dd" />
      <rect x="53" y="435.75" width="14" height="14" rx="3" fill="none" stroke="#e8431b" strokeWidth="2" />
      <rect x="65" y="425.75" width="14" height="14" rx="3" fill="#ffe8dd" stroke="#e8431b" strokeWidth="2" />
      <text x="104" y="443.75" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16" fontWeight="700" fill="#1c2b26">
        {outcome2}
      </text>
    </svg>
  );
}
