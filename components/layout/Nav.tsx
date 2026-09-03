// components/layout/Nav.tsx
//
// Sticky top nav - white bg, border-bottom, flat per DESIGN.md §6.
// "Menu" opens a hover-triggered mega-menu; stays open while hovering
// either the trigger or the panel.

"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVICES, CASE_STUDIES, SCHEDULER_URL } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icons";

const featured = CASE_STUDIES[0];

export function Nav() {
  const [open, setOpen] = useState(false);
  // Starts false, matching both the server render and a normal load at the top
  // of the page, so there is no hydration mismatch. If the browser restores a
  // mid-page scroll position, useScroll's value moves off 0 on mount and the
  // change handler below flips this immediately. Only colours transition, so
  // either path is free of layout shift.
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 64));
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  };

  const navLinkClass = (href: string) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `rounded-full px-4 py-2 text-16 font-medium transition-colors ${
      active ? "bg-mist text-ink" : "text-ink/70 hover:text-ink"
    }`;
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-ink/10 bg-white/95 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between py-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/soch-logo-removebg-preview.png"
            alt="Soch"
            width={220}
            height={74}
            className="h-12 w-auto"
            priority
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-2">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => {
              cancelClose();
              setOpen(true);
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-16 font-medium text-ink/70 transition-colors hover:text-ink"
              aria-expanded={open}
            >
              Menu
              <Icon
                name="chevron"
                className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="fixed left-1/2 top-[96px] w-[860px] -translate-x-1/2">
                <div className="flex gap-10 rounded-xl border border-line bg-white p-7 shadow-lift">
                  <div className="w-52 shrink-0">
                    <Link
                      href="/services"
                      className="text-16 font-medium text-ink underline decoration-ink/40 underline-offset-4 transition-colors hover:text-brand"
                    >
                      Services
                    </Link>
                    <ul className="mt-4 space-y-2.5">
                      {SERVICES.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="text-16 text-ink hover:text-brand"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-52 shrink-0">
                    <p className="text-16 font-medium text-ink">Resources</p>
                    <ul className="mt-4 space-y-2.5">
                      <li>
                        <Link href="/team" className="text-16 text-ink hover:text-brand">
                          Our Team
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog" className="text-16 text-ink hover:text-brand">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link href="/case-studies" className="text-16 text-ink hover:text-brand">
                          Case Studies
                        </Link>
                      </li>
                    </ul>

                    <p className="mt-5 text-16 font-medium text-muted">Support</p>
                    <ul className="mt-4 space-y-2.5">
                      <li>
                        <Link href="/contact" className="text-16 text-ink hover:text-brand">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy" className="text-16 text-ink hover:text-brand">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="w-px shrink-0 self-stretch bg-line" />

                  <div className="w-64 shrink-0">
                    <Link href={`/case-studies/${featured.slug}`} className="group block">
                      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-mist">
                        {featured.image && (
                          <Image
                            src={featured.image}
                            alt={featured.title}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                            sizes="256px"
                          />
                        )}
                      </div>
                      <p className="mt-3 text-16 font-bold text-ink group-hover:text-brand">
                        {featured.title}
                      </p>
                    </Link>
                    <Button href={SCHEDULER_URL} variant="primary" size="md" className="mt-3 w-full">
                      Book a free call
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link href="/about" className={navLinkClass("/about")}>
            About
          </Link>
          <Link href="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>
        </nav>
        <Button href="/ai-ops-score" variant="primary" size="md">
          Get Your Free Audit Now
        </Button>
      </div>
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
