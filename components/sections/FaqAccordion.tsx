// components/sections/FaqAccordion.tsx

"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icons";
import { Button } from "@/components/ui/Button";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="bg-mist" divider>
      {/* Sticky rail + accordion, rather than another centred heading over a
          centred column. Five sections in a row used to share that shape. */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-h2">Common questions</h2>
          <p className="lead mt-4 max-w-sm">
            The things founders usually want nailed down before starting.
          </p>
          <Button href="/contact" variant="secondary" className="mt-7" arrow>
            Ask us anything
          </Button>
        </Reveal>
        <RevealGroup className="flex flex-col gap-3" stagger={0.05}>
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <RevealItem
              key={faq.q}
              className="rounded-xl border border-line bg-white"
            >
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
