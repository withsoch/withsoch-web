// lib/content.ts
//
// Soch ecosystem content model — populated with REAL copy audited from the
// live withsoch.com (Webflow) production site on 2026-07-31.
//
// This intentionally deviates from the design system's "keep placeholder
// data" default: this is a migration of an existing, real business's site,
// not a greenfield new site, so the copy below is production content, not
// invented filler. Swap only when Rizwan/Husnain hand over an update.
//
// TODO markers throughout mark assets that must be re-exported from Webflow
// (logo SVGs, case-study photography, hero video) since they currently live
// on cdn.prod.website-files.com and won't be reachable once that CMS is
// retired.

import type { IconName } from "@/components/Icons";

// ---------------------------------------------------------------------------
// Singletons
// ---------------------------------------------------------------------------

export const SITE = {
  name: "Soch",
  tagline: "AI automation partners for startups that are ready to move faster.",
  metaDescription:
    "AI automation partners for startups. We build and deploy automation systems across operations, products, and outreach for pre-seed to Series A companies.",
  email: "info@withsoch.com",
  phone: "+372 5389 0745",
  phoneHref: "tel:+37253890745",
  address: "Gonsiori 31A, 10147, Tallinn, Estonia",
  social: {
    linkedin: "https://www.linkedin.com/company/sochconsulting",
    facebook: "https://www.facebook.com/SochConsulting/",
    youtube: "https://www.youtube.com/@SochConsulting",
    instagram: "https://www.instagram.com/withsoch",
  },
};

// The one env-driven value — keep the fallback card working when unset.
// Real production value is the team's live Cal.com link, not a placeholder.
export const SCHEDULER_URL =
  process.env.NEXT_PUBLIC_SCHEDULER_URL ?? "https://cal.com/consult-with-riz/work";

export const CTAS = {
  primary: { label: "Book a Free Call", href: SCHEDULER_URL },
  secondary: { label: "Get Your Free Ops Score", href: "/ai-ops-score" },
};

export const CTA_BAND = {
  heading: "Most early-stage teams are 5 automations away from feeling in control.",
  lead: "Book a free call and we'll show you where automation creates the most leverage in your business.",
};

export const NAV = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const HERO = {
  eyebrow: "AI Automation Agency for Startups",
  headline: "AI automation partners for startups that are ready to",
  headlineEmphasis: "move faster.",
  sub: "Most early-stage teams are doing manually what AI can do in seconds. We help pre-seed to Series A startups identify where automation creates real leverage, then build and deploy those systems across their operations, products, and outreach.",
};

// ---------------------------------------------------------------------------
// Team (About page)
// ---------------------------------------------------------------------------

export type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  instagram?: string;
  initials: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Rizwan Mahmood",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/consult-with-riz/",
    instagram: "https://www.instagram.com/etz.riz/",
    initials: "RM",
  },
  {
    name: "Umair Shahzad",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/umair-shahzad-us/",
    instagram: "https://www.instagram.com/_umairshahzad/",
    initials: "US",
  },
];

export type Principle = { icon: IconName; title: string; description: string };

export const PRINCIPLES: Principle[] = [
  {
    icon: "compass",
    title: "Clarity before speed",
    description: "We map the workflow before we build the automation. No rushed deploys.",
  },
  {
    icon: "check",
    title: "Systems over advice",
    description: "Real impact comes from deployed automations, not strategy decks.",
  },
  {
    icon: "trend",
    title: "Data over opinion",
    description: "We measure what the automation produces and let results drive every next decision.",
  },
  {
    icon: "profile",
    title: "Partnership over handoffs",
    description: "We build with you, not just for you. Momentum is built together.",
  },
  {
    icon: "spark",
    title: "Improvement as a habit",
    description: "Every system can get faster, leaner, and smarter. We never leave it at good enough.",
  },
];

export const VISION =
  "To become the most trusted AI automation partner for startups globally, helping founders replace manual work with intelligent systems that compound over time.";

export const MISSION =
  "To give early-stage startups access to the kind of AI automation infrastructure that usually only exists at large companies, so they can compete, grow, and lead without burning out their teams.";

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export type Service = {
  slug: string;
  icon: IconName;
  title: string;
  hook: string;
  description: string;
  points: string[];
  whoItsFor: string;
  commonSymptoms: string[];
  ourApproach: string[];
  deliverables: string[];
  outcomes: string[];
  offerings: { icon: IconName; title: string; description: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "ai-agent-development",
    icon: "spark",
    title: "AI Agent Development",
    hook: "Put AI to work on the tasks eating your team's hours.",
    description:
      "We design, build, and deploy custom AI agents for startups whose teams spend hours each week on research, document review, data extraction, and drafting. We pick the right model, ground it in your data, and integrate it into the tools you already use.",
    points: ["Custom AI Agents", "LLM Integration", "Task Automation"],
    whoItsFor:
      "Founders, ops leads, and team leads at 10 to 150-person companies whose teams are spending hours on cognitive work that an AI agent could handle reliably.",
    commonSymptoms: [
      "Hours lost each week reading, summarizing, or extracting data from documents and emails",
      "Off-the-shelf AI tools that don't fit the workflow",
      "A custom AI build attempted in ChatGPT or Cursor that never made it into production",
    ],
    ourApproach: [
      "Use case audit and agent design (weeks 1-2)",
      "Model selection and tool integration scoping",
      "Custom agent build with prompts, tools, and guardrails",
      "Evaluation across edge cases and high-volume scenarios",
      "Documentation, Loom walkthrough, and live handover",
    ],
    deliverables: [
      "Use case map and agent specifications",
      "Custom AI agent built, integrated, and deployed",
      "Evaluation suite and prompt library",
      "Documentation, Loom walkthrough, and handover session",
    ],
    outcomes: [
      "10 to 30 or more hours per week back in team capacity",
      "Consistent output quality across high-volume cognitive tasks",
      "AI deployed into your existing stack without replacing it",
    ],
    offerings: [
      { icon: "compass", title: "Research and Enrichment Agents", description: "Agents that research prospects, accounts, or topics and write the findings into your CRM or doc. Your team stops manually opening 12 tabs." },
      { icon: "audit", title: "Document Processing Agents", description: "Structured data extracted from PDFs, contracts, invoices, and forms. Output flows directly into your tools." },
      { icon: "chat", title: "Email Triage and Drafting Agents", description: "Inbound categorized, routed, and drafted before your team opens the inbox. They review and send." },
      { icon: "target", title: "Personalized Outreach Agents", description: "Agents that research each lead and write the first draft of outbound. SDR-quality work at scale." },
      { icon: "profile", title: "Internal Knowledge Agents", description: "Answers to team questions pulled from docs, wikis, and past tickets. New hires ramp faster. Senior staff stop being interrupted." },
      { icon: "shield", title: "Document and Contract Review Agents", description: "Risky clauses flagged, key terms extracted, long documents summarized. Legal and ops review what matters." },
      { icon: "trend", title: "Data Extraction and Reporting Agents", description: "Pull data from unstructured sources, structure it, and surface insights on schedule." },
      { icon: "clock", title: "Agent Monitoring and Tuning", description: "Ongoing evaluation, prompt updates, and edge case fixes on retainer. Agents drift when the work changes. We keep yours sharp." },
    ],
  },
  {
    slug: "operations-process-automation",
    icon: "compass",
    title: "Operations and Process Automation",
    hook: "Stop doing manually what AI can do in seconds.",
    description:
      "We design, build, and maintain custom automation systems for startups and SMBs losing time, money, and accuracy to manual operations. We don't just wire tools together. We map the workflow first, redesign it, and then build an automation that runs reliably at scale.",
    points: ["Process Design", "System Integration", "Workflow Efficiency"],
    whoItsFor:
      "Founders, ops managers, and COOs at 10 to 150-person companies spending hours each week on manual data entry, tool-switching, and report building.",
    commonSymptoms: [
      "Manual work slowing a team that should be scaling",
      "Tools not talking to each other; data spread across platforms",
      "Automation attempts that broke and nobody fixed",
    ],
    ourApproach: [
      "Workflow audit and redesign (weeks 1-2)",
      "Tool and integration assessment",
      "Custom automation build",
      "Stress testing across edge cases and high-volume scenarios",
      "Documentation, Loom walkthrough, and live handover",
    ],
    deliverables: [
      "Workflow audit and process redesign documentation",
      "Custom automation workflows with conditional logic",
      "API and webhook integrations",
      "Documentation, Loom walkthrough, and handover session",
    ],
    outcomes: [
      "10 to 40 or more hours per week reclaimed in team capacity",
      "Manual errors eliminated from your most critical processes",
      "Scalable ops foundation without growing headcount",
    ],
    offerings: [
      { icon: "profile", title: "CRM and Contact Automation", description: "Automate contact creation, updates, bounce detection, and stale record management. Your CRM stays clean and current without anyone manually touching it." },
      { icon: "target", title: "Lead Routing and Follow-Up", description: "Automated lead assignment, nurture sequences, and follow-up triggers so no lead falls through the cracks regardless of how it came in." },
      { icon: "check", title: "Client and Customer Onboarding", description: "Automated welcome sequences, resource access instructions, and task creation so every new client gets a consistent experience without your team lifting a finger." },
      { icon: "pen", title: "Document Generation and E-Signature", description: "Template-based contract generation with merge fields, e-signature workflows, auto-filing, and renewal reminders at 60, 30, and 15 days." },
      { icon: "trend", title: "Reporting and Data Pipeline Automation", description: "Replace manual CSV exports and weekly deck-building with automated reporting pipelines that surface the right numbers on schedule and without errors." },
      { icon: "compass", title: "Cross-Tool Data Sync", description: "Connect your CRM, project management, billing, and communication tools into one source of truth. No more reconciling conflicting records across platforms." },
      { icon: "spark", title: "API and Webhook Integrations", description: "When native connectors hit their limits, we go direct. REST API calls, webhook triggers, and custom data transformation built clean and documented for the long run." },
      { icon: "shield", title: "Automation Monitoring and Maintenance", description: "Ongoing monitoring, error alerting, and proactive fixes on retainer. Automations break when tools update. We make sure yours keep running." },
    ],
  },
  {
    slug: "customer-support-automation",
    icon: "chat",
    title: "Customer Support Automation",
    hook: "Stop hiring just to keep up with support volume.",
    description:
      "We design and build automation systems that handle repetitive support work, route tickets correctly, and answer common questions before they reach your team. We start with your ticket data, then build the workflows that match how your customers actually behave.",
    points: ["Support Automation", "Lead Qualification", "Conversational AI"],
    whoItsFor:
      "Founders, COOs, and support leads at 10 to 150-person companies whose ticket volume is growing faster than their team.",
    commonSymptoms: [
      "Response times slipping as volume grows",
      "The same questions answered over and over",
      "Tickets routing to the wrong person or sitting unassigned",
    ],
    ourApproach: [
      "Ticket data audit and workflow mapping (weeks 1-2)",
      "Knowledge base review and gap fill",
      "AI response, routing, and deflection build",
      "Testing across real ticket types and edge cases",
      "Documentation, Loom walkthrough, and live handover",
    ],
    deliverables: [
      "Support workflow audit and redesign",
      "AI-powered response, routing, and deflection systems",
      "Knowledge base integration and sync",
      "Documentation, Loom walkthrough, and handover session",
    ],
    outcomes: [
      "30 to 60 percent deflection on repetitive tickets",
      "Faster first response without adding headcount",
      "Clear visibility into what customers are actually asking",
    ],
    offerings: [
      { icon: "chat", title: "AI-Powered First Response Drafts", description: "Replies drafted from your knowledge base before an agent opens the ticket. They review, edit if needed, and send." },
      { icon: "compass", title: "Ticket Routing and Triage", description: "Auto-categorization, prioritization, and assignment based on ticket content. The right person sees the right ticket first." },
      { icon: "shield", title: "Self-Service Deflection", description: "AI chat or in-app help that resolves common questions before they reach your inbox. Trained on your KB so answers match your actual product." },
      { icon: "profile", title: "Knowledge Base Integration", description: "Your KB synced into your support stack so AI and agents pull from one source. Updates flow everywhere automatically." },
      { icon: "target", title: "Escalation Workflows", description: "Auto-escalation based on sentiment, customer tier, or unresolved time. Critical tickets stop getting buried." },
      { icon: "trend", title: "Support Analytics and Dashboards", description: "What customers ask most, where tickets stall, and what's costing the most time. Direction for product, KB, and staffing." },
      { icon: "spark", title: "CRM and Support Tool Sync", description: "Customer context flowing between support, sales, and product tools. Agents stop asking customers what they just told sales." },
      { icon: "clock", title: "Ongoing Tuning and Maintenance", description: "AI responses kept accurate as products, pricing, and policies change. Models drift. We keep yours grounded." },
    ],
  },
  {
    slug: "marketing-automation",
    icon: "trend",
    title: "Marketing Automation",
    hook: "More pipeline. Less manual work.",
    description:
      "We build AI-powered marketing automation systems for startups that want consistent pipeline without the manual effort behind it. From automated email sequences and content generation to lead scoring and campaign orchestration, we set up the systems that keep your marketing running even when your team is focused elsewhere.",
    points: ["Campaign Workflows", "Content Scheduling", "Lead Nurturing"],
    whoItsFor:
      "Founders, marketing leads, and growth managers running lean teams without the bandwidth to execute consistently week after week.",
    commonSymptoms: [
      "Leads coming in with no automated follow-up behind them",
      "One-off campaigns with no nurture logic carrying them forward",
      "Content production inconsistent; pipeline unpredictable",
    ],
    ourApproach: [
      "Marketing and lead flow audit (week 1)",
      "Lead capture, scoring, and segmentation setup",
      "Automated nurture sequences across key stages",
      "AI-assisted content generation workflow",
      "Campaign reporting connected to pipeline outcomes",
    ],
    deliverables: [
      "Marketing audit and automation opportunity map",
      "Automated email and nurture sequences",
      "Lead scoring and CRM integration",
      "Profile & banner refresh",
      "Pipeline attribution and reporting dashboard",
    ],
    outcomes: [
      "Leads nurtured automatically from first touch to sales-ready",
      "Consistent output without the production burden",
      "Clear visibility into which campaigns drive pipeline",
    ],
    offerings: [
      { icon: "chat", title: "Email Nurture Sequences", description: "Automated welcome, onboarding, and re-engagement sequences triggered by user behavior. Every lead gets followed up, every time, without anyone manually doing it." },
      { icon: "target", title: "Lead Scoring and Segmentation", description: "Automated lead scoring based on activity, firmographics, and engagement signals. Sales gets the right leads at the right time with the right context." },
      { icon: "spark", title: "AI Content Generation Workflows", description: "AI-assisted workflows for drafting emails, social posts, and blog outlines. Your team edits and approves. The volume problem goes away." },
      { icon: "compass", title: "Campaign Orchestration", description: "Multi-channel campaign automation across email, LinkedIn, and paid channels. Built to run without weekly manual management from your team." },
      { icon: "profile", title: "CRM and Marketing Stack Integration", description: "HubSpot, Mailchimp, ActiveCampaign, or your platform of choice, fully integrated so marketing and sales are always working from the same data." },
      { icon: "clock", title: "Event and Webinar Automation", description: "Pre-event reminders, post-event follow-ups, and recording distribution all running automatically from a single trigger the moment an event is added." },
      { icon: "trend", title: "Pipeline Attribution and Reporting", description: "Clear dashboards connecting marketing spend and activity to actual pipeline and revenue. No more guessing which campaigns are worth continuing." },
      { icon: "shield", title: "Retargeting and Re-Engagement Automation", description: "Automated sequences that re-engage cold leads, website visitors, and churned customers based on behavioral triggers and time-based rules." },
    ],
  },
  {
    slug: "revops-automation",
    icon: "target",
    title: "RevOps Automation",
    hook: "One revenue system. No manual handoffs.",
    description:
      "We build revenue operations systems that align your sales, marketing, and customer success teams around clean data, clear pipeline visibility, and automated workflows. No more manual CRM updates, scattered handoffs, or forecasts built on spreadsheets nobody actually trusts.",
    points: ["Pipeline Automation", "CRM Integration", "Revenue Reporting"],
    whoItsFor:
      "Revenue leaders, founders, and sales managers at scaling startups where GTM teams are working hard but not in sync. Best for companies where CRM hygiene is poor and nobody fully trusts the forecast.",
    commonSymptoms: [
      "CRM incomplete; reps not logging activity consistently",
      "Sales and marketing not aligned on lead definitions",
      "Roadmaps constantly shifting because priorities aren't aligned",
      "Forecast built on gut feel, not pipeline data",
    ],
    ourApproach: [
      "Full RevOps audit from lead to renewal (weeks 1-2)",
      "CRM cleanup and pipeline architecture",
      "Lead routing, follow-up, and deal stage automation",
      "Sales-to-CS handoff workflow with automated context-passing",
      "Pipeline and forecast dashboard setup",
    ],
    deliverables: [
      "RevOps audit and revenue workflow map",
      "CRM rebuild with pipeline stages and automations",
      "Lead routing, handoff, and renewal trigger workflows",
      "Pipeline and sales forecast reporting dashboard",
    ],
    outcomes: [
      "CRM data you can actually make decisions from",
      "No deals or renewals falling through the cracks",
      "A forecast your leadership actually believes in",
    ],
    offerings: [
      { icon: "profile", title: "CRM Architecture and Cleanup", description: "Custom pipeline stages, contact properties, deal fields, and automation rules built to match how your team actually sells. Clean data from day one." },
      { icon: "target", title: "Lead Routing and Assignment Automation", description: "Leads automatically assigned to the right rep based on territory, source, company size, or any other criteria. No more manual distribution or leads sitting unassigned." },
      { icon: "check", title: "Deal Stage and Activity Automation", description: "Automated task creation, follow-up reminders, and deal stage updates triggered by rep activity and deal signals. Less admin, more time selling." },
      { icon: "compass", title: "Sales-to-CS Handoff Automation", description: "Structured handoff workflow that passes deal context, notes, and next steps from sales to customer success automatically at close. CS starts informed, not catching up." },
      { icon: "shield", title: "Renewal and Expansion Automation", description: "Early warning triggers and automated outreach sequences for accounts approaching renewal or showing expansion signals. Revenue protected without manual tracking." },
      { icon: "trend", title: "Pipeline Reporting and Forecasting", description: "Dashboards that give your leadership real-time visibility into pipeline health, deal velocity, and revenue forecast without manual reporting every week." },
      { icon: "spark", title: "Marketing-to-Sales Lead Handoff", description: "Clean, automated handoff from marketing nurture to sales outreach. Lead score, activity history, and context all passed through so reps start every conversation informed." },
      { icon: "clock", title: "Onboarding and Playbook Automation", description: "New rep onboarding workflows, tool access provisioning, and playbook documentation so every new hire ramps faster with less management overhead." },
    ],
  },
];

// ---------------------------------------------------------------------------
// Process (homepage "Soch Automation Operating System")
// ---------------------------------------------------------------------------

export type Step = { no: string; icon: IconName; title: string; description: string };

export const STEPS: Step[] = [
  {
    no: "01",
    icon: "audit",
    title: "Audit",
    description: "Audit your workflows and find where AI creates the most leverage.",
  },
  {
    no: "02",
    icon: "compass",
    title: "Design",
    description: "Design the automation system around your stack and your goals.",
  },
  {
    no: "03",
    icon: "check",
    title: "Build & deploy",
    description: "Build, deploy, and hand over. Running in days, not months.",
  },
];

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export const STATS = [
  {
    value: "42%",
    label: "Retailer reduced stockouts by 42% after automating inventory tracking — freeing EUR 180k in working capital within 12 weeks.",
  },
  {
    value: "2.1×",
    label: "SaaS startup doubled activation rates after automating their onboarding flow in two product cycles.",
  },
  {
    value: "€180k",
    label: "AI-powered client outputs delivered through direct Claude API integration since early 2026.",
  },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Riz has been an awesome, methodical mind, out of the box thinker that moves and thinks quickly. Explains his thought process and methodology clearly and provides immense value. I highly recommend Riz. Do not hesitate to engage Riz. You will not be disappointed.",
    name: "Kym",
    role: "Founder",
    initials: "K",
    accent: "brand",
  },
  {
    quote:
      "Working with Umair was steady and grounding. He brought care, professionalism, and calm focus to a demanding season. Grateful for what we built together and highly recommend him for reliable, clear operational support.",
    name: "Kaitlin Malaspina",
    role: "CEO, Brenna Co.",
    initials: "KM",
    accent: "forest",
  },
];

// ---------------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------------
//
// NOTE ON SCOPE: this matches the CaseStudy shape from DESIGN.md §9 — enough
// for homepage cards, the /case-studies index, and service-page cross-links.
// The full long-form narrative for each detail page (Overview / The Problem /
// Our Framework 3-steps / Results) is page-specific content per §10 ("copy
// unique to a single page may live in a page-local array rather than
// content.ts"). Suggested pattern: lib/case-studies/<slug>.ts per case study,
// each exporting { overview, problem, framework: Step[], results }. I've
// written out the Clearwater one in full below as the reference pattern —
// replicate it for the other 8 using the audited copy from this conversation.

export type CaseStudy = {
  slug: string;
  company: string;
  category: string;
  industry: string;
  region: string;
  duration: string;
  service: string;
  title: string;
  summary: string;
  metrics: { value: string; label: string }[];
  quote: string;
  author: string;
  authorRole: string;
  initials: string;
  accent: string;
  image?: string; // TODO: re-export from Webflow CDN before launch
  href?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "clearwater-intelligence",
    company: "Clearwater Intelligence",
    category: "Operations Automation",
    industry: "Data & Intelligence",
    region: "North America",
    duration: "8 weeks",
    service: "AI Workflow Automation",
    title: "Building an autonomous research engine for a data intelligence firm",
    summary:
      "Clearwater Intelligence was drowning in manual research. We replaced their entire monitoring process with an AI agent that scrapes, classifies, and routes intelligence around the clock, with no human input per cycle.",
    metrics: [
      { value: "100%", label: "Manual research hours eliminated" },
      { value: "80%+", label: "Reduction in processing time" },
      { value: "6×", label: "More sources monitored" },
    ],
    quote:
      "We used to brief analysts on what to look for and hope the output was consistent. Now the system does it and the structure is always the same. The team moved to higher-value work within the first month.",
    author: "James Whitfield",
    authorRole: "Head of Intelligence, Clearwater Intelligence",
    initials: "JW",
    accent: "teal",
    image: "/images/case-studies/clearwater-intelligence.webp", // TODO
    href: "/case-studies/clearwater-intelligence",
  },
  {
    slug: "northfield-media",
    company: "Northfield Media",
    category: "Content Operations",
    industry: "Media & Publishing",
    region: "Europe",
    duration: "10 weeks",
    service: "AI Content Automation",
    title: "Cutting content production time by 75% for a media publishing team",
    summary:
      "Northfield Media was producing every piece of content manually. We built a multi-agent AI engine that handles the full production pipeline, with brand voice memory and a human review checkpoint built in where it actually matters.",
    metrics: [
      { value: "75%", label: "Reduction in production time" },
      { value: "30 min", label: "Brief to finished piece" },
      { value: "4", label: "Formats published from one trigger" },
    ],
    quote:
      "The system knows our brand better than some of the writers we have hired. The editorial team went from spending their time writing to spending their time on strategy. That was the shift we needed.",
    author: "Sarah Connolly",
    authorRole: "Head of Content, Northfield Media",
    initials: "SC",
    accent: "leaf",
    image: "/images/case-studies/northfield-media.webp", // TODO
    href: "/case-studies/northfield-media",
  },
  {
    slug: "stockwell-commerce",
    company: "Stockwell Commerce",
    category: "Operations Automation",
    industry: "Ecommerce",
    region: "North America",
    duration: "6 weeks",
    service: "Workflow Automation",
    title: "Automating product form creation for a scaling ecommerce catalogue",
    summary:
      "Stockwell Commerce was building Typeform surveys by hand for every new product. We automated the entire pipeline from Google Sheets to published form link, in under 4 seconds per product.",
    metrics: [
      { value: "4 sec", label: "Per product form created" },
      { value: "204", label: "Items processed per cycle" },
      { value: "100%", label: "Consistent form configuration" },
    ],
    quote:
      "We were spending hours every week on this. It was one of those tasks nobody questioned until someone actually looked at it. Now it just happens and the CS team does not think about it at all.",
    author: "Rachel Owens",
    authorRole: "Operations Manager, Stockwell Commerce",
    initials: "RO",
    accent: "teal",
    image: "/images/case-studies/stockwell-commerce.webp", // TODO
    href: "/case-studies/stockwell-commerce",
  },
  {
    slug: "frontline-advisory",
    company: "Frontline Advisory",
    category: "Sales Automation",
    industry: "Professional Services",
    region: "North America",
    duration: "7 weeks",
    service: "Sales & Marketing Automation",
    title: "Rebuilding the lead response system for a multi-channel sales team",
    summary:
      "Frontline Advisory was losing leads between capture and first contact. We built a two-workflow system that handles intake, immediate outreach, and a five-day nurture sequence with reply detection built in.",
    metrics: [
      { value: "6 sec", label: "Average time to first contact" },
      { value: "100%", label: "Sequence completion rate" },
      { value: "Real-time", label: "Lead status visibility" },
    ],
    quote:
      "We were letting good leads go cold because follow-up depended on someone remembering to do it. That is fixed now. The sequence runs itself and stops the moment someone engages.",
    author: "Daniel Park",
    authorRole: "Sales Director, Frontline Advisory",
    initials: "DP",
    accent: "leaf",
    image: "/images/case-studies/frontline-advisory.webp", // TODO
    href: "/case-studies/frontline-advisory",
  },
  {
    slug: "harmon-advisory",
    company: "Harmon Advisory",
    category: "Customer Support Automation",
    industry: "Professional Services",
    region: "Europe",
    duration: "9 weeks",
    service: "AI Support Automation",
    title: "Taking manual email triage off the support team's plate entirely",
    summary:
      "Harmon Advisory was triaging, classifying, and drafting every support response by hand. We built an AI system that reads every incoming email, finds the right answer in internal documentation, and has a reviewed draft ready before a human opens the inbox.",
    metrics: [
      { value: "0", label: "Manual triage steps per email" },
      { value: "3×", label: "Support volume per team member" },
      { value: "Automatic", label: "Knowledge base maintenance" },
    ],
    quote:
      "Our team was reading the same types of emails and writing the same types of responses every single day. That work is gone now. They spend their time on the cases that actually need a person.",
    author: "Tom Hassan",
    authorRole: "Head of Customer Operations, Harmon Advisory",
    initials: "TH",
    accent: "teal",
    image: "/images/case-studies/harmon-advisory.webp", // TODO
    href: "/case-studies/harmon-advisory",
  },
  {
    slug: "physical-therapy-first",
    company: "Physical Therapy First",
    category: "Operations Automation",
    industry: "Healthcare",
    region: "North America",
    duration: "7 weeks",
    service: "AI Workflow Automation",
    title: "Turning one shared front desk into a system that never drops a patient",
    summary:
      "Physical Therapy First runs three clinics off one shared front desk team, handling insurance checks, intake, scheduling, and reviews entirely by hand. We connected all three into one automated system, cutting no-shows by more than half.",
    metrics: [
      { value: "80%", label: "Reduction in admin time per new patient" },
      { value: "7%", label: "No-shows, down from 18%" },
      { value: "13×", label: "Increase in monthly Google reviews" },
    ],
    quote:
      "We used to have someone dedicated to insurance checks and chart setup, one patient at a time, by hand. Now that's already done before they walk in. Our front desk finally has time to actually talk to patients instead of chasing paperwork.",
    author: "Danielle Ortiz",
    authorRole: "Practice Manager, Physical Therapy First",
    initials: "DO",
    accent: "leaf",
    image: "/images/case-studies/physical-therapy-first.avif", // TODO
    href: "/case-studies/physical-therapy-first",
  },
  {
    slug: "be-london",
    company: "Be London",
    category: "Customer Support Automation",
    industry: "Hospitality",
    region: "Europe",
    duration: "9 weeks",
    service: "AI Workflow Automation",
    title: "Answering every guest enquiry in minutes, from one small office",
    summary:
      "Be London manages serviced apartments across fifteen London neighbourhoods out of one small central office. We rebuilt guest enquiries, landlord onboarding, and pricing into one connected system that answers guests within minutes, any hour of the day.",
    metrics: [
      { value: "8 min", label: "Average first response time, down from 5 hours" },
      { value: "3 days", label: "Landlord onboarding, down from two weeks" },
      { value: "31%", label: "More enquiries converting into booked stays" },
    ],
    quote:
      "Guests used to wait hours for a reply, especially outside office hours. Now they get a tailored answer in minutes, any time of day. It's the kind of responsiveness that makes us feel like a much bigger operation than we are.",
    author: "Oliver Bancroft",
    authorRole: "Operations Director, Be London",
    initials: "OB",
    accent: "teal",
    image: "/images/case-studies/be-london.jpg", // TODO
    href: "/case-studies/be-london",
  },
  {
    slug: "aesthetics-lab",
    company: "Aesthetics Lab",
    category: "Customer Support Automation",
    industry: "Beauty & Wellness",
    region: "South Asia",
    duration: "8 weeks",
    service: "AI Workflow Automation",
    title: "Turning six WhatsApp inboxes into one instant booking system",
    summary:
      "Aesthetics Lab runs six branches across Lahore, Islamabad, and Faisalabad, with nearly every booking starting on WhatsApp. We connected booking, follow-up, and offers into one system live across all six numbers, cutting response time from 25 minutes to under a minute.",
    metrics: [
      { value: "50 sec", label: "Average WhatsApp response time, down from 25 min" },
      { value: "86%", label: "Package completion rate, up from 62%" },
      { value: "3.4×", label: "Redemption rate on treatment-matched offers" },
    ],
    quote:
      "Our staff were juggling six different WhatsApp numbers just to answer one client. Now the system replies and books instantly, on the same numbers clients already had saved, and the difference in how fast we respond is the first thing new clients mention.",
    author: "Ayesha Raza",
    authorRole: "Clinic Operations Director, Aesthetics Lab",
    initials: "AR",
    accent: "leaf",
    image: "/images/case-studies/aesthetics-lab.jpg", // TODO
    href: "/case-studies/aesthetics-lab",
  },
  {
    slug: "fifth-avenue-hotel",
    company: "The Fifth Avenue Hotel",
    category: "RevOps Automation",
    industry: "Hospitality",
    region: "North America",
    duration: "6 weeks",
    service: "AI Workflow Automation",
    title: "Closing the gap between a guest's inquiry and a signed contract",
    summary:
      "The Fifth Avenue Hotel is a Michelin Two-Key property in NoMad, and its private events business books weddings, corporate dinners, and celebrations worth tens of thousands of dollars each. We rebuilt inquiries, proposals, and follow-up into one system, cutting proposal turnaround from four days to three hours.",
    metrics: [
      { value: "3 hrs", label: "Proposal turnaround, down from four days" },
      { value: "6%", label: "Inquiries going cold, down from 38%" },
      { value: "22%", label: "More inquiries converting into signed contracts" },
    ],
    quote:
      "We used to lose inquiries simply because we couldn't turn a proposal around fast enough. Now a branded proposal goes out within the hour, and we're closing events we would have lost to a faster-moving venue before.",
    author: "Claire Whitmore",
    authorRole: "Director of Events, The Fifth Avenue Hotel",
    initials: "CW",
    accent: "teal",
    image: "/images/case-studies/fifth-avenue-hotel.jpg", // TODO
    href: "/case-studies/fifth-avenue-hotel",
  },
];

// ---------------------------------------------------------------------------
// Client logos
// ---------------------------------------------------------------------------
// TODO: re-export each SVG from the Webflow Assets panel (cdn.prod.website-
// files.com/68e7ded517d0693d2c345250/...) into /public/logos before launch.
// Names below are read from image alt text on the live site; two logos had
// no descriptive alt text and need confirming with Rizwan.

export const CLIENT_LOGOS = [
  { name: "Shaping Wealth", src: "/logos/shaping-wealth.svg" },
  { name: "Khudi Venture", src: "/logos/khudi-venture.svg" },
  { name: "Byzantine", src: "/logos/byzantine.svg" },
  { name: "Cycle Together", src: "/logos/cycle-together.svg" },
  { name: "Kuunda", src: "/logos/kuunda.svg" },
  { name: "Ncon", src: "/logos/ncon.svg" },
  { name: "Dil Ka Rishta", src: "/logos/dil-ka-rishta.svg" },
  { name: "Milkar", src: "/logos/milkar.svg" },
  { name: "Client (name TBC)", src: "/logos/client-16.svg" }, // TODO: confirm name
  { name: "Client (name TBC)", src: "/logos/client-19.svg" }, // TODO: confirm name
];

// ---------------------------------------------------------------------------
// Engagement tiers (homepage comparison table)
// ---------------------------------------------------------------------------

export type EngagementTier = {
  name: "AI Consulting" | "AI Implementation" | "AI Transformation";
  bestFor: string;
  deliverable: string;
  timeline: string;
  investment: string;
  typicalRoi: string;
  youGet: string;
};

export const ENGAGEMENT_TIERS: EngagementTier[] = [
  {
    name: "AI Consulting",
    bestFor: "Startups mapping automation opportunities before committing to a build",
    deliverable: "Workflow audit + prioritized roadmap",
    timeline: "2–3 weeks",
    investment: "$1K–$4K",
    typicalRoi: "Clarity on where to invest first",
    youGet: "Expert assessment + ranked action plan",
  },
  {
    name: "AI Implementation",
    bestFor: "Teams with a specific workflow that needs to stop being manual",
    deliverable: "A live, deployed automation system",
    timeline: "4–8 weeks",
    investment: "$4K–$8K",
    typicalRoi: "$50K–$250K/year in recovered capacity",
    youGet: "Working system, documented, handed over",
  },
  {
    name: "AI Transformation",
    bestFor: "Teams ready to run AI across their entire operation",
    deliverable: "Full Soch Automation Operating System",
    timeline: "10–18 weeks",
    investment: "$8K–$25K",
    typicalRoi: "$250K–$1M+/year in operational leverage",
    youGet: "Automation across every function, owned fully by your team",
  },
];

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------
// CANONICAL SET below is the automation-model FAQ used on Home + Services
// (consistent across both pages on the live site). The Contact page currently
// runs a DIFFERENT, older "embedded consulting partner" FAQ set (weekly
// sessions, 2–4 week discovery sprints, retainer language) that doesn't match
// this pricing model. Flagging for Rizwan/Husnain to confirm before porting —
// I did not merge or silently pick one. That legacy set is preserved below,
// commented out, in case it's the one that should actually win.

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What does it actually cost, and how quickly will we see ROI?",
    a: "It depends on the engagement. An Automation Audit starts at $1K and gives you a prioritized roadmap within two weeks. An Automation Build starts at $10K and delivers a live, running system within 3–6 weeks. We target high-frequency workflows first, which means most clients recover the investment within their first quarter. Sometimes faster.",
  },
  {
    q: "How long does implementation take?",
    a: "An Automation Audit wraps in 1–2 weeks. A targeted Automation Build takes 3–6 weeks from kick-off to deployment. A full Automation OS engagement runs 8–16 weeks depending on scope. We don't pad timelines. Once the build is agreed on, we move.",
  },
  {
    q: "What industries do you work with?",
    a: "We've worked with teams in SaaS, logistics, professional services, fintech, and e-commerce. The industry matters less than the problem. If your team has repetitive workflows, a backlog of manual tasks, or people doing work that software should be handling, the conversation is worth having.",
  },
  {
    q: "Do we own the systems you build?",
    a: "Yes, fully. We don't lock you into proprietary tools or ongoing retainers just to keep things running. When we hand a system over, we document it, train your team on it, and make sure you can operate it without us. Ownership transfers completely at the end of the engagement.",
  },
  {
    q: "How do I know if AI is actually a good fit for my business?",
    a: "If your team spends a meaningful amount of time on tasks that follow a predictable pattern, there's probably a fit. Data entry, report generation, lead qualification, customer follow-ups, internal routing of information: these are the kinds of tasks that automate well. The free call exists to answer this question directly. We'll tell you honestly if we think the timing isn't right.",
  },
  {
    q: "How is Soch different from other AI agencies?",
    a: "Most AI consultancies deliver decks. We deliver running systems. We stay in the engagement until the automation is live and your team knows how to use it. We work with your existing stack instead of pushing migrations that add cost and delay. And because our team is lean, there's no account management layer between you and the people doing the actual work.",
  },
  {
    q: "What is the Soch Automation Operating System?",
    a: "It's our internal framework for how we audit, design, and deploy automation inside a business. Instead of treating every project as a standalone fix, we look at your full operation and build systems that connect. The goal is a foundation that scales with your team, not something that needs rebuilding six months later because the scope was too narrow.",
  },
  {
    q: "Will AI replace my team?",
    a: "No. AI takes on the work that shouldn't require a person in the first place. What it does is free your team up for the work that does. Every engagement we run is built around making your existing people more effective. If anything, the teams we work with tend to grow after automation because the bottlenecks that were slowing them down are cleared.",
  },
];

/* LEGACY / UNRECONCILED — currently live on the Contact page only.
   Describes a different engagement model (embedded consulting partner,
   weekly working sessions, 2–4 week discovery sprints). Confirm with
   Rizwan/Husnain whether this should be retired, merged, or kept as a
   Contact-page-specific set before the rebuild ships.

export const CONTACT_FAQS_LEGACY: Faq[] = [
  { q: "Who is Soch a good fit for?", a: "We work with early-stage tech founders, typically Pre-Seed to Series A, with small, lean teams. You don't need everything figured out; you just need a real problem, some traction, and the willingness to build structure around it." },
  { q: "How do you work with founders day-to-day?", a: "We embed as part of your team, not just as advisors. That usually means weekly working sessions, async check-ins, and hands-on execution across ops, product, and growth, so decisions actually turn into shipped work." },
  { q: "What does a typical engagement look like?", a: "Most clients start with a 2–4 week discovery sprint to map problems, define priorities, and set up the first systems. From there, we usually move into a 3–6 month operating partnership focused on clear outcomes: cleaner ops, sharper product direction, and more predictable growth." },
  { q: "How do you measure success?", a: "We agree on success metrics upfront, things like activation, retention, cycle time, or revenue milestones. Then we track them with simple weekly scorecards, so you can see exactly what's improving and why." },
  { q: "How soon will we see results?", a: "Most clients see meaningful changes within 4–6 weeks: clearer roadmaps, faster execution, and fewer fires. The bigger wins (growth, efficiency, retention) compound over the next 3–6 months as the new systems bed in." },
];
*/
