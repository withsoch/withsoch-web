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

const VISUAL_META: Record<ServiceAccordionItemKey, { file: string; alt: string }> = {
  whoItsFor: { file: "state-who-its-for.png", alt: "Who it's for" },
  commonSymptoms: { file: "state-common-symptoms.png", alt: "Common symptoms" },
  ourApproach: { file: "state-our-approach.png", alt: "Our approach" },
  deliverables: { file: "state-deliverables.png", alt: "Deliverables" },
  outcomes: { file: "state-outcomes.png", alt: "Outcomes" },
};

type ServiceProcessPanelProps = {
  service: Service;
};

export function ServiceProcessPanel({ service }: ServiceProcessPanelProps) {
  const [openKey, setOpenKey] = useState<ServiceAccordionItemKey>("whoItsFor");
  const activeKey: ServiceAccordionItemKey = openKey || "whoItsFor";
  const meta = VISUAL_META[activeKey];
  const visual = { src: `/images/services/${service.slug}/${meta.file}`, alt: meta.alt };

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
      <ServiceAccordion service={service} openKey={openKey} onOpenKeyChange={setOpenKey} />
      <div className="rounded-2xl border border-line bg-white p-4 lg:sticky lg:top-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* placeholder — real asset pending */}
            <Image
              src={visual.src}
              alt={visual.alt}
              width={640}
              height={520}
              className="h-auto w-full rounded-xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
