import { CASE_STUDIES } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CtaBand } from "@/components/sections/CtaBand";

export default function CaseStudiesPage() {
  return (
    <main className="flex-1">
      <PageHero
        heading="Case Studies"
        sub="Real results from automation-first engagements."
      />
      <Section className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>
      <CtaBand />
    </main>
  );
}
