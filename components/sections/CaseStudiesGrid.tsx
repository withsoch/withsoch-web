// components/sections/CaseStudiesGrid.tsx

import Link from "next/link";
import { CASE_STUDIES } from "@/lib/content";
import { Section } from "@/components/ui/Section";

export function CaseStudiesGrid() {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CASE_STUDIES.map((study) => (
          <div
            key={study.slug}
            className="flex flex-col gap-4 rounded-2xl bg-mist p-7 ring-1 ring-line"
          >
            <span className="eyebrow w-fit">{study.category}</span>
            <h3 className="text-h3">{study.title}</h3>
            <p className="text-slate line-clamp-2">{study.summary}</p>
            <div className="mt-1 grid grid-cols-2 gap-4">
              {study.metrics.slice(0, 2).map((metric) => (
                <div key={metric.label} className="flex flex-col gap-1">
                  <span className="text-h3 text-brand">{metric.value}</span>
                  <span className="text-sm text-muted">{metric.label}</span>
                </div>
              ))}
            </div>
            <Link
              href={study.href ?? `/case-studies/${study.slug}`}
              className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-brand"
            >
              View detail
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
