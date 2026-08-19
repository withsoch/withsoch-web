// components/sections/BlogTeaser.tsx
//
// Homepage "From our blogs" section — the 3 most recent posts, reusing the
// same BlogCardSmall styling as the /blog page grid.

import { getAllPosts } from "@/lib/blog";
import { BlogCardSmall } from "@/components/BlogCard";
import { Button } from "@/components/ui/Button";

export function BlogTeaser() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-h2">From our blogs</h2>
          <p className="lead max-w-xl">
            Ideas, playbooks, and field notes from building AI automation systems.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCardSmall key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/blog" variant="secondary" size="lg" arrow>
            Explore all blogs
          </Button>
        </div>
      </div>
    </section>
  );
}
