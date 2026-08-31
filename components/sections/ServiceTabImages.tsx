// components/sections/ServiceTabImages.tsx
//
// Real per-tab photography/illustration for a service's "who it's for /
// common symptoms / our approach / deliverables / outcomes" panel, sourced
// from the live withsoch.com Webflow build. Keyed by service slug, then by
// the same ServiceAccordionItemKey used by ServiceAccordion/ServiceProcessPanel.
// A service with no entry here (or a missing key inside one) falls back to
// the generic SVG diagram in ServiceCardDiagrams.

import type { ServiceAccordionItemKey } from "@/components/sections/ServiceAccordion";

export type ServiceTabImageSet = Partial<Record<ServiceAccordionItemKey, string>>;

export const SERVICE_TAB_IMAGES: Record<string, ServiceTabImageSet> = {
  "ai-agent-development": {
    whoItsFor: "/images/services/AI%20Agent/01_who_its_for.png",
    commonSymptoms: "/images/services/AI%20Agent/02_common_symptoms.png",
    ourApproach: "/images/services/AI%20Agent/03_our_approach.png",
    deliverables: "/images/services/AI%20Agent/04_deliverables.png",
    outcomes: "/images/services/AI%20Agent/05_outcomes.png",
  },
  "operations-process-automation": {
    whoItsFor: "/images/services/ops-process/ops_01_who_its_for.png",
    commonSymptoms: "/images/services/ops-process/ops_02_common_symptoms.png",
    ourApproach: "/images/services/ops-process/ops_03_our_approach.png",
    deliverables: "/images/services/ops-process/ops_04_deliverables.png",
    outcomes: "/images/services/ops-process/ops_05_outcomes.png",
  },
  "customer-support-automation": {
    whoItsFor:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d9395de7ddeee4bbfb569_founders_coos_support_752x501.png",
    commonSymptoms:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d93aedd397d499ac957e7_tickets_24h_752x501.png",
    ourApproach:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a071456c539f363b3f69430_Editorial_infographic_row26_752x501.png",
    deliverables:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a06230824c0527007fef7a2_CS_Deliverables_752x501.png",
    outcomes:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a143ec78e2f52611ab4eca8_CX%20Automation%20outcomes%20visual%20for%20Soch%20A%20flat%202D%20abstract%20d_row89.png",
  },
  "marketing-automation": {
    whoItsFor: "/images/services/Markeeting%20Service/marketing_01_who_its_for.png",
    commonSymptoms: "/images/services/Markeeting%20Service/marketing_02_common_symptoms.png",
    ourApproach: "/images/services/Markeeting%20Service/marketing_03_our_approach.png",
    deliverables: "/images/services/Markeeting%20Service/marketing_04_deliverables.png",
    outcomes: "/images/services/Markeeting%20Service/marketing_05_outcomes.png",
  },
  "revops-automation": {
    whoItsFor: "/images/services/REV%20Ops/revops_01_who_its_for.png",
    commonSymptoms: "/images/services/REV%20Ops/revops_02_common_symptoms.png",
    ourApproach: "/images/services/REV%20Ops/revops_03_our_approach.png",
    deliverables: "/images/services/REV%20Ops/revops_04_deliverables.png",
    outcomes: "/images/services/REV%20Ops/revops_05_outcomes_forecast.png",
  },
};

// NOTE: the homepage ServicesGrid panel, the /services index grid thumbnails,
// and the service detail page's "Explore our other services" cards all now
// read `service.heroImage` directly (lib/content.ts) instead of a separate
// per-surface image map, so every one of those surfaces shows the same
// canonical hero image per service.
