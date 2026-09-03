// components/ArticleToc.tsx
//
// "In this article" rail for blog posts. Sticks to the left of the article on
// lg and up (clearing the sticky nav), and stacks above the article below that.
// Entries come from the post's own `##` headings - see getHeadings in lib/blog.

import type { Heading } from "@/lib/blog";

export function ArticleToc({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2">
      <nav aria-labelledby="article-toc-heading">
        <h2
          id="article-toc-heading"
          className="font-sans text-14 font-semibold uppercase tracking-[0.16em] text-muted"
        >
          In this article
        </h2>
        <ul className="mt-5 flex flex-col">
          {headings.map((heading) => (
            <li key={heading.id} className="border-t border-line first:border-t-0">
              <a
                href={`#${heading.id}`}
                className="block py-3 text-16 leading-snug text-slate transition-colors hover:text-brand-dark"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
