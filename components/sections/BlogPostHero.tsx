// components/sections/BlogPostHero.tsx
//
// Hero for an individual /blog/[slug] post. Two-column: category, title and
// meta (date, read time) on the left, the post's own cover photo contained
// in a rounded card on the right - the same split-hero pattern as
// components/sections/BlogHero.tsx, so the listing and detail pages feel
// like one system instead of the old centered/no-image title block.

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

type BlogPostHeroProps = {
  category: string;
  title: string;
  date: string;
  readingTime: number;
  image: string;
};

export function BlogPostHero({ category, title, date, readingTime, image }: BlogPostHeroProps) {
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-x grid grid-cols-1 items-center gap-10 py-10 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:py-14">
        <Reveal>
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="eyebrow w-fit">{category}</span>
            <h1 className="text-h2">{title}</h1>
            <div className="flex items-center gap-2 text-sm text-slate">
              <span>{date}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line shadow-card">
            <Image src={image} alt={title} fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
