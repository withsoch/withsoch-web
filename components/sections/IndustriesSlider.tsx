// components/sections/IndustriesSlider.tsx
//
// Horizontal scroll row of industries. Cards are bg-mist placeholders for
// now — swap for real photography per Rizwan/Husnain handover.

const INDUSTRIES = [
  "Startups & Venture-backed",
  "Technology & SaaS",
  "Professional & B2B Services",
  "Manufacturing & Distribution",
  "Retail & Services",
];

export function IndustriesSlider() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <div className="flex gap-5 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry}
              className="flex h-40 w-64 shrink-0 snap-start items-end rounded-xl bg-mist p-6"
            >
              <span className="text-h3">{industry}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
