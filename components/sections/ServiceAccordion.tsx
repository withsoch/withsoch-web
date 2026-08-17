// components/sections/ServiceAccordion.tsx
//
// Interactive accordion for a service detail page's "who it's for / common
// symptoms / our approach / deliverables / outcomes" block. Generic over any
// Service entry so other service pages can adopt the same component.

"use client";

import { useState } from "react";
import type { Service } from "@/lib/content";
import { Icon } from "@/components/Icons";

export type ServiceAccordionItemKey =
  | "whoItsFor"
  | "commonSymptoms"
  | "ourApproach"
  | "deliverables"
  | "outcomes";

type ServiceAccordionProps = {
  service: Service;
  // Controlled mode is opt-in — pages that also render a state-driven visual
  // panel (e.g. the operations service) lift this state up; every other page
  // falls back to the internal default below.
  openKey?: ServiceAccordionItemKey | null;
  onOpenKeyChange?: (key: ServiceAccordionItemKey | null) => void;
};

export function ServiceAccordion({
  service,
  openKey: openKeyProp,
  onOpenKeyChange,
}: ServiceAccordionProps) {
  const [internalOpenKey, setInternalOpenKey] = useState<ServiceAccordionItemKey | null>(
    "whoItsFor"
  );
  // openKeyProp is only ever undefined when the parent isn't controlling this
  // component at all — `null` is a deliberate "everything collapsed" state
  // and must be respected, so we can't use `??` here (it would fall through
  // to internalOpenKey on every close).
  const openKey = onOpenKeyChange ? openKeyProp ?? null : internalOpenKey;
  const setOpenKey = onOpenKeyChange ?? setInternalOpenKey;
  const items: { key: ServiceAccordionItemKey; title: string; content: React.ReactNode }[] = [
    {
      key: "whoItsFor",
      title: "Who it's for",
      content: <p className="text-slate">{service.whoItsFor}</p>,
    },
    {
      key: "commonSymptoms",
      title: "Common symptoms",
      content: (
        <ul className="flex flex-col gap-3">
          {service.commonSymptoms.map((symptom) => (
            <li key={symptom} className="flex items-start gap-3 text-slate">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {symptom}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "ourApproach",
      title: "Our approach",
      content: (
        <div className="flex flex-col gap-6">
          {service.ourApproach.map((step, i) => (
            <div key={step} className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-brand">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-slate">{step}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "deliverables",
      title: "Deliverables",
      content: (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-slate">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "outcomes",
      title: "Outcomes",
      content: (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {service.outcomes.map((outcome) => (
            <li key={outcome} className="flex flex-col gap-2 border-l-2 border-brand pl-4">
              <span className="text-slate">{outcome}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const isOpen = openKey === item.key;
        return (
          <div
            key={item.key}
            className={`rounded-xl border bg-white transition-colors ${
              isOpen ? "border-brand/60" : "border-line"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : item.key)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className={`text-h3 text-[1.05rem] ${isOpen ? "text-brand" : "text-ink"}`}>
                {item.title}
              </span>
              <Icon
                name="arrow"
                className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-90 text-brand" : "text-muted"
                }`}
              />
            </button>
            {isOpen && <div className="px-6 pb-6">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
