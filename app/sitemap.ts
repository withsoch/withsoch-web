import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { CASE_STUDIES, SERVICES } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

/**
 * Every page and post, for search engines and AI crawlers. Built from the same
 * content the pages render from, so a new post is in the sitemap the moment
 * it is committed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "", "/about", "/services", "/case-studies", "/blog", "/ai-ops-score", "/team", "/contact", "/privacy-policy",
    ...SERVICES.map((s) => `/services/${s.slug}`), ...CASE_STUDIES.map((s) => `/case-studies/${s.slug}`)
  ].map((route) => ({ url: `${SITE_URL}${route}` }));

  const posts = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    ...(p.date ? { lastModified: p.date } : {}),
  }));

  return [...pages, ...posts];
}
