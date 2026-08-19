// app/ai-ops-score/page.tsx
//
// Interactive AI Ops Score quiz. Questions, scoring logic, and result-tier
// copy ported from the Webflow export (ai-ops-score.html) - 12 questions
// across 3 pillars (Ops readiness / Automation maturity / Team efficiency),
// each answer worth 0-3 points, scored as a percentage of the max per pillar.

import type { Metadata } from "next";
import { AiOpsScoreQuiz } from "@/components/AiOpsScoreQuiz";

export const metadata: Metadata = {
  title: "AI Ops Score",
  description:
    "Answer 12 questions and get a free personalised ops readiness score. Built for early-stage B2B teams by Soch.",
};

export default function AiOpsScorePage() {
  return (
    <main className="flex-1">
      <AiOpsScoreQuiz />
    </main>
  );
}
