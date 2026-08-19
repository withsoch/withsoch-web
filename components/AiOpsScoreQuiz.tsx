// components/AiOpsScoreQuiz.tsx
//
// The interactive engine behind /ai-ops-score. All copy, questions, options,
// and scoring-tier text live in lib/ai-ops-quiz-content.ts (the single
// source of truth, ported from the Webflow export) - this file only holds
// the quiz flow (question → pre-gate → results → email gate → success),
// the scoring math, and presentation.

"use client";

import { useEffect, useMemo, useState } from "react";
import { CTAS } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/Icons";
import {
  PRE_GATE_QUESTIONS,
  QUIZ_QUESTIONS,
  SCORE_TIERS,
  PILLAR_LABELS,
  PILLAR_ACTION_LABELS,
  ACTION_SLOT_LABELS,
  QUIZ_COPY,
  WEBHOOK_URL,
  QUIZ_CAL_BOOKING_URL,
  type Pillar,
  type ScoreTier,
} from "@/lib/ai-ops-quiz-content";

const PILLAR_ORDER: Pillar[] = ["ops_readiness", "automation", "team_efficiency"];

const PILLAR_ICONS: Record<Pillar, IconName> = {
  ops_readiness: "shield",
  automation: "spark",
  team_efficiency: "profile",
};

type Stage = "quiz" | "pregate" | "results";

type ScoreResult = {
  overall: number;
  pillarScores: Record<Pillar, number>;
  tier: ScoreTier;
  actions: { slot: (typeof ACTION_SLOT_LABELS)[number]; label: string }[];
};

function pillarStyle(pct: number): "success" | "danger" | "neutral" {
  if (pct >= 65) return "success";
  if (pct <= 40) return "danger";
  return "neutral";
}

function pillarStatus(pct: number): string {
  return QUIZ_COPY.results.pillarStatus[pillarStyle(pct)];
}

function pillarActions(pillarScores: Record<Pillar, number>): ScoreResult["actions"] {
  const sorted = [...PILLAR_ORDER].sort((a, b) => pillarScores[a] - pillarScores[b]);
  return sorted.map((pillar, i) => ({
    slot: ACTION_SLOT_LABELS[i],
    label: PILLAR_ACTION_LABELS[pillar],
  }));
}

function scoreQuiz(answers: (number | null)[]): ScoreResult {
  const sums: Record<Pillar, number> = { ops_readiness: 0, automation: 0, team_efficiency: 0 };
  const maxes: Record<Pillar, number> = { ops_readiness: 0, automation: 0, team_efficiency: 0 };

  QUIZ_QUESTIONS.forEach((q, i) => {
    const v = answers[i] !== null ? q.options[answers[i] as number].points : 0;
    sums[q.pillar] += v;
    maxes[q.pillar] += 3;
  });

  const pillarScores = PILLAR_ORDER.reduce((acc, pillar) => {
    acc[pillar] = Math.round((sums[pillar] / maxes[pillar]) * 100);
    return acc;
  }, {} as Record<Pillar, number>);

  const totalSum = PILLAR_ORDER.reduce((a, p) => a + sums[p], 0);
  const totalMax = PILLAR_ORDER.reduce((a, p) => a + maxes[p], 0);
  const overall = Math.round((totalSum / totalMax) * 100);

  const tier =
    SCORE_TIERS.find((t) => overall >= t.min && overall <= t.max) ?? SCORE_TIERS[SCORE_TIERS.length - 1];

  return { overall, pillarScores, tier, actions: pillarActions(pillarScores) };
}

export function AiOpsScoreQuiz() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(QUIZ_QUESTIONS.length).fill(null),
  );
  const [pregateAnswers, setPregateAnswers] = useState<(number | null)[]>(
    new Array(PRE_GATE_QUESTIONS.length).fill(null),
  );

  const result = useMemo(
    () => (stage === "results" ? scoreQuiz(answers) : null),
    [stage, answers],
  );

  function selectAnswer(i: number) {
    const next = [...answers];
    next[current] = i;
    setAnswers(next);
    setTimeout(() => {
      if (current === QUIZ_QUESTIONS.length - 1) {
        setStage("pregate");
      } else {
        setCurrent(current + 1);
      }
    }, 300);
  }

  function goBack() {
    if (current > 0) setCurrent(current - 1);
  }

  function selectPregateAnswer(step: number, i: number) {
    const next = [...pregateAnswers];
    next[step] = i;
    setPregateAnswers(next);
  }

  function pregateNext() {
    setStage("results");
  }

  function pregateBack() {
    setStage("quiz");
  }

  if (stage === "pregate") {
    const allAnswered = pregateAnswers.every((a) => a !== null);
    return (
      <div className="bg-mist py-20 sm:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-xl">
            <p className="eyebrow inline-flex">{QUIZ_COPY.preGate.eyebrow}</p>
            <h1 className="text-h2 mt-4">{QUIZ_COPY.preGate.heading}</h1>
            <p className="lead mt-2">{QUIZ_COPY.preGate.subcopy}</p>

            <div className="mt-8 flex flex-col gap-6">
              {PRE_GATE_QUESTIONS.map((pq, step) => (
                <div
                  key={pq.id}
                  className="rounded-2xl border border-line bg-white p-6 sm:p-8"
                >
                  <p className="text-h3 text-ink">{pq.question}</p>
                  <div className="mt-6 flex flex-col gap-3">
                    {pq.options.map((option, i) => {
                      const selected = pregateAnswers[step] === i;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => selectPregateAnswer(step, i)}
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
                            {selected && (
                              <Icon name="check" className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                            )}
                          </span>
                          <span className="text-[0.95rem] text-slate">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={pregateBack}
                className="text-sm font-semibold text-muted transition-colors hover:text-ink"
              >
                {QUIZ_COPY.preGate.backButton}
              </button>
              <Button type="button" onClick={pregateNext} disabled={!allAnswered}>
                {QUIZ_COPY.preGate.nextButton}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "results" && result) {
    const pregateValues = PRE_GATE_QUESTIONS.reduce(
      (acc, pq, i) => {
        acc[pq.id] = pregateAnswers[i] !== null ? pq.options[pregateAnswers[i] as number] : null;
        return acc;
      },
      {} as Record<string, string | null>,
    );
    return <ResultsScreen result={result} pregateValues={pregateValues} />;
  }

  const q = QUIZ_QUESTIONS[current];
  const progressPct = Math.round((current / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="bg-mist py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-xl">
          <p className="eyebrow inline-flex">{QUIZ_COPY.intro.eyebrow}</p>
          <h1 className="text-h2 mt-4">{QUIZ_COPY.intro.headline}</h1>
          <p className="lead mt-2">{QUIZ_COPY.intro.subheading}</p>

          <div className="mt-8">
            <div className="flex items-center justify-between text-sm font-medium text-muted">
              <span>{PILLAR_LABELS[q.pillar]}</span>
              <span>
                {current + 1} of {QUIZ_QUESTIONS.length}
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
              {current + 1}. {q.question}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {q.options.map((option, i) => {
                const selected = answers[current] === i;
                return (
                  <button
                    key={option.label}
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
                    <span className="text-[0.95rem] text-slate">{option.label}</span>
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

function EmailGate({
  result,
  pregateValues,
}: {
  result: ScoreResult;
  pregateValues: Record<string, string | null>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The plain `<iframe src="https://cal.com/...">` this used to be gets
  // refused by Cal.com's frame-ancestors policy on the raw booking page
  // (shows as a blank/broken frame). Cal.com's own inline-embed script
  // talks to app.cal.com instead, which is built to be framed, so load
  // that script + init the widget once the success screen is showing.
  useEffect(() => {
    if (!submitted) return;
    const calLink = QUIZ_CAL_BOOKING_URL.replace(/^https?:\/\/cal\.com\//, "");

    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    (window as any).Cal("init", "quiz", { origin: "https://cal.com" });
    (window as any).Cal.ns.quiz("inline", {
      elementOrSelector: "#cal-inline-quiz",
      calLink,
      layout: "month_view",
    });
  }, [submitted]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          team_size: pregateValues.team_size,
          intent: pregateValues.intent,
          overall: result.overall,
          pillarScores: result.pillarScores,
          tier: result.tier.label,
        }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your report. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="mt-12 rounded-2xl border border-line bg-white p-10 text-center">
        <h2 className="text-h3 text-ink">{QUIZ_COPY.success.heading}</h2>
        <p className="lead mt-2 max-w-xl mx-auto">{QUIZ_COPY.success.message(name || "there")}</p>
        <p className="mt-6 text-sm font-medium text-muted">{QUIZ_COPY.success.calBookingLine}</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-line">
          <div id="cal-inline-quiz" className="h-[600px] w-full" />
        </div>
        <p className="mt-3 text-sm">
          <a
            href={QUIZ_CAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand underline underline-offset-2"
          >
            Calendar not loading? Open the booking page in a new tab.
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-2xl border border-line bg-white p-8 sm:p-10">
      <h2 className="text-h3 text-ink">{QUIZ_COPY.emailGate.heading}</h2>
      <p className="lead mt-2 max-w-xl">{QUIZ_COPY.emailGate.subcopy}</p>

      <p className="mt-6 text-xs font-bold uppercase tracking-widest text-muted">
        {QUIZ_COPY.emailGate.whatsInsideLabel}
      </p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {QUIZ_COPY.emailGate.whatsInsideBullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-slate">
            <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" strokeWidth={3} />
            {bullet}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          required
          placeholder={QUIZ_COPY.emailGate.fields.name.placeholder}
          autoComplete={QUIZ_COPY.emailGate.fields.name.autocomplete}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-ink/45 sm:w-1/3"
        />
        <input
          type="email"
          required
          placeholder={QUIZ_COPY.emailGate.fields.email.placeholder}
          autoComplete={QUIZ_COPY.emailGate.fields.email.autocomplete}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-ink/45 sm:flex-1"
        />
        <Button type="submit" disabled={sending}>
          {sending ? QUIZ_COPY.emailGate.submitButtonSending : QUIZ_COPY.emailGate.submitButton}
        </Button>
      </form>
      {error && <p className="mt-3 text-sm text-brand-dark">{error}</p>}
    </div>
  );
}

function ResultsScreen({
  result,
  pregateValues,
}: {
  result: ScoreResult;
  pregateValues: Record<string, string | null>;
}) {
  const { overall, pillarScores, tier, actions } = result;
  const activeSegs = Math.round(overall / 10);

  return (
    <div className="bg-mist py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow inline-flex">{QUIZ_COPY.results.eyebrow}</p>
              <p className="mt-2 text-sm font-medium text-muted">
                {QUIZ_COPY.results.reportDatePrefix}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              <span className="text-xs font-semibold uppercase tracking-widest text-ink">
                {tier.label}
              </span>
            </div>
          </div>

          <Reveal>
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted">
                  {QUIZ_COPY.results.overallScoreLabel}
                </p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-display text-ink">{overall}</span>
                  <span className="text-lg text-muted">{QUIZ_COPY.results.scoreDenominator}</span>
                </div>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const segStyle = pillarStyle(i * 10 + 5);
                    const segColors = {
                      success: "bg-leaf",
                      danger: "bg-brand-deep",
                      neutral: "bg-brand",
                    } as const;
                    return (
                      <span
                        key={i}
                        className={`h-3 flex-1 rounded-full ${
                          i < activeSegs ? segColors[segStyle] : "bg-line"
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted">
                  {QUIZ_COPY.results.segLabels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
                <div className="mt-6 border-t border-line pt-6">
                  <p className="text-h3 text-ink">{tier.headline}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted">
                  {QUIZ_COPY.results.pillarsEyebrow}
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {PILLAR_ORDER.map((pillar, i) => {
                    const score = pillarScores[pillar];
                    const style = pillarStyle(score);
                    const colors = {
                      success: "text-leaf",
                      danger: "text-brand-dark",
                      neutral: "text-ink",
                    } as const;
                    const bars = {
                      success: "bg-leaf",
                      danger: "bg-brand-dark",
                      neutral: "bg-brand",
                    } as const;
                    const iconWash = {
                      success: "bg-leaf/10 text-leaf",
                      danger: "bg-peach text-brand-dark",
                      neutral: "bg-mist text-ink-soft",
                    } as const;
                    return (
                      <Reveal key={pillar} delay={i * 0.08}>
                        <div className="flex h-full flex-col gap-3 rounded-xl border border-line bg-white p-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconWash[style]}`}
                            >
                              <Icon name={PILLAR_ICONS[pillar]} className="h-4 w-4" />
                            </span>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                              {PILLAR_LABELS[pillar]}
                            </p>
                          </div>
                          <p className={`text-3xl font-light ${colors[style]}`}>{score}%</p>
                          <div className="h-2.5 rounded-full bg-line">
                            <div
                              className={`h-full rounded-full ${bars[style]}`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <p className={`text-xs ${colors[style]}`}>{pillarStatus(score)}</p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
                <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-slate">
                  {tier.summary}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-3 border-t border-line pt-8 sm:grid-cols-3">
            {actions.map((action, i) => (
              <Reveal key={action.label} delay={i * 0.08}>
                <div className="flex h-full items-center gap-4 rounded-xl border border-line bg-white p-4">
                  <span className="text-2xl font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {action.slot}
                    </p>
                    <p className="text-sm font-medium text-ink">{action.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <EmailGate result={result} pregateValues={pregateValues} />

          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-forest px-6 py-14 text-center sm:px-10">
            <h2 className="text-h2 text-white">Want help acting on this?</h2>
            <p className="lead max-w-xl text-white/75">
              Book a free call and we&rsquo;ll walk through your results and show you where
              automation creates the most leverage in your business.
            </p>
            <Button href={CTAS.primary.href} variant="light" size="lg" arrow>
              {CTAS.primary.label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
