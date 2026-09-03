// components/CaseStudyRowCard.tsx
//
// Case-study index card - image left, tag + title + summary + stats right.
// Reuses the carouselTag/challenge/heroStats fields already wired on
// CASE_STUDIES (lib/content.ts) plus the real hero image already audited
// in CASE_STUDY_DETAILS (lib/case-studies-detail.ts). Light theme card
// recipe (bg-white, border-line, rounded-xl) - same as every other card
// in the codebase.

import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

export function CaseStudyRowCard({
  study,
  heroImage,
}: {
  study: CaseStudy;
  heroImage?: string;
}) {
  const image = heroImage ?? (study.image?.startsWith("http") ? study.image : undefined);

  return (
    <article className="group flex flex-col gap-5 rounded-xl border border-line bg-white p-5 transition-colors hover:border-ink/25 sm:flex-row">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg bg-mist sm:aspect-square sm:w-[38%]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={study.company}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col">
        <span className="mb-3 inline-flex w-fit items-center rounded-full border border-brand/35 px-3 py-1 text-14 font-medium tracking-[0.02em] text-brand-dark">
          {study.carouselTag ?? study.category}
        </span>

        <Link href={study.href ?? `/case-studies/${study.slug}`}>
          <h3 className="text-h4 font-display font-medium text-ink transition-colors group-hover:text-brand-dark">
            {study.title}
          </h3>
        </Link>

        <p className="mt-2 text-16 leading-relaxed text-slate">
          {study.challenge ?? study.summary}
        </p>

        <div className="mt-auto pt-5">
          <div className="rule-dashed mb-4" />
          <div className="grid grid-cols-2 gap-4">
            {(study.heroStats ?? study.metrics.slice(0, 2)).map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-h4 text-brand">{stat.value}</span>
                <span className="text-16 text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
