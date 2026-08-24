import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { IndustriesSlider } from "@/components/sections/IndustriesSlider";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Stats } from "@/components/sections/Stats";
import { CaseStudiesCarousel } from "@/components/sections/CaseStudiesCarousel";
import { AutomationOperatingSystem } from "@/components/sections/AutomationOperatingSystem";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { AskAI } from "@/components/sections/AskAI";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { BlogTeaser } from "@/components/sections/BlogTeaser";

// Homepage zone map.
//
// The page used to alternate bg-white / bg-mist on almost every section -
// nine flips down thirteen screens, which reads as choppy without actually
// creating any hierarchy. Sections are now grouped into chapters that share
// one flat surface, so there are five crisp boundaries instead of nine and
// each one marks a real change of subject. Rhythm inside a zone comes from
// layout - alignment, column ratio, density - not from tinting.
//
//   A  mist   Hero, Positioning, IndustriesSlider              intro
//   A2 white  LogoMarquee                                      trust strip
//   B  warm   WhyChooseUs                                      the argument
//   C1 white  ServicesGrid                                     offer
//   C2 forest Stats                                              proof
//   C3 mist   CaseStudiesCarousel                                proof, at length
//   D  white  AutomationOperatingSystem, ComparisonTable, AskAI  method
//   E  mist   FaqAccordion, BlogTeaser                          objections
//   F  forest CtaBand                                            close
//
// Sections continuing a zone carry `divider` (a hairline at the top edge) so
// they stay legible as separate sections without a colour change.
//
// Zone C is split by design. Stats is the page's proof anchor and on mist it
// had no contrast whatsoever - mist tiles on a mist surface with hairlines
// floating in nothing - so it gets its own dark band. It is ~4,000px from the
// forest CtaBand and shaped differently (left rail vs centred), so the two do
// not read as a repeat.
//
// Two constraints when editing this:
//   - A section's surface must stay distinct from the cards on it.
//     WhyChooseUs has a bg-mist quote panel, CaseStudiesCarousel bg-cream
//     slides, AskAI a bg-ink card. Two exceptions: LogoMarquee's logos sit
//     unboxed on a white band, framed by mist above and the warm wash below;
//     ServicesGrid's white rows sit on white and separate by hairline +
//     shadow-soft instead of by tint.
//   - AskAI stays white and marks its own top edge with a hairline instead of
//     a tint - the ink card is contrast enough without a second surface change
//     under it. The card no longer lifts across that edge: with the boundary
//     drawn as a rule, an overlapping card made the rule look like it was
//     coming out of the card's sides.
export default function Home() {
  return (
    <main className="flex-1">
      {/* Zone A - mist */}
      <Hero />
      <Positioning />
      <IndustriesSlider />
      <LogoMarquee />

      {/* Zone B - white */}
      <WhyChooseUs />

      {/* Zone C - mist, split by the forest proof band */}
      <ServicesGrid />
      <Stats />
      <CaseStudiesCarousel />

      {/* Zone D - white */}
      <AutomationOperatingSystem />
      <ComparisonTable />

      {/* Zone E - mist */}
      <AskAI />
      <FaqAccordion />
      <BlogTeaser />

      {/* Zone F - forest */}
      <CtaBand />
    </main>
  );
}
