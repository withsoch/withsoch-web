"use client";

// components/sections/AutomationOperatingSystem.tsx
//
// Interactive tabbed / cascading-card rebuild of "How We Work" — restyled
// onto the light Soch design system (flat colors, no gradients/glow). Auto-
// cycles through the 3 STEPS from lib/content.ts, pauses on hover/focus,
// respects prefers-reduced-motion.

import { useEffect, useRef, useState } from "react";
import { STEPS } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
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

  return (
    <Section className="bg-white">
      <div
        className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
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
          <div className="mt-8">
            <Button href="/services" variant="primary" size="lg" arrow>
              Explore our services
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* Pill tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Process steps">
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
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
                    isActive
                      ? "bg-peach text-brand-dark ring-1 ring-brand/30"
                      : "bg-white text-muted ring-1 ring-ink/15 hover:ring-ink/30",
                  ].join(" ")}
                >
                  Step {i + 1}
                </button>
              );
            })}
          </div>

          {/* Spotlight panel — one card, content swaps per active step */}
          <div className="relative mt-8 min-h-[280px] overflow-hidden rounded-2xl bg-mist px-8 py-10 sm:px-10 sm:py-12">
            {/* Decorative watermark numeral — the only absolutely-positioned element, purely cosmetic */}
            <span
              key={`watermark-${active}`}
              aria-hidden="true"
              className="pointer-events-none absolute top-4 right-6 select-none font-display text-[120px] leading-none text-ink opacity-5 animate-step-fade"
            >
              {STEPS[active].no}
            </span>

            <div key={active} className="relative animate-step-fade">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-peach">
                <Icon name={STEPS[active].icon} className="h-8 w-8 text-brand" />
              </span>
              <p className="mt-6 max-w-md font-display text-xl leading-relaxed text-ink md:text-2xl">
                {STEPS[active].description}
              </p>
            </div>
          </div>

          {/* Progress row */}
          <div className="mt-6 flex items-center gap-4" role="tablist" aria-label="Process steps">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <div key={step.no} className="flex flex-1 items-center gap-4 last:flex-initial">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Step ${i + 1}: ${step.title}`}
                    onClick={() => selectStep(i)}
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200",
                      isActive
                        ? "bg-brand text-white"
                        : "text-muted ring-1 ring-ink/20 hover:ring-ink/40",
                    ].join(" ")}
                  >
                    {i + 1}
                  </button>
                  {i < STEPS.length - 1 && <div className="h-px flex-1 bg-line" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
