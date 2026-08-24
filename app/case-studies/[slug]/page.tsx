import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/content";
import { CASE_STUDY_DETAILS } from "@/lib/case-studies-detail";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

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
          <div className="flex flex-col justify-center gap-4">
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
            className="aspect-[4/5] w-full rounded-lg object-cover sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:max-h-[680px]"
          />
        </div>
      </section>

      <Reveal as="section">
        <Section tight className="bg-white border-b border-line">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
            {metaRow.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col gap-1.5 sm:pl-8 ${
                  i > 0 ? "sm:border-l sm:border-line" : ""
                }`}
              >
                <span className="text-xs font-medium uppercase tracking-wide text-muted">
                  {item.label}
                </span>
                <span className="text-lg font-semibold text-ink">{item.value}</span>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <Section tight className="bg-white">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
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
              className="aspect-[4/3] w-full rounded-lg object-cover lg:aspect-auto lg:h-full"
            />
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <Section tight className="bg-mist">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-10 lg:grid-cols-2">
            <div className="flex h-full flex-col justify-center gap-6">
              <h2 className="text-h3">What they came to us with.</h2>
              <p className="text-slate">{detail.problem}</p>
            </div>
            <figure className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-white p-8 ring-1 ring-line">
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
      </Reveal>

      <Reveal as="section">
        <Section tight className="bg-white">
          <div className="mx-auto flex max-w-5xl flex-col gap-10">
            <h2 className="text-h3">How we solved it.</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {detail.framework.map((step, i) => (
                <div
                  key={step.title}
                  className="group flex flex-col gap-3 rounded-2xl border border-line bg-mist p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:bg-white hover:shadow-lg"
                >
                  <span className="text-sm font-semibold text-brand transition-transform duration-300 group-hover:translate-x-1">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-h3">{step.title}</h3>
                  <p className="text-slate">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <Section tight className="bg-mist">
          <div className="mx-auto flex max-w-5xl flex-col gap-10">
            <h2 className="text-h3">What shipped.</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {detail.results.map((result) => (
                <div
                  key={result.description}
                  className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-7"
                >
                  <span className="text-[clamp(1.9rem,1.5rem+1.6vw,2.6rem)] font-semibold leading-tight tracking-tight text-brand">
                    {result.value}
                  </span>
                  <p className="text-slate">{result.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <CtaBand override={{ buttonHref: "/contact" }} />
      </Reveal>
    </main>
  );
}
