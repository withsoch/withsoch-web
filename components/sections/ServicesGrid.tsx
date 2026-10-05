// components/sections/ServicesGrid.tsx
//
// Accordion + paired diagram panel for the homepage's "Services that turn
// strategy into results" section. One row open at a time; the right-side
// panel crossfades to the bespoke SVG diagram (ServiceCardDiagrams.tsx) for
// whichever service is open. Mirrors the accordion/visual-panel pattern
// established in VisionMissionAccordion and ServiceProcessPanel.
//
// Below lg the grid is one column, so a separate panel would sit under all
// five rows - off-screen from the row just tapped. There the visual renders
// inside the open row instead, and the opened row is scrolled into view if
// collapsing the previous one pushed it out.

"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icons";
import { SERVICE_DIAGRAMS } from "@/components/sections/ServiceCardDiagrams";
import { DiagramFrame } from "@/components/ui/DiagramFrame";
import { AgentDevHero } from "@/components/diagrams/AgentDevHero";
import { OpsHero } from "@/components/diagrams/OpsHero";
import { SupportHero } from "@/components/diagrams/SupportHero";
import { MarketingHero } from "@/components/diagrams/MarketingHero";
import { RevOpsHero } from "@/components/diagrams/RevOpsHero";
import { getHeroAspectRatio } from "@/lib/heroAspectRatio";

// Matches Tailwind's lg breakpoint. The server snapshot is "desktop", so the
// server render (and desktop hydration) is exactly the side-panel layout.
const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => true,
  );
}

export function ServicesGrid() {
  // openSlug: which row is expanded (null = all collapsed). activeSlug: which
  // diagram the right panel shows - it stays on the last-opened service even
  // after that row is collapsed again, so the panel never goes blank.
  const [openSlug, setOpenSlug] = useState<string | null>(SERVICES[0].slug);
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);
  const activeService = SERVICES.find((service) => service.slug === activeSlug) ?? SERVICES[0];
  const isDesktop = useIsDesktop();
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Set when a row is opened on mobile; consumed once its expand animation
  // (and the previous row's collapse, same duration) has finished.
  const pendingReveal = useRef<string | null>(null);

  function toggleService(slug: string) {
    if (!isDesktop && openSlug !== slug) pendingReveal.current = slug;
    setOpenSlug((prev) => (prev === slug ? null : slug));
    setActiveSlug(slug);
  }

  // Make sure the opened row's title and visual are on screen below the sticky
  // header. If they already are, nothing moves; otherwise the row's top is
  // brought to just under the header (collapsing the previous row above it can
  // push it off the top, or the visual can open below the fold).
  function revealRow(slug: string) {
    const row = rowRefs.current[slug];
    if (!row) return;
    const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
    const rect = row.getBoundingClientRect();
    const visualBottom = (row.querySelector("[data-row-visual]") ?? row).getBoundingClientRect().bottom;
    if (rect.top >= headerBottom && visualBottom <= window.innerHeight) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: window.scrollY + rect.top - headerBottom - 12,
      behavior: reduce ? "auto" : "smooth",
    });
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
          className="inline-flex shrink-0 items-center rounded-full border border-ink/15 bg-white px-6 py-3 text-16 font-semibold text-ink shadow-soft transition-colors hover:border-brand hover:text-brand"
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
                ref={(el) => {
                  rowRefs.current[service.slug] = el;
                }}
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
                    className={`text-h4 text-16 flex-1 transition-colors duration-300 ease-in-out ${
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
                      onAnimationComplete={() => {
                        if (pendingReveal.current !== service.slug) return;
                        pendingReveal.current = null;
                        revealRow(service.slug);
                      }}
                    >
                      {/* Mobile visual first, directly under the tapped title:
                          after the description + chips (8-10 lines in this
                          indented column) it started ~500px down the row and
                          landed below the fold anyway. Capped from sm so a
                          tablet-width square stays shorter than the screen. */}
                      {!isDesktop && (
                        <div className="px-4 pb-5">
                          <div
                            data-row-visual
                            className={`relative mx-auto w-full sm:max-w-[28rem] ${getHeroAspectRatio(service.slug) ?? "aspect-square"}`}
                          >
                            <ServiceVisual service={service} />
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col gap-4 px-6 pb-5 pl-[4rem]">
                        <p className="text-slate">{service.description}</p>
                        <ul className="flex flex-wrap gap-2">
                          {service.points.map((point) => (
                            <li
                              key={point}
                              className="rounded-full bg-peach px-3.5 py-1.5 text-16 font-medium text-brand"
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
            ~200px of empty peach above and below the diagram.
            Desktop only - below lg the visual lives inside the open row.
            `hidden lg:block` keeps it out of view on mobile before
            hydration too, when isDesktop still reports the server default. */}
        {isDesktop && (
          <div className={`relative hidden lg:block ${getHeroAspectRatio(activeService.slug) ?? "aspect-square"} lg:sticky lg:top-28`}>
            <ServiceVisual service={activeService} />
          </div>
        )}
      </div>
    </Section>
  );
}

// The service's diagram/photo in its DiagramFrame. Rendered in exactly one
// place at a time - the sticky side panel from lg, or inside the open
// accordion row below lg (see ServicesGrid) - never both: the coded diagrams
// use fixed SVG pattern ids, and a second, display:none copy earlier in the
// DOM would break the visible copy's pattern fill.
function ServiceVisual({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <DiagramFrame
      eyebrow={
        service.heroImage ||
        service.slug === "ai-agent-development" ||
        service.slug === "operations-process-automation" ||
        service.slug === "customer-support-automation" ||
        service.slug === "marketing-automation" ||
        service.slug === "revops-automation"
          ? undefined
          : `Service / ${service.title}`
      }
      caption={
        service.heroImage ||
        service.slug === "ai-agent-development" ||
        service.slug === "operations-process-automation" ||
        service.slug === "customer-support-automation" ||
        service.slug === "marketing-automation" ||
        service.slug === "revops-automation"
          ? undefined
          : service.hook
      }
      bleed={
        !!service.heroImage ||
        service.slug === "ai-agent-development" ||
        service.slug === "operations-process-automation" ||
        service.slug === "customer-support-automation" ||
        service.slug === "marketing-automation" ||
        service.slug === "revops-automation"
      }
    >
      <AnimatePresence mode="wait">
        {service.slug === "ai-agent-development" ? (
          // Proof-of-concept coded replacement for the baked hero PNG -
          // scoped to this one service only. See AgentDevHero.tsx.
          <motion.div
            key={service.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative h-full w-full min-h-0 min-w-0 bg-cream p-4"
          >
            <AgentDevHero />
          </motion.div>
        ) : service.slug === "operations-process-automation" ? (
          // Coded replacement for the baked hero PNG - scoped to
          // this one service only. See OpsHero.tsx.
          <motion.div
            key={service.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative h-full w-full min-h-0 min-w-0 bg-cream p-4"
          >
            <OpsHero />
          </motion.div>
        ) : service.slug === "customer-support-automation" ? (
          // Coded replacement for the baked hero PNG - scoped to
          // this one service only. See SupportHero.tsx.
          <motion.div
            key={service.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative h-full w-full min-h-0 min-w-0 bg-cream p-4"
          >
            <SupportHero />
          </motion.div>
        ) : service.slug === "marketing-automation" ? (
          // Coded replacement for the baked hero PNG - scoped to
          // this one service only. See MarketingHero.tsx.
          <motion.div
            key={service.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative h-full w-full min-h-0 min-w-0 bg-cream p-4"
          >
            <MarketingHero />
          </motion.div>
        ) : service.slug === "revops-automation" ? (
          // Coded replacement for the baked hero PNG - scoped to
          // this one service only. See RevOpsHero.tsx.
          <motion.div
            key={service.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative h-full w-full min-h-0 min-w-0 bg-cream p-4"
          >
            <RevOpsHero />
          </motion.div>
        ) : service.heroImage ? (
          // Full-bleed real diagram/photo from the live withsoch.com
          // build - object-contain so it never crops, cream fill
          // behind it for any letterboxing.
          <motion.div
            key={service.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative h-full w-full bg-cream"
          >
            <Image
              src={service.heroImage}
              alt={`${service.title} - ${service.hook}`}
              fill
              sizes="(min-width: 1024px) 620px, 90vw"
              className="object-contain"
            />
          </motion.div>
        ) : (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex w-full flex-col items-center justify-center gap-4"
          >
            <span className="w-full max-w-xs sm:max-w-sm">
              {(() => {
                const Diagram = SERVICE_DIAGRAMS[service.slug];
                return Diagram ? <Diagram /> : <Icon name={service.icon} className="h-16 w-16 text-brand" />;
              })()}
            </span>
            <span className="text-h4 text-18 text-ink">{service.title}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </DiagramFrame>
  );
}
