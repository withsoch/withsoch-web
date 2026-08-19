// components/sections/ServiceAccordion.tsx
//
// Interactive accordion for a service detail page's "who it's for / common
// symptoms / our approach / deliverables / outcomes" block. Generic over any
// Service entry so other service pages can adopt the same component. Styled
// to match the homepage ServicesGrid accordion rows (peach icon pill, rounded
// full card, animated height + rotating arrow) for a consistent feel between
// the homepage and service detail pages.

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Service } from "@/lib/content";
import { Icon, type IconName } from "@/components/Icons";

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
  const items: {
    key: ServiceAccordionItemKey;
    title: string;
    icon: IconName;
    content: React.ReactNode;
  }[] = [
    {
      key: "whoItsFor",
      title: "Who it's for",
      icon: "profile",
      content: <p className="text-slate">{service.whoItsFor}</p>,
    },
    {
      key: "commonSymptoms",
      title: "Common symptoms",
      icon: "shield",
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
      icon: "compass",
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
      icon: "audit",
      content: (
        <ul className="flex flex-col gap-3">
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
      icon: "trend",
      content: (
        <ul className="flex flex-col gap-3">
          {service.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3 text-slate">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {outcome}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openKey === item.key;
        return (
          <div
            key={item.key}
            className={`rounded-[28px] border bg-white transition-colors duration-300 ease-in-out ${
              isOpen ? "border-brand/60" : "border-line hover:border-ink/20 hover:bg-mist/40"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : item.key)}
              className="flex w-full items-center gap-4 px-6 py-4.5 text-left"
              aria-expanded={isOpen}
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-peach text-brand">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <span
                className={`text-h3 text-[1.02rem] flex-1 transition-colors duration-300 ease-in-out ${
                  isOpen ? "text-brand" : "text-ink"
                }`}
              >
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="shrink-0"
              >
                <Icon name="arrow" className={`h-5 w-5 ${isOpen ? "text-brand" : "text-muted"}`} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-6 pb-6 pl-[4rem]">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
