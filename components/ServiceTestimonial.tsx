// components/ServiceTestimonial.tsx
//
// Single-testimonial spotlight for a service detail page: large light-weight
// quote, ringed avatar, and an accent-colored divider/underline instead of a
// boxed card - distinct from the grid recipe in
// components/sections/Testimonials.tsx.

import Image from "next/image";
import type { Service } from "@/lib/content";

const accentRing: Record<string, string> = {
  brand: "ring-brand/30",
  forest: "ring-forest/30",
  teal: "ring-teal/30",
  leaf: "ring-leaf/30",
};

const accentBorder: Record<string, string> = {
  brand: "border-brand",
  forest: "border-forest",
  teal: "border-teal",
  leaf: "border-leaf",
};

const accentFrom: Record<string, string> = {
  brand: "from-brand",
  forest: "from-forest",
  teal: "from-teal",
  leaf: "from-leaf",
};

type ServiceTestimonialProps = {
  testimonial: NonNullable<Service["testimonial"]>;
};

export function ServiceTestimonial({ testimonial }: ServiceTestimonialProps) {
  const accent = testimonial.accent;
  return (
    <figure className="mx-auto flex max-w-2xl flex-col gap-8">
      <div className={`h-px w-full bg-gradient-to-r ${accentFrom[accent] ?? accentFrom.brand} to-line`} />
      <blockquote className="lead text-ink">{testimonial.quote}</blockquote>
      <figcaption className="flex items-center gap-4">
        {testimonial.image ? (
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={56}
            height={56}
            className={`h-14 w-14 rounded-full object-cover ring-2 ring-offset-2 ring-offset-white ${
              accentRing[accent] ?? accentRing.brand
            }`}
          />
        ) : (
          <span
            className={`inline-flex h-14 w-14 items-center justify-center rounded-full bg-mist text-sm font-semibold text-ink ring-2 ring-offset-2 ring-offset-white ${
              accentRing[accent] ?? accentRing.brand
            }`}
          >
            {testimonial.initials}
          </span>
        )}
        <span className={`flex flex-col gap-1 border-l-2 pl-4 ${accentBorder[accent] ?? accentBorder.brand}`}>
          <span className="font-semibold text-ink">{testimonial.name}</span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {testimonial.role}
          </span>
        </span>
      </figcaption>
      <div className={`h-px w-full bg-gradient-to-r ${accentFrom[accent] ?? accentFrom.brand} to-line`} />
    </figure>
  );
}
