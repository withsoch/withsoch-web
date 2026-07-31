// components/sections/FaqAccordion.tsx

"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="bg-mist">
      <SectionHeading title="Common Questions" />
      <div className="mt-14 mx-auto max-w-3xl flex flex-col">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.q} className="rule-dashed">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-h3 text-[1.1rem]">{faq.q}</span>
                <Icon
                  name="arrow"
                  className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
              {isOpen && <p className="pb-6 text-slate">{faq.a}</p>}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
