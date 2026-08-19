// components/Icons.tsx
//
// Bespoke line-icon set - no library, no emoji. Matches DESIGN.md §7:
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
  | "chevron"
  | "instagram"
  | "facebook"
  | "youtube"
  | "plus"
  | "minus"
  | "mail"
  | "phone"
  | "pin"
  | "pinwheel"
  | "clover"
  | "burst";

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
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M14 21v-7h2.3l.4-3H14V9.2c0-.9.3-1.5 1.6-1.5H17V5.1C16.6 5 15.7 5 14.7 5c-2.1 0-3.6 1.3-3.6 3.7V11H9v3h2.1v7z" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="3.5" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 6.5l8 6.5 8-6.5" />
    </>
  ),
  phone: (
    <path d="M5.5 4h3l1.4 4.4-2 1.6a12.3 12.3 0 005.6 5.6l1.6-2 4.4 1.4v3a1.5 1.5 0 01-1.6 1.5A16 16 0 014 5.6 1.5 1.5 0 015.5 4z" />
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-10.8A6.5 6.5 0 0112 3.7a6.5 6.5 0 016.5 6.5C18.5 15.4 12 21 12 21z" />
      <circle cx="12" cy="10.2" r="2.2" />
    </>
  ),
  // Four curved swirling petals, like a pinwheel.
  pinwheel: (
    <>
      <path
        d="M12 12C12 8.2 9 5.2 5.2 5.2c0 3.8 3 6.8 6.8 6.8z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M12 12C15.8 12 18.8 9 18.8 5.2 15 5.2 12 8.2 12 12z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M12 12c0 3.8 3 6.8 6.8 6.8 0-3.8-3-6.8-6.8-6.8z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M12 12c-3.8 0-6.8 3-6.8 6.8 3.8 0 6.8-3 6.8-6.8z"
        fill="currentColor"
        stroke="none"
      />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  // Four rounded petals forming a clover, plus thin radiating lines.
  clover: (
    <>
      <path d="M4 12h4M16 12h4M12 4v4M12 16v4" />
      <path d="M6.5 6.5l2.6 2.6M14.9 14.9l2.6 2.6M17.5 6.5l-2.6 2.6M9.1 14.9l-2.6 2.6" />
      <ellipse cx="12" cy="9" rx="2.1" ry="3" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="15" rx="2.1" ry="3" fill="currentColor" stroke="none" />
      <ellipse cx="9" cy="12" rx="3" ry="2.1" fill="currentColor" stroke="none" />
      <ellipse cx="15" cy="12" rx="3" ry="2.1" fill="currentColor" stroke="none" />
    </>
  ),
  // Spiky starburst with thin radiating lines, like a sparkler.
  burst: (
    <>
      <path d="M12 2v5M12 17v5M2 12h5M17 12h5M4.6 4.6l3.5 3.5M15.9 15.9l3.5 3.5M19.4 4.6l-3.5 3.5M8.1 15.9l-3.5 3.5" />
      <path
        d="M12 8.6c0 1.9 1.5 3.4 3.4 3.4-1.9 0-3.4 1.5-3.4 3.4 0-1.9-1.5-3.4-3.4-3.4 1.9 0 3.4-1.5 3.4-3.4z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
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
