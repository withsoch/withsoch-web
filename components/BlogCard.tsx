// components/BlogCard.tsx

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog";

function CategoryPill({ category }: { category: string }) {
  return (
    <span className="inline-block w-fit max-w-full shrink-0 truncate rounded-full bg-peach px-3.5 py-1.5 text-16 font-medium leading-none text-brand">
      {category}
    </span>
  );
}

// Featured "Latest News" card: a big contained photo on the left, the
// category/title/excerpt/date stacked on the right. Stacks to photo-on-top
// below lg.
export function BlogCardFeatured({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-all duration-200 hover:border-ink/20 hover:shadow-card lg:flex-row"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist lg:aspect-auto lg:w-[52%] lg:min-h-[30rem]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 52vw, 100vw"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12">
        <CategoryPill category={post.category} />
        <h2 className="text-h3 transition-colors group-hover:text-brand">{post.title}</h2>
        <p className="text-slate line-clamp-3">{post.excerpt}</p>
        <span className="text-16 text-muted">{formatPostDate(post.date)}</span>
      </div>
    </Link>
  );
}

// Compact "Latest News" row card: a small square-ish photo on the left,
// category/title/date on the right. Meant to sit three across in a row.
export function BlogCardSmall({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full items-stretch gap-4 overflow-hidden rounded-xl border border-line bg-white p-3 transition-all duration-200 hover:border-ink/20 hover:shadow-card"
    >
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-mist sm:w-28">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="120px"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-1 pr-2">
        <CategoryPill category={post.category} />
        <h3 className="text-16 font-medium leading-snug text-ink line-clamp-2 transition-colors group-hover:text-brand">
          {post.title}
        </h3>
        <span className="text-14 text-muted">{formatPostDate(post.date)}</span>
      </div>
    </Link>
  );
}
