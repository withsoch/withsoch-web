// components/sections/Testimonials.tsx

import Image from "next/image";
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
      <div className="mt-14 flex flex-col gap-14 divide-y divide-line">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            className={`grid grid-cols-1 items-center gap-8 sm:grid-cols-[1.3fr_0.7fr] sm:gap-14 ${
              i > 0 ? "pt-14" : ""
            }`}
          >
            <div className="flex flex-col gap-6">
              <span className="eyebrow w-fit">Client feedback</span>
              <blockquote className="text-h4 font-normal leading-snug text-ink">
                {t.quote}
              </blockquote>
              <figcaption>
                <span className="block font-semibold text-ink">{t.name}</span>
                <span className="block text-16 text-muted">{t.role}</span>
              </figcaption>
            </div>
            {t.image ? (
              <Image
                src={t.image}
                alt={t.name}
                width={280}
                height={340}
                className="h-56 w-full rounded-3xl object-cover sm:h-72"
              />
            ) : (
              <span
                className={`flex h-56 w-full items-center justify-center rounded-3xl text-22 font-semibold sm:h-72 ${
                  accentBg[t.accent] ?? accentBg.brand
                }`}
              >
                {t.initials}
              </span>
            )}
          </figure>
        ))}
      </div>
    </Section>
  );
}
