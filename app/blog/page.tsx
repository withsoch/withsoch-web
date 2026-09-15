// app/blog/page.tsx

import { getAllPosts } from "@/lib/blog";
import { Section } from "@/components/ui/Section";
import { BlogCardFeatured, BlogCardSmall } from "@/components/BlogCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export default function BlogPage() {
  // getAllPosts is newest-first. The index shows posts in that order and
  // nothing else - a `featured: true` post no longer jumps the queue, because
  // the lead card must always be the most recent article.
  const posts = getAllPosts();

  // One lead card, then every other post in the grid (it wraps as the list
  // grows). If the number of lead cards changes, change this split with it:
  // leaving slice(2) behind after the second lead card was removed silently
  // hid the second-newest post from the index.
  const [featured, ...gridPosts] = posts;

  return (
    <main className="flex-1">
      <Section className="bg-white">
        {featured && (
          <Reveal>
            <BlogCardFeatured post={featured} />
          </Reveal>
        )}

        {gridPosts.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
