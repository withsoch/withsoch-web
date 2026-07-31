// components/ui/Section.tsx
//
// Canonical section shell + centered/left heading block. Matches DESIGN.md
// §5 (container-x, vertical rhythm) and §6 (SectionHeading recipe).

import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  tight?: boolean;
  children: ReactNode;
};

export function Section({ id, className = "", tight = false, children }: SectionProps) {
  const padding = tight ? "py-16 sm:py-20" : "py-20 sm:py-24 lg:py-32";
  return (
    <section id={id} className={`${padding} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  title: string;
  intro?: string;
  align?: "center" | "left";
};

export function SectionHeading({ title, intro, align = "center" }: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <h2 className="text-h2">{title}</h2>
      {intro && <p className="lead">{intro}</p>}
    </div>
  );
}
