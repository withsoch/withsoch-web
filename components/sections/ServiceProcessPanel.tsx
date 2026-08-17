// components/sections/ServiceProcessPanel.tsx
//
// Two-column layout for a service page's "who it's for / common symptoms /
// our approach / deliverables / outcomes" block: left-aligned accordion +
// a right-side visual panel that crossfades to match whichever accordion
// item is open. State lives here so both halves share a single source of
// truth. The visual panel reuses the same DiagramFrame (cream/dot-grid,
// corner brackets, eyebrow + caption strip) and the same per-service SVG
// diagram as the homepage ServicesGrid panel — only the caption changes
// per accordion tab.

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Service } from "@/lib/content";
import {
  ServiceAccordion,
  type ServiceAccordionItemKey,
} from "@/components/sections/ServiceAccordion";
import { DiagramFrame } from "@/components/ui/DiagramFrame";
import { Icon } from "@/components/Icons";
import { SERVICE_DIAGRAMS } from "@/components/sections/ServiceCardDiagrams";

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
  // accordion row is collapsed, instead of snapping back to "whoItsFor" —
  // closing a row should only close the row, not silently swap the panel.
  const [lastKey, setLastKey] = useState<ServiceAccordionItemKey>("whoItsFor");
  const activeKey = openKey ?? lastKey;
  const caption = CAPTIONS[activeKey];
  const Diagram = SERVICE_DIAGRAMS[service.slug];

  const handleOpenKeyChange = (key: ServiceAccordionItemKey | null) => {
    setOpenKey(key);
    if (key) setLastKey(key);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
      <ServiceAccordion service={service} openKey={openKey} onOpenKeyChange={handleOpenKeyChange} />
      <div className="relative h-full min-h-[420px] sm:min-h-[460px] rounded-[28px] bg-peach/50 p-3 lg:sticky lg:top-24">
        <DiagramFrame eyebrow={`Service / ${service.title}`} caption={caption}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-col items-center justify-center gap-4"
            >
              <span className="w-full max-w-xs sm:max-w-sm">
                {Diagram ? <Diagram /> : <Icon name={service.icon} className="h-16 w-16 text-brand" />}
              </span>
              <span className="text-h3 text-[1.05rem] text-ink">{service.title}</span>
            </motion.div>
          </AnimatePresence>
        </DiagramFrame>
      </div>
    </div>
  );
}
