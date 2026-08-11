// app/blog/page.tsx

import { getAllPosts } from "@/lib/blog";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogCardLarge, BlogCardSmall } from "@/components/BlogCard";
import { CtaBand } from "@/components/sections/CtaBand";

export default function BlogPage() {
  const posts = getAllPosts();

  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured.slug);
  const secondary = rest[0];
  const gridPosts = rest.slice(1, 4);

  return (
    <main className="flex-1">
      <PageHero
        heading="Our Blogs"
        sub="Ideas, playbooks, and field notes from building AI automation systems."
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BlogCardLarge post={featured} />
          {secondary && <BlogCardLarge post={secondary} />}
        </div>

        {gridPosts.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <BlogCardSmall key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Section>

      <CtaBand />
    </main>
  );
}
