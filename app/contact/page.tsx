// app/contact/page.tsx

import type { Metadata } from "next";
import { SITE, SCHEDULER_URL } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: SITE.metaDescription,
};

const SOCIALS = [
  { label: "LinkedIn", href: SITE.social.linkedin, icon: "linkedin" as const },
  { label: "Instagram", href: SITE.social.instagram, icon: "instagram" as const },
  { label: "Facebook", href: SITE.social.facebook, icon: "facebook" as const },
  { label: "YouTube", href: SITE.social.youtube, icon: "youtube" as const },
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Contact"
        heading="Let's talk about what's eating your team's time"
        sub="Tell us where the manual work is piling up. We'll show you where automation creates the most leverage and what it would take to build it."
      />

      <Reveal as="section">
        <Section className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10">
            <div className="flex flex-col gap-6">
              <dl className="flex flex-col gap-4 text-slate">
                <div>
                  <dt className="text-sm text-muted">Email</dt>
                  <dd>
                    <a href={`mailto:${SITE.email}`} className="text-ink-soft hover:text-brand transition-colors">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Phone</dt>
                  <dd>
                    <a href={SITE.phoneHref} className="text-ink-soft hover:text-brand transition-colors">
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Address</dt>
                  <dd className="text-ink-soft">{SITE.address}</dd>
                </div>
              </dl>
              <div className="flex gap-4 pt-2">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-muted hover:text-brand transition-colors"
                  >
                    <Icon name={social.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 rounded-xl border border-line bg-mist p-8">
              <h3 className="text-h3">Book a free call</h3>
              <p className="text-slate">
                Grab a slot on our calendar and we&apos;ll walk through where automation could save your team the
                most time.
              </p>
              <Button href={SCHEDULER_URL} external variant="primary" size="lg" arrow>
                Book a Free Call
              </Button>
            </div>
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <FaqAccordion />
      </Reveal>

      <CtaBand />
    </main>
  );
}
