// components/diagrams/OpsCommonSymptoms.tsx
//
// Coded rebuild of the "Common symptoms" reference SVG (752x501, approved
// design - do not redesign) for Operations & Process Automation. 3-column
// vignette layout: browser window w/ highlighted cells + clock badge,
// disconnected tool icons + X, cracked gear + warning triangle. Root <svg>
// takes width="100%" height="100%" instead of the fixed 752x501, following
// the same conventions as OpsHero.tsx / AgentDevCommonSymptoms.tsx: literal
// hex colors, viewBox preserved, key text as props defaulted to reference
// copy.

export type OpsCommonSymptomsProps = {
  symptoms?: [
    { titleLines: [string, string]; subtitleLines: string[] },
    { titleLines: [string, string]; subtitleLines: string[] },
    { titleLines: [string, string]; subtitleLines: string[] },
  ];
  className?: string;
};

export function OpsCommonSymptoms({
  symptoms = [
    { titleLines: ["Manual work", "slowing the team"], subtitleLines: ["that should be scaling"] },
    { titleLines: ["Tools not talking", "to each other"], subtitleLines: ["data spread across", "platforms"] },
    { titleLines: ["Automation broke,", "nobody fixed it"], subtitleLines: ["stayed broken"] },
  ],
  className,
}: OpsCommonSymptomsProps) {
  const [col1, col2, col3] = symptoms;
  const col2Lines = col2.subtitleLines;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Common symptoms: ${col1.titleLines.join(" ")} - ${col1.subtitleLines.join(" ")}. ${col2.titleLines.join(" ")} - ${col2Lines.join(" ")}. ${col3.titleLines.join(" ")} - ${col3.subtitleLines.join(" ")}.`}
    >
      <defs>
        <pattern id="cs-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#cs-dots)" />

      <line x1="260.67" y1="60" x2="260.67" y2="451" stroke="#e7e2d7" strokeWidth="1.4" />
      <line x1="491.33" y1="60" x2="491.33" y2="451" stroke="#e7e2d7" strokeWidth="1.4" />

      {/* Column 1 - browser window with highlighted cells + clock badge */}
      <rect x="89.33" y="119.0" width="112" height="78" rx="8" fill="#ffffff" stroke="#1c2b26" strokeWidth="2" />
      <rect x="89.33" y="119.0" width="112" height="15" rx="8" fill="#1c2b26" />
      <rect x="89.33" y="126.5" width="112" height="7.5" fill="#1c2b26" />
      <circle cx="100.33" cy="126.5" r="2.3" fill="#f6f2ea" />
      <circle cx="109.33" cy="126.5" r="2.3" fill="#f6f2ea" />
      <circle cx="118.33" cy="126.5" r="2.3" fill="#f6f2ea" />
      <rect x="98.33" y="143.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="121.33" y="143.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="144.33" y="143.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="167.33" y="143.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="98.33" y="158.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="121.33" y="158.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="144.33" y="158.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="167.33" y="158.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="98.33" y="173.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="121.33" y="173.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="144.33" y="173.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="167.33" y="173.0" width="19" height="11" fill="none" stroke="#e7e2d7" strokeWidth="1.3" />
      <rect x="98.33" y="143.0" width="19" height="11" fill="#ffe8dd" />
      <rect x="121.33" y="158.0" width="19" height="11" fill="#ffe8dd" />
      <circle cx="195.33" cy="193.0" r="22" fill="#e8431b" stroke="#ffffff" strokeWidth="3" />
      <circle cx="195.33" cy="193.0" r="14.5" fill="none" stroke="#ffffff" strokeWidth="2" />
      <line x1="195.33" y1="193.0" x2="195.33" y2="185.0" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="195.33" y1="193.0" x2="201.33" y2="196.0" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

      {/* Column 2 - disconnected tool icons + X */}
      <rect x="328" y="132" width="34" height="34" rx="8" fill="#ffffff" stroke="#1c2b26" strokeWidth="2" />
      <circle cx="345" cy="144.0" r="5" fill="none" stroke="#1c2b26" strokeWidth="1.7" />
      <path d="M337.5 157.0 a7.5 5 0 0 1 15 0" fill="none" stroke="#1c2b26" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="386" y="120" width="34" height="34" rx="8" fill="#ffffff" stroke="#1c2b26" strokeWidth="2" />
      <line x1="395.5" y1="130.5" x2="410.5" y2="130.5" stroke="#1c2b26" strokeWidth="1.5" />
      <line x1="395.5" y1="137.0" x2="410.5" y2="137.0" stroke="#1c2b26" strokeWidth="1.5" />
      <line x1="395.5" y1="143.5" x2="410.5" y2="143.5" stroke="#1c2b26" strokeWidth="1.5" />
      <line x1="403" y1="130.5" x2="403" y2="143.5" stroke="#1c2b26" strokeWidth="1.5" />
      <rect x="374" y="176" width="34" height="34" rx="8" fill="#ffffff" stroke="#1c2b26" strokeWidth="2" />
      <rect x="382.5" y="187.0" width="17" height="12" rx="2" fill="none" stroke="#1c2b26" strokeWidth="1.5" />
      <path d="M382.5 188.0 l8.5 7 l8.5 -7" fill="none" stroke="#1c2b26" strokeWidth="1.5" />
      <line x1="345" y1="149.0" x2="379.67" y2="159.67" stroke="#e8431b" strokeWidth="1.6" strokeDasharray="4 4" />
      <line x1="403" y1="137.0" x2="379.67" y2="159.67" stroke="#e8431b" strokeWidth="1.6" strokeDasharray="4 4" />
      <line x1="391" y1="193.0" x2="379.67" y2="159.67" stroke="#e8431b" strokeWidth="1.6" strokeDasharray="4 4" />
      <circle cx="379.67" cy="159.67" r="12" fill="#f6f2ea" stroke="#e8431b" strokeWidth="2" />
      <path d="M375.17 155.17 l9 9 M384.17 155.17 l-9 9" stroke="#e8431b" strokeWidth="2" strokeLinecap="round" />

      {/* Column 3 - cracked gear + warning triangle */}
      <g>
        <rect x="620.33" y="151.5" width="13" height="13" rx="3" fill="#1c2b26" transform="rotate(0.0 626.83 158.0)" />
        <rect x="614.42" y="165.76" width="13" height="13" rx="3" fill="#1c2b26" transform="rotate(45.0 620.92 172.26)" />
        <rect x="600.17" y="171.66" width="13" height="13" rx="3" fill="#1c2b26" transform="rotate(90.0 606.67 178.16)" />
        <rect x="585.91" y="165.76" width="13" height="13" rx="3" fill="#1c2b26" transform="rotate(135.0 592.41 172.26)" />
        <rect x="580.01" y="151.5" width="13" height="13" rx="3" fill="#1c2b26" transform="rotate(180.0 586.51 158.0)" />
        <rect x="585.91" y="137.24" width="13" height="13" rx="3" fill="#1c2b26" transform="rotate(225.0 592.41 143.74)" />
        <rect x="600.17" y="131.34" width="13" height="13" rx="3" fill="#1c2b26" transform="rotate(270.0 606.67 137.84)" />
        <rect x="614.42" y="137.24" width="13" height="13" rx="3" fill="#1c2b26" transform="rotate(315.0 620.92 143.74)" />
        <circle cx="606.67" cy="158" r="20.16" fill="#1c2b26" />
        <circle cx="606.67" cy="158" r="17.36" fill="#ffffff" stroke="#1c2b26" strokeWidth="3" />
        <circle cx="606.67" cy="158" r="8.5" fill="none" stroke="#1c2b26" strokeWidth="3" />
        <path d="M599.67 128 l9 17 l-12 8 l14 15" fill="none" stroke="#f6f2ea" strokeWidth="6" strokeLinecap="round" />
      </g>
      <path d="M639.67 170 l13 23 h-26 z" fill="#e8431b" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />
      <line x1="639.67" y1="179" x2="639.67" y2="185" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="639.67" cy="190" r="1.4" fill="#ffffff" />

      <text x="145.33" y="250" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16.5" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {col1.titleLines[0]}
      </text>
      <text x="145.33" y="272" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16.5" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {col1.titleLines[1]}
      </text>
      {col1.subtitleLines.map((line, i) => (
        <text key={i} x="145.33" y={298 + i * 17} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fill="#7a817d" textAnchor="middle">
          {line}
        </text>
      ))}

      <text x="376" y="250" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16.5" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {col2.titleLines[0]}
      </text>
      <text x="376" y="272" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16.5" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {col2.titleLines[1]}
      </text>
      {col2Lines.map((line, i) => (
        <text
          key={i}
          x="376"
          y={298 + i * 17}
          fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
          fontSize="12"
          fill="#7a817d"
          textAnchor="middle"
        >
          {line}
        </text>
      ))}

      <text x="606.67" y="250" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16.5" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {col3.titleLines[0]}
      </text>
      <text x="606.67" y="272" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="16.5" fontWeight="800" fill="#1c2b26" textAnchor="middle">
        {col3.titleLines[1]}
      </text>
      {col3.subtitleLines.map((line, i) => (
        <text key={i} x="606.67" y={298 + i * 17} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="12" fill="#7a817d" textAnchor="middle">
          {line}
        </text>
      ))}
    </svg>
  );
}
