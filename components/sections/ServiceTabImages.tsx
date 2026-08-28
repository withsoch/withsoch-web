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
    whoItsFor:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d92637e49d11d3daa2d54_founders_ops_teamleads_752x501.png",
    commonSymptoms:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d92628fa7a54a1f7b1a68_chatgpt_vs_business_752x501.png",
    ourApproach:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0c120606235fd0d24b9406_row20_752x501%20(1).png",
    deliverables:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d92638d25adba72989cd8_agent_evals_prompts_752x501.png",
    outcomes:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a13dc875b87f35e603a45c6_AI%20Agent%20Development%20outcomes%20visual%20for%20Soch%20A%20flat%202D%20sem_row88.png",
  },
  "operations-process-automation": {
    whoItsFor: "/Services/operations-process-automation/ops_01_who_its_for.png",
    commonSymptoms: "/Services/operations-process-automation/ops_02_common_symptoms.png",
    ourApproach: "/Services/operations-process-automation/ops_03_our_approach.png",
    deliverables: "/Services/operations-process-automation/ops_04_deliverables.png",
    outcomes: "/Services/operations-process-automation/ops_05_outcomes.png",
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
    whoItsFor:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d951efba48b65120f10d1_founders_marketing_growth_752x501.png",
    commonSymptoms:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d955b55e31040333a88cb_current_state_campaigns_752x501.png",
    ourApproach:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d957f8c9f67f8c54d5b63_audit_capture_nurture_752x501.png",
    deliverables:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a07174497a9a10d2762feb9_row33_752x501.png",
    outcomes:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a13dd8ac0836e85221455f7_Marketing%20Automation%20outcomes%20visual%20for%20Soch%20A%20flat%202D%20sem_row90.png",
  },
  "revops-automation": {
    whoItsFor:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a09fe936addfa1dbdadea71_RevOps_Automation_Who_752x501.png",
    commonSymptoms:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d8bdb261d02c91cec3b7e_sales_marketing_cs_752x501.png",
    ourApproach:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d8b0bdb9abee7a201fd99_process_5steps_752x501.png",
    deliverables:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a09fee3f9c18ffe72140100_RevOps_Automation_Deliverables_752x501.png",
    outcomes:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a13ddcb431c2637b74b4c8b_RevOps%20Automation%20outcomes%20visual%20for%20Soch%20A%20flat%202D%20semir_row91.png",
  },
};

// Homepage "Services that turn strategy into results" panel (ServicesGrid) - // one hero diagram per service, not per accordion tab, matching the tab
// images on the live withsoch.com homepage service-tabs section.
export const SERVICE_HOME_IMAGES: Record<string, string> = {
  "ai-agent-development":
    "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a143f711ee2a9648dbaa0ff_Editorial%20diagram%20on%20a%20light%20cream%20F5EFE0%20inset%20card%20panel_row93.png",
  "operations-process-automation":
    "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a325b9b7c898564a72f5ce2_6a143fb9d94095983d9fc6c4_Editorial%20diagram%20on%20a%20light%20cream%20F5EFE0%20inset%20card%20panel_row92.webp",
  "customer-support-automation":
    "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a325b9aa9828abcd957df03_Service.webp",
  "marketing-automation":
    "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a325b9a5eae1aeab3eefa02_6a14401e79d6068092a97202_Editorial%20diagram%20on%20a%20light%20cream%20F5EFE0%20inset%20card%20panel_row95.webp",
  "revops-automation":
    "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a325b9bfe39ba7248c944a2_Opreation%20Image.webp",
};

// /services index grid - each card's hero thumbnail, matching the dedicated
// service page's hero image on the live withsoch.com Webflow build (services.html).
export const SERVICE_LIST_IMAGES: Record<string, string> = {
  "operations-process-automation":
    "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0d98616284ec6506baf178_manual_vs_automated_ops2_752x501.png",
  "ai-agent-development":
    "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a061ecee3ce032231342dd3_AI_Agent_Hero_752x501.png",
  "customer-support-automation":
    "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a062229fb4e00093fc0f5fe_CS_Hero_752x501.png",
  "marketing-automation":
    "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0c413388a0bb22111d1bbf_Update-4.png",
  "revops-automation":
    "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a0c0acb5aa3b5ca1c0a7c38_row35_final_752x501%20(2).png",
};
