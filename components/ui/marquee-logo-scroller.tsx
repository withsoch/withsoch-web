// components/ui/marquee-logo-scroller.tsx
//
// Adapted from a shadcn/ui-style community component. This project has no
// shadcn CLI scaffolding (no components.json, no bg-background /
// text-foreground / bg-secondary / text-muted-foreground tokens), so the
// original className set has been mapped onto the tokens that actually
// exist in app/globals.css: bg-white, text-ink, text-slate, bg-mist,
// border-line. See the integration note below for why /components/ui was
// kept as the drop-in path regardless.
//
// Self-contained infinite marquee, pauses on hover. The @keyframes are
// injected via a <style> tag rather than tailwind.config.js because this
// project runs Tailwind v4's CSS-first config (@theme in globals.css) with
// no JS config file to extend.

import React from "react";
import { cn } from "@/lib/utils";

interface Logo {
  src: string;
  alt: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}

interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  logos: Logo[];
  speed?: "normal" | "slow" | "fast";
}

const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
  ({ title, description, logos, speed = "normal", className, ...props }, ref) => {
    const durationMap = {
      normal: "40s",
      slow: "80s",
      fast: "5s",
    };
    const animationDuration = durationMap[speed];

    return (
      <>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>

        <section
          ref={ref}
          aria-label={title}
          className={cn(
            "w-full overflow-hidden rounded-2xl border border-line bg-white text-ink",
            className
          )}
          {...props}
        >
          {/* Header */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-6 border-b border-line pb-6 md:pb-8 lg:grid-cols-[3fr_2fr] lg:gap-8">
              <h2 className="text-h4 text-balance text-ink">{title}</h2>
              <p className="self-start text-balance text-16 leading-relaxed text-slate lg:justify-self-end">
                {description}
              </p>
            </div>
          </div>

          {/* Marquee */}
          <div
            className="w-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div
              className="flex w-max items-center gap-4 py-4 pr-4 transition-all duration-300 ease-in-out hover:[animation-play-state:paused]"
              style={{
                animation: `marquee ${animationDuration} linear infinite`,
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="group relative flex h-24 w-40 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-mist"
                >
                  <div
                    style={
                      {
                        "--from": logo.gradient.from,
                        "--via": logo.gradient.via,
                        "--to": logo.gradient.to,
                      } as React.CSSProperties
                    }
                    className="absolute inset-0 scale-150 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)] opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="relative h-3/4 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
);

MarqueeLogoScroller.displayName = "MarqueeLogoScroller";

export { MarqueeLogoScroller };
export type { Logo as MarqueeLogo };
