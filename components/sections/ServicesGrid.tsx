// components/sections/ServicesGrid.tsx
//
// Accordion + paired diagram panel for the homepage's "Services that turn
// strategy into results" section. One row open at a time; the right-side
// panel crossfades to the bespoke SVG diagram (ServiceCardDiagrams.tsx) for
// whichever service is open. Mirrors the accordion/visual-panel pattern
// established in VisionMissionAccordion and ServiceProcessPanel.

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icons";
import { SERVICE_DIAGRAMS } from "@/components/sections/ServiceCardDiagrams";
import { SERVICE_HOME_IMAGES } from "@/components/sections/ServiceTabImages";
import { DiagramFrame } from "@/components/ui/DiagramFrame";

export function ServicesGrid() {
  // openSlug: which row is expanded (null = all collapsed). activeSlug: which
  // diagram the right panel shows - it stays on the last-opened service even
  // after that row is collapsed again, so the panel never goes blank.
  const [openSlug, setOpenSlug] = useState<string | null>(SERVICES[0].slug);
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);
  const activeService = SERVICES.find((service) => service.slug === activeSlug) ?? SERVICES[0];
  const homeImage = SERVICE_HOME_IMAGES[activeService.slug];

  function toggleService(slug: string) {
    setOpenSlug((prev) => (prev === slug ? null : slug));
    setActiveSlug(slug);
  }

  return (
    <Section className="bg-white">
      <Reveal className="flex flex-wrap items-center justify-between gap-4">
        <SectionHeading
          align="left"
          maxWidthClassName="max-w-xl"
          title="Services that turn strategy into results"
          intro="Five areas where AI automation replaces manual work with systems that run on their own."
        />
        <Link
          href="/services"
          className="inline-flex shrink-0 items-center rounded-full border border-ink/15 bg-white px-6 py-3 text-base font-semibold text-ink shadow-soft transition-colors hover:border-brand hover:text-brand"
        >
          See all services
        </Link>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-start">
        <div className="flex flex-col gap-3">
          {SERVICES.map((service) => {
            const isOpen = service.slug === openSlug;
            return (
              <div
                key={service.slug}
                // White rows on a white surface, so the separation is carried
                // by a hairline plus shadow-soft rather than by a tint. Open
                // row takes the brand border - the section's one loud accent.
                className={`rounded-[28px] border bg-white transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "border-brand/60 shadow-card"
                    : "border-line shadow-soft hover:border-brand/30 hover:shadow-card"
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
        {/* No bg-peach/50 wrapper here: DiagramFrame already supplies its own
            white bordered surface, and peach-on-cream-on-mist was three warm
            neutrals stacked. The panel is sticky and unsized rather than
            stretched to the accordion's height, which is what used to leave
            ~200px of empty peach above and below the diagram. */}
        <div className="relative aspect-[4/3] lg:sticky lg:top-28">
          <DiagramFrame
            eyebrow={homeImage ? undefined : `Service / ${activeService.title}`}
            caption={homeImage ? undefined : activeService.hook}
            bleed={!!homeImage}
          >
            <AnimatePresence mode="wait">
              {homeImage ? (
                // Full-bleed real diagram/photo from the live withsoch.com
                // build - object-contain so it never crops, cream fill
                // behind it for any letterboxing.
                <motion.div
                  key={activeService.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="relative h-full w-full bg-cream"
                >
                  <Image
                    src={homeImage}
                    alt={`${activeService.title} - ${activeService.hook}`}
                    fill
                    sizes="(min-width: 1024px) 620px, 90vw"
                    className="object-contain"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={activeService.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="flex w-full flex-col items-center justify-center gap-4"
                >
                  <span className="w-full max-w-xs sm:max-w-sm">
                    {(() => {
                      const Diagram = SERVICE_DIAGRAMS[activeService.slug];
                      return Diagram ? <Diagram /> : <Icon name={activeService.icon} className="h-16 w-16 text-brand" />;
                    })()}
                  </span>
                  <span className="text-h3 text-[1.05rem] text-ink">{activeService.title}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </DiagramFrame>
        </div>
      </div>
    </Section>
  );
}
