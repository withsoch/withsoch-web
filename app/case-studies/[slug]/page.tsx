import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/content";
import { CASE_STUDY_DETAILS } from "@/lib/case-studies-detail";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  const detail = CASE_STUDY_DETAILS[slug];

  if (!study || !detail) {
    notFound();
  }

  const metaRow = [
    { label: "Industry", value: study.industry },
    { label: "Region", value: study.region },
    { label: "Duration", value: study.duration },
    { label: "Service", value: study.service },
  ];

  return (
    <main className="flex-1">
      <PageHero eyebrow={study.category} heading={study.title} sub={study.summary} />

      <Section tight className="bg-mist border-b border-line">
        <nav className="text-sm text-muted">
          <Link href="/case-studies" className="hover:text-ink">
            Case Studies
          </Link>{" "}
          / <span className="text-ink">{study.company}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1">
              <span className="text-display text-brand">{metric.value}</span>
              <span className="text-sm text-muted">{metric.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8">
          {metaRow.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col gap-1 pt-4 sm:pt-0 ${
                i > 0 ? "rule-dashed sm:border-t-0 sm:border-l sm:pl-10 sm:border-line" : ""
              }`}
            >
              <span className="text-sm text-muted">{item.label}</span>
              <span className="font-semibold text-ink">{item.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <h2 className="text-h3">The context behind the work.</h2>
          {detail.overview.map((paragraph, i) => (
            <p key={i} className="text-slate">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section className="bg-mist">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-h3">What they came to us with.</h2>
            <p className="text-slate">{detail.problem}</p>
          </div>
          <blockquote className="border-l-2 border-brand pl-6 font-display text-2xl italic leading-snug text-ink">
            &ldquo;{study.quote}&rdquo;
            <footer className="mt-4 text-base not-italic font-sans">
              <span className="block font-semibold text-ink">{study.author}</span>
              <span className="block text-sm text-muted">{study.authorRole}</span>
            </footer>
          </blockquote>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <h2 className="text-h3">How we solved it.</h2>
          <div className="flex flex-col gap-10">
            {detail.framework.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-brand">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3">{step.title}</h3>
                <p className="text-slate">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-mist">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <h2 className="text-h3">What shipped.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {detail.results.map((result) => (
              <div key={result.description} className="flex flex-col gap-2">
                <span className="text-display text-brand">{result.value}</span>
                <p className="text-slate">{result.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </main>
  );
}
