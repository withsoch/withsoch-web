// components/sections/ServiceCardDiagrams.tsx
//
// Bespoke flat SVG diagrams, one per service card on /services. Same
// technique as StatsNetworkIllustration.tsx: flat shapes, DESIGN.md tokens
// only (ink / brand / leaf / line / peach / mist), no gradients or glow.
// Each diagram shares a 280x140 viewBox so they sit consistently across cards.

const INK = "#1c2b26";
const BRAND = "#ff5c35";
const LEAF = "#1f8a66";
const LINE = "#e7e2d7";
const MIST = "#f6f2ea";

// AI Agent Development — Inputs -> Agent -> Outputs flow.
export function AgentFlowDiagram() {
  return (
    <svg viewBox="0 0 280 140" className="h-full w-full" role="img" aria-label="Diagram of inputs flowing into an AI agent that produces outputs">
      <rect x={10} y={52} width={70} height={36} rx={8} fill={MIST} stroke={LINE} strokeWidth={1.4} />
      <text x={45} y={74} textAnchor="middle" fontSize={11} fontWeight={600} fill={INK}>Inputs</text>

      <line x1={82} y1={70} x2={112} y2={70} stroke={INK} strokeWidth={1.6} />
      <path d="M112 70 L104 65 L104 75 Z" fill={INK} />

      <circle cx={140} cy={70} r={30} fill={BRAND} />
      <text x={140} y={74} textAnchor="middle" fontSize={11} fontWeight={600} fill="#fff">Agent</text>

      <line x1={170} y1={70} x2={200} y2={70} stroke={INK} strokeWidth={1.6} />
      <path d="M200 70 L192 65 L192 75 Z" fill={INK} />

      <rect x={200} y={52} width={70} height={36} rx={8} fill={MIST} stroke={LINE} strokeWidth={1.4} />
      <text x={235} y={74} textAnchor="middle" fontSize={11} fontWeight={600} fill={INK}>Outputs</text>
    </svg>
  );
}

// Operations and Process Automation — tangled manual lines vs clean automated boxes.
export function BeforeAfterDiagram() {
  return (
    <svg viewBox="0 0 280 140" className="h-full w-full" role="img" aria-label="Diagram comparing tangled manual workflows to a clean automated sequence">
      <circle cx={22} cy={30} r={4} fill={INK} />
      <circle cx={55} cy={100} r={4} fill={INK} />
      <circle cx={30} cy={110} r={4} fill={INK} />
      <circle cx={65} cy={35} r={4} fill={INK} />
      <circle cx={45} cy={70} r={4} fill={INK} />
      <line x1={22} y1={30} x2={65} y2={35} stroke={LINE} strokeWidth={1.4} />
      <line x1={22} y1={30} x2={30} y2={110} stroke={LINE} strokeWidth={1.4} />
      <line x1={65} y1={35} x2={45} y2={70} stroke={LINE} strokeWidth={1.4} />
      <line x1={55} y1={100} x2={45} y2={70} stroke={LINE} strokeWidth={1.4} />
      <line x1={30} y1={110} x2={65} y2={35} stroke={LINE} strokeWidth={1.4} />
      <line x1={22} y1={30} x2={55} y2={100} stroke={LINE} strokeWidth={1.4} />

      <line x1={125} y1={70} x2={155} y2={70} stroke={LINE} strokeWidth={1.4} />

      <rect x={155} y={54} width={44} height={32} rx={7} fill={MIST} stroke={LINE} strokeWidth={1.4} />
      <line x1={199} y1={70} x2={214} y2={70} stroke={INK} strokeWidth={1.6} />
      <path d="M214 70 L207 66 L207 74 Z" fill={INK} />

      <rect x={214} y={54} width={44} height={32} rx={7} fill={LEAF} />
    </svg>
  );
}

// Customer Support Automation — ticket routing into three branches.
export function TicketRoutingDiagram() {
  return (
    <svg viewBox="0 0 280 140" className="h-full w-full" role="img" aria-label="Diagram of a support ticket routing into self-serve, AI draft, and human escalation branches">
      <rect x={16} y={54} width={64} height={32} rx={7} fill={MIST} stroke={LINE} strokeWidth={1.4} />
      <text x={48} y={74} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>Ticket</text>

      <path d="M80 70 L110 70" stroke={INK} strokeWidth={1.6} fill="none" />
      <path d="M110 70 L118 26 M110 70 L118 70 M110 70 L118 114" stroke={INK} strokeWidth={1.4} fill="none" />

      <rect x={118} y={12} width={92} height={28} rx={7} fill="#fff" stroke={LINE} strokeWidth={1.4} />
      <text x={164} y={30} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>Self-serve</text>

      <rect x={118} y={56} width={92} height={28} rx={7} fill={BRAND} />
      <text x={164} y={74} textAnchor="middle" fontSize={9.5} fontWeight={600} fill="#fff">AI Draft</text>

      <rect x={118} y={100} width={92} height={28} rx={7} fill="#fff" stroke={LINE} strokeWidth={1.4} />
      <text x={164} y={118} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>Human Escalation</text>
    </svg>
  );
}

// Marketing Automation — 4-stage funnel: Attract, Capture, Nurture, Convert.
export function FunnelDiagram() {
  const stages = [
    { label: "Attract", y: 8, w: 240, fill: MIST, textFill: INK },
    { label: "Capture", y: 42, w: 184, fill: "#fff", textFill: INK },
    { label: "Nurture", y: 76, w: 128, fill: "#fff", textFill: INK },
    { label: "Convert", y: 110, w: 72, fill: BRAND, textFill: "#fff" },
  ];
  return (
    <svg viewBox="0 0 280 140" className="h-full w-full" role="img" aria-label="Diagram of a marketing funnel with attract, capture, nurture, and convert stages">
      {stages.map((s) => {
        const x = 140 - s.w / 2;
        return (
          <g key={s.label}>
            <rect x={x} y={s.y} width={s.w} height={24} rx={6} fill={s.fill} stroke={s.fill === "#fff" ? LINE : "none"} strokeWidth={1.4} />
            <text x={140} y={s.y + 16} textAnchor="middle" fontSize={10} fontWeight={600} fill={s.textFill}>
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// RevOps Automation — Sales / Marketing / Customer Success overlapping at Revenue.
export function OverlappingCirclesDiagram() {
  return (
    <svg viewBox="0 0 280 140" className="h-full w-full" role="img" aria-label="Diagram of sales, marketing, and customer success circles overlapping around a shared revenue center">
      <circle cx={110} cy={55} r={42} fill={BRAND} opacity={0.75} />
      <circle cx={170} cy={55} r={42} fill={LEAF} opacity={0.75} />
      <circle cx={140} cy={95} r={42} fill={INK} opacity={0.7} />

      <text x={78} y={40} textAnchor="middle" fontSize={9.5} fontWeight={600} fill="#fff">Sales</text>
      <text x={202} y={40} textAnchor="middle" fontSize={9.5} fontWeight={600} fill="#fff">Marketing</text>
      <text x={140} y={128} textAnchor="middle" fontSize={9.5} fontWeight={600} fill="#fff">Customer Success</text>

      <circle cx={140} cy={72} r={16} fill="#fff" />
      <text x={140} y={76} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>Revenue</text>
    </svg>
  );
}

export const SERVICE_DIAGRAMS: Record<string, () => React.ReactElement> = {
  "ai-agent-development": AgentFlowDiagram,
  "operations-process-automation": BeforeAfterDiagram,
  "customer-support-automation": TicketRoutingDiagram,
  "marketing-automation": FunnelDiagram,
  "revops-automation": OverlappingCirclesDiagram,
};
