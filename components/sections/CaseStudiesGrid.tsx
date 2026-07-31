// components/sections/CaseStudiesGrid.tsx

import { CASE_STUDIES } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { CaseStudyCard } from "@/components/CaseStudyCard";

export function CaseStudiesGrid() {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CASE_STUDIES.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </Section>
  );
}
