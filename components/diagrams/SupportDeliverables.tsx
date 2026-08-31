// components/diagrams/SupportDeliverables.tsx
//
// Coded rebuild of the "Deliverables" reference SVG (752x501, approved
// design - do not redesign) for Customer Support Automation. 2x2 grid of
// solid-color cards (workflow audit / AI systems / KB sync / handover),
// each with an icon, index numeral, title, description lines, and a small
// decorative flourish unique to that card - same structural pattern as
// OpsDeliverables.tsx. Root <svg> takes width="100%" height="100%" instead
// of the fixed 752x501, following the same conventions as SupportHero.tsx:
// literal hex colors, viewBox preserved, key text as props defaulted to
// reference copy.

export type SupportDeliverableItem = {
  title: string;
  lines: string[];
};

export type SupportDeliverablesProps = {
  items?: [SupportDeliverableItem, SupportDeliverableItem, SupportDeliverableItem, SupportDeliverableItem];
  className?: string;
};

export function SupportDeliverables({
  items = [
    { title: "WORKFLOW AUDIT", lines: ["support audit and redesign"] },
    { title: "AI SYSTEMS", lines: ["response, routing,", "deflection"] },
    { title: "KB SYNC", lines: ["knowledge base integration"] },
    { title: "HANDOVER", lines: ["docs and Loom walkthrough"] },
  ],
  className,
}: SupportDeliverablesProps) {
  const [d1, d2, d3, d4] = items;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Deliverables: ${items.map((it, i) => `${i + 1}. ${it.title} - ${it.lines.join(" ")}`).join("; ")}`}
    >
      <defs>
        <pattern id="dv2-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#dv2-dots)" />

      {/* 01 - Workflow audit (dark green) */}
      <rect x="24" y="24" width="346.0" height="220.5" rx="12" fill="#1c2b26" />
      <text x="354.0" y="48" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.45)" textAnchor="end">01</text>
      <circle cx="42" cy="52" r="8" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <line x1="48" y1="58" x2="54" y2="64" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <text x="42" y="160.71" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.3" fill="#ffffff">{d1.title}</text>
      {d1.lines.map((line, i) => (
        <text key={i} x="42" y={180.71 + i * 16} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fill="rgba(255,255,255,0.68)">
          {line}
        </text>
      ))}
      <circle cx="42" cy="226.5" r="2.5" fill="rgba(255,255,255,0.5)" />
      <line x1="44.5" y1="226.5" x2="53.5" y2="226.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
      <circle cx="56" cy="226.5" r="2.5" fill="rgba(255,255,255,0.5)" />
      <line x1="58.5" y1="226.5" x2="67.5" y2="226.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
      <circle cx="70" cy="226.5" r="2.5" fill="rgba(255,255,255,0.5)" />

      {/* 02 - AI systems (orange) */}
      <rect x="382.0" y="24" width="346.0" height="220.5" rx="12" fill="#e8431b" />
      <text x="712.0" y="48" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.45)" textAnchor="end">02</text>
      <path
        d="M392.0 47 h20 a3 3 0 0 1 3 3 v8 a3 3 0 0 1 -3 3 h-13 l-5 4 v-4 h-2 a3 3 0 0 1 -3 -3 v-8 a3 3 0 0 1 3 -3 z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.6"
      />
      <text x="400.0" y="160.71" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.3" fill="#ffffff">{d2.title}</text>
      {d2.lines.map((line, i) => (
        <text key={i} x="400.0" y={180.71 + i * 16} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fill="rgba(255,255,255,0.68)">
          {line}
        </text>
      ))}
      <rect x="400.0" y="221.5" width="10" height="10" rx="2" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <rect x="413.0" y="221.5" width="10" height="10" rx="2" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <rect x="426.0" y="221.5" width="10" height="10" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <rect x="439.0" y="221.5" width="10" height="10" rx="2" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

      {/* 03 - KB sync (deep forest) */}
      <rect x="24" y="256.5" width="346.0" height="220.5" rx="12" fill="#103129" />
      <text x="354.0" y="280.5" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.45)" textAnchor="end">03</text>
      <path d="M35 278.5 h7 a2 2 0 0 1 2 2 v14 a2 2 0 0 0 -2 -2 h-7 z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M53 278.5 h-7 a2 2 0 0 0 -2 2 v14 a2 2 0 0 1 2 -2 h7 z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <text x="42" y="393.21" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.3" fill="#ffffff">{d3.title}</text>
      {d3.lines.map((line, i) => (
        <text key={i} x="42" y={413.21 + i * 16} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fill="rgba(255,255,255,0.68)">
          {line}
        </text>
      ))}
      <line x1="42" y1="453.0" x2="163.1" y2="453.0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
      <line x1="42" y1="459.0" x2="163.1" y2="459.0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
      <line x1="42" y1="465.0" x2="163.1" y2="465.0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />

      {/* 04 - Handover (slate) */}
      <rect x="382.0" y="256.5" width="346.0" height="220.5" rx="12" fill="#4c534f" />
      <text x="712.0" y="280.5" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.45)" textAnchor="end">04</text>
      <circle cx="402.0" cy="286.5" r="13" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <path d="M398.0 280.0 l10.5 6.5 l-10.5 6.5 z" fill="#ffffff" />
      <text x="400.0" y="393.21" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.3" fill="#ffffff">{d4.title}</text>
      {d4.lines.map((line, i) => (
        <text key={i} x="400.0" y={413.21 + i * 16} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fill="rgba(255,255,255,0.68)">
          {line}
        </text>
      ))}
      <rect x="400.0" y="455.0" width="310.0" height="7" rx="3.5" fill="rgba(255,255,255,0.25)" />
      <rect x="400.0" y="455.0" width="217.0" height="7" rx="3.5" fill="#ffffff" />
    </svg>
  );
}
