// app/about/page.tsx

import type { Metadata } from "next";
import { TEAM, PRINCIPLES, VISION, MISSION, SITE } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description: SITE.metaDescription,
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="About Soch"
        heading="Built to move faster than manual work"
        sub={MISSION}
      />

      <Reveal as="section">
        <Section id="team" className="bg-white">
          <SectionHeading title="Founders" align="left" />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TEAM.filter((member) => member.isFounder).map((member) => (
              <div
                key={member.name}
                className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6 transition-colors hover:border-ink/25"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-lg font-semibold text-ink">
                  {member.initials}
                </span>
                <div>
                  <h3 className="text-h3">{member.name}</h3>
                  <p className="text-slate">{member.role}</p>
                </div>
                <div className="flex gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="text-muted hover:text-brand transition-colors"
                  >
                    <Icon name="linkedin" className="h-5 w-5" />
                  </a>
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Instagram`}
                      className="text-muted hover:text-brand transition-colors"
                    >
                      <Icon name="instagram" className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <Section className="bg-mist">
          <SectionHeading
            title="What we hold ourselves to"
            intro="The principles behind every audit, build, and handover."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6 transition-colors hover:border-ink/25"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-peach text-brand">
                  <Icon name={principle.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="text-h3">{principle.title}</h3>
                <p className="text-slate">{principle.description}</p>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <Section className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
              <span className="eyebrow w-fit">Vision</span>
              <p className="text-h3 text-ink-soft">{VISION}</p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="eyebrow w-fit">Mission</span>
              <p className="text-h3 text-ink-soft">{MISSION}</p>
            </div>
          </div>
        </Section>
      </Reveal>

      <CtaBand />
    </main>
  );
}
