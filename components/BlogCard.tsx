// components/BlogCard.tsx

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog";

function CategoryPill({ category }: { category: string }) {
  return (
    <span className="inline-block w-fit shrink-0 whitespace-nowrap rounded-full bg-peach px-3.5 py-1.5 text-sm font-medium leading-none text-brand">
      {category}
    </span>
  );
}

export function BlogCardLarge({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-5 overflow-hidden rounded-xl border border-line bg-white transition-colors hover:border-ink/25"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-col gap-3 px-6 pb-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <CategoryPill category={post.category} />
          <span className="text-sm text-muted">{formatPostDate(post.date)}</span>
        </div>
        <h2 className="text-h3">{post.title}</h2>
        <p className="text-slate line-clamp-3">{post.excerpt}</p>
      </div>
    </Link>
  );
}

export function BlogCardSmall({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-line bg-white transition-colors hover:border-ink/25"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      </div>
      <div className="flex flex-col gap-3 px-5 pb-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <CategoryPill category={post.category} />
          <span className="text-sm text-muted">{formatPostDate(post.date)}</span>
        </div>
        <h3 className="text-h3">{post.title}</h3>
      </div>
    </Link>
  );
}
