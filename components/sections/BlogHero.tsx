// components/sections/BlogHero.tsx
//
// Dedicated hero for /blog. Two-column: the heading block on the left and a
// contained, rounded photographic image on the right (a workflow-mapping
// whiteboard session - sticky notes, laptop, hand-drawn automation flow).
// Each half enters with its own scroll-triggered Reveal.

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const TOPICS = ["Automation", "AI Agents", "Case Studies", "Ops Playbooks"];

export function BlogHero() {
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-x grid grid-cols-1 items-center gap-10 py-12 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
        <Reveal>
          <div className="flex max-w-xl flex-col gap-5">
            <span className="eyebrow w-fit">Blog</span>
            <h1 className="text-h1-page">
              Our <span className="italic text-brand">Blog</span>
            </h1>
            <p className="text-lead max-w-lg">
              Ideas, playbooks, and field notes from building AI automation systems.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {TOPICS.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line shadow-card">
            <Image
              src="/images/blog/blog-hero-ops-field-notes.webp"
              alt="A workflow mapped on a whiteboard with sticky notes next to an open laptop, representing playbooks for AI automation"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
