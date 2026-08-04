// components/ServiceTestimonial.tsx
//
// Single-testimonial card for a service detail page, reusing the same
// figure/blockquote recipe as components/sections/Testimonials.tsx.

import type { Service } from "@/lib/content";

const accentBg: Record<string, string> = {
  brand: "bg-brand text-white",
  forest: "bg-forest text-white",
  teal: "bg-teal text-white",
  leaf: "bg-leaf text-white",
};

type ServiceTestimonialProps = {
  testimonial: NonNullable<Service["testimonial"]>;
};

export function ServiceTestimonial({ testimonial }: ServiceTestimonialProps) {
  return (
    <figure className="mx-auto flex max-w-2xl flex-col gap-6 rounded-2xl bg-mist p-8 ring-1 ring-line">
      <blockquote className="lead text-ink">&ldquo;{testimonial.quote}&rdquo;</blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
            accentBg[testimonial.accent] ?? accentBg.brand
          }`}
        >
          {testimonial.initials}
        </span>
        <span>
          <span className="block font-semibold text-ink">{testimonial.name}</span>
          <span className="block text-sm text-muted">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
