// components/sections/ServicesGrid.tsx
//
// Accordion + paired diagram panel for the homepage's "Services that turn
// strategy into results" section. One row open at a time; the right-side
// panel crossfades to the bespoke SVG diagram (ServiceCardDiagrams.tsx) for
// whichever service is open. Mirrors the accordion/visual-panel pattern
// established in VisionMissionAccordion and ServiceProcessPanel.

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";
import { SERVICE_DIAGRAMS } from "@/components/sections/ServiceCardDiagrams";

export function ServicesGrid() {
  // openSlug: which row is expanded (null = all collapsed). activeSlug: which
  // diagram the right panel shows — it stays on the last-opened service even
  // after that row is collapsed again, so the panel never goes blank.
  const [openSlug, setOpenSlug] = useState<string | null>(SERVICES[0].slug);
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);
  const activeService = SERVICES.find((service) => service.slug === activeSlug) ?? SERVICES[0];

  function toggleService(slug: string) {
    setOpenSlug((prev) => (prev === slug ? null : slug));
    setActiveSlug(slug);
  }

  return (
    <Section className="bg-mist">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          align="left"
          maxWidthClassName="max-w-xl"
          title="Services that turn strategy into results"
          intro="Five areas where AI automation replaces manual work with systems that run on their own."
        />
        <Link
          href="/services"
          className="inline-flex shrink-0 items-center rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/35"
        >
          See all services
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-stretch">
        <div className="flex h-full flex-col gap-3">
          {SERVICES.map((service) => {
            const isOpen = service.slug === openSlug;
            return (
              <div
                key={service.slug}
                className={`rounded-[28px] border bg-white transition-colors duration-300 ease-in-out ${
                  isOpen ? "border-brand/60" : "border-line hover:border-ink/20 hover:bg-mist/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleService(service.slug)}
                  className="flex w-full items-center gap-4 px-6 py-4.5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-peach text-brand">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </span>
                  <span
                    className={`text-h3 text-[1.02rem] flex-1 transition-colors duration-300 ease-in-out ${
                      isOpen ? "text-brand" : "text-ink"
                    }`}
                  >
                    {service.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="shrink-0"
                  >
                    <Icon name="arrow" className={`h-5 w-5 ${isOpen ? "text-brand" : "text-muted"}`} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="flex flex-col gap-4 px-6 pb-5 pl-[4rem]">
                        <p className="text-slate">{service.description}</p>
                        <ul className="flex flex-wrap gap-2">
                          {service.points.map((point) => (
                            <li
                              key={point}
                              className="rounded-full bg-peach px-3.5 py-1.5 text-sm font-medium text-brand"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className="relative h-full min-h-[420px] sm:min-h-[460px] rounded-[28px] bg-peach/50 p-3">
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
            <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />
            {/* corner-bracket frame, matching reference layout */}
            <span aria-hidden="true" className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-ink/30" />
            <span aria-hidden="true" className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-ink/30" />
            <span aria-hidden="true" className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-ink/30" />
            <span aria-hidden="true" className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-ink/30" />

            {/* top strip: category / service label — mirrors the bottom caption strip */}
            <div className="relative z-10 px-8 pt-6 text-left text-xs font-semibold uppercase tracking-wide text-muted">
              Service / {activeService.title}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center"
              >
                <span className="w-full max-w-xs sm:max-w-sm">
                  {(() => {
                    const Diagram = SERVICE_DIAGRAMS[activeService.slug];
                    return Diagram ? <Diagram /> : <Icon name={activeService.icon} className="h-16 w-16 text-brand" />;
                  })()}
                </span>
                <span className="text-h3 text-[1.05rem] text-ink">{activeService.title}</span>
              </motion.div>
            </AnimatePresence>

            {/* bottom strip: hook line — equal weight/position to the top strip */}
            <div className="relative z-10 px-8 pb-6 text-center text-xs text-muted">{activeService.hook}</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
