// components/sections/ServiceProcessPanel.tsx
//
// Two-column layout for a service page's "who it's for / common symptoms /
// our approach / deliverables / outcomes" block: left-aligned accordion +
// a right-side visual panel that crossfades to match whichever accordion
// item is open. State lives here so both halves share a single source of
// truth. Visual paths are derived per-service from the slug, following the
// public/images/services/{slug}/state-{key}.png convention.

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Service } from "@/lib/content";
import {
  ServiceAccordion,
  type ServiceAccordionItemKey,
} from "@/components/sections/ServiceAccordion";

const VISUAL_META: Record<
  ServiceAccordionItemKey,
  { file: string; alt: string; label: string; caption: string }
> = {
  whoItsFor: {
    file: "state-who-its-for.png",
    alt: "Who it's for",
    label: "Who it's for",
    caption: "The teams and roles this service is built around.",
  },
  commonSymptoms: {
    file: "state-common-symptoms.png",
    alt: "Common symptoms",
    label: "Common symptoms",
    caption: "The everyday friction that tells you it's time to fix this.",
  },
  ourApproach: {
    file: "state-our-approach.png",
    alt: "Our approach",
    label: "Our approach",
    caption: "How we move from audit to a running system, step by step.",
  },
  deliverables: {
    file: "state-deliverables.png",
    alt: "Deliverables",
    label: "Deliverables",
    caption: "What lands in your hands when the build is done.",
  },
  outcomes: {
    file: "state-outcomes.png",
    alt: "Outcomes",
    label: "Outcomes",
    caption: "What changes for your team once it's live.",
  },
};

type ServiceProcessPanelProps = {
  service: Service;
};

export function ServiceProcessPanel({ service }: ServiceProcessPanelProps) {
  const [openKey, setOpenKey] = useState<ServiceAccordionItemKey | null>("whoItsFor");
  // Keep showing the last-opened section's visual even while every
  // accordion row is collapsed, instead of snapping back to "whoItsFor" —
  // closing a row should only close the row, not silently swap the image.
  const [lastKey, setLastKey] = useState<ServiceAccordionItemKey>("whoItsFor");
  const activeKey = openKey ?? lastKey;
  const meta = VISUAL_META[activeKey];
  const visual = {
    src: service.accordionImages?.[activeKey] ?? `/images/services/${service.slug}/${meta.file}`,
    alt: meta.alt,
  };

  const handleOpenKeyChange = (key: ServiceAccordionItemKey | null) => {
    setOpenKey(key);
    if (key) setLastKey(key);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
      <ServiceAccordion service={service} openKey={openKey} onOpenKeyChange={handleOpenKeyChange} />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-card lg:sticky lg:top-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Top content strip */}
            <div className="flex items-center justify-between gap-4 border-b border-line bg-mist px-6 py-4">
              <span className="text-sm font-semibold text-ink">{meta.label}</span>
              <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold tracking-wide text-brand">
                {String(
                  Object.keys(VISUAL_META).indexOf(activeKey) + 1
                ).padStart(2, "0")}
              </span>
            </div>

            {/* placeholder — real asset pending */}
            <Image
              src={visual.src}
              alt={visual.alt}
              width={720}
              height={620}
              className="h-auto w-full min-h-[22rem] object-cover"
            />

            {/* Bottom content strip */}
            <div className="border-t border-line bg-mist px-6 py-4">
              <p className="text-sm text-slate">{meta.caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
