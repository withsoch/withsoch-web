// components/sections/Testimonials.tsx

import { TESTIMONIALS } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";

const accentBg: Record<string, string> = {
  brand: "bg-brand text-white",
  forest: "bg-forest text-white",
  teal: "bg-teal text-white",
  leaf: "bg-leaf text-white",
};

export function Testimonials() {
  return (
    <Section className="bg-white">
      <SectionHeading title="What founders say" />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col gap-6 rounded-2xl bg-mist p-8 ring-1 ring-line"
          >
            <blockquote className="lead text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  accentBg[t.accent] ?? accentBg.brand
                }`}
              >
                {t.initials}
              </span>
              <span>
                <span className="block font-semibold text-ink">{t.name}</span>
                <span className="block text-sm text-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
