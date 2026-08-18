// components/sections/ServicesFaqSection.tsx
//
// Numbered FAQ accordion for /services, paired with a supporting image.
// Distinct from FaqAccordion.tsx (single-column, unnumbered, used elsewhere) —
// this variant needs numbered items in a 2-column layout, so it's a small
// adapted sibling rather than a reuse of that component.

"use client";

import { useState } from "react";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";

const SERVICES_FAQS = [
  {
    no: "01",
    q: "What does it actually cost, and how quickly will we see ROI?",
    a: "It depends on the engagement. An Automation Audit starts at $1K and gives you a prioritized roadmap within two weeks. An Automation Build starts at $10K and delivers a live, running system within 3–6 weeks. We target high-frequency workflows first, which means most clients recover the investment within their first quarter. Sometimes faster.",
  },
  {
    no: "02",
    q: "How long does implementation take?",
    a: "An Automation Audit wraps in 1–2 weeks. A targeted Automation Build takes 3–6 weeks from kick-off to deployment. A full Automation OS engagement runs 8–16 weeks depending on scope. We don't pad timelines. Once the build is agreed on, we move.",
  },
  {
    no: "03",
    q: "What industries do you work with?",
    a: "We've worked with teams in SaaS, logistics, professional services, fintech, and e-commerce. The industry matters less than the problem. If your team has repetitive workflows, a backlog of manual tasks, or people doing work that software should be handling, the conversation is worth having.",
  },
  {
    no: "04",
    q: "Do we own the systems you build?",
    a: "Yes, fully. We don't lock you into proprietary tools or ongoing retainers just to keep things running. When we hand a system over, we document it, train your team on it, and make sure you can operate it without us. Ownership transfers completely at the end of the engagement.",
  },
  {
    no: "05",
    q: "What is the Soch Automation Operating System?",
    a: "It's our internal framework for how we audit, design, and deploy automation inside a business. Instead of treating every project as a standalone fix, we look at your full operation and build systems that connect. The goal is a foundation that scales with your team, not something that needs rebuilding six months later because the scope was too narrow.",
  },
];

export function ServicesFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="bg-mist">
      <SectionHeading
        title="Frequently asked questions"
        intro="Got questions about our consulting services, process, or working together? Here are some of the most common things clients ask us, with clear, helpful answers."
        align="left"
        maxWidthClassName="max-w-2xl"
      />
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:items-stretch">
        <div className="flex flex-col gap-3">
          {SERVICES_FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.no} className="rounded-xl border border-line bg-white">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-sm font-semibold text-brand">{faq.no}</span>
                    <span className="font-semibold text-ink">{faq.q}</span>
                  </span>
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
                    <p className="px-6 pb-5 pl-[3.25rem] text-slate">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-mist lg:aspect-auto lg:h-full lg:sticky lg:top-24">
          <Image
            src="https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/69282aa85fe2558709b774fc_pexels-yankrukov-8867262.jpg"
            alt="Customer service team working at computers"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
