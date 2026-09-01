// components/diagrams/SupportDeliverables.tsx
//
// Coded rebuild of the "Deliverables" reference SVG (752x501) for Customer
// Support Automation. Unlike OpsDeliverables.tsx's uniform 2x2 grid, this
// layout is asymmetric: a wide "workflow audit" card spans the top (the
// foundation every support build starts from) over three equal cards below
// (AI systems / KB sync / handover) - a distinct silhouette at a glance, not
// just re-skinned icons in the same four boxes. Root <svg> takes
// width="100%" height="100%" instead of the fixed 752x501, following the
// same conventions as SupportHero.tsx: literal hex colors, viewBox
// preserved, key text as props defaulted to reference copy.

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

      {/* 01 - Workflow audit (dark green) - wide hero card, the foundation
          every ticket-handling build starts from */}
      <rect x="24" y="24" width="704.0" height="132" rx="12" fill="#1c2b26" />
      <text x="712.0" y="48" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.45)" textAnchor="end">01</text>
      <circle cx="42" cy="52" r="8" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <line x1="48" y1="58" x2="54" y2="64" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <text x="42" y="98.71" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.3" fill="#ffffff">{d1.title}</text>
      {d1.lines.map((line, i) => (
        <text key={i} x="42" y={118.71 + i * 16} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fill="rgba(255,255,255,0.68)">
          {line}
        </text>
      ))}
      {/* Ticket-tag checklist flourish running along the wide card's right side */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * 20})`}>
          <rect x="520" y="49" width="10" height="10" rx="2.5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <path d="M522.3 54 l2.2 2.4 l3.7 -4.4" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="538" y1="54" x2="700" y2="54" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      ))}

      {/* 02 - AI systems (orange) */}
      <rect x="24.0" y="180.0" width="224.0" height="297.0" rx="12" fill="#e8431b" />
      <text x="228.0" y="204.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.45)" textAnchor="end">02</text>
      <path
        d="M42.0 203 h20 a3 3 0 0 1 3 3 v8 a3 3 0 0 1 -3 3 h-13 l-5 4 v-4 h-2 a3 3 0 0 1 -3 -3 v-8 a3 3 0 0 1 3 -3 z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.6"
      />
      <text x="42.0" y="340.71" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16" fontWeight="800" letterSpacing="0.3" fill="#ffffff">{d2.title}</text>
      {d2.lines.map((line, i) => (
        <text key={i} x="42.0" y={360.71 + i * 16} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fill="rgba(255,255,255,0.68)">
          {line}
        </text>
      ))}
      {/* Stacked reply-bubble flourish */}
      <path d="M42 428 h34 a4 4 0 0 1 4 4 v14 a4 4 0 0 1 -4 4 h-24 l-8 7 v-7 a4 4 0 0 1 -6 -4 v-14 a4 4 0 0 1 4 -4 z" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" />

      {/* 03 - KB sync (deep forest) */}
      <rect x="264.0" y="180.0" width="224.0" height="297.0" rx="12" fill="#103129" />
      <text x="468.0" y="204.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.45)" textAnchor="end">03</text>
      <path d="M275 202 h7 a2 2 0 0 1 2 2 v14 a2 2 0 0 0 -2 -2 h-7 z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M293 202 h-7 a2 2 0 0 0 -2 2 v14 a2 2 0 0 1 2 -2 h7 z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <text x="282.0" y="340.71" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16" fontWeight="800" letterSpacing="0.3" fill="#ffffff">{d3.title}</text>
      {d3.lines.map((line, i) => (
        <text key={i} x="282.0" y={360.71 + i * 16} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fill="rgba(255,255,255,0.68)">
          {line}
        </text>
      ))}
      {/* Synced-layers flourish - two offset article cards standing for KB <-> bot sync */}
      <rect x="282" y="424" width="34" height="24" rx="3" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3" />
      <rect x="290" y="432" width="34" height="24" rx="3" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" />
      <line x1="296" y1="440" x2="316" y2="440" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      <line x1="296" y1="446" x2="310" y2="446" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />

      {/* 04 - Handover (slate) */}
      <rect x="504.0" y="180.0" width="224.0" height="297.0" rx="12" fill="#4c534f" />
      <text x="708.0" y="204.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.45)" textAnchor="end">04</text>
      <circle cx="535.0" cy="212.0" r="13" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <path d="M531.0 205.5 l10.5 6.5 l-10.5 6.5 z" fill="#ffffff" />
      <text x="522.0" y="340.71" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16" fontWeight="800" letterSpacing="0.3" fill="#ffffff">{d4.title}</text>
      {d4.lines.map((line, i) => (
        <text key={i} x="522.0" y={360.71 + i * 16} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fill="rgba(255,255,255,0.68)">
          {line}
        </text>
      ))}
      {/* Handoff checklist flourish */}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(0 ${i * 18})`}>
          <rect x="522" y="424" width="9" height="9" rx="2" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
          <path d="M524 428.5 l1.8 2 l3 -3.6" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="537" y1="428.5" x2="710" y2="428.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3" />
        </g>
      ))}
    </svg>
  );
}
