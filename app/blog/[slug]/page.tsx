// app/blog/[slug]/page.tsx

import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, formatPostDate } from "@/lib/blog";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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

  return (
    <main className="flex-1">
      <PageHero
        eyebrow={post.category}
        heading={post.title}
        sub={formatPostDate(post.date)}
      />

      <Section tight className="bg-white">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-xl border border-line bg-mist">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>
      </Section>

      <Section className="bg-white">
        <article className="prose-blog mx-auto max-w-3xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </article>
      </Section>

      <CtaBand />
    </main>
  );
}
