// components/diagrams/RevOpsOutcomes.tsx
//
// Coded rebuild of the "Outcomes" reference SVG (752x501, approved design -
// do not redesign) for RevOps Automation. A "Revenue Dashboard" window-chrome
// mockup (traffic-light dots + title bar) containing 3 widgets side by
// side: CRM DATA checklist, PIPELINE checklist, and a FORECAST gauge marked
// TRUSTED - this is the dashboard-mockup version, not the forecast-vs-actual
// line chart alternative used elsewhere. Root <svg> takes width="100%"
// height="100%" instead of the fixed 752x501, following the same
// conventions as OpsOutcomes.tsx: literal hex colors, viewBox preserved,
// key text as props defaulted to reference copy.

export type RevOpsOutcomesProps = {
  windowTitle?: string;
  crmDataLabel?: string;
  crmDataLines?: [string, string, string];
  pipelineLabel?: string;
  forecastLabel?: string;
  trustedLabel?: string;
  className?: string;
};

// Literal widget column geometry transcribed from the reference SVG - 3
// equal-width columns inside the window chrome.
const COL_X = [48.0, 272.66666666666663, 497.3333333333333];
const COL_W = 206.66666666666666;
const COL_Y = 98;
const COL_H = 353;

function CheckRow({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height="16" rx="3" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1" />
      <circle cx={x + w} cy={y + 8} r="6" fill="none" stroke="#e8431b" strokeWidth="1.4" />
      <path d={`M${x + w - 3} ${y + 8} l2 2.3 l4 -4.6`} fill="none" stroke="#e8431b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function PipelineRow({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <>
      <circle cx={x} cy={y + 8} r="6" fill="#e8431b" />
      <path d={`M${x - 3} ${y + 8} l2 2.3 l4 -4.6`} fill="none" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={x + 12} y={y + 3} width={w} height="10" rx="2.5" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1" />
    </>
  );
}

export function RevOpsOutcomes({
  windowTitle = "REVENUE DASHBOARD",
  crmDataLabel = "CRM DATA",
  crmDataLines = ["CRM data you can", "actually make", "decisions from"],
  pipelineLabel = "PIPELINE",
  forecastLabel = "FORECAST",
  trustedLabel = "TRUSTED",
  className,
}: RevOpsOutcomesProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Outcomes - ${windowTitle}: ${crmDataLabel} (${crmDataLines.join(" ")}), ${pipelineLabel}, ${forecastLabel} - ${trustedLabel}`}
    >
      <defs>
        <pattern id="roc-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#roc-dots)" />

      <rect x="28" y="40" width="696" height="431" rx="14" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1.5" />
      <rect x="28" y="40" width="696" height="38" rx="14" fill="#1c2b26" />
      <rect x="28" y="64" width="696" height="14" fill="#1c2b26" />
      <circle cx="50" cy="59.0" r="5" fill="#7a817d" />
      <circle cx="68" cy="59.0" r="5" fill="#7a817d" />
      <circle cx="86" cy="59.0" r="5" fill="#ff5c35" />
      <text x="376.0" y="64.0" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.5" fill="#ffffff" textAnchor="middle">
        {windowTitle}
      </text>

      {/* CRM DATA widget - checklist rows checked off on the right */}
      <rect x={COL_X[0]} y={COL_Y} width={COL_W} height={COL_H} rx="10" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1.2" />
      <text x={COL_X[0] + 14} y="120" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fontWeight="700" letterSpacing="0.5" fill="#4c534f">
        {crmDataLabel}
      </text>
      {[134, 158, 182, 206].map((y) => (
        <CheckRow key={y} x={COL_X[0] + 14} y={y} w={COL_W - 24} />
      ))}
      {crmDataLines.map((line, i) => (
        <text key={i} x={COL_X[0] + 14} y={394 + i * 15} fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fontWeight="600" fill="#1c2b26">
          {line}
        </text>
      ))}

      {/* PIPELINE widget - checked dots on the left, deal bars on the right */}
      <rect x={COL_X[1]} y={COL_Y} width={COL_W} height={COL_H} rx="10" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1.2" />
      <text x={COL_X[1] + 14} y="120" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fontWeight="700" letterSpacing="0.5" fill="#4c534f">
        {pipelineLabel}
      </text>
      {[142, 166, 190, 214].map((y) => (
        <PipelineRow key={y} x={COL_X[1] + 22} y={y - 8} w={154.66666666666666} />
      ))}
      <text x={COL_X[1] + 14} y="394" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fontWeight="600" fill="#1c2b26">
        No deals or renewals
      </text>
      <text x={COL_X[1] + 14} y="409" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fontWeight="600" fill="#1c2b26">
        falling through the
      </text>
      <text x={COL_X[1] + 14} y="424" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fontWeight="600" fill="#1c2b26">
        cracks
      </text>

      {/* FORECAST widget - 3-band gauge with needle, marked TRUSTED */}
      <rect x={COL_X[2]} y={COL_Y} width={COL_W} height={COL_H} rx="10" fill="#f6f2ea" stroke="#e7e2d7" strokeWidth="1.2" />
      <text x={COL_X[2] + 14} y="120" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10.5" fontWeight="700" letterSpacing="0.5" fill="#4c534f">
        {forecastLabel}
      </text>
      <path d="M554.6666666666666 178.0 A46 46 0 0 1 577.6666666666666 138.16283142591584" fill="none" stroke="#ffe8dd" strokeWidth="12" />
      <path d="M577.6666666666666 138.16283142591584 A46 46 0 0 1 623.6666666666666 138.16283142591584" fill="none" stroke="#ff7a59" strokeWidth="12" />
      <path d="M623.6666666666666 138.16283142591584 A46 46 0 0 1 646.6666666666666 178.0" fill="none" stroke="#e8431b" strokeWidth="12" />
      <line x1="600.6666666666666" y1="178" x2="640.1337567396748" y2="163.63515398032192" stroke="#1c2b26" strokeWidth="3" strokeLinecap="round" />
      <circle cx="600.6666666666666" cy="178" r="6" fill="#1c2b26" />
      <text x="600.6666666666666" y="202" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="10" fontWeight="700" fill="#e8431b" textAnchor="middle">
        {trustedLabel}
      </text>
      <text x={COL_X[2] + 14} y="394" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fontWeight="600" fill="#1c2b26">
        A forecast your
      </text>
      <text x={COL_X[2] + 14} y="409" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fontWeight="600" fill="#1c2b26">
        leadership actually
      </text>
      <text x={COL_X[2] + 14} y="424" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11.5" fontWeight="600" fill="#1c2b26">
        believes in
      </text>
    </svg>
  );
}
