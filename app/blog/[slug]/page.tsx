// app/blog/[slug]/page.tsx

import type { ReactNode } from "react";
import { isValidElement } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getAllPosts,
  getPostBySlug,
  formatPostDate,
  getHeadings,
  slugifyHeading,
} from "@/lib/blog";
import { PageHero } from "@/components/PageHero";
import { ArticleToc } from "@/components/ArticleToc";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** Flatten a heading's rendered children back to plain text, so its anchor id
 *  matches the one getHeadings derived from the same markdown. */
function nodeText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement(node)) {
    return nodeText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = getHeadings(post.body);
  const hasToc = headings.length > 1;

  return (
    <main className="flex-1">
      <PageHero
        eyebrow={post.category}
        heading={post.title}
        sub={formatPostDate(post.date)}
      />

      <Reveal as="section">
        <Section tight className="bg-white">
          <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-xl border border-line bg-mist">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <Section className="bg-white">
        <div
          className={
            hasToc
              ? "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-14"
              : ""
          }
        >
          {hasToc && <ArticleToc headings={headings} />}

          <article className={`prose-blog max-w-3xl ${hasToc ? "" : "mx-auto"}`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Anchor targets for the TOC. All three levels get ids because
                // getHeadings falls back to h3/h4 on posts that have no h2.
                // scroll-mt clears the sticky nav. Markdown headings carry no
                // attributes, so nothing else from props needs forwarding (and
                // `node` must not reach the DOM).
                h2: ({ children }) => (
                  <h2 id={slugifyHeading(nodeText(children))} className="scroll-mt-28">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 id={slugifyHeading(nodeText(children))} className="scroll-mt-28">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 id={slugifyHeading(nodeText(children))} className="scroll-mt-28">
                    {children}
                  </h4>
                ),
              }}
            >
              {post.body}
            </ReactMarkdown>
          </article>
        </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <CtaBand />
      </Reveal>
    </main>
  );
}
