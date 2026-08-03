// app/team/page.tsx

import type { Metadata } from "next";
import { TEAM, SITE, SCHEDULER_URL } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
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
          <div className="max-w-3xl flex flex-col gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6 transition-colors hover:border-ink/25"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-lg font-semibold text-ink">
                  {member.initials}
                </span>
                <div>
                  <h3 className="text-h3">{member.name}</h3>
                  <p className="mt-2 text-slate">{member.bio}</p>
                </div>
              </div>
            ))}
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
