// components/sections/HowWeWork.tsx

import { STEPS } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/Icons";

export function HowWeWork() {
  return (
    <Section className="bg-white">
      <SectionHeading
        title="The Soch Automation Operating System"
        intro="A clear, repeatable process for deploying AI automation in your business."
      />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {STEPS.map((step) => (
          <div key={step.no} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-peach text-brand">
                <Icon name={step.icon} className="h-5.5 w-5.5" />
              </span>
              <span className="text-16 font-semibold text-muted">{step.no}</span>
            </div>
            <h3 className="text-h4">{step.title}</h3>
            <p className="text-slate">{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
