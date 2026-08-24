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
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description: SITE.metaDescription,
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />

        <Section id="team" className="bg-white" tight>
          <p className="lead mx-auto max-w-3xl text-center">{FOUNDERS_INTRO_QUOTE}</p>
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 sm:grid-cols-2 gap-10">
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

        <Section className="bg-mist">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading title={PRINCIPLES_HEADING} intro={PRINCIPLES_INTRO} align="left" />
            </div>
            <div className="flex flex-col gap-3">
              {PRINCIPLES.map((principle, index) => (
                <div
                  key={principle.title}
                  className="group flex items-start gap-5 rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card sm:gap-6 sm:p-7"
                >
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-peach transition-colors duration-200 group-hover:bg-brand">
                    <Icon
                      name={principle.icon}
                      className="h-5 w-5 text-brand transition-colors duration-200 group-hover:text-white"
                    />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-white text-[0.7rem] font-semibold text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-h3">{principle.title}</h3>
                    <p className="mt-1.5 text-slate">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section className="bg-white">
          <VisionMissionAccordion />
        </Section>

        <LogoMarquee />

        <AboutStats />

        <CtaBand
          override={{ heading: ABOUT_CTA_BAND.heading, buttonLabel: ABOUT_CTA_BAND.buttonLabel }}
        />
    </main>
  );
}
