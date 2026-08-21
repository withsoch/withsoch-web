// components/sections/FaqAccordion.tsx

"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="bg-charcoal">
      <SectionHeading
        title="Common Questions"
        align="center"
        titleClassName="text-h2 text-white"
      />
      <div className="mt-14 mx-auto flex max-w-3xl flex-col gap-3">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.q}
              className="rounded-xl border border-white/10 bg-white/5"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <Icon
                  name="chevron"
                  className={`h-5 w-5 shrink-0 text-white/50 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-white/70">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
