// components/ui/Button.tsx
//
// Flat, square-ish, no gradients/glow. Renders a <Link> when href is set,
// a plain <a target="_blank"> when href + external are set, else a
// <button>. Matches DESIGN.md §6 exactly.

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icons";

type Variant = "primary" | "secondary" | "dark" | "light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "bg-white text-ink ring-1 ring-ink/20 hover:ring-ink/45",
  dark: "bg-ink text-white hover:bg-ink-soft",
  light: "bg-transparent text-white ring-1 ring-white/45 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-6 py-3 text-base",
};

type ButtonProps = {
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  href,
  external = false,
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = [
    "group inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200",
    disabled ? "pointer-events-none opacity-50" : "",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");

  const content = (
    <>
      {children}
      {arrow && (
        <Icon
          name="arrow"
          className="h-[1.05em] w-[1.05em] transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
