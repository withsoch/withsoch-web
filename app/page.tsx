import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { IndustriesSlider } from "@/components/sections/IndustriesSlider";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Stats } from "@/components/sections/Stats";
import { CaseStudiesGrid } from "@/components/sections/CaseStudiesGrid";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { AskAI } from "@/components/sections/AskAI";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Reveal as="section">
        <Positioning />
      </Reveal>
      <Reveal as="section">
        <IndustriesSlider />
      </Reveal>
      <Reveal as="section">
        <LogoMarquee />
      </Reveal>
      <Reveal as="section">
        <WhyChooseUs />
      </Reveal>
      <Reveal as="section">
        <ServicesGrid />
      </Reveal>
      <Reveal as="section">
        <Stats />
      </Reveal>
      <Reveal as="section">
        <CaseStudiesGrid />
      </Reveal>
      <Reveal as="section">
        <HowWeWork />
      </Reveal>
      <Reveal as="section">
        <ComparisonTable />
      </Reveal>
      <Reveal as="section">
        <CtaBand />
      </Reveal>
      <Reveal as="section">
        <AskAI />
      </Reveal>
      <Reveal as="section">
        <FaqAccordion />
      </Reveal>
    </main>
  );
}
