"use client";

// components/sections/CaseStudiesCarousel.tsx
//
// Single-slide case-study carousel for the homepage. Structure and
// interaction logic (dot nav, prev/next arrows, keyboard arrows, touch
// swipe, translateX track transition) ported 1:1 from the real Webflow
// custom code in `case-studies-carousel-source.html`, restyled onto the
// light Soch design system (see DESIGN.md) instead of the source's dark
// cream-on-black theme.

import Link from "next/link";
import { useRef, useState } from "react";
import { CASE_STUDIES } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icons";

const SWIPE_THRESHOLD = 50;

export function CaseStudiesCarousel() {
  const slides = CASE_STUDIES;
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  function goTo(n: number) {
    setCurrent(((n % total) + total) % total);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      goTo(current + (diff > 0 ? 1 : -1));
    }
  }

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[96rem] px-6 lg:px-10">
        <div
          className="overflow-hidden rounded-2xl border border-line focus:outline-none"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex items-stretch transition-transform duration-[550ms] ease-[cubic-bezier(.65,0,.35,1)]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((study, i) => (
              <article
                key={study.slug}
                className="flex w-full shrink-0 grow-0 basis-full flex-col bg-cream"
                aria-hidden={i !== current}
              >
                <div className="flex flex-1 flex-col px-8 pt-8 max-[820px]:px-5 max-[820px]:pt-5">
                  <span className="mb-3.5 inline-flex w-fit items-center rounded-full border border-brand/35 px-3 py-1 text-[0.8rem] font-medium tracking-[0.02em] text-brand-dark max-[820px]:mb-2.5 max-[820px]:px-2.5 max-[820px]:text-xs">
                    {study.carouselTag ?? study.category}
                  </span>

                  <div className="mb-4 flex min-h-[3.5em] items-center max-[820px]:mb-4 max-[820px]:min-h-0 max-[820px]:items-start">
                    <h2 className="text-h3 font-display font-medium text-ink max-[820px]:text-xl max-[390px]:text-lg">
                      {study.title}
                    </h2>
                  </div>

                  <div className="grid flex-1 grid-cols-2 gap-7 max-[820px]:flex max-[820px]:grid-cols-1 max-[820px]:flex-col max-[820px]:gap-4">
                    <div className="group relative min-h-[360px] overflow-hidden rounded-2xl bg-mist max-[820px]:min-h-0 max-[820px]:pb-[62%]">
                      {study.image && study.image.startsWith("http") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={study.image}
                          alt={study.company}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      ) : null}
                    </div>

                    <div className="flex h-full flex-col justify-between pb-7 max-[820px]:pb-0">
                      <div>
                        <div className="mb-1 text-[1.05rem] font-semibold text-ink max-[820px]:text-[0.95rem]">
                          {study.company}
                        </div>
                        <div className="mb-4 inline-block w-fit rounded-full border border-line bg-white px-3 py-0.5 text-xs text-muted max-[820px]:mb-3.5 max-[820px]:text-[0.7rem]">
                          {study.region} &nbsp;·&nbsp; {study.duration}{" "}
                          &nbsp;·&nbsp; {study.service}
                        </div>

                        <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.05em] text-brand max-[820px]:text-[0.7rem]">
                          Challenge
                        </span>
                        <p className="mb-4 text-[0.95rem] leading-relaxed text-slate max-[820px]:mb-3 max-[820px]:text-[0.82rem]">
                          {study.challenge}
                        </p>

                        <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.05em] text-brand max-[820px]:text-[0.7rem]">
                          Solution
                        </span>
                        <p className="text-[0.95rem] leading-relaxed text-slate max-[820px]:text-[0.82rem]">
                          {study.solution}
                        </p>
                      </div>

                      <div className="mt-6 flex flex-col gap-4 max-[820px]:mt-4 max-[820px]:gap-3">
                        <div className="flex gap-3 max-[820px]:gap-2.5">
                          {study.heroStats?.map((stat) => (
                            <div
                              key={stat.label}
                              className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-line bg-white px-4 py-3.5 text-center max-[820px]:rounded-lg max-[820px]:px-2.5 max-[820px]:py-3"
                            >
                              <div className="text-[clamp(20px,2.2vw,26px)] font-bold leading-none tracking-tight text-brand max-[820px]:text-[clamp(18px,5vw,22px)] max-[390px]:text-[17px]">
                                {stat.value}
                              </div>
                              <div className="text-sm leading-snug text-slate max-[820px]:text-[0.7rem]">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end max-[820px]:justify-stretch">
                          <Link
                            href={study.href ?? `/case-studies/${study.slug}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-ink/20 px-5 py-2.5 text-[0.8rem] font-semibold text-ink transition-colors hover:border-ink/45 hover:bg-ink/5 max-[820px]:w-full max-[820px]:justify-center"
                          >
                            View detail
                            <Icon name="arrow" className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-line px-8 py-7 max-[820px]:flex-wrap max-[820px]:gap-3 max-[820px]:px-5 max-[820px]:py-4 max-[390px]:flex-col max-[390px]:items-stretch">
                  <Button
                    href="/case-studies"
                    variant="primary"
                    className="max-[390px]:justify-center"
                  >
                    View case studies
                  </Button>

                  <div className="flex items-center gap-2.5 max-[820px]:ml-auto max-[820px]:gap-2 max-[390px]:ml-0 max-[390px]:justify-end">
                    <div className="mr-1.5 flex items-center gap-1.5">
                      {slides.map((s, dotIdx) => (
                        <button
                          key={s.slug}
                          type="button"
                          aria-label={`Go to slide ${dotIdx + 1}`}
                          onClick={() => goTo(dotIdx)}
                          className={`h-1.5 w-1.5 rounded-full transition-colors transition-transform max-[820px]:h-[5px] max-[820px]:w-[5px] ${
                            dotIdx === current
                              ? "scale-[1.3] bg-brand"
                              : "bg-ink/20 hover:bg-ink/35"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      aria-label="Previous"
                      onClick={() => goTo(current - 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-ink/25 hover:bg-mist max-[820px]:h-[34px] max-[820px]:w-[34px]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5 stroke-ink"
                        fill="none"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Next"
                      onClick={() => goTo(current + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-ink/25 hover:bg-mist max-[820px]:h-[34px] max-[820px]:w-[34px]"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5 stroke-ink"
                        fill="none"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
