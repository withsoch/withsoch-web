// app/blog/page.tsx

import { getAllPosts } from "@/lib/blog";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogCardLarge, BlogCardSmall } from "@/components/BlogCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export default function BlogPage() {
  const posts = getAllPosts();

  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured.slug);
  const secondary = rest[0];
  // Every remaining post, not just the next three — the grid wraps as the list grows.
  const gridPosts = rest.slice(1);

  return (
    <main className="flex-1">
      <PageHero
        heading="Our Blogs"
        sub="Ideas, playbooks, and field notes from building AI automation systems."
        align="center"
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <BlogCardLarge post={featured} />
          </Reveal>
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

      <Reveal as="section">
        <CtaBand />
      </Reveal>
    </main>
  );
}
