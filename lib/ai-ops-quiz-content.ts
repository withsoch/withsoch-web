// lib/ai-ops-quiz-content.ts
//
// Single source of truth for the AI Ops Score quiz — questions, options,
// point values, scoring-tier copy, and email-gate copy — ported verbatim
// from the Webflow export (ai-ops-score.html). Do not invent or paraphrase
// any copy here; if anything was ambiguous, it's flagged with a
// `// TODO: verify` comment rather than guessed.
//
// Content-only file: no components, pages, or scoring functions live here.

export type Pillar = "ops_readiness" | "automation" | "team_efficiency";

export type PreGateQuestion = {
  id: string;
  question: string;
  options: string[];
};

// The 2 unscored questions shown after the 12 scored questions and before
// results ("Two quick questions before your results" / pregate-section).
// They do not affect the score.
export const PRE_GATE_QUESTIONS: PreGateQuestion[] = [
  {
    id: "team_size",
    question: "How big is your team right now?",
    options: ["Just me, founder only", "2 to 10", "11 to 25", "26 or more"],
  },
  {
    id: "intent",
    question: "What is prompting you to check this now?",
    options: [
      "Just curious where we stand",
      "We are feeling the pain and want to fix it",
      "Actively planning an ops or automation project",
      "Evaluating whether to bring in outside help",
    ],
  },
];

export type QuizOption = { label: string; points: 0 | 1 | 2 | 3 };
export type QuizQuestion = {
  id: number;
  pillar: Pillar;
  question: string;
  options: QuizOption[];
};

// The 12 scored questions (source `questions` array, in order). Each option's
// `points` is its original `value` (0-3).
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    pillar: "ops_readiness",
    question: "How are your core business processes documented?",
    options: [
      { label: "In people's heads, largely undocumented", points: 0 },
      { label: "Partially documented in docs or wikis", points: 1 },
      { label: "Fully documented with clear owners", points: 2 },
      { label: "Documented, versioned, and regularly reviewed", points: 3 },
    ],
  },
  {
    id: 2,
    pillar: "ops_readiness",
    question: "When a team member leaves, what happens to their knowledge?",
    options: [
      { label: "It walks out the door with them", points: 0 },
      { label: "Some handover happens, but it's incomplete", points: 1 },
      { label: "We have runbooks and handover protocols", points: 2 },
      { label: "All knowledge is systematically captured", points: 3 },
    ],
  },
  {
    id: 3,
    pillar: "ops_readiness",
    question: "How do you track operational performance?",
    options: [
      { label: "We don't, we rely on gut feel", points: 0 },
      { label: "Ad hoc reporting when something breaks", points: 1 },
      { label: "Regular reports, manually compiled", points: 2 },
      { label: "Live dashboards tied to clear KPIs", points: 3 },
    ],
  },
  {
    id: 4,
    pillar: "ops_readiness",
    question: "How clearly defined are roles and decision-making authority?",
    options: [
      { label: "Founders decide everything informally", points: 0 },
      { label: "Some structure but frequent overlap", points: 1 },
      { label: "Defined roles with documented accountability", points: 2 },
      {
        label: "Clear accountability, everyone knows who owns each decision",
        points: 3,
      },
    ],
  },
  {
    id: 5,
    pillar: "automation",
    question: "What is your current level of workflow automation?",
    options: [
      { label: "Everything is done manually", points: 0 },
      { label: "A few basic automations (Zapier, etc.)", points: 1 },
      { label: "Moderate, several workflows automated", points: 2 },
      { label: "Advanced, multi-step, AI-assisted automations", points: 3 },
    ],
  },
  {
    id: 6,
    pillar: "automation",
    question: "What share of your team's week goes to repetitive, manual work?",
    options: [
      { label: "Most of it, we are buried in manual tasks", points: 0 },
      { label: "A lot, more than half feels manual", points: 1 },
      { label: "Some, but the important work still gets done", points: 2 },
      { label: "Very little, most repetitive work is automated", points: 3 },
    ],
  },
  {
    id: 7,
    pillar: "automation",
    question:
      "How integrated are your core tools (CRM, project management, comms)?",
    options: [
      { label: "Siloed, data doesn't flow between them", points: 0 },
      { label: "Partially connected with manual syncing", points: 1 },
      { label: "Most tools share data automatically", points: 2 },
      { label: "Fully integrated with a central source of truth", points: 3 },
    ],
  },
  {
    id: 8,
    pillar: "automation",
    question: "Have you experimented with AI in any business process?",
    options: [
      { label: "No, haven't started", points: 0 },
      { label: "Used ChatGPT/Claude for ad-hoc tasks", points: 1 },
      { label: "AI integrated into 1 to 2 specific workflows", points: 2 },
      { label: "AI embedded across multiple functions", points: 3 },
    ],
  },
  {
    id: 9,
    pillar: "team_efficiency",
    question: "How clear is your team on priorities at any given time?",
    options: [
      { label: "Priorities shift constantly, hard to keep up", points: 0 },
      { label: "Usually clear, but miscommunications happen", points: 1 },
      { label: "Clear priorities with a structured planning cadence", points: 2 },
      { label: "Crystal clear, OKRs tied to daily work", points: 3 },
    ],
  },
  {
    id: 10,
    pillar: "team_efficiency",
    question: "How does your team handle cross-functional handoffs?",
    options: [
      { label: "Ad hoc via Slack/email, things fall through", points: 0 },
      { label: "Informal but mostly functional", points: 1 },
      { label: "Structured handoffs with clear criteria", points: 2 },
      { label: "Systemised with automated triggers and tracking", points: 3 },
    ],
  },
  {
    id: 11,
    pillar: "team_efficiency",
    question: "How do you onboard new team members or freelancers?",
    options: [
      { label: "No formal process, figure it out as you go", points: 0 },
      { label: "Some materials but inconsistent", points: 1 },
      { label: "Structured onboarding with checklists", points: 2 },
      { label: "Templated, role-specific, and largely self-serve", points: 3 },
    ],
  },
  {
    id: 12,
    pillar: "team_efficiency",
    question: "How much of your team's capacity goes to high-leverage work?",
    options: [
      { label: "Mostly firefighting and admin", points: 0 },
      { label: "Mix, more reactive than strategic", points: 1 },
      { label: "Majority is strategic or value-adding", points: 2 },
      { label: "Almost all time is high-leverage by design", points: 3 },
    ],
  },
];

export type ScoreTierLabel = "Scale-ready" | "Building" | "Early-stage" | "Pre-ops";

export type ScoreTier = {
  min: number;
  max: number;
  label: ScoreTierLabel;
  headline: string;
  summary: string;
};

// Thresholds mirror the source `if/else if` chain: overall >= 75 / >= 50 /
// >= 25 / else. `max` on each tier is one less than the next tier's `min`
// (100 is the ceiling since overall is a rounded percentage).
export const SCORE_TIERS: ScoreTier[] = [
  {
    min: 75,
    max: 100,
    label: "Scale-ready",
    headline: "Strong foundation, time to accelerate",
    summary:
      "Your operations are well-structured. The biggest opportunity now is deploying AI across your existing systems to compress timelines and reduce overhead.",
  },
  {
    min: 50,
    max: 74,
    label: "Building",
    headline: "Good bones, but visible gaps",
    summary:
      "You have the right instincts but execution is inconsistent. A targeted ops overhaul across 2 to 3 areas would unlock meaningful capacity and make AI adoption far more effective.",
  },
  {
    min: 25,
    max: 49,
    label: "Early-stage",
    headline: "Foundations need work before AI can help",
    summary:
      "You're running on intuition and informal systems. AI tools won't fix the underlying issues, you need to build the operational layer first.",
  },
  {
    min: 0,
    max: 24,
    label: "Pre-ops",
    headline: "Start here before touching AI",
    summary:
      "Right now your biggest risk is scaling chaos, not missing out on AI. The priority is building the baseline processes everything else depends on.",
  },
];

// Display names for the 3 pillars (source `pillarLabels` array, in pillar
// index order 0/1/2) plus the fix-first/then-improve/leverage action-slot
// labels used on the results screen (source `res-actions` block / `acts`
// array populated by `pillarActions()`).
export const PILLAR_LABELS: Record<Pillar, string> = {
  ops_readiness: "Ops readiness",
  automation: "Automation maturity",
  team_efficiency: "Team efficiency",
};

// `pillarActions()` always emits these 3 action lines, sorted worst-pillar
// (fix first) to best-pillar (leverage) — the labels themselves are fixed,
// not derived per-pillar copy.
export const PILLAR_ACTION_LABELS = {
  automation: "Automate your lead and ops flows",
  ops_readiness: "Close the ops process gaps",
  team_efficiency: "Double down on team strengths",
} as const;

export const ACTION_SLOT_LABELS = ["Fix first", "Then improve", "Leverage"] as const;

export const QUIZ_COPY = {
  intro: {
    // source .tag / h1 / .sub in #quiz-section
    eyebrow: "Soch — Ops Score",
    headline: "How ready is your business to scale with AI?",
    subheading: "12 questions. 3 minutes. Free.",
  },
  preGate: {
    // source .tag / .pregate-title / .pregate-sub in #pregate-section
    eyebrow: "Almost there",
    heading: "Two quick questions before your results",
    subcopy:
      "These help us make your report more relevant. They do not affect your score.",
    nextButton: "See my score →",
    backButton: "← Back",
  },
  results: {
    // source .res-eyebrow / #res-date prefix in #result-section
    eyebrow: "AI Ops Assessment",
    reportDatePrefix: "Your personalised ops report, ",
    overallScoreLabel: "Overall score",
    scoreDenominator: "/100",
    segLabels: ["Start", "Build", "Scale"] as const,
    pillarsEyebrow: "Score by pillar",
    // pillarStatus(pct, style) — style-keyed status copy shown under each
    // pillar bar
    pillarStatus: {
      success: "↑ Good — your main strength",
      danger: "↓ Low — priority fix needed",
      neutral: "↔ Moderate — room to improve",
    },
  },
  emailGate: {
    // source .gate-block#gate-form
    heading: "Get your full report",
    subcopy:
      "Enter your email and we'll send you a detailed breakdown of your results — what's holding you back and exactly what to do about it.",
    whatsInsideLabel: "What's inside",
    whatsInsideBullets: [
      "Key findings per pillar",
      "Root cause analysis of your biggest gaps",
      "Prioritised 3-step action plan",
      "Benchmarks vs comparable B2B teams",
    ],
    fields: {
      name: { placeholder: "First name", autocomplete: "given-name" },
      email: { placeholder: "Work email", autocomplete: "email" },
    },
    submitButton: "Send me the report →",
    submitButtonSending: "Sending...",
  },
  success: {
    // source .gate-block#gate-success — {name} is interpolated per source
    // `showSuccess(name)`
    heading: "Report on its way",
    // TODO: verify — source string reads "arrive exactly after 3 minutes",
    // which is likely a copy typo for "within a few minutes" (matches the
    // JSON-LD/meta description phrasing and the pre-submit default message
    // in #success-msg), but reproduced verbatim here since it's what ships.
    message: (name: string) =>
      `Check your inbox, ${name} — your personalised Soch Ops Report will arrive exactly after 3 minutes from info@withsoch.com.`,
    // Default #success-msg text before showSuccess() overwrites it — kept
    // in case it's ever shown pre-interpolation.
    defaultMessage:
      "Check your inbox — your personalised Soch Ops Report will arrive within a few minutes from info@withsoch.com.",
    calBookingLine: "While you're waiting, book a call with Riz now:",
  },
} as const;

// Source `const WEBHOOK_URL = 'https://sochconsulting.app.n8n.cloud/webhook/webflow-form';`
export const WEBHOOK_URL = "https://sochconsulting.app.n8n.cloud/webhook/webflow-form";

// Source result-screen Cal.com embed: `src="https://cal.com/consult-with-riz/work"`.
// NOTE: lib/content.ts already defines `SCHEDULER_URL = "/contact"` as a
// deliberate, prior decision — "Book a Free Call" routes internally with no
// external scheduler fallback (see lib/content.ts:39-42). Per that decision,
// this file does NOT redefine a conflicting `SCHEDULER_URL`. The Cal.com
// link is exposed under its own name, scoped to the quiz's post-submit
// booking embed only — it should not be wired into the site-wide CTA.
export const QUIZ_CAL_BOOKING_URL = "https://cal.com/consult-with-riz/work";
