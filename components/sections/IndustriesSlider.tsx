// components/sections/IndustriesSlider.tsx
//
// Horizontal scroll row of industries. Full-bleed photo cards with a flat
// dark overlay panel carrying the industry name; arrow buttons (top-right,
// next to the heading) drive the scroll instead of the native scrollbar.

"use client";

import { useRef } from "react";
import { Icon } from "@/components/Icons";

const INDUSTRIES = [
  {
    name: "Startups & Venture-backed",
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

const CARD_WIDTH = 320; // px, matches w-80 below
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
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-h2 text-ink">Automating growth across industries</h2>
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
        </div>

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide"
        >
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.name}
              className="relative h-80 w-80 shrink-0 snap-start overflow-hidden rounded-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external CDN photo, no local optimization needed */}
              <img
                src={industry.image}
                alt={industry.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-black/45" />
              <span className="absolute bottom-4 left-5 right-5 text-h3 text-cream">
                {industry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
