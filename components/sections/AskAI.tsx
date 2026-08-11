// components/sections/AskAI.tsx
//
// "Ask AI about Soch" — ported from ask-ai-source.html. Structure/copy/URLs
// and inline brand SVGs kept as-is; visual treatment swapped to the Soch
// design system: no glow/gradient, no dark panel, flat white pill buttons.

import { Section } from "@/components/ui/Section";

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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L8.5 7H4l3.25 3.5L4 14h4.5L12 19l3.5-5H20l-3.25-3.5L20 7h-4.5L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" />
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
  return (
    <Section tight className="bg-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-2xl border border-line bg-cream px-6 py-14 text-center sm:px-12 sm:py-16">
        <span className="eyebrow">Don&rsquo;t take our word for it</span>
        <h2 className="text-h2 mt-4">Ask AI about Soch</h2>
        <p className="lead mt-4 max-w-xl">
          Pick your favourite AI and ask what it thinks about us. No filter, no
          spin — just what the models know.
        </p>
        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-mist sm:w-auto"
            >
              <span className="h-5 w-5 shrink-0 text-ink">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
