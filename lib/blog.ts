// lib/blog.ts
//
// Markdown-backed blog content. Posts live as .md files in content/blog/
// with frontmatter (title, slug, date, category, featured, excerpt, image)
// and a markdown body. Parsed at build time with gray-matter.

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  featured: boolean;
  excerpt: string;
  image: string;
  body: string;
};

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);

    return {
      slug: data.slug ?? file.replace(/\.md$/, ""),
      title: data.title ?? "",
      date: data.date ? String(data.date) : "",
      category: data.category ?? "",
      featured: Boolean(data.featured),
      excerpt: data.excerpt ?? "",
      image: data.image ?? "",
      body: content,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function formatPostDate(date: string): string {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
