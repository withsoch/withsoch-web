import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

// Rebuilt at build time, which is every deploy — so every new post.
export const dynamic = "force-static";

/**
 * llms.txt: a plain-text map of the site for language models (llmstxt.org).
 * What the site is, the pages that explain it, and every post with its summary.
 */
export function GET() {
  const posts = getAllPosts()
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug})${p.excerpt ? `: ${p.excerpt}` : ""}`)
    .join("\n");

  const body = `# Soch

> AI automation partners for businesses. We build and deploy automation systems across operations, products, and outreach, and run AI training for firms.

## Pages

- [About](${SITE_URL}/about)
- [Services](${SITE_URL}/services)
- [Case studies](${SITE_URL}/case-studies)
- [Blog](${SITE_URL}/blog)
- [AI Ops Score](${SITE_URL}/ai-ops-score)
- [Team](${SITE_URL}/team)
- [Contact](${SITE_URL}/contact)
- [Privacy policy](${SITE_URL}/privacy-policy)

## Posts

${posts}
`;

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
