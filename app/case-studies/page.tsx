import { CASE_STUDIES } from "@/lib/content";
import { CASE_STUDY_DETAILS } from "@/lib/case-studies-detail";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { CaseStudyRowCard } from "@/components/CaseStudyRowCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export default function CaseStudiesPage() {
  return (
    <main className="flex-1">
      <PageHero
        heading="Case Studies"
        sub="Real results from automation-first engagements."
        align="center"
      />
      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {CASE_STUDIES.map((study, i) => (
            <Reveal key={study.slug} delay={(i % 2) * 0.08}>
              <CaseStudyRowCard
                study={study}
                heroImage={CASE_STUDY_DETAILS[study.slug]?.heroImage}
              />
            </Reveal>
          ))}
        </div>
      </Section>
        <CtaBand />
    </main>
  );
}
