// components/sections/AskAI.tsx

import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

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
          <Button key={link.label} href={link.href} external variant="secondary">
            {link.label}
          </Button>
        ))}
      </div>
    </Section>
  );
}
