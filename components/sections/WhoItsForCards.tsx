// components/sections/WhoItsForCards.tsx
//
// Coded (not exported-image) "Who it's for" visual for the service detail
// page's accordion panel: a stack of role/audience cards, each with an
// icon pill, title, description, and a stage tag. Renders from real
// `Service.audienceCards` data instead of a generic SVG diagram, matching
// the layout of the design reference for Operations & Process Automation
// (Build / Run / Scale). Reusable by any service that defines
// `audienceCards` - falls back silently (parent should check the array
// exists before rendering this) rather than inventing filler copy.

import { Icon, type IconName } from "@/components/Icons";
import type { Service } from "@/lib/content";

type AudienceCard = NonNullable<Service["audienceCards"]>[number];

// One icon per card, matched by position (Build / Run / Scale framing) -
// audienceCards doesn't carry its own icon field, so we pick from the
// existing icon set rather than adding new SVGs for a 3-card list.
const CARD_ICONS: IconName[] = ["compass", "spark", "trend"];

export function WhoItsForCards({ cards }: { cards: AudienceCard[] }) {
  return (
    <div className="flex w-full flex-col gap-3 text-left">
      {cards.map((card, i) => (
        <div
          key={card.no}
          className="flex items-start gap-4 rounded-[20px] border border-line bg-white px-5 py-4"
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-peach text-brand">
            <Icon name={CARD_ICONS[i % CARD_ICONS.length]} className="h-5 w-5" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-h3 text-[0.98rem] text-ink">{card.title}</span>
              <span className="shrink-0 rounded-full bg-ink px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-white">
                {card.tag}
              </span>
            </div>
            <p className="text-sm text-slate">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
