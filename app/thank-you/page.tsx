// app/thank-you/page.tsx
//
// Landed on right after a booking completes via BookingModal (see the
// postMessage listener there). Structured around one job: get the visitor to
// hold the slot, with as little re-reading as possible - then reassure with
// proof and answers. The global Nav/Footer from app/layout.tsx already close
// the page, so this owns only the content between them.

import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ThankYouFaq } from "@/components/sections/ThankYouFaq";
import { WistiaEmbed } from "@/components/WistiaEmbed";
import { CASE_STUDIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "You're booked",
  description: "Your strategy call is confirmed. Here's what to do before we talk.",
  robots: { index: false, follow: false },
};

const featured = CASE_STUDIES[0];

export default function ThankYouPage() {
  return (
    <main>
      {/* Confirmation - the one moment on this page that isn't asking for
          anything, so it gets the site's reserved dark-close color rather
          than another white/mist section. */}
      <section className="bg-forest">
        <div className="container-x flex flex-col items-center gap-5 py-20 text-center sm:py-24">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-white">
            <Icon name="check" className="h-5 w-5" strokeWidth={2} />
          </span>
          <p className="text-13 font-semibold uppercase tracking-[0.14em] text-brand-light">
            Strategy call confirmed
          </p>
          <h1 className="text-h1-page max-w-2xl text-white">
            You&rsquo;re on the <span className="italic text-brand-light">calendar.</span>
          </h1>
          <p className="text-lead max-w-md text-white/70">
            We&rsquo;ve emailed your invite. One small thing below keeps the slot held.
          </p>
        </div>
      </section>

      {/* Next steps */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-h3">Before we talk</h2>
            <p className="mt-3 text-slate">Nothing to prepare - just these two things.</p>

            <ul className="mt-7 flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <Icon
                  name="check"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  strokeWidth={2.4}
                />
                <span className="text-16 text-slate">
                  <span className="font-semibold text-ink">Accept the calendar invite</span> in
                  your inbox so the slot stays held on your end too.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon
                  name="check"
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  strokeWidth={2.4}
                />
                <span className="text-16 text-slate">
                  <span className="font-semibold text-ink">Reply to the confirmation email</span>{" "}
                  with anything about your situation we should know before the call.
                </span>
              </li>
            </ul>

            <div className="mt-7 rounded-xl border-l-2 border-brand bg-peach/60 px-5 py-4">
              <p className="text-14 text-ink-soft">
                We&rsquo;ll send a short email reminder the day before. Need to move the time
                instead?
              </p>
              <Button href="/contact" variant="secondary" size="md" className="mt-3">
                Message us to reschedule
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <WistiaEmbed mediaId="sc06j2rg5h" />
            <p className="mt-4 text-14 text-muted">
              A quick word from Riz - what the call covers, what it doesn&rsquo;t, and the one
              thing worth thinking through first.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Proof, while the decision is still warm. */}
      <Section tight className="pt-0">
        <Reveal className="mx-auto max-w-xl">
          <Link
            href={featured.href ?? `/case-studies/${featured.slug}`}
            className="group flex flex-col justify-between gap-4 rounded-xl border border-line bg-white p-6 transition-colors hover:border-ink/25 sm:flex-row sm:items-center"
          >
            <div>
              <p className="text-12 font-semibold uppercase tracking-[0.14em] text-muted">
                Recent work
              </p>
              <p className="mt-1.5 text-18 font-semibold text-ink">{featured.title}</p>
              <p className="mt-1 text-14 text-slate">
                Built for {featured.company} in {featured.industry}.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-14 font-semibold text-brand-dark transition-colors group-hover:text-brand">
              See case studies
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </Reveal>
      </Section>

      <ThankYouFaq />
    </main>
  );
}
