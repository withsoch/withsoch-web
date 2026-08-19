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

export type Heading = { id: string; text: string };

/**
 * Anchor id for a heading. The table of contents and the rendered <h2> must
 * both call this on the same text, or the links go nowhere.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Section headings for the TOC rail, in document order.
 *
 * Normally these are the post's `##` headings - the article's real sections,
 * and what the old Webflow rail listed. Some posts migrated from Webflow have
 * no h2 at all and set every section as `####`, so we fall back to the
 * shallowest level the post actually uses and those still get a rail.
 *
 * Deliberately does NOT de-duplicate repeated headings, so the id produced
 * here always matches the one the renderer produces for the same text.
 */
export function getHeadings(body: string): Heading[] {
  const found: { level: number; text: string }[] = [];
  let inFence = false;

  // Posts in this repo are checked out with CRLF endings; without stripping the
  // carriage return the end-of-line anchor below never matches.
  for (const line of body.replace(/\r/g, "").split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^(#{2,4})[ \t]+(.+?)[ \t]*#*[ \t]*$/);
    if (!match) continue;

    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links -> their text
      .replace(/[*_`]/g, "")
      .trim();

    if (text) found.push({ level: match[1].length, text });
  }

  if (found.length === 0) return [];

  const topLevel = Math.min(...found.map((h) => h.level));
  return found
    .filter((h) => h.level === topLevel)
    .map((h) => ({ id: slugifyHeading(h.text), text: h.text }));
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
