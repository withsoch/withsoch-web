// app/blog/page.tsx

import { getAllPosts } from "@/lib/blog";
import { Section } from "@/components/ui/Section";
import { BlogCardFeatured, BlogCardSmall } from "@/components/BlogCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export default function BlogPage() {
  const posts = getAllPosts();

  // posts is already sorted newest-first by getAllPosts, so the most recent
  // post is always the one featured up top - no separate frontmatter flag
  // to keep in sync as new posts are published.
  const featured = posts[0];
  // Every remaining post, not just the next few - the grid wraps as the list grows.
  const rest = posts.filter((post) => post.slug !== featured.slug);

  return (
    <main className="flex-1">
      <Section className="bg-white">
        <Reveal>
          <BlogCardFeatured post={featured} />
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
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
