// components/ui/CountUp.tsx
//
// Counts a stat value up the first time it scrolls into view.
//
// STATS values in lib/content.ts are display strings with suffixes ("42%",
// "2.1x"), so this animates the leading number and re-appends whatever
// follows, preserving the original decimal places.
//
// The real value is what renders on the server and in the initial client
// render, so there is no hydration mismatch and no-JS / reduced-motion
// visitors simply see the final number. The animation then drives
// textContent directly rather than React state - that keeps the per-frame
// updates out of the render cycle entirely.

"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const LEADING_NUMBER = /^(\d+(?:\.\d+)?)([\s\S]*)$/;

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  const match = LEADING_NUMBER.exec(value.trim());
  const target = match ? Number(match[1]) : null;
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const node = ref.current;
    if (!node || target === null || reduce) return;

    // Park at zero. This runs before the stat is scrolled to, so the reset
    // itself is never visible; without it the number would show its final
    // value and then snap back to 0 as the animation starts.
    node.textContent = `${(0).toFixed(decimals)}${suffix}`;
    if (!inView) return;

    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => {
      controls.stop();
      node.textContent = value;
    };
  }, [inView, target, decimals, suffix, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
