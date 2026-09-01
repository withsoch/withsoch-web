// components/sections/BlogTeaser.tsx
//
// Homepage "From our blogs" section - the 3 most recent posts, reusing the
// same BlogCardSmall styling as the /blog page grid.

import { getAllPosts } from "@/lib/blog";
import { BlogCardSmall } from "@/components/BlogCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function BlogTeaser() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <Section className="bg-mist" divider>
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-h2">From our blogs</h2>
          <p className="lead mt-4">
            Ideas, playbooks, and field notes from building AI automation systems.
          </p>
        </div>
        <Button href="/blog" variant="secondary" arrow className="shrink-0">
          Explore all blogs
        </Button>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <RevealItem key={post.slug} className="h-full">
            <BlogCardSmall post={post} />
          </RevealItem>
        ))}
      </RevealGroup>

    </Section>
  );
}
