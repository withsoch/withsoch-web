import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/content";
import { CASE_STUDY_DETAILS } from "@/lib/case-studies-detail";
import { Section } from "@/components/ui/Section";
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
      <section className="border-b border-line bg-mist">
        <div className="container-x grid grid-cols-1 items-stretch gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col gap-4">
            <span className="eyebrow w-fit">{study.category}</span>
            <h1 className="text-display text-[clamp(2.5rem,1.5rem+3.2vw,3.9rem)]">{study.title}</h1>
            <p className="lead mt-2 max-w-2xl">{study.summary}</p>

            <div className="mt-6 border-t border-line pt-6 grid grid-cols-3 gap-4">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col gap-1">
                  <span className="text-h3 text-brand">{metric.value}</span>
                  <span className="text-sm text-muted">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          <img
            src={detail.heroImage}
            alt={`${study.company} case study hero`}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </section>

      <Section tight className="bg-white border-b border-line">
        <div className="flex flex-wrap gap-x-10 gap-y-4">
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
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="eyebrow w-fit">Overview</span>
            <h2 className="text-h3">The context behind the work.</h2>
            {detail.overview.map((paragraph, i) => (
              <p key={i} className="text-slate">
                {paragraph}
              </p>
            ))}
          </div>
          <img
            src={detail.overviewImage}
            alt={`${study.company} overview`}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </Section>

      <Section className="bg-mist">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2 className="text-h3">What they came to us with.</h2>
            <p className="text-slate">{detail.problem}</p>
          </div>
          <figure className="flex flex-col gap-6 rounded-2xl bg-white p-8 ring-1 ring-line">
            <span className="font-display text-4xl leading-none text-brand">&ldquo;</span>
            <blockquote className="font-display text-2xl italic leading-snug text-ink">
              {study.quote}
            </blockquote>
            <figcaption>
              <span className="block font-semibold text-ink">{study.author}</span>
              <span className="block text-sm text-muted">{study.authorRole}</span>
            </figcaption>
          </figure>
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

      <CtaBand override={{ buttonHref: "/contact" }} />
    </main>
  );
}
