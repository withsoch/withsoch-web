// components/AiOpsScoreQuiz.tsx
//
// The interactive engine behind /ai-ops-score. Questions, options, scoring,
// and result-tier copy are ported verbatim from the Webflow export
// (ai-ops-score.html) — do not invent or reword questions or tiers here.

"use client";

import { useMemo, useState } from "react";
import { CTAS } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icons";

type Option = { text: string; value: number };
type Question = { pillar: 0 | 1 | 2; text: string; options: Option[] };

const PILLAR_LABELS = ["Ops readiness", "Automation maturity", "Team efficiency"] as const;

const QUESTIONS: Question[] = [
  {
    pillar: 0,
    text: "How are your core business processes documented?",
    options: [
      { text: "In people's heads, largely undocumented", value: 0 },
      { text: "Partially documented in docs or wikis", value: 1 },
      { text: "Fully documented with clear owners", value: 2 },
      { text: "Documented, versioned, and regularly reviewed", value: 3 },
    ],
  },
  {
    pillar: 0,
    text: "When a team member leaves, what happens to their knowledge?",
    options: [
      { text: "It walks out the door with them", value: 0 },
      { text: "Some handover happens, but it's incomplete", value: 1 },
      { text: "We have runbooks and handover protocols", value: 2 },
      { text: "All knowledge is systematically captured", value: 3 },
    ],
  },
  {
    pillar: 0,
    text: "How do you track operational performance?",
    options: [
      { text: "We don't, we rely on gut feel", value: 0 },
      { text: "Ad hoc reporting when something breaks", value: 1 },
      { text: "Regular reports, manually compiled", value: 2 },
      { text: "Live dashboards tied to clear KPIs", value: 3 },
    ],
  },
  {
    pillar: 0,
    text: "How clearly defined are roles and decision-making authority?",
    options: [
      { text: "Founders decide everything informally", value: 0 },
      { text: "Some structure but frequent overlap", value: 1 },
      { text: "Defined roles with documented accountability", value: 2 },
      { text: "Clear accountability, everyone knows who owns each decision", value: 3 },
    ],
  },
  {
    pillar: 1,
    text: "What is your current level of workflow automation?",
    options: [
      { text: "Everything is done manually", value: 0 },
      { text: "A few basic automations (Zapier, etc.)", value: 1 },
      { text: "Moderate, several workflows automated", value: 2 },
      { text: "Advanced, multi-step, AI-assisted automations", value: 3 },
    ],
  },
  {
    pillar: 1,
    text: "What share of your team's week goes to repetitive, manual work?",
    options: [
      { text: "Most of it, we are buried in manual tasks", value: 0 },
      { text: "A lot, more than half feels manual", value: 1 },
      { text: "Some, but the important work still gets done", value: 2 },
      { text: "Very little, most repetitive work is automated", value: 3 },
    ],
  },
  {
    pillar: 1,
    text: "How integrated are your core tools (CRM, project management, comms)?",
    options: [
      { text: "Siloed, data doesn't flow between them", value: 0 },
      { text: "Partially connected with manual syncing", value: 1 },
      { text: "Most tools share data automatically", value: 2 },
      { text: "Fully integrated with a central source of truth", value: 3 },
    ],
  },
  {
    pillar: 1,
    text: "Have you experimented with AI in any business process?",
    options: [
      { text: "No, haven't started", value: 0 },
      { text: "Used ChatGPT/Claude for ad-hoc tasks", value: 1 },
      { text: "AI integrated into 1 to 2 specific workflows", value: 2 },
      { text: "AI embedded across multiple functions", value: 3 },
    ],
  },
  {
    pillar: 2,
    text: "How clear is your team on priorities at any given time?",
    options: [
      { text: "Priorities shift constantly, hard to keep up", value: 0 },
      { text: "Usually clear, but miscommunications happen", value: 1 },
      { text: "Clear priorities with a structured planning cadence", value: 2 },
      { text: "Crystal clear, OKRs tied to daily work", value: 3 },
    ],
  },
  {
    pillar: 2,
    text: "How does your team handle cross-functional handoffs?",
    options: [
      { text: "Ad hoc via Slack/email, things fall through", value: 0 },
      { text: "Informal but mostly functional", value: 1 },
      { text: "Structured handoffs with clear criteria", value: 2 },
      { text: "Systemised with automated triggers and tracking", value: 3 },
    ],
  },
  {
    pillar: 2,
    text: "How do you onboard new team members or freelancers?",
    options: [
      { text: "No formal process, figure it out as you go", value: 0 },
      { text: "Some materials but inconsistent", value: 1 },
      { text: "Structured onboarding with checklists", value: 2 },
      { text: "Templated, role-specific, and largely self-serve", value: 3 },
    ],
  },
  {
    pillar: 2,
    text: "How much of your team's capacity goes to high-leverage work?",
    options: [
      { text: "Mostly firefighting and admin", value: 0 },
      { text: "Mix, more reactive than strategic", value: 1 },
      { text: "Majority is strategic or value-adding", value: 2 },
      { text: "Almost all time is high-leverage by design", value: 3 },
    ],
  },
];

type Tier = "Scale-ready" | "Building" | "Early-stage" | "Pre-ops";

type ScoreResult = {
  overall: number;
  pillarScores: [number, number, number];
  tier: Tier;
  headline: string;
  summary: string;
  actions: string[];
};

function pillarStyle(pct: number): "success" | "danger" | "neutral" {
  if (pct >= 65) return "success";
  if (pct <= 40) return "danger";
  return "neutral";
}

function pillarStatus(pct: number): string {
  const style = pillarStyle(pct);
  if (style === "success") return "Good — your main strength";
  if (style === "danger") return "Low — priority fix needed";
  return "Moderate — room to improve";
}

function pillarActions(pp: [number, number, number]): string[] {
  const sorted = [
    { label: "Automate your lead and ops flows", score: pp[1] },
    { label: "Close the ops process gaps", score: pp[0] },
    { label: "Double down on team strengths", score: pp[2] },
  ].sort((a, b) => a.score - b.score);
  return sorted.map((s) => s.label);
}

function scoreQuiz(answers: (number | null)[]): ScoreResult {
  const sums: [number, number, number] = [0, 0, 0];
  const maxes: [number, number, number] = [0, 0, 0];

  QUESTIONS.forEach((q, i) => {
    const v = answers[i] !== null ? q.options[answers[i] as number].value : 0;
    sums[q.pillar] += v;
    maxes[q.pillar] += 3;
  });

  const pillarScores = sums.map((s, i) => Math.round((s / maxes[i]) * 100)) as [
    number,
    number,
    number,
  ];
  const overall = Math.round(
    (sums.reduce((a, b) => a + b, 0) / maxes.reduce((a, b) => a + b, 0)) * 100,
  );

  let tier: Tier;
  let headline: string;
  let summary: string;

  if (overall >= 75) {
    tier = "Scale-ready";
    headline = "Strong foundation, time to accelerate";
    summary =
      "Your operations are well-structured. The biggest opportunity now is deploying AI across your existing systems to compress timelines and reduce overhead.";
  } else if (overall >= 50) {
    tier = "Building";
    headline = "Good bones, but visible gaps";
    summary =
      "You have the right instincts but execution is inconsistent. A targeted ops overhaul across 2 to 3 areas would unlock meaningful capacity and make AI adoption far more effective.";
  } else if (overall >= 25) {
    tier = "Early-stage";
    headline = "Foundations need work before AI can help";
    summary =
      "You're running on intuition and informal systems. AI tools won't fix the underlying issues, you need to build the operational layer first.";
  } else {
    tier = "Pre-ops";
    headline = "Start here before touching AI";
    summary =
      "Right now your biggest risk is scaling chaos, not missing out on AI. The priority is building the baseline processes everything else depends on.";
  }

  return { overall, pillarScores, tier, headline, summary, actions: pillarActions(pillarScores) };
}

export function AiOpsScoreQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(QUESTIONS.length).fill(null),
  );
  const [showResults, setShowResults] = useState(false);

  const result = useMemo(() => (showResults ? scoreQuiz(answers) : null), [showResults, answers]);

  function selectAnswer(i: number) {
    const next = [...answers];
    next[current] = i;
    setAnswers(next);
    setTimeout(() => {
      if (current === QUESTIONS.length - 1) {
        setShowResults(true);
      } else {
        setCurrent(current + 1);
      }
    }, 300);
  }

  function goBack() {
    if (current > 0) setCurrent(current - 1);
  }

  if (showResults && result) {
    return <ResultsScreen result={result} />;
  }

  const q = QUESTIONS[current];
  const progressPct = Math.round((current / QUESTIONS.length) * 100);

  return (
    <div className="bg-mist py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-xl">
          <p className="eyebrow inline-flex">Soch — Ops Score</p>
          <h1 className="text-h2 mt-4">How ready is your business to scale with AI?</h1>
          <p className="lead mt-2">12 questions. 3 minutes. Free.</p>

          <div className="mt-8">
            <div className="flex items-center justify-between text-sm font-medium text-muted">
              <span>{PILLAR_LABELS[q.pillar]}</span>
              <span>
                {current + 1} of {QUESTIONS.length}
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-line">
              <div
                className="h-full rounded-full bg-brand transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8">
            <p className="text-h3 text-ink">
              {current + 1}. {q.text}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {q.options.map((option, i) => {
                const selected = answers[current] === i;
                return (
                  <button
                    key={option.text}
                    type="button"
                    onClick={() => selectAnswer(i)}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                      selected
                        ? "border-ink/45 bg-mist"
                        : "border-line bg-white hover:border-ink/25"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                        selected ? "border-brand bg-brand" : "border-line"
                      }`}
                    >
                      {selected && <Icon name="check" className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                    </span>
                    <span className="text-[0.95rem] text-slate">{option.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              className={`text-sm font-semibold text-muted transition-colors hover:text-ink ${
                current === 0 ? "invisible" : ""
              }`}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsScreen({ result }: { result: ScoreResult }) {
  const { overall, pillarScores, tier, headline, summary, actions } = result;
  const activeSegs = Math.round(overall / 10);

  return (
    <div className="bg-mist py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand">
                AI Ops Assessment
              </p>
              <p className="mt-1 text-sm font-medium text-muted">Your personalised ops report</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              <span className="text-xs font-semibold uppercase tracking-widest text-ink">
                {tier}
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">
                Overall score
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-display text-ink">{overall}</span>
                <span className="text-lg text-muted">/100</span>
              </div>
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full ${i < activeSegs ? "bg-brand" : "bg-line"}`}
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between text-xs text-muted">
                <span>Start</span>
                <span>Build</span>
                <span>Scale</span>
              </div>
              <div className="mt-6 border-t border-line pt-6">
                <p className="text-h3 text-ink">{headline}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">
                Score by pillar
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {pillarScores.map((score, i) => {
                  const style = pillarStyle(score);
                  const colors = {
                    success: "text-leaf",
                    danger: "text-brand-dark",
                    neutral: "text-ink",
                  } as const;
                  const bars = {
                    success: "bg-leaf",
                    danger: "bg-brand",
                    neutral: "bg-ink-soft",
                  } as const;
                  return (
                    <div
                      key={PILLAR_LABELS[i]}
                      className="flex flex-col gap-2 rounded-xl border border-line bg-white p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        {PILLAR_LABELS[i]}
                      </p>
                      <p className={`text-3xl font-light ${colors[style]}`}>{score}%</p>
                      <div className="h-1 rounded-full bg-line">
                        <div
                          className={`h-full rounded-full ${bars[style]}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <p className={`text-xs ${colors[style]}`}>{pillarStatus(score)}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-slate">
                {summary}
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 border-t border-line pt-8 sm:grid-cols-3">
            {actions.map((action, i) => (
              <div
                key={action}
                className="flex items-center gap-4 rounded-xl border border-line bg-white p-4"
              >
                <span className="text-2xl font-bold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {i === 0 ? "Fix first" : i === 1 ? "Then improve" : "Leverage"}
                  </p>
                  <p className="text-sm font-medium text-ink">{action}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-line bg-white p-10 text-center">
            <h2 className="text-h3 text-ink">Want help acting on this?</h2>
            <p className="lead max-w-xl">
              Book a free call and we&rsquo;ll walk through your results and show you where
              automation creates the most leverage in your business.
            </p>
            <Button href={CTAS.primary.href} size="lg" arrow>
              {CTAS.primary.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
