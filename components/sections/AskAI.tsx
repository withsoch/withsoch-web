// components/sections/AskAI.tsx
//
// "Ask AI about Soch" - ported from ask-ai-source.html. Copy and URLs kept
// as-is; the visual treatment is ours.
//
// Surface: bg-ink, deliberately. This card went white -> cream and cream
// (#fbf8f2) on mist (#f6f2ea) is a ~2% lightness step, so it dissolved into
// the section behind it. A near-black card is the clearest way to make it read
// as its own object. Ink rather than forest or charcoal on purpose: the two
// dark *bands* on this page (Stats, CtaBand) are both forest, and this should
// read as a card sitting on the page, not a third band. The section behind it
// is plain white - see the note on the Section below.

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const QUERY =
  "What do you know about Soch, the AI automation agency at withsoch.com?";
const ENCODED_QUERY = encodeURIComponent(QUERY);

const LINKS = [
  {
    label: "Ask ChatGPT",
    href: `https://chatgpt.com/?q=${ENCODED_QUERY}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.28 9.78a5.76 5.76 0 0 0-.49-4.73 5.83 5.83 0 0 0-6.27-2.79A5.76 5.76 0 0 0 11.17 1a5.83 5.83 0 0 0-5.56 4.04 5.76 5.76 0 0 0-3.84 2.79 5.83 5.83 0 0 0 .72 6.83 5.76 5.76 0 0 0 .49 4.73 5.83 5.83 0 0 0 6.27 2.79A5.76 5.76 0 0 0 12.83 23a5.83 5.83 0 0 0 5.57-4.04 5.76 5.76 0 0 0 3.84-2.79 5.83 5.83 0 0 0-.72-6.83l-.24.44zm-7.53 10.56a4.33 4.33 0 0 1-2.78-1.01l.14-.08 4.6-2.66a.76.76 0 0 0 .38-.66v-6.5l1.95 1.12a.07.07 0 0 1 .04.05v5.38a4.34 4.34 0 0 1-4.33 4.36zm-9.32-4a4.33 4.33 0 0 1-.52-2.91l.14.08 4.6 2.66c.23.14.52.14.75 0l5.62-3.25v2.25a.07.07 0 0 1-.03.06L11.3 18.1a4.34 4.34 0 0 1-5.87-1.76zm-1.22-10.1a4.33 4.33 0 0 1 2.26-1.9v5.45a.76.76 0 0 0 .38.66l5.62 3.24-1.95 1.12a.07.07 0 0 1-.07 0L5.8 12.3a4.34 4.34 0 0 1-.59-6.06zm16.02 3.73-5.62-3.25 1.95-1.12a.07.07 0 0 1 .07 0l4.65 2.69a4.33 4.33 0 0 1-.67 7.82V10.6a.76.76 0 0 0-.38-.63zm1.93-2.92-.14-.08-4.6-2.65a.77.77 0 0 0-.75 0L11.05 7.6V5.34a.07.07 0 0 1 .03-.06l4.65-2.68a4.34 4.34 0 0 1 6.45 4.49l-.02.16zM10.12 12.87 8.17 11.75a.07.07 0 0 1-.04-.05V6.33a4.34 4.34 0 0 1 7.12-3.33l-.14.08-4.6 2.65a.76.76 0 0 0-.38.66l-.01 6.48zm1.06-2.28 2.5-1.44 2.5 1.44v2.88l-2.5 1.44-2.5-1.44v-2.88z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Ask Perplexity",
    href: `https://www.perplexity.ai/?q=${ENCODED_QUERY}`,
    // Perplexity's actual mark: a centred vertical stem with two mirrored
    // open rectangles. The previous glyph here was an invented six-point
    // star/grid that was not Perplexity's logo at all.
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 4.2 5.4 9.1V4.9M12 4.2l6.6 4.9V4.9M12 4.2v15.6M12 19.8l-6.6-4.9v4.2M12 19.8l6.6-4.9v4.2M4.2 9.1h15.6v5.8H4.2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Ask Claude",
    href: `https://claude.ai/new?q=${ENCODED_QUERY}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.827 3.52h-3.654L5.443 20.4h3.33l1.027-3.209h4.4l1.027 3.21h3.33L13.827 3.52zm-3.258 11.19 1.431-4.676 1.432 4.675h-2.863z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export function AskAI() {
  // White with a hairline on top, not its own tinted band. The section used to
  // carry bg-mist, which put a cream slab behind a card that already provides
  // all the contrast this needs - two competing surface changes at one
  // boundary. The rule is the boundary now.
  //
  // No negative top margin on the card. It used to lift (-mt-20) so it
  // straddled the zone edge, but with the edge drawn as a hairline the lift
  // put the rule level with the card's own top - it read as a line running out
  // of the card's sides rather than as the section's top edge. The card sits
  // below the rule, cleanly.
  //
  // Two columns rather than a centred stack: the old shape was ~400px of
  // white with three small pills adrift in the middle of it.
  return (
    <Section className="bg-white" tight divider>
      <Reveal className="relative z-10 mx-auto max-w-6xl overflow-hidden rounded-2xl bg-ink px-6 py-12 shadow-lift sm:px-12 sm:py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col items-start">
            <h2 className="text-h2 text-white">Ask AI about Soch</h2>
            <p className="lead mt-4 max-w-md text-white/60">
              Pick your favourite AI and ask what it thinks about us. No filter, no
              spin - just what the models know.
            </p>
          </div>

          {/* Full-width stacked rows rather than a wrapped row of pills: three
              short buttons floating in a wide column left the right half of
              the card empty. */}
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-xl border border-white/15 px-5 py-4 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.06]"
              >
                <span className="h-5 w-5 shrink-0">{link.icon}</span>
                {link.label}
                <span
                  aria-hidden="true"
                  className="ml-auto text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-light"
                >
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
