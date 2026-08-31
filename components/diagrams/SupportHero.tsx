// components/diagrams/SupportHero.tsx
//
// Coded rebuild of the approved reference SVG for Customer Support
// Automation's hero (ticket-triage bracket tree branching into 3 outcome
// tiers - colors/layout/icons final, do not redesign). viewBox is now
// 0 0 800 800 (square, matching OpsHero/AgentDevHero/RevOpsHero) - the
// content geometry below was redistributed to fill the taller canvas. The
// root <svg> takes width="100%" height="100%" so it scales fluidly in its
// container instead of needing object-fit cropping. Follows the same
// conventions as AgentDevHero.tsx/OpsHero.tsx: literal hex colors, key
// content as props defaulted to the reference copy.
//
// Wired in for customer-support-automation only (see
// app/services/[slug]/page.tsx, app/services/page.tsx,
// components/sections/ServicesGrid.tsx).

export type SupportHeroProps = {
  ticketLabels?: [string, string, string, string, string, string, string, string];
  percentLabels?: [string, string, string];
  tierCards?: [
    { title: string; subtitle: string },
    { title: string; subtitle: string },
    { title: string; subtitle: string },
  ];
  className?: string;
};

export function SupportHero({
  ticketLabels = [
    "billing q",
    "password reset",
    "feature req",
    "bug report",
    "refund",
    "how-to",
    "integration",
    "pricing",
  ],
  percentLabels = ["60%", "30%", "10%"],
  tierCards = [
    { title: "SELF-SERVE", subtitle: "60% deflected" },
    { title: "AI DRAFT", subtitle: "agent reviews and sends" },
    { title: "HUMAN ESCALATION", subtitle: "sentiment + tier" },
  ],
  className,
}: SupportHeroProps) {
  const [
    billingLabel,
    passwordLabel,
    featureLabel,
    bugLabel,
    refundLabel,
    howToLabel,
    integrationLabel,
    pricingLabel,
  ] = ticketLabels;
  const [pct1Label, pct2Label, pct3Label] = percentLabels;
  const [tier1, tier2, tier3] = tierCards;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Diagram: incoming tickets (${billingLabel}, ${passwordLabel}, ${featureLabel}, ${bugLabel}, ${refundLabel}, ${howToLabel}, ${integrationLabel}, ${pricingLabel}) are triaged into three outcome tiers - ${tier1.title} (${tier1.subtitle}), ${tier2.title} (${tier2.subtitle}), and ${tier3.title} (${tier3.subtitle}).`}
    >
      <defs>
        <pattern id="supportD1" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="10" y="16" width="780" height="780" rx="26" fill="#000000" opacity="0.05" />
      <rect x="6" y="10" width="788" height="788" rx="26" fill="#000000" opacity="0.05" />
      <rect x="0" y="0" width="800" height="800" rx="26" fill="#ffffff" />
      <rect x="22" y="22" width="756" height="756" rx="16" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1" />
      <rect x="23" y="23" width="754" height="754" rx="15" fill="url(#supportD1)" />
      <path d="M36 48 V36 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M752 36 H764 V48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M36 752 V764 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M752 764 H764 V752" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />

      {/* billing q */}
      <rect x="62" y="130" width="190" height="52" rx="26" fill="#ffe8dd" />
      <circle cx="88" cy="156" r="14.3" fill="none" stroke="#e8431b" strokeWidth="1.6" />
      <text x="88" y="161.2" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" fill="#e8431b" textAnchor="middle">
        $
      </text>
      <text x="108" y="161" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {billingLabel}
      </text>
      <line x1="252" y1="156" x2="286" y2="156" stroke="#1c2b26" strokeWidth="1.4" />

      {/* password reset */}
      <rect x="62" y="205" width="190" height="52" rx="26" fill="#ffe8dd" />
      <circle cx="82.8" cy="231" r="7.15" fill="none" stroke="#e8431b" strokeWidth="1.6" />
      <line x1="89.3" y1="231" x2="102.3" y2="231" stroke="#e8431b" strokeWidth="1.6" />
      <line x1="98.4" y1="231" x2="98.4" y2="236.2" stroke="#e8431b" strokeWidth="1.6" />
      <text x="108" y="236" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {passwordLabel}
      </text>
      <line x1="252" y1="231" x2="286" y2="231" stroke="#1c2b26" strokeWidth="1.4" />

      {/* feature req */}
      <rect x="62" y="280" width="190" height="52" rx="26" fill="#ffe8dd" />
      <circle cx="88" cy="303.4" r="9.1" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <line x1="84.1" y1="316.4" x2="91.9" y2="316.4" stroke="#e8431b" strokeWidth="1.5" />
      <text x="108" y="311" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {featureLabel}
      </text>
      <line x1="252" y1="306" x2="286" y2="306" stroke="#1c2b26" strokeWidth="1.4" />

      {/* bug report */}
      <rect x="62" y="355" width="190" height="52" rx="26" fill="#ffe8dd" />
      <ellipse cx="88" cy="381" rx="9.1" ry="11.7" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <line x1="76.3" y1="374.5" x2="82.8" y2="377.1" stroke="#e8431b" strokeWidth="1.3" />
      <line x1="99.7" y1="374.5" x2="93.2" y2="377.1" stroke="#e8431b" strokeWidth="1.3" />
      <line x1="76.3" y1="387.5" x2="82.8" y2="384.9" stroke="#e8431b" strokeWidth="1.3" />
      <line x1="99.7" y1="387.5" x2="93.2" y2="384.9" stroke="#e8431b" strokeWidth="1.3" />
      <text x="108" y="386" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {bugLabel}
      </text>
      <line x1="252" y1="381" x2="286" y2="381" stroke="#1c2b26" strokeWidth="1.4" />

      {/* refund */}
      <rect x="62" y="430" width="190" height="52" rx="26" fill="#ffe8dd" />
      <path d="M97.1 448.2 a11.7 11.7 0 1 1 -11.7 11.7" fill="none" stroke="#e8431b" strokeWidth="1.6" />
      <path d="M84.1 444.3 l-5.2 3.9 l5.2 3.9" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="108" y="461" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {refundLabel}
      </text>
      <line x1="252" y1="456" x2="286" y2="456" stroke="#1c2b26" strokeWidth="1.4" />

      {/* how-to */}
      <rect x="62" y="505" width="190" height="52" rx="26" fill="#ffe8dd" />
      <circle cx="88" cy="531" r="14.3" fill="none" stroke="#e8431b" strokeWidth="1.6" />
      <text x="88" y="536.2" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" fill="#e8431b" textAnchor="middle">
        ?
      </text>
      <text x="108" y="536" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {howToLabel}
      </text>
      <line x1="252" y1="531" x2="286" y2="531" stroke="#1c2b26" strokeWidth="1.4" />

      {/* integration */}
      <rect x="62" y="580" width="190" height="52" rx="26" fill="#ffe8dd" />
      <circle cx="78.9" cy="598.2" r="3.4" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <circle cx="97.1" cy="598.2" r="3.4" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <circle cx="88" cy="615.1" r="3.4" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <line x1="78.9" y1="602.1" x2="86.05" y2="612.5" stroke="#e8431b" strokeWidth="1.2" />
      <line x1="97.1" y1="602.1" x2="89.95" y2="612.5" stroke="#e8431b" strokeWidth="1.2" />
      <text x="108" y="611" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {integrationLabel}
      </text>
      <line x1="252" y1="606" x2="286" y2="606" stroke="#1c2b26" strokeWidth="1.4" />

      {/* pricing */}
      <rect x="62" y="655" width="190" height="52" rx="26" fill="#ffe8dd" />
      <path d="M77.6 671.9 h13 l7.8 9.1 l-7.8 9.1 h-13 z" fill="none" stroke="#e8431b" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="84.1" cy="681" r="2.1" fill="#e8431b" />
      <text x="108" y="686" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {pricingLabel}
      </text>
      <line x1="252" y1="681" x2="286" y2="681" stroke="#1c2b26" strokeWidth="1.4" />

      {/* Bracket 1: billing q + password reset + feature req -> SELF-SERVE */}
      <line x1="286" y1="156" x2="286" y2="306" stroke="#1c2b26" strokeWidth="1.4" />
      <path d="M286 231 H376" fill="none" stroke="#1c2b26" strokeWidth="1.4" />
      <circle cx="317.5" cy="231" r="3" fill="#103129" />
      <circle cx="335.5" cy="231" r="3" fill="#103129" />
      <circle cx="353.5" cy="231" r="3" fill="#103129" />
      <line x1="376" y1="231" x2="498" y2="231" stroke="#1c2b26" strokeWidth="1.6" />
      <path d="M492 225 l8 6 l-8 6" fill="none" stroke="#1c2b26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="441" y="217" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {pct1Label}
      </text>
      <rect x="516" y="143" width="202" height="176" rx="12" fill="#ff7a59" />
      <text x="617" y="200" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.4" fill="#1c2b26" textAnchor="middle">
        {tier1.title}
      </text>
      <text x="617" y="230" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#1c2b26" opacity="0.8" textAnchor="middle">
        {tier1.subtitle}
      </text>
      <rect x="593" y="276" width="12" height="16" rx="2" fill="#1c2b26" opacity="0.85" />
      <rect x="611" y="265" width="12" height="27" rx="2" fill="#1c2b26" opacity="0.85" />
      <rect x="629" y="254" width="12" height="38" rx="2" fill="#1c2b26" opacity="0.85" />

      {/* Bracket 2: bug report + refund + how-to -> AI DRAFT */}
      <line x1="286" y1="381" x2="286" y2="531" stroke="#1c2b26" strokeWidth="1.4" />
      <path d="M286 456 H376" fill="none" stroke="#1c2b26" strokeWidth="1.4" />
      <circle cx="317.5" cy="456" r="3" fill="#103129" />
      <circle cx="335.5" cy="456" r="3" fill="#103129" />
      <circle cx="353.5" cy="456" r="3" fill="#103129" />
      <line x1="376" y1="456" x2="498" y2="456" stroke="#1c2b26" strokeWidth="1.6" />
      <path d="M492 450 l8 6 l-8 6" fill="none" stroke="#1c2b26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="441" y="442" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {pct2Label}
      </text>
      <rect x="516" y="368" width="202" height="176" rx="12" fill="#ff5c35" />
      <text x="617" y="425" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.4" fill="#ffffff" textAnchor="middle">
        {tier2.title}
      </text>
      <text x="617" y="455" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#ffffff" opacity="0.8" textAnchor="middle">
        {tier2.subtitle}
      </text>
      <rect x="593" y="501" width="12" height="16" rx="2" fill="#ffffff" opacity="0.85" />
      <rect x="611" y="490" width="12" height="27" rx="2" fill="#ffffff" opacity="0.85" />
      <rect x="629" y="479" width="12" height="38" rx="2" fill="#ffffff" opacity="0.85" />

      {/* Bracket 3: integration + pricing -> HUMAN ESCALATION */}
      <line x1="286" y1="606" x2="286" y2="681" stroke="#1c2b26" strokeWidth="1.4" />
      <path d="M286 643.5 H376" fill="none" stroke="#1c2b26" strokeWidth="1.4" />
      <circle cx="317.5" cy="643.5" r="3" fill="#103129" />
      <circle cx="335.5" cy="643.5" r="3" fill="#103129" />
      <circle cx="353.5" cy="643.5" r="3" fill="#103129" />
      <line x1="376" y1="643.5" x2="498" y2="643.5" stroke="#1c2b26" strokeWidth="1.6" />
      <path d="M492 637.5 l8 6 l-8 6" fill="none" stroke="#1c2b26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="441" y="629.5" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {pct3Label}
      </text>
      <rect x="516" y="555.5" width="202" height="176" rx="12" fill="#1c2b26" />
      <text x="617" y="612.5" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.4" fill="#ffffff" textAnchor="middle">
        {tier3.title}
      </text>
      <text x="617" y="642.5" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#ffffff" opacity="0.8" textAnchor="middle">
        {tier3.subtitle}
      </text>
      <rect x="593" y="688.5" width="12" height="16" rx="2" fill="#ffffff" opacity="0.85" />
      <rect x="611" y="677.5" width="12" height="27" rx="2" fill="#ffffff" opacity="0.85" />
      <rect x="629" y="666.5" width="12" height="38" rx="2" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
