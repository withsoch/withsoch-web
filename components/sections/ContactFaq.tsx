// components/sections/ContactFaq.tsx
//
// Contact page's FAQ section - page-specific light variant (numbered
// accordion + photo) matching the Webflow reference contact.html. Distinct
// from the shared light FaqAccordion (different copy, different visual
// treatment) so it lives here rather than being merged into it.
//
// The photo column height tracks the accordion column's live height (via
// ResizeObserver) so it grows/shrinks in sync as each answer opens.

"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { CONTACT_FAQS } from "@/lib/content";

export function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [stackHeight, setStackHeight] = useState<number>();

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setStackHeight(entry.contentRect.height));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section className="bg-mist">
      <div className="max-w-2xl">
        <h2 className="text-h2 text-ink">
          Frequently asked <span className="italic text-brand">questions</span>
        </h2>
        <p className="lead mt-4 text-slate">
          Got questions about our B2B consulting services, process, or working together? Here are some of the most
          common things clients ask us, with clear, helpful answers.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-8">
        <div ref={stackRef} className="flex flex-col gap-4">
          {CONTACT_FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-line bg-white px-7 py-6 transition-colors hover:border-ink/25"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-baseline gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="shrink-0 text-muted">{String(i + 1).padStart(2, "0")}.</span>
                  <span className="text-lg font-semibold text-ink">{faq.q}</span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 pl-8 text-slate">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="min-h-[420px] overflow-hidden rounded-2xl transition-[height] duration-300 ease-in-out lg:min-h-0"
          style={stackHeight ? { height: stackHeight } : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/694e7bb13feb48742d0d1386_FAQ%27s.webp"
            alt="Team sitting for customer queries"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
