// components/sections/LogoMarquee.tsx
//
// Scrolling row of client logos, each in its own light card/chip.
// Plain <img> (not next/image) — these logos are hotlinked/local static
// assets swapped in ad hoc, so we skip Next's image optimizer entirely.

import { CLIENT_LOGOS } from "@/lib/content";

export function LogoMarquee() {
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="bg-mist py-16 sm:py-20 overflow-hidden">
      <div className="container-x flex flex-col items-center text-center gap-3 mb-10">
        <h2 className="text-h2">Trusted by fast-moving startups</h2>
        <p className="lead max-w-xl">
          We embed into your team and deploy automation systems that run while your people stay
          focused on growth
        </p>
      </div>
      <div className="flex w-max animate-marquee gap-10">
        {logos.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-48 w-56 shrink-0 items-center justify-center rounded-xl border border-line bg-white p-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name.replace(" (name TBC)", "")}
              className="h-14 w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
