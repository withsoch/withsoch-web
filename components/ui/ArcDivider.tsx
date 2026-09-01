// components/ui/ArcDivider.tsx
//
// Bridges a light section into a dark one. A gradient cross-fade (see
// .surface in globals.css) can't do this job: blending mist #f6f2ea into
// forest #103129 passes through muddy brown. So the dark band instead rises
// out of the light one along a single shallow curve.
//
// The area ABOVE the curve is not transparent - it is painted with the
// preceding section's colour. The page body is white, so leaving it
// transparent would flash a white wedge on every page whose previous section
// is mist or sand.

import type { SurfaceName } from "@/components/ui/Section";

type ArcDividerProps = {
  /** Colour of the section directly above - fills the space above the curve. */
  from: SurfaceName;
  /** Colour of the section this divider introduces - fills the curve itself. */
  to: SurfaceName;
  /** Flip vertically, for arcing back out of a dark band into a light one. */
  flip?: boolean;
  className?: string;
};

export function ArcDivider({ from, to, flip = false, className = "" }: ArcDividerProps) {
  return (
    <div
      aria-hidden
      className={`relative w-full overflow-hidden ${className}`}
      style={{ background: `var(--color-${from})` }}
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className="block h-[clamp(2.5rem,5vw,4.5rem)] w-full"
        style={{
          color: `var(--color-${to})`,
          transform: flip ? "scaleY(-1)" : undefined,
        }}
      >
        {/* One shallow cubic: flat at the edges, lifting ~64px at centre.
            preserveAspectRatio="none" stretches it to any width, so there is
            no horizontal-overflow risk the way a clip-path diagonal has. */}
        <path d="M0,72 C360,4 1080,4 1440,72 L1440,72 L0,72 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
