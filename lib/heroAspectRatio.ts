// lib/heroAspectRatio.ts
//
// Single source of truth for each service's coded hero's aspect ratio.
// Every surface that renders a hero diagram (main service hero, /services
// grid, homepage accordion, "explore other services") must size its frame
// from this map instead of re-deriving the ratio locally. Before this file
// existed, each surface had its own independently-implemented slug -> ratio
// mapping, so a fix in one place never caught the others - see the git log
// for OpsHero on the /services grid and the "explore other services"
// section both shipping their own (eventually wrong) copies.
// All 5 services intentionally share the same ratio here so every main
// hero + grid/accordion/"explore other services" card renders the same
// shape and size, regardless of which diagram component fills the frame.
const SHARED_HERO_ASPECT_RATIO = "aspect-square";

export const HERO_ASPECT_RATIOS: Record<string, string> = {
  "ai-agent-development": SHARED_HERO_ASPECT_RATIO,
  "operations-process-automation": SHARED_HERO_ASPECT_RATIO,
  "customer-support-automation": SHARED_HERO_ASPECT_RATIO,
  "marketing-automation": SHARED_HERO_ASPECT_RATIO,
  "revops-automation": SHARED_HERO_ASPECT_RATIO,
};

export function getHeroAspectRatio(slug: string): string | undefined {
  return HERO_ASPECT_RATIOS[slug];
}
