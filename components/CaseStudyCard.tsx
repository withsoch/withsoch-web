// components/CaseStudyCard.tsx

import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { Icon } from "@/components/Icons";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="group flex h-full flex-col gap-4 rounded-xl border border-line bg-white p-6 transition-colors hover:border-ink/25">
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
      <div className="rule-dashed my-1" />
      <Link
        href={study.href ?? `/case-studies/${study.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-brand-dark"
      >
        View detail
        <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
