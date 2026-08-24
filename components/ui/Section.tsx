// components/ui/Section.tsx
//
// Canonical section shell + centered/left heading block. Matches DESIGN.md
// §5 (container-x, vertical rhythm) and §6 (SectionHeading recipe).
//
// Surfaces are flat, set by the caller via className (bg-white / bg-mist /
// bg-forest). The homepage groups sections into a small number of zones that
// share a surface, so there are only a few crisp boundaries down the page -
// see the zone map in app/page.tsx.

import type { ReactNode } from "react";

/**
 * Surface tokens a section may be painted with. These are the `--color-*`
 * names from the @theme block in app/globals.css, so `var(--color-${name})`
 * always resolves. Consumed by ArcDivider, which needs the raw colour rather
 * than a bg-* utility.
 */
export type SurfaceName = "white" | "mist" | "cream" | "peach" | "forest" | "charcoal";

type SectionProps = {
  id?: string;
  className?: string;
  tight?: boolean;
  loose?: boolean;
  /**
   * Hairline at the top edge. Used where two sections share a zone surface
   * and would otherwise merge into one undifferentiated run of colour.
   */
  divider?: boolean;
  children: ReactNode;
};

function padding(tight: boolean, loose: boolean) {
  return loose ? "section-y-loose" : tight ? "section-y-tight" : "section-y";
}

export function Section({
  id,
  className = "",
  tight = false,
  loose = false,
  divider = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${padding(tight, loose)} ${divider ? "border-t border-line" : ""} ${className}`}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

/**
 * Same vertical rhythm as <Section>, but without the `container-x` wrapper -
 * for sections that manage their own width: CaseStudiesCarousel and
 * AutomationOperatingSystem (max-w-[96rem]) and IndustriesSlider (full-bleed).
 */
export function BareSection({
  id,
  className = "",
  tight = false,
  loose = false,
  bare = false,
  divider = false,
  children,
}: SectionProps & { bare?: boolean }) {
  return (
    <section
      id={id}
      className={`${bare ? "" : padding(tight, loose)} ${divider ? "border-t border-line" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  title: string;
  intro?: string;
  align?: "center" | "left";
  maxWidthClassName?: string;
  titleClassName?: string;
};

export function SectionHeading({
  title,
  intro,
  align = "center",
  maxWidthClassName = "max-w-2xl",
  titleClassName = "text-h2",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <div className={`flex ${maxWidthClassName} flex-col gap-4 ${alignment}`}>
      <h2 className={titleClassName}>{title}</h2>
      {intro && <p className="lead">{intro}</p>}
    </div>
  );
}
