// components/sections/AskAI.tsx
//
// "Ask AI about Soch" - redesigned away from the dark boxed-CTA treatment
// (heavy card, arrow-rows, felt like a generic SaaS banner) toward the
// quieter pattern real product/marketing sites use for "ask an AI about us":
// a centred heading over a plain white section, with each assistant as its
// own bordered icon tile in brand colour. The tiles carry the visual
// interest instead of a dark card + hover arrows - closer to how the site
// already treats logo/icon rows elsewhere (see LogoMarquee).
//
// LLMs: Claude, Gemini, Perplexity - per brief. ChatGPT dropped in favour of
// Gemini.

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const QUERY =
  "What do you know about Soch, the AI automation agency at withsoch.com?";
const ENCODED_QUERY = encodeURIComponent(QUERY);

const LINKS = [
  {
    label: "Claude",
    href: `https://claude.ai/new?q=${ENCODED_QUERY}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.827 3.52h-3.654L5.443 20.4h3.33l1.027-3.209h4.4l1.027 3.21h3.33L13.827 3.52zm-3.258 11.19 1.431-4.676 1.432 4.675h-2.863z"
          fill="#D97757"
        />
      </svg>
    ),
  },
  {
    label: "Gemini",
    href: `https://gemini.google.com/app?q=${ENCODED_QUERY}`,
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gemini-grad" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4C8DF6" />
            <stop offset="0.5" stopColor="#B064E8" />
            <stop offset="1" stopColor="#F26B6B" />
          </linearGradient>
        </defs>
        <path
          d="M12 2c.6 4.6 1.4 7.6 3.1 9.4C16.9 13.1 19.4 13.9 22 14.5c-4.6.6-7.1 1.4-8.9 3.1-1.7 1.8-2.5 4.3-3.1 8.4-.6-4.1-1.4-6.6-3.1-8.4-1.8-1.7-4.3-2.5-8.9-3.1 4.6-.6 7.1-1.4 8.9-3.1C10.6 9.6 11.4 6.6 12 2z"
          fill="url(#gemini-grad)"
        />
      </svg>
    ),
  },
  {
    label: "Perplexity",
    href: `https://www.perplexity.ai/?q=${ENCODED_QUERY}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 4.2 5.4 9.1V4.9M12 4.2l6.6 4.9V4.9M12 4.2v15.6M12 19.8l-6.6-4.9v4.2M12 19.8l6.6-4.9v4.2M4.2 9.1h15.6v5.8H4.2z"
          stroke="#1F7A8C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function AskAI() {
  return (
    <Section className="bg-white" tight divider>
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-h2 text-ink">
          Ask AI about <span className="italic text-brand">Soch</span>
        </h2>
        <p className="text-lead mt-4 text-slate">
          Pick your favourite AI and ask what it thinks about us. No filter, no
          spin - just what the models know.
        </p>
      </Reveal>

      <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:gap-x-14">
        {LINKS.map((link, i) => (
          <Reveal
            key={link.label}
            delay={i * 0.08}
            className="flex flex-col items-center gap-3"
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-20 w-20 items-center justify-center rounded-2xl border border-line bg-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-card sm:h-24 sm:w-24"
            >
              <span className="h-8 w-8 sm:h-9 sm:w-9">{link.icon}</span>
            </a>
            <span className="text-16 font-semibold text-ink-soft">
              {link.label}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
