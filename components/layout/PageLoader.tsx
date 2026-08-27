"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/content";

// One-time intro animation shown on the visitor's first load of a session.
// Sits above everything else, then fades and unmounts so it never touches
// layout again. Skipped entirely on repeat navigations within the same tab
// (sessionStorage) and for anyone with prefers-reduced-motion set.
export function PageLoader() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "leaving">(
    "hidden"
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const seen = sessionStorage.getItem("soch-intro-seen");

    if (reduceMotion || seen) return;

    sessionStorage.setItem("soch-intro-seen", "1");
    // Mount-only reveal driven by browser-only checks (matchMedia /
    // sessionStorage) that can't run during SSR or in a lazy initializer
    // without a hydration mismatch.
    setPhase("visible"); // eslint-disable-line react-hooks/set-state-in-effect

    const leaveTimer = setTimeout(() => setPhase("leaving"), 1400);
    const doc = document.documentElement;
    doc.style.overflow = "hidden";
    const removeTimer = setTimeout(() => {
      setPhase("hidden");
      doc.style.overflow = "";
    }, 1900);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
      doc.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-cream transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        phase === "leaving" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex h-10 w-10 items-center justify-center">
          <span className="absolute inset-0 rotate-45 rounded-[6px] bg-brand [animation:loader-pulse_1.1s_var(--ease-out-soft)_infinite]" />
        </span>
        <span className="text-[1.05rem] font-medium tracking-[-0.012em] text-ink">
          {SITE.name}
        </span>
        <span className="h-px w-16 overflow-hidden rounded-full bg-line">
          <span className="block h-full w-full origin-left scale-x-0 bg-brand [animation:loader-fill_1.3s_var(--ease-out-soft)_forwards]" />
        </span>
      </div>
    </div>
  );
}
