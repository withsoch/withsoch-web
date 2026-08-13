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
  const [openSlug, setOpenSlug] = useState(SERVICES[0].slug);
  const activeService = SERVICES.find((service) => service.slug === openSlug) ?? SERVICES[0];

  return (
    <Section className="bg-mist">
      <SectionHeading
        title="Services that turn strategy into results"
        intro="Five areas where AI automation replaces manual work with systems that run on their own."
      />
      <div className="mt-4 flex justify-center">
        <Link href="/services" className="text-brand font-medium hover:underline">
          Explore all services
        </Link>
      </div>
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10">
        <div className="flex flex-col gap-4">
          {SERVICES.map((service) => {
            const isOpen = service.slug === openSlug;
            return (
              <div
                key={service.slug}
                className={`rounded-xl border bg-white transition-colors duration-300 ease-in-out ${
                  isOpen ? "border-brand/60" : "border-line hover:border-ink/20 hover:bg-mist/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenSlug(service.slug)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-peach text-brand">
                    <Icon name={service.icon} className="h-5.5 w-5.5" />
                  </span>
                  <span
                    className={`text-h3 text-[1.05rem] flex-1 transition-colors duration-300 ease-in-out ${
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
                      <div className="flex flex-col gap-4 px-6 pb-6 pl-[4.25rem]">
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
        <div className="relative rounded-2xl border border-line bg-white overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="relative flex h-full min-h-[26rem] flex-col items-center justify-center gap-4 p-8 text-center"
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
        </div>
      </div>
    </Section>
  );
}
