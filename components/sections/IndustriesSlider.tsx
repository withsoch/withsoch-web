// components/sections/IndustriesSlider.tsx
//
// Horizontal scroll row of industries. Full-bleed photo cards with a flat
// dark overlay panel carrying the industry name; arrow buttons (top-right,
// next to the heading) drive the scroll instead of the native scrollbar.

"use client";

import { useRef } from "react";
import { Icon } from "@/components/Icons";
import { BareSection } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const INDUSTRIES = [
  {
    name: "Businesses & Venture-backed",
    image:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a060a71137967408a50f53d_Editorial%20photograph%20A%20compact%20openplan%20office%20with%20expose_row42.avif",
  },
  {
    name: "Technology & SaaS",
    image:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a060ae79be1975c6e984b1c_Editorial%20photograph%20extreme%20closeup%20Hands%20on%20a%20mechanica_row43.avif",
  },
  {
    name: "Professional & B2B Services",
    image:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a325b9b0c2c4374e36d212e_6a060b4f41927b1221bbe811_Editorial%20photograph%20A%20minimal%20private%20office%20A%20single%20per_row44.webp",
  },
  {
    name: "Manufacturing & Distribution",
    image:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a325a884bf6ee27f1f1677e_Industty.webp",
  },
  {
    name: "Retail & Services",
    image:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/694be13c813e5a356902b638_693802a7cef1fe2e8de4272e_retail_service_compressed_optimized.avif",
  },
];

const CARD_WIDTH = 420; // px, matches w-[420px] below
const CARD_GAP = 20; // px, matches gap-5 below

export function IndustriesSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    trackRef.current?.scrollBy({
      left: direction * (CARD_WIDTH + CARD_GAP),
      behavior: "smooth",
    });
  }

  return (
    <BareSection className="bg-mist" tight divider>
      <Reveal className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] mb-10 flex items-start justify-between gap-4 pl-[calc(1.5rem+5px)] pr-[calc(1.5rem+5px)] sm:mb-12 sm:pl-[calc(2rem+5px)] sm:pr-[calc(2rem+5px)] lg:pl-[calc(2.5rem+5px)] lg:pr-[calc(2.5rem+5px)]">
        <h2 className="text-h2 text-ink text-left">Automating growth across industries</h2>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll industries left"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink/45"
          >
            <Icon name="chevron" className="h-4 w-4 rotate-90" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll industries right"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink/45"
          >
            <Icon name="chevron" className="h-4 w-4 -rotate-90" />
          </button>
        </div>
      </Reveal>

      <div
        ref={trackRef}
        className="flex w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] gap-5 overflow-x-auto pb-2 pl-[calc(1.5rem+5px)] pr-[calc(1.5rem+5px)] sm:pl-[calc(2rem+5px)] sm:pr-[calc(2rem+5px)] lg:pl-[calc(2.5rem+5px)] lg:pr-[calc(2.5rem+5px)] snap-x snap-mandatory scrollbar-hide"
      >
        {INDUSTRIES.map((industry) => (
          <div
            key={industry.name}
            className="group relative h-[380px] w-[420px] shrink-0 snap-start overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- external CDN photo, no local optimization needed */}
            <img
              src={industry.image}
              alt={industry.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className="absolute bottom-5 left-5 right-5 text-xl font-medium leading-snug text-cream">
              {industry.name}
            </span>
          </div>
        ))}
      </div>
    </BareSection>
  );
}
