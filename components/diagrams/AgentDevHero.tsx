// components/diagrams/AgentDevHero.tsx
//
// Coded rebuild of reference_hero_ai_agent_development.svg (approved design -
// colors/layout/icons final, do not redesign). Same viewBox (0 0 800 800),
// same paths/circles/rects/text as the reference, but the root <svg> takes
// width="100%" height="100%" instead of fixed 800x800 so it scales fluidly
// in its container instead of needing object-fit cropping.
//
// Row/item labels are props (defaulted to the reference copy) so this is
// data-driven rather than string-literal, even though for this service
// they'll just be the defaults. Colors are kept as the literal hex from the
// reference (matching the precedent in ServiceFlowDiagram.tsx of scoping
// diagram-specific colors locally rather than promoting them to @theme
// tokens).
//
// Proof-of-concept: currently wired in for ai-agent-development only (see
// app/services/[slug]/page.tsx). Not yet generalized for the other 4
// services' hero PNGs.

export type AgentDevHeroProps = {
  inputsLabel?: string;
  agentLabel?: string;
  outputsLabel?: string;
  inputItems?: [string, string, string];
  agentItems?: [string, string, string];
  outputItems?: [string, string, string];
  className?: string;
};

export function AgentDevHero({
  inputsLabel = "INPUTS",
  agentLabel = "AGENT",
  outputsLabel = "OUTPUTS",
  inputItems = ["EMAIL", "CRM", "DOCS"],
  agentItems = ["reason", "tools", "memory"],
  outputItems = ["DRAFT", "TASK", "ESCALATE"],
  className,
}: AgentDevHeroProps) {
  const [emailLabel, crmLabel, docsLabel] = inputItems;
  const [reasonLabel, toolsLabel, memoryLabel] = agentItems;
  const [draftLabel, taskLabel, escalateLabel] = outputItems;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Diagram: ${inputsLabel} (${emailLabel}, ${crmLabel}, ${docsLabel}) flow into the ${agentLabel} (${reasonLabel}, ${toolsLabel}, ${memoryLabel}), producing ${outputsLabel} (${draftLabel}, ${taskLabel}, ${escalateLabel}).`}
    >
      <defs>
        <pattern id="hdots2" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="10" y="16" width="780" height="780" rx="30" fill="#000000" opacity="0.05" />
      <rect x="6" y="10" width="788" height="788" rx="30" fill="#000000" opacity="0.05" />
      <rect x="0" y="0" width="800" height="800" rx="30" fill="#ffffff" />
      <rect x="26" y="26" width="748" height="748" rx="20" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1" />
      <rect x="27" y="27" width="746" height="746" rx="19" fill="url(#hdots2)" />
      <path d="M42 56 V42 H56" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M744 42 H758 V56" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M42 744 V758 H56" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />
      <path d="M744 758 H758 V744" stroke="rgba(28,43,38,0.3)" strokeWidth="2" fill="none" />

      {/* 01 INPUTS row */}
      <text x="66" y="94" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fontWeight="700" fill="#b4b2a9">
        01
      </text>
      <text x="66" y="116" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="700" letterSpacing="0.3" fill="#1c2b26">
        {inputsLabel}
      </text>

      <rect x="204" y="66" width="166" height="72" rx="12" fill="#ffe8dd" />
      <rect x="254.25" y="95.5" width="18" height="13" rx="2.5" fill="none" stroke="#1c2b26" strokeWidth="1.6" />
      <path d="M254.25 97.0 l9 6.5 l9 -6.5" fill="none" stroke="#1c2b26" strokeWidth="1.6" strokeLinejoin="round" />
      <text x="281.25" y="107" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.4" fill="#1c2b26">
        {emailLabel}
      </text>

      <rect x="386" y="66" width="166" height="72" rx="12" fill="#ffe8dd" />
      <ellipse cx="453.15" cy="95.0" rx="9" ry="3.2" fill="none" stroke="#1c2b26" strokeWidth="1.6" />
      <path d="M444.15 95.0 v10 a9 3.2 0 0 0 18 0 v-10" fill="none" stroke="#1c2b26" strokeWidth="1.6" />
      <text x="471.15" y="107" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.4" fill="#1c2b26">
        {crmLabel}
      </text>

      <rect x="568" y="66" width="166" height="72" rx="12" fill="#ffe8dd" />
      <rect x="624.2" y="93.0" width="14" height="18" rx="2" fill="none" stroke="#1c2b26" strokeWidth="1.6" />
      <line x1="627.7" y1="99.0" x2="634.7" y2="99.0" stroke="#1c2b26" strokeWidth="1.4" />
      <line x1="627.7" y1="103.5" x2="634.7" y2="103.5" stroke="#1c2b26" strokeWidth="1.4" />
      <text x="649.2" y="107" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.4" fill="#1c2b26">
        {docsLabel}
      </text>

      <line x1="287.0" y1="144" x2="287.0" y2="170" stroke="#4c534f" strokeWidth="1.6" />
      <path d="M283.0 167 l4 7 l4 -7" fill="none" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="469.0" y1="144" x2="469.0" y2="170" stroke="#4c534f" strokeWidth="1.6" />
      <path d="M465.0 167 l4 7 l4 -7" fill="none" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="651.0" y1="144" x2="651.0" y2="170" stroke="#4c534f" strokeWidth="1.6" />
      <path d="M647.0 167 l4 7 l4 -7" fill="none" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      {/* 02 AGENT core */}
      <text x="66" y="392" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fontWeight="700" fill="#b4b2a9">
        02
      </text>
      <text x="66" y="414" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="700" letterSpacing="0.3" fill="#1c2b26">
        {agentLabel}
      </text>

      <rect x="204" y="182" width="530" height="436" rx="16" fill="#1c2b26" />
      <line x1="469.0" y1="282" x2="369.0" y2="502" stroke="#ffffff" strokeWidth="1.3" opacity="0.35" />
      <line x1="469.0" y1="282" x2="569.0" y2="502" stroke="#ffffff" strokeWidth="1.3" opacity="0.35" />
      <line x1="369.0" y1="502" x2="569.0" y2="502" stroke="#ffffff" strokeWidth="1.3" opacity="0.35" />

      <circle cx="469.0" cy="282" r="34" fill="#1c2b26" stroke="#ffffff" strokeWidth="1.6" />
      <path
        d="M469.0 266 L473.0 278 L485.0 282 L473.0 286 L469.0 298 L465.0 286 L453.0 282 L465.0 278 Z"
        fill="#ffffff"
      />
      <text x="469.0" y="304" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10" fill="#ffffff" textAnchor="middle" opacity="0.85">
        {reasonLabel}
      </text>

      <circle cx="369.0" cy="502" r="34" fill="#1c2b26" stroke="#ffffff" strokeWidth="1.6" />
      <circle cx="369.0" cy="502" r="8" fill="none" stroke="#ffffff" strokeWidth="1.7" />
      <circle cx="369.0" cy="502" r="2.6" fill="#ffffff" />
      <line x1="380.0" y1="502.0" x2="383.5" y2="502.0" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="374.5" y1="511.5" x2="376.2" y2="514.6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="363.5" y1="511.5" x2="361.8" y2="514.6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="358.0" y1="502.0" x2="354.5" y2="502.0" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="363.5" y1="492.5" x2="361.8" y2="489.4" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="374.5" y1="492.5" x2="376.2" y2="489.4" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <text x="369.0" y="524" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10" fill="#ffffff" textAnchor="middle" opacity="0.85">
        {toolsLabel}
      </text>

      <circle cx="569.0" cy="502" r="34" fill="#1c2b26" stroke="#ffffff" strokeWidth="1.6" />
      <ellipse cx="569.0" cy="493" rx="9" ry="3.2" fill="none" stroke="#ffffff" strokeWidth="1.6" />
      <path d="M560.0 493 v10 a9 3.2 0 0 0 18 0 v-10" fill="none" stroke="#ffffff" strokeWidth="1.6" />
      <text x="569.0" y="524" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10" fill="#ffffff" textAnchor="middle" opacity="0.85">
        {memoryLabel}
      </text>

      <line x1="287.0" y1="624" x2="287.0" y2="650" stroke="#4c534f" strokeWidth="1.6" />
      <path d="M283.0 647 l4 7 l4 -7" fill="none" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="469.0" y1="624" x2="469.0" y2="650" stroke="#4c534f" strokeWidth="1.6" />
      <path d="M465.0 647 l4 7 l4 -7" fill="none" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="651.0" y1="624" x2="651.0" y2="650" stroke="#4c534f" strokeWidth="1.6" />
      <path d="M647.0 647 l4 7 l4 -7" fill="none" stroke="#4c534f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      {/* 03 OUTPUTS row */}
      <text x="66" y="690" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fontWeight="700" fill="#b4b2a9">
        03
      </text>
      <text x="66" y="712" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="17" fontWeight="700" letterSpacing="0.3" fill="#1c2b26">
        {outputsLabel}
      </text>

      <rect x="204" y="662" width="166" height="72" rx="12" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1" />
      <path
        d="M257.25 705.0 l11 -11 l4 4 l-11 11 l-5 1 z"
        fill="none"
        stroke="#103129"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <text x="281.25" y="703" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="0.3" fill="#1c2b26">
        {draftLabel}
      </text>

      <rect x="386" y="662" width="166" height="72" rx="12" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1" />
      <rect x="441.2" y="690.0" width="16" height="16" rx="4" fill="none" stroke="#103129" strokeWidth="1.6" />
      <path d="M445.2 698.0 l3 3.3 l5.5 -6.5" fill="none" stroke="#103129" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="467.2" y="703" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="0.3" fill="#1c2b26">
        {taskLabel}
      </text>

      <rect x="568" y="662" width="166" height="72" rx="12" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1" />
      <line x1="609.4" y1="704.0" x2="621.4" y2="692.0" stroke="#103129" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M614.4 692.0 h7 v7" fill="none" stroke="#103129" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <text x="633.4" y="703" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fontWeight="700" letterSpacing="0.3" fill="#1c2b26">
        {escalateLabel}
      </text>
    </svg>
  );
}
