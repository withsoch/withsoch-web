// components/diagrams/OpsOutcomes.tsx
//
// Coded rebuild of the "Outcomes" reference SVG (752x501, approved design -
// do not redesign) for Operations & Process Automation. Before/after
// workload bars (100% manual -> mostly-automated with an "Exceptions"
// segment) plus 3 outcome rows with icon badges. Root <svg> takes
// width="100%" height="100%" instead of the fixed 752x501, following the
// same conventions as OpsHero.tsx / AgentDevOutcomes.tsx: literal hex
// colors, viewBox preserved, key text as props defaulted to reference copy.

export type OpsOutcomesProps = {
  beforeLabel?: string;
  afterLabel?: string;
  exceptionsLabel?: string;
  // Outcome 1 and 2 wrap across two lines in the reference; outcome 3 fits
  // on one. Each entry is the pre-split line array so custom copy doesn't
  // rely on fragile runtime word-wrap heuristics.
  outcomes?: [[string, string], [string, string], [string]];
  className?: string;
};

export function OpsOutcomes({
  beforeLabel = "Manual work carries the operational load",
  afterLabel = "System handles the routine work",
  exceptionsLabel = "Exceptions",
  outcomes = [
    ["10 to 40 or more hours per week reclaimed in team", "capacity"],
    ["Manual errors eliminated from your most critical", "processes"],
    ["Scalable ops foundation without growing headcount"],
  ],
  className,
}: OpsOutcomesProps) {
  const [o1, o2, o3] = outcomes;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Outcomes: before - ${beforeLabel}. after - ${afterLabel}. ${o1.join(" ")}. ${o2.join(" ")}. ${o3.join(" ")}.`}
    >
      <defs>
        <pattern id="oc2-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#oc2-dots)" />

      <text x="28" y="36" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="0.6" fill="#7a817d">BEFORE</text>
      <rect x="28" y="46" width="696" height="38" rx="8" fill="#1c2b26" />
      <text x="44" y="71" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#ffffff">{beforeLabel}</text>
      <text x="710" y="71" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" fill="rgba(255,255,255,0.55)" textAnchor="end">100%</text>

      <text x="28" y="96" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="0.6" fill="#7a817d">AFTER</text>
      <path d="M28 106 h487.2 v38 h-487.2 a8 8 0 0 1 -8 -8 v-22 a8 8 0 0 1 8 -8 z" fill="#ff5c35" />
      <path d="M515.2 106 h200.8 a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-200.8 z" fill="#ffe8dd" />
      <text x="44" y="131" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#ffffff">{afterLabel}</text>
      <text x="619.6" y="131" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" fill="#e8431b" textAnchor="middle">{exceptionsLabel}</text>

      <circle cx="54" cy="230.83" r="22" fill="#ffe8dd" />
      <path d="M45 236.83 l6.5 -7.5 l5 5 l9.5 -10.5" fill="none" stroke="#e8431b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 219.83 h5.5 v5.5" fill="none" stroke="#e8431b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="96" y="225.83" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="600" fill="#1c2b26">{o1[0]}</text>
      <text x="96" y="245.83" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="600" fill="#1c2b26">{o1[1]}</text>

      <line x1="28" y1="285.67" x2="724" y2="285.67" stroke="#e7e2d7" strokeWidth="1.2" />
      <circle cx="54" cy="328.5" r="22" fill="#ffe8dd" />
      <circle cx="54" cy="328.5" r="12" fill="none" stroke="#e8431b" strokeWidth="2.2" />
      <path d="M48.5 328.5 l4 4.4 l8 -9.4" fill="none" stroke="#e8431b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="96" y="323.5" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="600" fill="#1c2b26">{o2[0]}</text>
      <text x="96" y="343.5" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="600" fill="#1c2b26">{o2[1]}</text>

      <line x1="28" y1="383.33" x2="724" y2="383.33" stroke="#e7e2d7" strokeWidth="1.2" />
      <circle cx="54" cy="426.17" r="22" fill="#ffe8dd" />
      <rect x="40.0" y="428.17" width="7" height="9" rx="1.6" fill="#e8431b" />
      <rect x="49.5" y="422.17" width="7" height="15" rx="1.6" fill="#e8431b" />
      <rect x="59.0" y="416.17" width="7" height="21" rx="1.6" fill="#e8431b" />
      <text x="96" y="430.17" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="600" fill="#1c2b26">{o3[0]}</text>
    </svg>
  );
}
