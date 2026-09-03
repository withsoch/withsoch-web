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
import { WhoItsForCards } from "@/components/sections/WhoItsForCards";
import { AgentDevWhoItsFor } from "@/components/diagrams/AgentDevWhoItsFor";
import { AgentDevCommonSymptoms } from "@/components/diagrams/AgentDevCommonSymptoms";
import { AgentDevOurApproach } from "@/components/diagrams/AgentDevOurApproach";
import { AgentDevDeliverables } from "@/components/diagrams/AgentDevDeliverables";
import { AgentDevOutcomes } from "@/components/diagrams/AgentDevOutcomes";
import { OpsWhoItsFor } from "@/components/diagrams/OpsWhoItsFor";
import { OpsCommonSymptoms } from "@/components/diagrams/OpsCommonSymptoms";
import { OpsOurApproach } from "@/components/diagrams/OpsOurApproach";
import { OpsDeliverables } from "@/components/diagrams/OpsDeliverables";
import { OpsOutcomes } from "@/components/diagrams/OpsOutcomes";
import { SupportWhoItsFor } from "@/components/diagrams/SupportWhoItsFor";
import { SupportCommonSymptoms } from "@/components/diagrams/SupportCommonSymptoms";
import { SupportOurApproach } from "@/components/diagrams/SupportOurApproach";
import { SupportDeliverables } from "@/components/diagrams/SupportDeliverables";
import { SupportOutcomes } from "@/components/diagrams/SupportOutcomes";
import { MarketingWhoItsFor } from "@/components/diagrams/MarketingWhoItsFor";
import { MarketingCommonSymptoms } from "@/components/diagrams/MarketingCommonSymptoms";
import { MarketingOurApproach } from "@/components/diagrams/MarketingOurApproach";
import { MarketingDeliverables } from "@/components/diagrams/MarketingDeliverables";
import { MarketingOutcomes } from "@/components/diagrams/MarketingOutcomes";
import { RevOpsWhoItsFor } from "@/components/diagrams/RevOpsWhoItsFor";
import { RevOpsCommonSymptoms } from "@/components/diagrams/RevOpsCommonSymptoms";
import { RevOpsOurApproach } from "@/components/diagrams/RevOpsOurApproach";
import { RevOpsDeliverables } from "@/components/diagrams/RevOpsDeliverables";
import { RevOpsOutcomes } from "@/components/diagrams/RevOpsOutcomes";

// Coded replacements for AI Agent Development's 5 tab PNGs only - scoped by
// slug + accordion key, exactly like AgentDevHero's hero swap. Every other
// service keeps rendering its tabImage PNG unchanged.
const AGENT_DEV_TAB_COMPONENTS: Record<ServiceAccordionItemKey, React.ComponentType> = {
  whoItsFor: AgentDevWhoItsFor,
  commonSymptoms: AgentDevCommonSymptoms,
  ourApproach: AgentDevOurApproach,
  deliverables: AgentDevDeliverables,
  outcomes: AgentDevOutcomes,
};

// Coded replacements for Operations & Process Automation's 5 tab PNGs -
// "whoItsFor" now renders the on-theme OpsWhoItsFor (solid coral/orange
// cards matching the rest of Operations' diagrams) instead of the white-card
// WhoItsForCards treatment, which didn't match.
const OPS_TAB_COMPONENTS: Record<ServiceAccordionItemKey, React.ComponentType> = {
  whoItsFor: OpsWhoItsFor,
  commonSymptoms: OpsCommonSymptoms,
  ourApproach: OpsOurApproach,
  deliverables: OpsDeliverables,
  outcomes: OpsOutcomes,
};

// Coded replacements for Customer Support Automation's 5 tab PNGs - unlike
// Operations, this service's "whoItsFor" reference is a diverging-lines
// chart (not the BUILD/RUN/SCALE card style), so all 5 tabs get a new
// component here rather than falling back to WhoItsForCards.
const SUPPORT_TAB_COMPONENTS: Record<ServiceAccordionItemKey, React.ComponentType> = {
  whoItsFor: SupportWhoItsFor,
  commonSymptoms: SupportCommonSymptoms,
  ourApproach: SupportOurApproach,
  deliverables: SupportDeliverables,
  outcomes: SupportOutcomes,
};

// Coded per-tab visual for Marketing Automation's 5 tabs - same scoping
// pattern as AgentDevTab/OpsTab/SupportTab above.
const MARKETING_TAB_COMPONENTS: Record<ServiceAccordionItemKey, React.ComponentType> = {
  whoItsFor: MarketingWhoItsFor,
  commonSymptoms: MarketingCommonSymptoms,
  ourApproach: MarketingOurApproach,
  deliverables: MarketingDeliverables,
  outcomes: MarketingOutcomes,
};

// Coded per-tab visual for RevOps Automation's 5 tabs - same scoping
// pattern as AgentDevTab/OpsTab/SupportTab/MarketingTab above. This is the
// last of the 5 services, completing the coded-visual rollout across the
// whole services set.
const REVOPS_TAB_COMPONENTS: Record<ServiceAccordionItemKey, React.ComponentType> = {
  whoItsFor: RevOpsWhoItsFor,
  commonSymptoms: RevOpsCommonSymptoms,
  ourApproach: RevOpsOurApproach,
  deliverables: RevOpsDeliverables,
  outcomes: RevOpsOutcomes,
};

// Real aspect ratio of each coded SVG diagram's viewBox. Almost all of them
// are 752x501, but AgentDevOurApproach uses a taller 752x560 canvas - rather
// than forcing every diagram into a fixed-height/752:501 container (which
// letterboxes the taller ones with empty space above/below), the wrapper
// below reads each active component's ratio from this map so the panel's
// own aspect-ratio always matches what the SVG is actually drawing.
const DIAGRAM_ASPECT_RATIO = new Map<React.ComponentType, number>([
  [AgentDevOurApproach, 752 / 560],
]);
const DEFAULT_DIAGRAM_ASPECT_RATIO = 752 / 501;

// Diagrams that are real HTML/CSS (not a fixed-viewBox SVG) - their height
// should follow their own content instead of being locked to the 752:501
// SVG aspect ratio, which would clip or stretch a card grid that wraps text.
const NATURAL_HEIGHT_DIAGRAMS = new Set<React.ComponentType>([]);

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
  // Coded per-tab visual, proof-of-concept for ai-agent-development only -
  // takes priority over the tabImage PNG for this one service's 5 tabs.
  const AgentDevTab =
    service.slug === "ai-agent-development" ? AGENT_DEV_TAB_COMPONENTS[activeKey] : undefined;
  // Coded replacements for Operations & Process Automation's 4 remaining
  // tab PNGs (commonSymptoms/ourApproach/deliverables/outcomes) - same
  // scoping pattern as AgentDevTab above. "whoItsFor" isn't in
  // OPS_TAB_COMPONENTS, so it falls through to showAudienceCards below.
  const OpsTab =
    service.slug === "operations-process-automation" ? OPS_TAB_COMPONENTS[activeKey] : undefined;
  // Coded per-tab visual for Customer Support Automation's 5 tabs - same
  // scoping pattern as AgentDevTab/OpsTab above.
  const SupportTab =
    service.slug === "customer-support-automation" ? SUPPORT_TAB_COMPONENTS[activeKey] : undefined;
  // Coded per-tab visual for Marketing Automation's 5 tabs - same scoping
  // pattern as AgentDevTab/OpsTab/SupportTab above.
  const MarketingTab =
    service.slug === "marketing-automation" ? MARKETING_TAB_COMPONENTS[activeKey] : undefined;
  // Coded per-tab visual for RevOps Automation's 5 tabs - same scoping
  // pattern as AgentDevTab/OpsTab/SupportTab/MarketingTab above.
  const RevOpsTab =
    service.slug === "revops-automation" ? REVOPS_TAB_COMPONENTS[activeKey] : undefined;
  // Decided once per service (not per active tab) so the columns don't
  // jump width when switching between accordion rows.
  const hasTabImages = Boolean(SERVICE_TAB_IMAGES[service.slug]);
  // Whichever coded SVG diagram is actually rendering for this tab (if any) -
  // used below to size the panel to that diagram's real aspect ratio instead
  // of letterboxing it inside a height forced to match the accordion.
  const codedTab = AgentDevTab || OpsTab || SupportTab || MarketingTab || RevOpsTab;
  // Coded "who it's for" visual (real audience-card data, not an exported
  // image) takes priority over the generic tab photo for services that
  // define audienceCards but don't already have a coded tab component for
  // this key (WhoItsForCards is a fallback, not an override - Operations
  // now renders OpsWhoItsFor via OPS_TAB_COMPONENTS instead, so codedTab
  // must win here or bleed below stays wrongly false and DiagramFrame's
  // px-6 padding stacks on top of the diagram's own internal inset).
  const showAudienceCards =
    activeKey === "whoItsFor" && !!service.audienceCards?.length && !tabImage && !codedTab;
  const activeDiagramComponent = !showAudienceCards && codedTab;
  const isNaturalHeightDiagram = Boolean(activeDiagramComponent && NATURAL_HEIGHT_DIAGRAMS.has(activeDiagramComponent));
  const diagramAspectRatio =
    activeDiagramComponent && !isNaturalHeightDiagram
      ? DIAGRAM_ASPECT_RATIO.get(activeDiagramComponent) ?? DEFAULT_DIAGRAM_ASPECT_RATIO
      : undefined;
  // WhoItsForCards (Operations' "Who it's for" tab) is real card content,
  // not an SVG with a fixed viewBox - it has no aspect ratio to size to, but
  // it has the same root cause as the diagram tabs: h-full + items-stretch
  // forces it to match the accordion's height, leaving empty space above/
  // below its 3 BUILD/RUN/SCALE cards. It just needs self-start so it sizes
  // to its own natural content height instead.
  const sizeToOwnContent = Boolean(diagramAspectRatio) || showAudienceCards || isNaturalHeightDiagram;

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
      <div
        className={`relative w-full rounded-[28px] bg-peach/50 p-3 lg:sticky lg:top-24 ${
          // Coded-diagram tabs and WhoItsForCards size themselves to their
          // own natural content (self-start so the grid row's items-stretch
          // doesn't force a mismatched height back on); every other branch
          // (tab photos, generic icon) keeps stretching to fill the row
          // like before.
          sizeToOwnContent ? "self-start" : "h-full"
        }`}
        style={diagramAspectRatio ? { aspectRatio: diagramAspectRatio } : undefined}
      >
        <DiagramFrame
          eyebrow={showAudienceCards || tabImage || codedTab ? undefined : `Service / ${service.title}`}
          caption={showAudienceCards || tabImage || codedTab ? undefined : caption}
          bleed={!!(tabImage || codedTab)}
        >
          <AnimatePresence mode="wait">
            {AgentDevTab ? (
              // Coded per-tab visual, proof-of-concept for
              // ai-agent-development only - full-bleed like the tabImage
              // PNG branch below, edge to edge with no eyebrow/caption strip.
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <AgentDevTab />
              </motion.div>
            ) : OpsTab ? (
              // Coded per-tab visual for Operations & Process Automation's
              // 4 non-audience tabs - same full-bleed treatment as
              // AgentDevTab above.
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={isNaturalHeightDiagram ? "relative w-full" : "relative h-full w-full"}
              >
                <OpsTab />
              </motion.div>
            ) : SupportTab ? (
              // Coded per-tab visual for Customer Support Automation's 5
              // tabs - same full-bleed treatment as AgentDevTab/OpsTab above.
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <SupportTab />
              </motion.div>
            ) : MarketingTab ? (
              // Coded per-tab visual for Marketing Automation's 5 tabs -
              // same full-bleed treatment as AgentDevTab/OpsTab/SupportTab
              // above.
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <MarketingTab />
              </motion.div>
            ) : RevOpsTab ? (
              // Coded per-tab visual for RevOps Automation's 5 tabs - same
              // full-bleed treatment as AgentDevTab/OpsTab/SupportTab/
              // MarketingTab above.
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <RevOpsTab />
              </motion.div>
            ) : showAudienceCards ? (
              // Coded audience-card visual, real content from
              // service.audienceCards - not full-bleed, sits in the same
              // padded/eyebrow/caption frame as the generic diagram fallback.
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex w-full flex-1 flex-col justify-center"
              >
                <WhoItsForCards cards={service.audienceCards!} />
              </motion.div>
            ) : tabImage ? (
              // Full-bleed real photography - fills the entire card edge to
              // edge, no eyebrow/caption strip and no white padding around
              // it, so the image itself is the whole panel.
              <motion.div
                key={activeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full bg-cream"
              >
                <Image
                  src={tabImage}
                  alt={`${service.title} - ${caption}`}
                  fill
                  sizes="(min-width: 1024px) 720px, 90vw"
                  // object-contain - the source photos are landscape and
                  // vary slightly in crop; contain guarantees every tab
                  // renders its full image with nothing sliced off, at the
                  // cost of a little letterboxing instead of a hard crop.
                  className="object-contain"
                />
              </motion.div>
            ) : (
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
                <span className="text-h4 text-18 text-ink">{service.title}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </DiagramFrame>
      </div>
    </div>
  );
}
