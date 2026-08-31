// components/diagrams/SupportOutcomes.tsx
//
// Coded rebuild of the "Outcomes" reference SVG (752x501, approved design -
// do not redesign) for Customer Support Automation. Same structural
// pattern as OpsOutcomes.tsx: before/after workload bars plus 3 outcome
// rows with icon badges - here the "after" bar is split at the real
// 30-60% deflection value (313.2/374.8 of the 688px bar), baked into the
// path widths below, with "AI deflects" / "Team resolves the rest" labels.
// Root <svg> takes width="100%" height="100%" instead of the fixed
// 752x501, following the same conventions as SupportHero.tsx: literal hex
// colors, viewBox preserved, key text as props defaulted to reference copy.

export type SupportOutcomesProps = {
  beforeLabel?: string;
  afterDeflectLabel?: string;
  afterResolveLabel?: string;
  outcomes?: [string, string, string];
  className?: string;
};

export function SupportOutcomes({
  beforeLabel = "Every ticket handled manually",
  afterDeflectLabel = "AI deflects 30–60%",
  afterResolveLabel = "Team resolves the rest",
  outcomes = [
    "30 to 60 percent deflection on repetitive tickets",
    "Faster first response without adding headcount",
    "Clear visibility into what customers are actually asking",
  ],
  className,
}: SupportOutcomesProps) {
  const [o1, o2, o3] = outcomes;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Outcomes: before - ${beforeLabel}. after - ${afterDeflectLabel}, ${afterResolveLabel}. ${o1}. ${o2}. ${o3}.`}
    >
      <defs>
        <pattern id="oc3-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#oc3-dots)" />

      <text x="28" y="36" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="0.6" fill="#7a817d">BEFORE</text>
      <rect x="28" y="46" width="696" height="38" rx="8" fill="#1c2b26" />
      <text x="44" y="71" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#ffffff">{beforeLabel}</text>
      <text x="710" y="71" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" fill="rgba(255,255,255,0.55)" textAnchor="end">100%</text>

      <text x="28" y="96" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="0.6" fill="#7a817d">AFTER</text>
      {/* 30-60% deflection split baked into these two path widths */}
      <path d="M28 106 h313.2 v38 h-313.2 a8 8 0 0 1 -8 -8 v-22 a8 8 0 0 1 8 -8 z" fill="#ff5c35" />
      <path d="M341.2 106 h374.8 a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-374.8 z" fill="#ffe8dd" />
      <text x="44" y="131" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#ffffff">{afterDeflectLabel}</text>
      <text x="532.6" y="131" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" fill="#e8431b" textAnchor="middle">{afterResolveLabel}</text>

      <circle cx="54" cy="230.83" r="22" fill="#ffe8dd" />
      <path d="M45 236.83 l6.5 -7.5 l5 5 l9.5 -10.5" fill="none" stroke="#e8431b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 219.83 h5.5 v5.5" fill="none" stroke="#e8431b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="96" y="234.83" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="600" fill="#1c2b26">{o1}</text>

      <line x1="28" y1="285.67" x2="724" y2="285.67" stroke="#e7e2d7" strokeWidth="1.2" />
      <circle cx="54" cy="328.5" r="22" fill="#ffe8dd" />
      <circle cx="54" cy="328.5" r="12" fill="none" stroke="#e8431b" strokeWidth="2.2" />
      <path d="M48.5 328.5 l4 4.4 l8 -9.4" fill="none" stroke="#e8431b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="96" y="332.5" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="600" fill="#1c2b26">{o2}</text>

      <line x1="28" y1="383.33" x2="724" y2="383.33" stroke="#e7e2d7" strokeWidth="1.2" />
      <circle cx="54" cy="426.17" r="22" fill="#ffe8dd" />
      <path d="M41 426.17 q13 -14 26 0 q-13 14 -26 0 z" fill="none" stroke="#e8431b" strokeWidth="2" />
      <circle cx="54" cy="426.17" r="5" fill="none" stroke="#e8431b" strokeWidth="2" />
      <text x="96" y="430.17" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="600" fill="#1c2b26">{o3}</text>
    </svg>
  );
}
