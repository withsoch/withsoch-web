"use client";

// components/sections/AutomationOperatingSystem.tsx
//
// Interactive tabbed / cascading-card rebuild of "How We Work" - restyled
// onto the light Soch design system (flat colors, no gradients/glow). Auto-
// cycles through the 3 STEPS from lib/content.ts, pauses on hover/focus,
// respects prefers-reduced-motion.

import { useEffect, useRef, useState } from "react";
import { STEPS } from "@/lib/content";
import { SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icons";

const CYCLE_MS = 4000;

export function AutomationOperatingSystem() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fillPct, setFillPct] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, CYCLE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reducedMotion, paused]);

  function selectStep(i: number) {
    setActive(i);
  }

  // The growth wedge's leading edge should stop exactly at the active
  // card's right edge - not a naive (active / total) percentage, since the
  // cards are clamped between min-w-[12rem] and max-w-[16rem] and don't
  // actually occupy their nominal 28% share at every viewport width.
  useEffect(() => {
    function measure() {
      const panel = panelRef.current;
      const card = cardRefs.current[active];
      if (!panel || !card) return;
      const panelRect = panel.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      if (panelRect.width === 0) return;
      const pct = ((cardRect.right - panelRect.left) / panelRect.width) * 100;
      setFillPct(pct);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const panelId = "automation-os-panel";

  return (
    <section className="bg-white pb-8 pt-8 sm:pb-10 sm:pt-10 lg:pb-12 lg:pt-12">
      <div className="mx-auto w-full max-w-[96rem] px-6 lg:px-10">
        <div
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
        {/* LEFT */}
        <div className="lg:pl-2 xl:pl-4">
          <SectionHeading
            title="The Soch Automation Operating System"
            intro="A clear, repeatable process for deploying AI automation in your business."
            align="left"
          />
          <div className="mt-7">
            <Button href="/services" variant="primary" size="lg" arrow>
              Explore our services
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* Below sm the cascading cards don't have room to breathe - fall
              back to a simple stacked list of the same tab-driven content. */}
          <div className="flex flex-col gap-3 sm:hidden" role="tablist" aria-label="Process steps">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <button
                  key={step.no}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectStep(i)}
                  className={[
                    "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors duration-200",
                    isActive ? "border-line bg-white" : "border-line/70 bg-mist",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      isActive ? "bg-peach" : "bg-white",
                    ].join(" ")}
                  >
                    <Icon name={step.icon} className={`h-4.5 w-4.5 ${isActive ? "text-brand" : "text-muted"}`} />
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {step.no} · {step.title}
                    </span>
                    <p className={`mt-1 text-sm leading-snug ${isActive ? "text-ink" : "text-muted"}`}>
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Spotlight panel - pill tabs float over a cascading trio of step
              cards, wired to a diagonal "growth" wedge along the base. */}
          <div
            ref={panelRef}
            className="relative isolate hidden h-[460px] overflow-hidden rounded-2xl border border-line bg-mist sm:block lg:h-[500px]"
          >
            {/* Dot-grid texture - same treatment as StatsNetworkIllustration / ServiceCardDiagrams */}
            <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />

            {/* Diagonal growth wedge along the base - the unfilled triangle is
                the full step count, the brand-filled triangle scales its
                width to (active step / total steps), animating as a progress
                indicator rather than a static decoration. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-line"
              style={{ clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)" }}
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-1/2 bg-brand transition-[width] duration-500"
              style={{
                width: `${fillPct}%`,
                clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)",
                transitionTimingFunction: "var(--ease-out-soft)",
              }}
            />

            {/* Pill tabs - the single tablist driving which card is emphasized */}
            <div
              className="absolute left-6 top-5 z-10 flex flex-wrap gap-2 sm:left-8 sm:top-6"
              role="tablist"
              aria-label="Process steps"
            >
              {STEPS.map((step, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={step.no}
                    id={`automation-os-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    onClick={() => selectStep(i)}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
                      isActive
                        ? "bg-peach text-brand-dark ring-1 ring-brand/30"
                        : "bg-white text-muted ring-1 ring-ink/15 hover:ring-ink/30",
                    ].join(" ")}
                  >
                    <span className="text-muted">{step.no}</span>
                    <span className="hidden sm:inline"> · {step.title}</span>
                  </button>
                );
              })}
            </div>

            <div id={panelId} role="tabpanel" aria-labelledby={`automation-os-tab-${active}`}>
              {STEPS.map((step, i) => {
                const isActive = i === active;
                // Cascade the cards diagonally, rising toward the top-right - // each step sits higher and further right than the last, with
                // enough stride between them that none overlap.
                const bottomPct = 8 + i * 24;
                const leftPct = 4 + i * 32;
                return (
                  <div key={step.no} aria-hidden={!isActive}>
                    {/* Dashed connector down to the wedge baseline */}
                    <div
                      aria-hidden="true"
                      className="absolute w-px border-l border-dashed transition-colors duration-300"
                      style={{
                        left: `${leftPct + 8}%`,
                        bottom: 0,
                        height: `${bottomPct}%`,
                        borderColor: isActive ? "rgba(255,92,53,0.45)" : "rgba(28,43,38,0.12)",
                      }}
                    />
                    <button
                      ref={(el) => {
                        cardRefs.current[i] = el;
                      }}
                      type="button"
                      onClick={() => selectStep(i)}
                      className={[
                        "absolute z-10 w-[28%] min-w-[12rem] max-w-[16rem] rounded-xl border p-5 text-left transition-all duration-300",
                        isActive
                          ? "border-line bg-white opacity-100 shadow-[0_8px_24px_rgba(16,49,41,0.08)]"
                          : "border-line/70 bg-white opacity-90 hover:opacity-100",
                      ].join(" ")}
                      style={{ left: `${leftPct}%`, bottom: `${bottomPct}%` }}
                    >
                      <span
                        className={[
                          "relative inline-flex h-11 w-11 items-center justify-center rounded-full",
                          isActive ? "bg-peach" : "bg-mist",
                        ].join(" ")}
                      >
                        <Icon
                          name={step.icon}
                          className={`h-5 w-5 ${isActive ? "text-brand" : "text-muted"}`}
                        />
                      </span>
                      <p
                        className={`mt-3 text-base leading-relaxed ${
                          isActive ? "font-semibold text-ink" : "text-muted"
                        }`}
                      >
                        {step.description}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
