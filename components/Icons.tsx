// components/Icons.tsx
//
// Bespoke line-icon set — no library, no emoji. Matches DESIGN.md §7:
// 24x24 viewBox, stroke-based, currentColor, strokeWidth 1.6 default,
// rounded caps/joins. Extend PATHS + IconName together when adding icons.

import type { ReactElement, SVGProps } from "react";

export type IconName =
  | "profile"
  | "pen"
  | "target"
  | "spark"
  | "compass"
  | "audit"
  | "trend"
  | "arrow"
  | "check"
  | "linkedin"
  | "menu"
  | "close"
  | "shield"
  | "clock"
  | "chat"
  | "chevron";

const PATHS: Record<IconName, ReactElement> = {
  profile: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </>
  ),
  pen: (
    <>
      <path d="M15.7 4.3l4 4L9 19l-4.5 1L5.5 15.5 15.7 4.3z" />
      <path d="M13.5 6.5l4 4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  spark: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.2 8.8l-2.1 4.6-4.6 2.1 2.1-4.6 4.6-2.1z" />
    </>
  ),
  audit: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" />
      <path d="M9 13l2 2 4-4.5" />
    </>
  ),
  trend: (
    <>
      <path d="M4 17l5-5 4 4 7-8.2" />
      <path d="M15.8 7.8H20v4.2" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="7.2" r="1" fill="currentColor" stroke="none" />
      <path d="M8 10.3V17" />
      <path d="M12.2 17v-4.2a2.3 2.3 0 014.6 0V17" />
      <path d="M12.2 10.3V17" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  shield: <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2v5l3.5 2" />
    </>
  ),
  chat: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="3" />
      <path d="M8.5 20l3-3.5" />
    </>
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
};

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  strokeWidth?: number;
};

export function Icon({ name, strokeWidth = 1.6, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
