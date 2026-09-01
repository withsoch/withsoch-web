// lib/utils.ts
//
// Minimal shadcn-style `cn` helper - merges conditional classNames and
// resolves conflicting Tailwind utilities (e.g. two different `bg-*`
// classes) in favor of the last one. Added specifically to support
// components authored against the shadcn/ui convention (components/ui/*
// importing `cn` from "@/lib/utils"); this project has no other shadcn
// scaffolding (no components.json, no shadcn color tokens) - see the note
// in components/ui/marquee-logo-scroller.tsx.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
