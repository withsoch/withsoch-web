// app/blog/page.tsx

import { getAllPosts } from "@/lib/blog";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogCardLarge, BlogCardSmall } from "@/components/BlogCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export default function BlogPage() {
  // getAllPosts is newest-first. The index shows posts in that order and
  // nothing else - a `featured: true` post no longer jumps the queue, because
  // the two lead cards must always be the two most recent articles.
  const posts = getAllPosts();

  const [featured, secondary] = posts;
  // Every remaining post, not just the next three - the grid wraps as the list grows.
  const gridPosts = posts.slice(2);

  return (
    <main className="flex-1">
      <PageHero
        heading="Our Blogs"
        sub="Ideas, playbooks, and field notes from building AI automation systems."
        align="center"
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {featured && (
            <Reveal>
              <BlogCardLarge post={featured} />
            </Reveal>
          )}
          {secondary && (
            <Reveal delay={0.08}>
              <BlogCardLarge post={secondary} />
            </Reveal>
          )}
        </div>

        {gridPosts.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <BlogCardSmall post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

        <CtaBand />
    </main>
  );
}
