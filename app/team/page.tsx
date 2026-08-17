// app/team/page.tsx

import type { Metadata } from "next";
import { TEAM, SITE, SCHEDULER_URL } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description: SITE.metaDescription,
};

export default function TeamPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-line bg-mist">
        <div className="container-x py-16 sm:py-20 lg:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <h1 className="text-display text-[clamp(2.5rem,1.5rem+3.2vw,3.9rem)]">
              Meet Our Team
            </h1>
            <p className="lead mt-2 max-w-2xl">The people behind the work</p>
            <p className="lead max-w-2xl text-slate">
              We&apos;re operators and strategists who&apos;ve built and scaled businesses from
              the ground up. We bring hands-on experience across AI automations, strategy,
              operations, product, and growth to help founders cut through complexity, make
              confident decisions, and build momentum that lasts, no theory, just practical
              solutions.
            </p>
          </div>
        </div>
      </section>

      <Reveal as="section">
        <Section className="bg-white">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {TEAM.map((member) => {
              const socials = [
                member.linkedin && { href: member.linkedin, icon: "linkedin" as const, label: "LinkedIn" },
                member.instagram && { href: member.instagram, icon: "instagram" as const, label: "Instagram" },
              ].filter(Boolean) as { href: string; icon: "linkedin" | "instagram"; label: string }[];

              return (
                <div
                  key={member.name}
                  className="flex flex-col gap-6 rounded-xl border border-line bg-white p-6 transition-colors hover:border-brand sm:flex-row"
                >
                  <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-lg bg-white sm:w-56">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-h3 text-ink font-semibold">{member.name}</h3>
                    <p className="mt-1 text-sm font-medium text-brand-dark">{member.role}</p>
                    <p className="mt-2 text-slate">{member.bio}</p>
                    {socials.length > 0 && (
                      <div className="mt-4 flex gap-3">
                        {socials.map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on ${social.label}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-mist text-slate transition-colors hover:border-brand hover:text-brand"
                          >
                            <Icon name={social.icon} className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <ServicesGrid />
        <div className="container-x -mt-10 pb-20 sm:pb-24 lg:pb-32 text-center">
          <Link href="/services" className="text-brand font-medium hover:underline">
            Explore all services
          </Link>
        </div>
      </Reveal>

      <Reveal as="section">
        <Section className="bg-forest">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="text-h2 text-white">
              Let us audit your workflows and find your first 3 agent use cases.
            </h2>
            <Button href={SCHEDULER_URL} variant="light" size="lg" arrow>
              Book a Free Call
            </Button>
          </div>
        </Section>
      </Reveal>
    </main>
  );
}
