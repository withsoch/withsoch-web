// components/diagrams/MarketingWhoItsFor.tsx
//
// Coded rebuild of the "Who it's for" reference SVG (752x501, approved
// design - do not redesign) for Marketing Automation. Role pills, an 8-week
// calendar strip showing irregular execution (some weeks filled with
// campaign content, others empty/skipped), and the audience sentence below.
// Root <svg> takes width="100%" height="100%" instead of the fixed 752x501,
// following the same conventions as SupportWhoItsFor.tsx / OpsOurApproach.tsx:
// literal hex colors, viewBox preserved, key content as props defaulted to
// reference copy.

export type MarketingWhoItsForProps = {
  roles?: string[];
  /**
   * One entry per week cell (W1..W8). true = filled/executed week, false =
   * skipped week (dashed border + "x" mark). The reference pattern is
   * W1,W2 filled; W3 empty; W4 filled; W5,W6 empty; W7 filled; W8 empty -
   * meaningful because it's illustrating "inconsistent execution", so it's
   * exposed as a prop rather than hardcoded.
   */
  weeksFilled?: boolean[];
  sentenceLines?: string[];
  className?: string;
};

// Literal pill geometry transcribed from the reference SVG - width per pill
// grows with its label rather than being re-derived from a fixed formula.
const PILL_WIDTHS = [79.6, 130.0, 130.0];
const PILL_GAP = 10;

const WEEK_COUNT = 8;
const WEEK_START_X = 28.0;
const WEEK_WIDTH = 76.5;
const WEEK_GAP = 12.0;
const WEEK_STEP = WEEK_WIDTH + WEEK_GAP;

export function MarketingWhoItsFor({
  roles = ["FOUNDERS", "MARKETING LEADS", "GROWTH MANAGERS"],
  weeksFilled = [true, true, false, true, false, false, true, false],
  sentenceLines = [
    "Founders, marketing leads, and growth managers running lean",
    "teams without the bandwidth to execute consistently week after",
    "week.",
  ],
  className,
}: MarketingWhoItsForProps) {
  let pillX = 28;
  const pills = roles.map((label, i) => {
    const width = PILL_WIDTHS[i] ?? 90;
    const x = pillX;
    pillX += width + PILL_GAP;
    return { label, x, width };
  });

  const weeks = Array.from({ length: WEEK_COUNT }, (_, i) => ({
    label: `W${i + 1}`,
    x: WEEK_START_X + i * WEEK_STEP,
    filled: weeksFilled[i] ?? false,
  }));

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 501"      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Who it's for: ${roles.join(", ")}. ${sentenceLines.join(" ")}`}
    >
      <defs>
        <pattern id="mwf-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ddd7c8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="752" height="501" fill="#f6f2ea" />
      <rect x="0" y="0" width="752" height="501" fill="url(#mwf-dots)" />

      {pills.map((pill) => (
        <g key={pill.label}>
          <rect x={pill.x} y="29" width={pill.width} height="28" rx="14" fill="#ffffff" stroke="#e8431b" strokeWidth="1.6" />
          <text
            x={pill.x + pill.width / 2}
            y="48"
            fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
            fontSize="11.5"
            fontWeight="700"
            letterSpacing="0.3"
            fill="#e8431b"
            textAnchor="middle"
          >
            {pill.label}
          </text>
        </g>
      ))}

      {weeks.map((week) => {
        const cx = week.x + WEEK_WIDTH / 2;
        return (
          <g key={week.label}>
            {week.filled ? (
              <>
                <rect x={week.x} y="96" width={WEEK_WIDTH} height="150" rx="10" fill="#ffffff" stroke="#e7e2d7" strokeWidth="1.3" />
                <rect x={week.x + 10} y="110" width={WEEK_WIDTH - 20} height="8" rx="3" fill="#ff5c35" />
                <rect x={week.x + 10} y="124" width={WEEK_WIDTH - 20} height="8" rx="3" fill="#ff7a59" />
                <rect x={week.x + 10} y="138" width={(WEEK_WIDTH - 20) * 0.6} height="8" rx="3" fill="#ffe8dd" />
              </>
            ) : (
              <>
                <rect x={week.x} y="96" width={WEEK_WIDTH} height="150" rx="10" fill="none" stroke="#e7e2d7" strokeWidth="1.3" strokeDasharray="4 4" />
                <line x1={cx - 8} y1="163.0" x2={cx + 8} y2="179.0" stroke="#7a817d" strokeWidth="2" strokeLinecap="round" />
                <line x1={cx + 8} y1="163.0" x2={cx - 8} y2="179.0" stroke="#7a817d" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
            <text x={cx} y="266" fontFamily="Liberation Sans, DejaVu Sans, sans-serif" fontSize="11" fontWeight="700" fill="#7a817d" textAnchor="middle">
              {week.label}
            </text>
          </g>
        );
      })}

      {sentenceLines.map((line, i) => (
        <text
          key={i}
          x="28"
          y={306 + i * 27}
          fontFamily="Liberation Sans, DejaVu Sans, sans-serif"
          fontSize="18"
          fontWeight="700"
          fill="#1c2b26"
        >
          {line}
        </text>
      ))}
    </svg>
  );
}
