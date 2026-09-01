// components/sections/LogoMarquee.tsx
//
// Scrolling row of client logos, unboxed: one quiet caption over a single
// line of desaturated marks that fades out at both edges. No cards - the
// chips used to compete with the logos they held, and a trust strip should
// read as texture under the hero, not as another grid of tiles.
//
// Plain <img> (not next/image) - these logos are hotlinked/local static
// assets swapped in ad hoc, so we skip Next's image optimizer entirely.

import { CLIENT_LOGOS } from "@/lib/content";
import { BareSection } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function LogoMarquee() {
  // Four copies, not two. animate-marquee ends at translateX(-50%), so the
  // count must stay even to loop seamlessly, and the trailing half has to be
  // at least viewport-wide or a gap opens on the right at the end of the
  // cycle. Unboxed marks are narrower than the old 192px chips, so the two
  // sets per half matter more here, not less.
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <BareSection bare className="bg-white overflow-hidden py-7 sm:py-9">
      <Reveal className="container-x flex flex-col items-center text-center mb-5 sm:mb-6">
        <h2 className="text-h3 text-slate">Trusted by fast-moving businesses</h2>
      </Reveal>
      <div className="marquee-fade">
        <div className="flex w-max animate-marquee items-center gap-14 sm:gap-20 lg:gap-24">
          {logos.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="flex shrink-0 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                className="h-12 w-auto object-contain opacity-55 grayscale sm:h-14"
              />
            </div>
          ))}
        </div>
      </div>
    </BareSection>
  );
}
