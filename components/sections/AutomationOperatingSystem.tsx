"use client";

// components/sections/AutomationOperatingSystem.tsx
//
// Interactive tabbed / cascading-card rebuild of "How We Work" — restyled
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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const panelId = "automation-os-panel";

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <div
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
        {/* LEFT */}
        <div>
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
          {/* Spotlight panel — pill tabs folded in as a header strip, content swaps below */}
          <div className="relative overflow-hidden rounded-2xl bg-mist">
            {/* Pill tabs — the single tablist controlling the panel below */}
            <div
              className="relative flex flex-wrap gap-2 border-b border-line px-6 pt-5 pb-4"
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

            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={`automation-os-tab-${active}`}
              className="relative px-6 py-7 sm:px-8 sm:py-8"
            >
              {/* Dot-grid texture — same treatment as StatsNetworkIllustration / ServiceCardDiagrams */}
              <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />

              {/* Decorative watermark numeral — outline-only so it reads as a layer
                  behind the icon/text instead of a flat competing shape. The only
                  absolutely-positioned element, purely cosmetic. */}
              <span
                key={`watermark-${active}`}
                aria-hidden="true"
                className="pointer-events-none absolute right-6 bottom-4 select-none font-display text-[92px] leading-none animate-step-fade"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--color-ink)",
                  opacity: 0.14,
                }}
              >
                {STEPS[active].no}
              </span>

              <div key={active} className="relative animate-step-fade">
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-peach">
                  {/* Emphasis ring — same treatment as the hub node in StatsNetworkIllustration */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-2 rounded-full border"
                    style={{ borderColor: "#ff5c35", opacity: 0.35 }}
                  />
                  <Icon name={STEPS[active].icon} className="h-7 w-7 text-brand" />
                </span>
                <h3 className="text-h3 mt-5 text-ink">{STEPS[active].title}</h3>
                <p className="lead mt-2.5 max-w-md">{STEPS[active].description}</p>
              </div>
            </div>
          </div>

          {/* Progress row */}
          <div className="mt-5 flex items-center gap-4">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              // Lines before the active step are already complete (snap full);
              // the line right after the active dot fills progressively in
              // sync with the auto-cycle timer as that step "becomes active"
              // for the next one; lines further ahead stay empty.
              const isComplete = i < active;
              const isFilling = i === active;
              return (
                <div key={step.no} className="flex flex-1 items-center gap-4 last:flex-initial">
                  <button
                    type="button"
                    aria-label={`Go to step ${i + 1}: ${step.title}`}
                    onClick={() => selectStep(i)}
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200",
                      isActive
                        ? "bg-brand text-white"
                        : "text-muted ring-1 ring-ink/20 hover:ring-ink/40",
                    ].join(" ")}
                  >
                    {i + 1}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="relative h-px flex-1 bg-line">
                      <div
                        className="absolute inset-y-0 left-0 bg-brand"
                        style={{
                          width: isComplete ? "100%" : "0%",
                        }}
                      />
                      {isFilling && (
                        <div
                          key={`filling-${active}-${i}`}
                          className="absolute inset-y-0 left-0 origin-left bg-brand"
                          style={{
                            width: "100%",
                            animation:
                              !reducedMotion ? `progress-fill ${CYCLE_MS}ms linear forwards` : "none",
                            animationPlayState: paused ? "paused" : "running",
                            transform: reducedMotion ? "scaleX(0)" : undefined,
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
