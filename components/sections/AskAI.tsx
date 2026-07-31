// components/sections/AskAI.tsx

import { Section, SectionHeading } from "@/components/ui/Section";

const QUERY = "What do you know about Soch, the AI automation agency at withsoch.com?";
const ENCODED_QUERY = encodeURIComponent(QUERY);

const LINKS = [
  { label: "Ask ChatGPT", href: `https://chatgpt.com/?q=${ENCODED_QUERY}` },
  { label: "Ask Perplexity", href: `https://www.perplexity.ai/?q=${ENCODED_QUERY}` },
  { label: "Ask Claude", href: `https://claude.ai/new?q=${ENCODED_QUERY}` },
];

export function AskAI() {
  return (
    <Section tight className="bg-white">
      <SectionHeading
        title="Ask AI about Soch"
        intro="Pick your favourite AI and ask what it thinks about us. No filter, no spin — just what the models know."
      />
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-[0.95rem] font-semibold text-ink ring-1 ring-ink/20 transition-colors duration-200 hover:ring-ink/45"
          >
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
