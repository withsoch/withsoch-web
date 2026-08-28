// components/sections/ServiceProcessPanel.tsx
//
// Two-column layout for a service page's "who it's for / common symptoms /
// our approach / deliverables / outcomes" block: left-aligned accordion +
// a right-side visual panel that crossfades to match whichever accordion
// item is open. State lives here so both halves share a single source of
// truth. The visual panel reuses the same DiagramFrame (cream/dot-grid,
// corner brackets, eyebrow + caption strip) and the same per-service SVG
// diagram as the homepage ServicesGrid panel - only the caption changes
// per accordion tab.

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Service } from "@/lib/content";
import {
  ServiceAccordion,
  type ServiceAccordionItemKey,
} from "@/components/sections/ServiceAccordion";
import { DiagramFrame } from "@/components/ui/DiagramFrame";
import { Icon } from "@/components/Icons";
import { SERVICE_DIAGRAMS } from "@/components/sections/ServiceCardDiagrams";
import { SERVICE_TAB_IMAGES } from "@/components/sections/ServiceTabImages";

const CAPTIONS: Record<ServiceAccordionItemKey, string> = {
  whoItsFor: "The teams and roles this service is built around.",
  commonSymptoms: "The everyday friction that tells you it's time to fix this.",
  ourApproach: "How we move from audit to a running system, step by step.",
  deliverables: "What lands in your hands when the build is done.",
  outcomes: "What changes for your team once it's live.",
};

type ServiceProcessPanelProps = {
  service: Service;
};

export function ServiceProcessPanel({ service }: ServiceProcessPanelProps) {
  const [openKey, setOpenKey] = useState<ServiceAccordionItemKey | null>("whoItsFor");
  // Keep showing the last-opened section's caption even while every
  // accordion row is collapsed, instead of snapping back to "whoItsFor" - // closing a row should only close the row, not silently swap the panel.
  const [lastKey, setLastKey] = useState<ServiceAccordionItemKey>("whoItsFor");
  const activeKey = openKey ?? lastKey;
  const caption = CAPTIONS[activeKey];
  const Diagram = SERVICE_DIAGRAMS[service.slug];
  // Real per-tab imagery (from the live withsoch.com build) takes priority
  // over the generic SVG diagram when a service defines one for this key.
  const tabImage = SERVICE_TAB_IMAGES[service.slug]?.[activeKey];
  // Decided once per service (not per active tab) so the columns don't
  // jump width when switching between accordion rows.
  const hasTabImages = Boolean(SERVICE_TAB_IMAGES[service.slug]);

  const handleOpenKeyChange = (key: ServiceAccordionItemKey | null) => {
    setOpenKey(key);
    if (key) setLastKey(key);
  };

  return (
    <div
      className={`grid grid-cols-1 items-stretch gap-8 lg:gap-10 ${
        // The source photography is landscape (752x501) - give the visual
        // panel more of the row's width on services that use real images
        // so object-contain has less letterboxing to fit it without
        // cropping any content.
        hasTabImages ? "lg:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[1.05fr_0.95fr]"
      }`}
    >
      <ServiceAccordion service={service} openKey={openKey} onOpenKeyChange={handleOpenKeyChange} />
      {tabImage ? (
        // One border only: the peach ring, with padding so the image sits
        // inset from the edge instead of glued to it. No second white
        // DiagramFrame border on top - that was the triple-border stack.
        // The image keeps its own smaller rounded corners inside the peach
        // padding, cropped edge-to-edge within that inner box via
        // object-cover.
        <div className="relative h-full w-full rounded-[28px] bg-peach/50 p-3 lg:sticky lg:top-24">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src={tabImage}
                alt={`${service.title} - ${caption}`}
                fill
                sizes="(min-width: 1024px) 720px, 90vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      ) : (
        <div className="relative h-full w-full rounded-[28px] bg-peach/50 p-3 lg:sticky lg:top-24">
          <DiagramFrame eyebrow={`Service / ${service.title}`} caption={caption}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex w-full flex-1 flex-col items-center justify-center gap-4"
              >
                <span className="w-full max-w-xs sm:max-w-sm">
                  {Diagram ? <Diagram /> : <Icon name={service.icon} className="h-16 w-16 text-brand" />}
                </span>
                <span className="text-h3 text-[1.05rem] text-ink">{service.title}</span>
              </motion.div>
            </AnimatePresence>
          </DiagramFrame>
        </div>
      )}
    </div>
  );
}
