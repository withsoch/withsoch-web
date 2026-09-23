// components/sections/ThankYouFaq.tsx
//
// Same sticky-rail + accordion shape as the site's FaqAccordion, scoped to
// "what happens on this call" rather than the general-site FAQ list, so the
// thank-you page can drop it in as one self-contained section.

"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icons";
import { Button } from "@/components/ui/Button";

const FAQS = [
  {
    q: "What does the call actually cover?",
    a: "We'll walk through what you're trying to automate or fix, where the current process breaks down, and whether Soch is a fit. You'll leave with a clear next step either way - not a sales pitch.",
  },
  {
    q: "How does working together work?",
    a: "If it's a fit, we scope a first project with a fixed outcome and timeline. No open-ended retainers to start - we'd rather earn the next project than lock you into one.",
  },
  {
    q: "What should I have ready?",
    a: "A rough sense of the process or workflow that's costing you time, and who's involved in it today. Numbers help but aren't required - we'll dig into specifics on the call.",
  },
];

export function ThankYouFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section className="bg-mist" divider>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-h2">Still deciding what to bring?</h2>
          <p className="text-lead mt-4 max-w-sm">
            A few things people usually ask before their first call with us.
          </p>
          <Button href="/contact" variant="secondary" className="mt-7" arrow>
            Ask us anything
          </Button>
        </Reveal>
        <RevealGroup className="flex flex-col gap-3" stagger={0.05}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <RevealItem key={faq.q} className="rounded-xl border border-line bg-white">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-ink">{faq.q}</span>
                  <Icon
                    name="chevron"
                    className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-slate">{faq.a}</p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
