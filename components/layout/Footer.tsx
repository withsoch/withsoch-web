// components/layout/Footer.tsx
//
// Dark footer - bg-charcoal per DESIGN.md §6 dark footer recipe.

import Image from "next/image";
import Link from "next/link";
import { SITE, CASE_STUDIES } from "@/lib/content";
import { Icon, type IconName } from "@/components/Icons";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

const PAGES = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

const UTILITY = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS: { label: string; href: string; icon: IconName }[] = [
  { label: "Facebook", href: SITE.social.facebook, icon: "facebook" },
  { label: "YouTube", href: SITE.social.youtube, icon: "youtube" },
  { label: "LinkedIn", href: SITE.social.linkedin, icon: "linkedin" },
  { label: "Instagram", href: SITE.social.instagram, icon: "instagram" },
];

const featured = CASE_STUDIES[0];

export function Footer() {
  return (
    // border-t: forest #103129 -> charcoal #171814 is too small a value step
    // for the edge to read on its own, so the CtaBand above bleeds into the
    // footer without a hairline.
    <footer className="border-t border-white/10 bg-charcoal text-white/70">
      <div className="container-x py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logos/soch-logo-removebg-preview.png"
                alt="Soch"
                width={173}
                height={58}
                className="h-16 w-auto"
              />
            </Link>
            <p className="max-w-xs text-16 text-white/60">{SITE.tagline}</p>
            <NewsletterForm />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-16 font-semibold uppercase tracking-wider text-white">Pages</p>
            <nav className="flex flex-col gap-3">
              {PAGES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-16 text-white/60 hover:text-brand-light transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-16 font-semibold uppercase tracking-wider text-white">Utility</p>
            <nav className="flex flex-col gap-3">
              {UTILITY.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-16 text-white/60 hover:text-brand-light transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-16 font-semibold uppercase tracking-wider text-white">Contact on</p>
            <div className="flex flex-col gap-3 text-16">
              <a href={`mailto:${SITE.email}`} className="text-white/60 hover:text-brand-light transition-colors">
                {SITE.email}
              </a>
              <a href={SITE.phoneHref} className="text-white/60 hover:text-brand-light transition-colors">
                {SITE.phone}
              </a>
              <span className="text-white/60">{SITE.address}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-16 font-semibold uppercase tracking-wider text-white">Featured case study</p>
            <Link
              href={featured.href ?? `/case-studies/${featured.slug}`}
              className="group flex flex-col gap-3 rounded-xl border border-white/10 p-3 transition-colors hover:border-white/30"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-white/5">
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt={featured.company}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                )}
              </div>
              <p className="text-16 font-semibold text-white group-hover:text-brand-light transition-colors">
                {featured.title}
              </p>
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-6 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 transition-colors hover:border-white/30 hover:text-white"
              >
                <Icon name={social.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
          <Image
            src="/logos/soch-logo-removebg-preview.png"
            alt="Soch"
            width={173}
            height={58}
            className="h-11 w-auto"
          />
        </div>

        <div className="mt-5 border-t border-white/10 pt-5 text-center">
          <p className="text-16 font-semibold text-white">
            Soch: More Growth, Less Chaos
          </p>
        </div>

        <div className="mt-3 text-center text-14 text-white/50">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
