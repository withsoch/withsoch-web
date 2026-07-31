// components/layout/Footer.tsx
//
// Dark footer — bg-charcoal per DESIGN.md §6 dark footer recipe.

import Link from "next/link";
import { NAV, SITE } from "@/lib/content";

const SOCIALS = [
  { label: "LinkedIn", href: SITE.social.linkedin },
  { label: "Facebook", href: SITE.social.facebook },
  { label: "YouTube", href: SITE.social.youtube },
  { label: "Instagram", href: SITE.social.instagram },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="container-x py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-h3 text-white">{SITE.name}</span>
            <p className="max-w-xs text-sm text-white/60">{SITE.tagline}</p>
          </div>
          <nav className="flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 text-sm">
            <a href={SITE.phoneHref} className="hover:text-white transition-colors">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
              {SITE.email}
            </a>
            <span>{SITE.address}</span>
            <div className="flex gap-4 pt-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 rule-dashed pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
