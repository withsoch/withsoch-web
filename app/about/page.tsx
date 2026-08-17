// app/about/page.tsx

import type { Metadata } from "next";
import {
  TEAM,
  PRINCIPLES,
  PRINCIPLES_HEADING,
  PRINCIPLES_INTRO,
  FOUNDERS_INTRO_QUOTE,
  ABOUT_CTA_BAND,
  SITE,
} from "@/lib/content";
import { AboutHero } from "@/components/AboutHero";
import { VisionMissionAccordion } from "@/components/VisionMissionAccordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { AboutStats } from "@/components/sections/AboutStats";
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
      <AboutHero />

      <Reveal as="section">
        <Section id="team" className="bg-white">
          <p className="lead mx-auto max-w-3xl text-center">{FOUNDERS_INTRO_QUOTE}</p>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 sm:grid-cols-2 gap-6">
            {TEAM.filter((member) => member.isFounder).map((member) => (
              <div
                key={member.name}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-cream"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Dark-to-transparent scrim so name/role/socials stay legible over the photo */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pt-16 pb-5">
                  <div>
                    <h3 className="text-h3 font-medium text-cream">{member.name}</h3>
                    <p className="text-sm text-cream/70">{member.role}</p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:border-cream hover:text-brand"
                    >
                      <Icon name="linkedin" className="h-4 w-4" />
                    </a>
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on Instagram`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:border-cream hover:text-brand"
                      >
                        <Icon name="instagram" className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <Section className="bg-mist">
          <SectionHeading title={PRINCIPLES_HEADING} intro={PRINCIPLES_INTRO} />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6 transition-colors hover:border-ink/25"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-peach text-brand">
                  <Icon name="spark" className="h-5.5 w-5.5" />
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
          <VisionMissionAccordion />
        </Section>
      </Reveal>

      <Reveal as="section">
        <LogoMarquee />
      </Reveal>

      <Reveal as="section">
        <AboutStats />
      </Reveal>

      <Reveal as="section">
        <CtaBand
          override={{ heading: ABOUT_CTA_BAND.heading, buttonLabel: ABOUT_CTA_BAND.buttonLabel }}
        />
      </Reveal>
    </main>
  );
}
