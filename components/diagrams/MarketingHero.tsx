// components/diagrams/MarketingHero.tsx
//
// Coded rebuild of the approved reference SVG for Marketing Automation's
// hero (4-stage funnel with per-stage process chains and metrics - colors/
// layout/geometry final, do not redesign). viewBox is now 0 0 800 800
// (square, matching OpsHero/AgentDevHero/RevOpsHero/SupportHero) - all
// vertical geometry below was scaled by 756/656 (the new/old content-box
// height ratio) to fill the taller canvas; x-coordinates are untouched. The
// root <svg> takes width="100%" height="100%" so it scales fluidly in its
// container instead of needing object-fit cropping. Follows the same
// conventions as AgentDevHero.tsx / OpsHero.tsx: literal hex colors, key
// content as props defaulted to the reference copy.
//
// Note this funnel is flush-left (only the right edge narrows per stage) -
// that geometry is preserved exactly from the reference, not "fixed" into a
// symmetric funnel.
//
// Wired in for marketing-automation only (see app/services/[slug]/page.tsx,
// app/services/page.tsx, components/sections/ServicesGrid.tsx).

export type MarketingHeroProps = {
  eyebrow?: string;
  stages?: [
    { title: string; subtitle: string },
    { title: string; subtitle: string },
    { title: string; subtitle: string },
    { title: string; subtitle: string },
  ];
  metrics?: [string, string, string, string];
  className?: string;
};

export function MarketingHero({
  eyebrow = "MARKETING / FUNNEL",
  stages = [
    { title: "ATTRACT", subtitle: "content signals" },
    { title: "CAPTURE", subtitle: "lead capture forms" },
    { title: "NURTURE", subtitle: "email sequences" },
    { title: "CONVERT", subtitle: "sales handoff" },
  ],
  metrics = ["+340 leads", "22% capture", "14 nurture steps", "3.2x pipeline"],
  className,
}: MarketingHeroProps) {
  const [attract, capture, nurture, convert] = stages;
  const [attractMetric, captureMetric, nurtureMetric, convertMetric] = metrics;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Diagram: marketing funnel from ${attract.title} (${attractMetric}) to ${capture.title} (${captureMetric}) to ${nurture.title} (${nurtureMetric}) to ${convert.title} (${convertMetric}).`}
    >
      <defs>
        <pattern id="mktD1" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="10" y="16" width="780" height="780" rx="26" fill="#000000" opacity="0.05" />
      <rect x="6" y="10" width="788" height="788" rx="26" fill="#000000" opacity="0.05" />
      <rect x="0" y="0" width="800" height="800" rx="26" fill="#ffffff" />
      <rect x="22" y="22" width="756" height="756" rx="16" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1" />
      <rect x="23" y="23" width="754" height="754" rx="15" fill="url(#mktD1)" />
      <path d="M36 48 V36 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M752 36 H764 V48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M36 752 V764 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M752 764 H764 V752" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <text x="56" y="75" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="2" fill="#4c534f">
        {eyebrow}
      </text>

      {/* ATTRACT stage */}
      <path d="M56 107 H356 L318 257 H56 Z" fill="#ff7a59" />
      <path d="M77 143 v10.4 a9 9 0 0 0 18 0 v-10.4" fill="none" stroke="#1c2b26" strokeWidth="2.2" />
      <rect x="74" y="137" width="6" height="6" fill="#1c2b26" />
      <rect x="92" y="137" width="6" height="6" fill="#1c2b26" />
      <text x="116" y="151" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.4" fill="#1c2b26">
        {attract.title}
      </text>
      <text x="116" y="174" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#1c2b26" opacity="0.85">
        {attract.subtitle}
      </text>
      <line x1="366" y1="182.2" x2="410" y2="182.2" stroke="#1c2b26" strokeWidth="1.3" opacity="0.5" />
      <rect x="426" y="162.6" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff7a59" strokeWidth="1.6" />
      <rect x="435.0" y="171.8" width="16" height="18" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <line x1="439.0" y1="178.7" x2="447.0" y2="178.7" stroke="#e8431b" strokeWidth="1.2" />
      <line x1="439.0" y1="184.5" x2="447.0" y2="184.5" stroke="#e8431b" strokeWidth="1.2" />
      <path d="M464 176.4 l6 5.8 l-6 5.8" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="480" y="162.6" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff7a59" strokeWidth="1.6" />
      <path d="M489.0 178.7 l12 -6.9 v20.7 l-12 -6.9 z" fill="#e8431b" />
      <rect x="487.0" y="178.7" width="3" height="6" fill="#e8431b" />
      <path d="M518 176.4 l6 5.8 l-6 5.8" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="534" y="162.6" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff7a59" strokeWidth="1.6" />
      <circle cx="547.0" cy="177.6" r="3.5" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <circle cx="555.0" cy="177.6" r="3.5" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <path d="M542.0 191.4 a5 4 0 0 1 10 0" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <path d="M550.0 191.4 a5 4 0 0 1 10 0" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <path d="M572 176.4 l6 5.8 l-6 5.8" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="588" y="162.6" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff7a59" strokeWidth="1.6" />
      <rect x="596.0" y="183.3" width="5" height="6" rx="1" fill="#e8431b" />
      <rect x="603.0" y="178.7" width="5" height="10" rx="1" fill="#e8431b" />
      <rect x="610.0" y="174.1" width="5" height="14" rx="1" fill="#e8431b" />
      <text x="648" y="188.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#1c2b26">
        {attractMetric}
      </text>
      <line x1="396" y1="275.5" x2="754" y2="275.5" stroke="#e7e2d7" strokeWidth="1.3" strokeDasharray="4 4" />

      {/* CAPTURE stage */}
      <path d="M56 257 H318 L280 407 H56 Z" fill="#ff5c35" />
      <rect x="76" y="290.5" width="20" height="23" rx="3" fill="none" stroke="#1c2b26" strokeWidth="2" />
      <rect x="82" y="287.1" width="8" height="4.5" rx="1.3" fill="#1c2b26" />
      <line x1="81" y1="300.9" x2="91" y2="300.9" stroke="#1c2b26" strokeWidth="1.3" />
      <line x1="81" y1="307.3" x2="91" y2="307.3" stroke="#1c2b26" strokeWidth="1.3" />
      <line x1="81" y1="313.6" x2="91" y2="313.6" stroke="#1c2b26" strokeWidth="1.3" />
      <text x="116" y="300.9" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.4" fill="#1c2b26">
        {capture.title}
      </text>
      <text x="116" y="324.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#1c2b26" opacity="0.85">
        {capture.subtitle}
      </text>
      <line x1="366" y1="332.0" x2="410" y2="332.0" stroke="#1c2b26" strokeWidth="1.3" opacity="0.5" />
      <rect x="426" y="312.4" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff5c35" strokeWidth="1.6" />
      <rect x="434.0" y="322.8" width="18" height="16" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <circle cx="439.0" cy="328.6" r="1.6" fill="#e8431b" />
      <path d="M435.0 335.5 l4 -3.5 l4 2.3 l6 -4.6" fill="none" stroke="#e8431b" strokeWidth="1.2" />
      <path d="M464 326.2 l6 5.8 l-6 5.8" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="480" y="312.4" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff5c35" strokeWidth="1.6" />
      <rect x="489.0" y="321.6" width="16" height="18" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <line x1="493.0" y1="327.4" x2="501.0" y2="327.4" stroke="#e8431b" strokeWidth="1.1" />
      <line x1="493.0" y1="332.0" x2="501.0" y2="332.0" stroke="#e8431b" strokeWidth="1.1" />
      <line x1="493.0" y1="336.6" x2="501.0" y2="336.6" stroke="#e8431b" strokeWidth="1.1" />
      <path d="M518 326.2 l6 5.8 l-6 5.8" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="534" y="312.4" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff5c35" strokeWidth="1.6" />
      <circle cx="551.0" cy="332.0" r="10" fill="none" stroke="#e8431b" strokeWidth="1.6" />
      <path d="M547.0 332.0 l3 3.9 l6 -8.1" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="594" y="337.8" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#1c2b26">
        {captureMetric}
      </text>
      <line x1="396" y1="425.4" x2="754" y2="425.4" stroke="#e7e2d7" strokeWidth="1.3" strokeDasharray="4 4" />

      {/* NURTURE stage */}
      <path d="M56 407 H280 L242 556.7 H56 Z" fill="#103129" />
      <rect x="74" y="443.8" width="24" height="17" rx="3" fill="none" stroke="#ffffff" strokeWidth="2" />
      <path d="M74 446.1 l12 10.4 l12 -10.4" fill="none" stroke="#ffffff" strokeWidth="1.7" />
      <text x="116" y="450.7" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.4" fill="#ffffff">
        {nurture.title}
      </text>
      <text x="116" y="473.8" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#ffffff" opacity="0.85">
        {nurture.subtitle}
      </text>
      <line x1="366" y1="481.8" x2="410" y2="481.8" stroke="#1c2b26" strokeWidth="1.3" opacity="0.5" />
      <rect x="426" y="462.2" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <rect x="434.0" y="474.9" width="18" height="13" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <path d="M434.0 476.1 l9 8.1 l9 -8.1" fill="none" stroke="#e8431b" strokeWidth="1.3" />
      <path d="M464 476.1 l6 5.8 l-6 5.8" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="480" y="462.2" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <circle cx="497.0" cy="472.6" r="2.4" fill="#e8431b" />
      <circle cx="490.0" cy="489.9" r="2.4" fill="#e8431b" />
      <circle cx="504.0" cy="489.9" r="2.4" fill="#e8431b" />
      <line x1="497.0" y1="474.9" x2="491.0" y2="487.6" stroke="#e8431b" strokeWidth="1.2" />
      <line x1="497.0" y1="474.9" x2="503.0" y2="487.6" stroke="#e8431b" strokeWidth="1.2" />
      <path d="M518 476.1 l6 5.8 l-6 5.8" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="534" y="462.2" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <rect x="542.0" y="474.9" width="14" height="13" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <circle cx="558.0" cy="485.3" r="6" fill="#f6f2ea" stroke="#e8431b" strokeWidth="1.3" />
      <line x1="558.0" y1="485.3" x2="558.0" y2="480.7" stroke="#e8431b" strokeWidth="1" />
      <line x1="558.0" y1="485.3" x2="561.0" y2="485.3" stroke="#e8431b" strokeWidth="1" />
      <path d="M572 476.1 l6 5.8 l-6 5.8" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="588" y="462.2" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <rect x="596.0" y="483.0" width="5" height="6" rx="1" fill="#e8431b" />
      <rect x="603.0" y="478.4" width="5" height="10" rx="1" fill="#e8431b" />
      <rect x="610.0" y="473.8" width="5" height="14" rx="1" fill="#e8431b" />
      <text x="648" y="487.6" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#1c2b26">
        {nurtureMetric}
      </text>
      <line x1="396" y1="575.2" x2="754" y2="575.2" stroke="#e7e2d7" strokeWidth="1.3" strokeDasharray="4 4" />

      {/* CONVERT stage */}
      <path d="M56 556.7 H242 L204 706.6 H56 Z" fill="#1c2b26" />
      <path d="M74 600.5 l8 6.9 l5.5 -2.9 l8 6.3" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M98 600.5 l-8 6.9" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <text x="116" y="600.5" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.4" fill="#ffffff">
        {convert.title}
      </text>
      <text x="116" y="623.8" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#ffffff" opacity="0.85">
        {convert.subtitle}
      </text>
      <line x1="366" y1="631.6" x2="410" y2="631.6" stroke="#1c2b26" strokeWidth="1.3" opacity="0.5" />
      <rect x="426" y="612.1" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <circle cx="443.0" cy="625.9" r="4.5" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <path d="M435.0 643.2 a8 6 0 0 1 16 0" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <path d="M464 625.9 l6 5.8 l-6 5.8" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="480" y="612.1" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <path d="M488.0 629.3 l6 5.8 l4 -2.3 l6 4.6" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M506.0 629.3 l-6 5.8" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M518 625.9 l6 5.8 l-6 5.8" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="534" y="612.1" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <rect x="542.0" y="625.9" width="18" height="13" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <path d="M547.0 625.9 v-3.5 h8 v3.5" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <text x="594" y="637.4" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#1c2b26">
        {convertMetric}
      </text>
    </svg>
  );
}
