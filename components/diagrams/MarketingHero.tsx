// components/diagrams/MarketingHero.tsx
//
// Coded rebuild of the approved reference SVG for Marketing Automation's
// hero (4-stage funnel with per-stage process chains and metrics - colors/
// layout/geometry final, do not redesign). Same viewBox (0 0 800 700), same
// paths/rects/text as the reference, but the root <svg> takes
// width="100%" height="100%" instead of fixed 800x700 so it scales fluidly
// in its container instead of needing object-fit cropping. Follows the same
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
      viewBox="0 0 800 700"
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
      <rect x="10" y="16" width="780" height="680" rx="26" fill="#000000" opacity="0.05" />
      <rect x="6" y="10" width="788" height="688" rx="26" fill="#000000" opacity="0.05" />
      <rect x="0" y="0" width="800" height="700" rx="26" fill="#ffffff" />
      <rect x="22" y="22" width="756" height="656" rx="16" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1" />
      <rect x="23" y="23" width="754" height="654" rx="15" fill="url(#mktD1)" />
      <path d="M36 48 V36 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M752 36 H764 V48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M36 652 V664 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M752 664 H764 V652" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <text x="56" y="68" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="2" fill="#4c534f">
        {eyebrow}
      </text>

      {/* ATTRACT stage */}
      <path d="M56 96 H356 L318 226 H56 Z" fill="#ff7a59" />
      <path d="M77 127 v9 a9 9 0 0 0 18 0 v-9" fill="none" stroke="#1c2b26" strokeWidth="2.2" />
      <rect x="74" y="122" width="6" height="6" fill="#1c2b26" />
      <rect x="92" y="122" width="6" height="6" fill="#1c2b26" />
      <text x="116" y="134" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.4" fill="#1c2b26">
        {attract.title}
      </text>
      <text x="116" y="154" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#1c2b26" opacity="0.85">
        {attract.subtitle}
      </text>
      <line x1="366" y1="161.0" x2="410" y2="161.0" stroke="#1c2b26" strokeWidth="1.3" opacity="0.5" />
      <rect x="426" y="144.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff7a59" strokeWidth="1.6" />
      <rect x="435.0" y="152.0" width="16" height="18" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <line x1="439.0" y1="158.0" x2="447.0" y2="158.0" stroke="#e8431b" strokeWidth="1.2" />
      <line x1="439.0" y1="163.0" x2="447.0" y2="163.0" stroke="#e8431b" strokeWidth="1.2" />
      <path d="M464 156.0 l6 5 l-6 5" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="480" y="144.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff7a59" strokeWidth="1.6" />
      <path d="M489.0 158.0 l12 -6 v18 l-12 -6 z" fill="#e8431b" />
      <rect x="487.0" y="158.0" width="3" height="6" fill="#e8431b" />
      <path d="M518 156.0 l6 5 l-6 5" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="534" y="144.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff7a59" strokeWidth="1.6" />
      <circle cx="547.0" cy="157.0" r="3.5" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <circle cx="555.0" cy="157.0" r="3.5" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <path d="M542.0 169.0 a5 4 0 0 1 10 0" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <path d="M550.0 169.0 a5 4 0 0 1 10 0" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <path d="M572 156.0 l6 5 l-6 5" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="588" y="144.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff7a59" strokeWidth="1.6" />
      <rect x="596.0" y="162.0" width="5" height="6" rx="1" fill="#e8431b" />
      <rect x="603.0" y="158.0" width="5" height="10" rx="1" fill="#e8431b" />
      <rect x="610.0" y="154.0" width="5" height="14" rx="1" fill="#e8431b" />
      <text x="648" y="166.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#1c2b26">
        {attractMetric}
      </text>
      <line x1="396" y1="242" x2="754" y2="242" stroke="#e7e2d7" strokeWidth="1.3" strokeDasharray="4 4" />

      {/* CAPTURE stage */}
      <path d="M56 226 H318 L280 356 H56 Z" fill="#ff5c35" />
      <rect x="76" y="255" width="20" height="23" rx="3" fill="none" stroke="#1c2b26" strokeWidth="2" />
      <rect x="82" y="252" width="8" height="4.5" rx="1.3" fill="#1c2b26" />
      <line x1="81" y1="264.0" x2="91" y2="264.0" stroke="#1c2b26" strokeWidth="1.3" />
      <line x1="81" y1="269.5" x2="91" y2="269.5" stroke="#1c2b26" strokeWidth="1.3" />
      <line x1="81" y1="275.0" x2="91" y2="275.0" stroke="#1c2b26" strokeWidth="1.3" />
      <text x="116" y="264" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.4" fill="#1c2b26">
        {capture.title}
      </text>
      <text x="116" y="284" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#1c2b26" opacity="0.85">
        {capture.subtitle}
      </text>
      <line x1="366" y1="291.0" x2="410" y2="291.0" stroke="#1c2b26" strokeWidth="1.3" opacity="0.5" />
      <rect x="426" y="274.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff5c35" strokeWidth="1.6" />
      <rect x="434.0" y="283.0" width="18" height="16" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <circle cx="439.0" cy="288.0" r="1.6" fill="#e8431b" />
      <path d="M435.0 294.0 l4 -3 l4 2 l6 -4" fill="none" stroke="#e8431b" strokeWidth="1.2" />
      <path d="M464 286.0 l6 5 l-6 5" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="480" y="274.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff5c35" strokeWidth="1.6" />
      <rect x="489.0" y="282.0" width="16" height="18" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <line x1="493.0" y1="287.0" x2="501.0" y2="287.0" stroke="#e8431b" strokeWidth="1.1" />
      <line x1="493.0" y1="291.0" x2="501.0" y2="291.0" stroke="#e8431b" strokeWidth="1.1" />
      <line x1="493.0" y1="295.0" x2="501.0" y2="295.0" stroke="#e8431b" strokeWidth="1.1" />
      <path d="M518 286.0 l6 5 l-6 5" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="534" y="274.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#ff5c35" strokeWidth="1.6" />
      <circle cx="551.0" cy="291.0" r="10" fill="none" stroke="#e8431b" strokeWidth="1.6" />
      <path d="M547.0 291.0 l3 3.4 l6 -7" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="594" y="296.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#1c2b26">
        {captureMetric}
      </text>
      <line x1="396" y1="372" x2="754" y2="372" stroke="#e7e2d7" strokeWidth="1.3" strokeDasharray="4 4" />

      {/* NURTURE stage */}
      <path d="M56 356 H280 L242 486 H56 Z" fill="#103129" />
      <rect x="74" y="388" width="24" height="17" rx="3" fill="none" stroke="#ffffff" strokeWidth="2" />
      <path d="M74 390 l12 9 l12 -9" fill="none" stroke="#ffffff" strokeWidth="1.7" />
      <text x="116" y="394" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.4" fill="#ffffff">
        {nurture.title}
      </text>
      <text x="116" y="414" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#ffffff" opacity="0.85">
        {nurture.subtitle}
      </text>
      <line x1="366" y1="421.0" x2="410" y2="421.0" stroke="#1c2b26" strokeWidth="1.3" opacity="0.5" />
      <rect x="426" y="404.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <rect x="434.0" y="415.0" width="18" height="13" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <path d="M434.0 416.0 l9 7 l9 -7" fill="none" stroke="#e8431b" strokeWidth="1.3" />
      <path d="M464 416.0 l6 5 l-6 5" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="480" y="404.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <circle cx="497.0" cy="413.0" r="2.4" fill="#e8431b" />
      <circle cx="490.0" cy="428.0" r="2.4" fill="#e8431b" />
      <circle cx="504.0" cy="428.0" r="2.4" fill="#e8431b" />
      <line x1="497.0" y1="415.0" x2="491.0" y2="426.0" stroke="#e8431b" strokeWidth="1.2" />
      <line x1="497.0" y1="415.0" x2="503.0" y2="426.0" stroke="#e8431b" strokeWidth="1.2" />
      <path d="M518 416.0 l6 5 l-6 5" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="534" y="404.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <rect x="542.0" y="415.0" width="14" height="13" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <circle cx="558.0" cy="424.0" r="6" fill="#f6f2ea" stroke="#e8431b" strokeWidth="1.3" />
      <line x1="558.0" y1="424.0" x2="558.0" y2="420.0" stroke="#e8431b" strokeWidth="1" />
      <line x1="558.0" y1="424.0" x2="561.0" y2="424.0" stroke="#e8431b" strokeWidth="1" />
      <path d="M572 416.0 l6 5 l-6 5" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="588" y="404.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <rect x="596.0" y="422.0" width="5" height="6" rx="1" fill="#e8431b" />
      <rect x="603.0" y="418.0" width="5" height="10" rx="1" fill="#e8431b" />
      <rect x="610.0" y="414.0" width="5" height="14" rx="1" fill="#e8431b" />
      <text x="648" y="426.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#1c2b26">
        {nurtureMetric}
      </text>
      <line x1="396" y1="502" x2="754" y2="502" stroke="#e7e2d7" strokeWidth="1.3" strokeDasharray="4 4" />

      {/* CONVERT stage */}
      <path d="M56 486 H242 L204 616 H56 Z" fill="#1c2b26" />
      <path d="M74 524 l8 6 l5.5 -2.5 l8 5.5" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M98 524 l-8 6" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <text x="116" y="524" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.4" fill="#ffffff">
        {convert.title}
      </text>
      <text x="116" y="544" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#ffffff" opacity="0.85">
        {convert.subtitle}
      </text>
      <line x1="366" y1="551.0" x2="410" y2="551.0" stroke="#1c2b26" strokeWidth="1.3" opacity="0.5" />
      <rect x="426" y="534.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <circle cx="443.0" cy="546.0" r="4.5" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <path d="M435.0 561.0 a8 6 0 0 1 16 0" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <path d="M464 546.0 l6 5 l-6 5" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="480" y="534.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <path d="M488.0 549.0 l6 5 l4 -2 l6 4" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M506.0 549.0 l-6 5" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M518 546.0 l6 5 l-6 5" fill="none" stroke="#7a817d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="534" y="534.0" width="34" height="34" rx="8" fill="#ffe8dd" stroke="#e8431b" strokeWidth="1.6" />
      <rect x="542.0" y="546.0" width="18" height="13" rx="2" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <path d="M547.0 546.0 v-3 h8 v3" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <text x="594" y="556.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="700" fill="#1c2b26">
        {convertMetric}
      </text>
    </svg>
  );
}
