// app/team/page.tsx

import type { Metadata } from "next";
import { TEAM, SITE, SCHEDULER_URL } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TeamCard } from "@/components/team/TeamCard";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description: SITE.metaDescription,
};

export default function TeamPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-line bg-mist">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-10%] h-80 w-80 rounded-full bg-brand/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-[-10%] h-96 w-96 rounded-full bg-forest/10 blur-3xl"
        />
        <div className="container-x relative py-16 sm:py-20 lg:py-24">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
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
          </Reveal>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, index) => {
            const socials = [
              member.linkedin && { href: member.linkedin, icon: "linkedin" as const, label: "LinkedIn" },
              member.instagram && { href: member.instagram, icon: "instagram" as const, label: "Instagram" },
            ].filter(Boolean) as { href: string; icon: "linkedin" | "instagram"; label: string }[];

            return (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.role}
                bio={member.bio}
                photo={member.photo}
                socials={socials}
                index={index}
              />
            );
          })}
        </div>
      </Section>

      <Reveal as="section">
        <ServicesGrid />
        <div className="container-x -mt-10 pb-8 sm:pb-10 lg:pb-12" />
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
