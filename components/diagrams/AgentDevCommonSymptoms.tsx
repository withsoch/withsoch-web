// components/diagrams/AgentDevCommonSymptoms.tsx
//
// Coded rebuild of the "Common symptoms" reference SVG (752x501, approved
// design - do not redesign). Editorial list with ghost numerals. Same
// viewBox, same paths/rects/text/colors as the reference, root <svg> takes
// width="100%" height="100%" instead of the fixed 752x501. Each symptom's
// text is wrapped across up to 2 lines exactly as in the reference (the
// reference hand-wraps each string at its own break point, so the wrapped
// lines are passed as a tuple rather than re-wrapped at runtime).

export type AgentDevCommonSymptomsProps = {
  symptoms?: [string[], string[], string[]];
  className?: string;
};

export function AgentDevCommonSymptoms({
  symptoms = [
    ["Hours lost each week reading, summarizing, or", "extracting data from documents and emails"],
    ["Off-the-shelf AI tools that don't fit the workflow"],
    ["A custom AI build attempted in ChatGPT or Cursor", "that never made it into production"],
  ],
  className,
}: AgentDevCommonSymptomsProps) {
  // Row baselines/dividers from the reference are evenly spaced (137px
  // apart) starting at row 1's first text baseline of 111.5 - kept literal
  // per-row rather than recomputed, since the reference's one-line row
  // (symptom 2) sits centered differently than the two-line rows.
  const rows = [
    { numeralY: 148.5, textYs: [111.5, 137.5], dividerY: 187.0, barY: 104.5 },
    { numeralY: 285.5, textYs: [261.5], dividerY: 324.0, barY: 241.5 },
    { numeralY: 422.5, textYs: [385.5, 411.5], dividerY: null, barY: 378.5 },
  ];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Common symptoms: ${symptoms.map((lines) => lines.join(" ")).join("; ")}`}
    >
      <defs>
        <pattern id="cs-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#cs-dots)" />

      {rows.map((row, i) => (
        <g key={i}>
          <text
            x="36"
            y={row.numeralY}
            fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
            fontSize="64"
            fontWeight="800"
            fill="#ffe8dd"
          >
            {String(i + 1).padStart(2, "0")}
          </text>
          {symptoms[i].map((line, li) => (
            <text
              key={li}
              x="146"
              y={row.textYs[li]}
              fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
              fontSize="19"
              fontWeight="700"
              fill="#1c2b26"
            >
              {line}
            </text>
          ))}
          <rect x="122" y={row.barY} width="4" height="28" rx="2" fill="#e8431b" />
          {row.dividerY !== null && (
            <line x1="36" y1={row.dividerY} x2="716" y2={row.dividerY} stroke="#e7e2d7" strokeWidth="1.3" />
          )}
        </g>
      ))}
    </svg>
  );
}
