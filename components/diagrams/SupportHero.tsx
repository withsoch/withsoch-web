// components/diagrams/SupportHero.tsx
//
// Coded rebuild of the approved reference SVG for Customer Support
// Automation's hero (ticket-triage bracket tree branching into 3 outcome
// tiers - colors/layout/icons final, do not redesign). Same viewBox
// (0 0 780 630), same paths/circles/rects/text as the reference, but the
// root <svg> takes width="100%" height="100%" instead of fixed 780x630 so
// it scales fluidly in its container instead of needing object-fit
// cropping. Follows the same conventions as AgentDevHero.tsx/OpsHero.tsx:
// literal hex colors, key content as props defaulted to the reference copy.
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
      viewBox="0 0 780 630"
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
      <rect x="10" y="16" width="760" height="610" rx="26" fill="#000000" opacity="0.05" />
      <rect x="6" y="10" width="768" height="618" rx="26" fill="#000000" opacity="0.05" />
      <rect x="0" y="0" width="780" height="630" rx="26" fill="#ffffff" />
      <rect x="22" y="22" width="736" height="586" rx="16" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1" />
      <rect x="23" y="23" width="734" height="584" rx="15" fill="url(#supportD1)" />
      <path d="M36 48 V36 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M732 36 H744 V48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M36 582 V594 H48" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M732 594 H744 V582" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />

      {/* billing q */}
      <rect x="62" y="92" width="190" height="40" rx="20" fill="#ffe8dd" />
      <circle cx="88" cy="112" r="11" fill="none" stroke="#e8431b" strokeWidth="1.6" />
      <text x="88" y="116" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" fill="#e8431b" textAnchor="middle">
        $
      </text>
      <text x="108" y="117" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {billingLabel}
      </text>
      <line x1="252" y1="112" x2="286" y2="112" stroke="#1c2b26" strokeWidth="1.4" />

      {/* password reset */}
      <rect x="62" y="146" width="190" height="40" rx="20" fill="#ffe8dd" />
      <circle cx="84" cy="166" r="5.5" fill="none" stroke="#e8431b" strokeWidth="1.6" />
      <line x1="89" y1="166" x2="99" y2="166" stroke="#e8431b" strokeWidth="1.6" />
      <line x1="96" y1="166" x2="96" y2="170" stroke="#e8431b" strokeWidth="1.6" />
      <text x="108" y="171" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {passwordLabel}
      </text>
      <line x1="252" y1="166" x2="286" y2="166" stroke="#1c2b26" strokeWidth="1.4" />

      {/* feature req */}
      <rect x="62" y="200" width="190" height="40" rx="20" fill="#ffe8dd" />
      <circle cx="88" cy="218" r="7" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <line x1="85" y1="228" x2="91" y2="228" stroke="#e8431b" strokeWidth="1.5" />
      <text x="108" y="225" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {featureLabel}
      </text>
      <line x1="252" y1="220" x2="286" y2="220" stroke="#1c2b26" strokeWidth="1.4" />

      {/* bug report */}
      <rect x="62" y="254" width="190" height="40" rx="20" fill="#ffe8dd" />
      <ellipse cx="88" cy="274" rx="7" ry="9" fill="none" stroke="#e8431b" strokeWidth="1.5" />
      <line x1="79" y1="269" x2="84" y2="271" stroke="#e8431b" strokeWidth="1.3" />
      <line x1="97" y1="269" x2="92" y2="271" stroke="#e8431b" strokeWidth="1.3" />
      <line x1="79" y1="279" x2="84" y2="277" stroke="#e8431b" strokeWidth="1.3" />
      <line x1="97" y1="279" x2="92" y2="277" stroke="#e8431b" strokeWidth="1.3" />
      <text x="108" y="279" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {bugLabel}
      </text>
      <line x1="252" y1="274" x2="286" y2="274" stroke="#1c2b26" strokeWidth="1.4" />

      {/* refund */}
      <rect x="62" y="308" width="190" height="40" rx="20" fill="#ffe8dd" />
      <path d="M95 322 a9 9 0 1 1 -9 9" fill="none" stroke="#e8431b" strokeWidth="1.6" />
      <path d="M85 319 l-4 3 l4 3" fill="none" stroke="#e8431b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="108" y="333" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {refundLabel}
      </text>
      <line x1="252" y1="328" x2="286" y2="328" stroke="#1c2b26" strokeWidth="1.4" />

      {/* how-to */}
      <rect x="62" y="362" width="190" height="40" rx="20" fill="#ffe8dd" />
      <circle cx="88" cy="382" r="11" fill="none" stroke="#e8431b" strokeWidth="1.6" />
      <text x="88" y="386" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" fill="#e8431b" textAnchor="middle">
        ?
      </text>
      <text x="108" y="387" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {howToLabel}
      </text>
      <line x1="252" y1="382" x2="286" y2="382" stroke="#1c2b26" strokeWidth="1.4" />

      {/* integration */}
      <rect x="62" y="416" width="190" height="40" rx="20" fill="#ffe8dd" />
      <circle cx="81" cy="430" r="2.6" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <circle cx="95" cy="430" r="2.6" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <circle cx="88" cy="443" r="2.6" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <line x1="81" y1="433" x2="86.5" y2="441" stroke="#e8431b" strokeWidth="1.2" />
      <line x1="95" y1="433" x2="89.5" y2="441" stroke="#e8431b" strokeWidth="1.2" />
      <text x="108" y="441" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {integrationLabel}
      </text>
      <line x1="252" y1="436" x2="286" y2="436" stroke="#1c2b26" strokeWidth="1.4" />

      {/* pricing */}
      <rect x="62" y="470" width="190" height="40" rx="20" fill="#ffe8dd" />
      <path d="M80 483 h10 l6 7 l-6 7 h-10 z" fill="none" stroke="#e8431b" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="85" cy="490" r="1.6" fill="#e8431b" />
      <text x="108" y="495" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13.5" fontWeight="600" fill="#1c2b26">
        {pricingLabel}
      </text>
      <line x1="252" y1="490" x2="286" y2="490" stroke="#1c2b26" strokeWidth="1.4" />

      {/* Bracket 1: billing q + password reset + feature req -> SELF-SERVE */}
      <line x1="286" y1="112" x2="286" y2="220" stroke="#1c2b26" strokeWidth="1.4" />
      <path d="M286 166 H376" fill="none" stroke="#1c2b26" strokeWidth="1.4" />
      <circle cx="317.5" cy="166" r="3" fill="#103129" />
      <circle cx="335.5" cy="166" r="3" fill="#103129" />
      <circle cx="353.5" cy="166" r="3" fill="#103129" />
      <line x1="376" y1="166" x2="498" y2="166" stroke="#1c2b26" strokeWidth="1.6" />
      <path d="M492 160 l8 6 l-8 6" fill="none" stroke="#1c2b26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="441" y="152" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {pct1Label}
      </text>
      <rect x="516" y="101" width="202" height="130" rx="12" fill="#ff7a59" />
      <text x="617" y="143" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.4" fill="#1c2b26" textAnchor="middle">
        {tier1.title}
      </text>
      <text x="617" y="165" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#1c2b26" opacity="0.8" textAnchor="middle">
        {tier1.subtitle}
      </text>
      <rect x="593" y="199" width="12" height="12" rx="2" fill="#1c2b26" opacity="0.85" />
      <rect x="611" y="191" width="12" height="20" rx="2" fill="#1c2b26" opacity="0.85" />
      <rect x="629" y="183" width="12" height="28" rx="2" fill="#1c2b26" opacity="0.85" />

      {/* Bracket 2: bug report + refund -> AI DRAFT */}
      <line x1="286" y1="274" x2="286" y2="382" stroke="#1c2b26" strokeWidth="1.4" />
      <path d="M286 328 H376" fill="none" stroke="#1c2b26" strokeWidth="1.4" />
      <circle cx="317.5" cy="328" r="3" fill="#103129" />
      <circle cx="335.5" cy="328" r="3" fill="#103129" />
      <circle cx="353.5" cy="328" r="3" fill="#103129" />
      <line x1="376" y1="328" x2="498" y2="328" stroke="#1c2b26" strokeWidth="1.6" />
      <path d="M492 322 l8 6 l-8 6" fill="none" stroke="#1c2b26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="441" y="314" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {pct2Label}
      </text>
      <rect x="516" y="263" width="202" height="130" rx="12" fill="#ff5c35" />
      <text x="617" y="305" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.4" fill="#ffffff" textAnchor="middle">
        {tier2.title}
      </text>
      <text x="617" y="327" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#ffffff" opacity="0.8" textAnchor="middle">
        {tier2.subtitle}
      </text>
      <rect x="593" y="361" width="12" height="12" rx="2" fill="#ffffff" opacity="0.85" />
      <rect x="611" y="353" width="12" height="20" rx="2" fill="#ffffff" opacity="0.85" />
      <rect x="629" y="345" width="12" height="28" rx="2" fill="#ffffff" opacity="0.85" />

      {/* Bracket 3: integration + pricing -> HUMAN ESCALATION */}
      <line x1="286" y1="436" x2="286" y2="490" stroke="#1c2b26" strokeWidth="1.4" />
      <path d="M286 463 H376" fill="none" stroke="#1c2b26" strokeWidth="1.4" />
      <circle cx="317.5" cy="463" r="3" fill="#103129" />
      <circle cx="335.5" cy="463" r="3" fill="#103129" />
      <circle cx="353.5" cy="463" r="3" fill="#103129" />
      <line x1="376" y1="463" x2="498" y2="463" stroke="#1c2b26" strokeWidth="1.6" />
      <path d="M492 457 l8 6 l-8 6" fill="none" stroke="#1c2b26" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="441" y="449" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {pct3Label}
      </text>
      <rect x="516" y="398" width="202" height="130" rx="12" fill="#1c2b26" />
      <text x="617" y="440" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.4" fill="#ffffff" textAnchor="middle">
        {tier3.title}
      </text>
      <text x="617" y="462" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fill="#ffffff" opacity="0.8" textAnchor="middle">
        {tier3.subtitle}
      </text>
      <rect x="593" y="496" width="12" height="12" rx="2" fill="#ffffff" opacity="0.85" />
      <rect x="611" y="488" width="12" height="20" rx="2" fill="#ffffff" opacity="0.85" />
      <rect x="629" y="480" width="12" height="28" rx="2" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
