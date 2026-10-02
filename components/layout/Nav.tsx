// components/layout/Nav.tsx
//
// Sticky top nav - white bg, border-bottom, flat per DESIGN.md §6.
// "Menu" opens a hover-triggered mega-menu; stays open while hovering
// either the trigger or the panel. Below lg, where hover does not exist and
// the desktop links are hidden, a toggle opens a full-width panel with the
// same links instead.

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVICES, CASE_STUDIES, SCHEDULER_URL } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icons";

const featured = CASE_STUDIES[0];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  // While the mobile panel is open: lock page scroll behind it, close on
  // Escape, and close if the viewport grows past lg (where the panel's
  // toggle is hidden and it could otherwise never be dismissed).
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const mobileLinkClass = (href: string) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `block rounded-lg px-3 py-3 text-18 font-medium transition-colors ${
      active ? "bg-mist text-ink" : "text-ink/80 hover:text-ink"
    }`;
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
        scrolled || open || mobileOpen
          ? "border-ink/10 bg-white/95 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between py-5">
        <Link href="/" className="flex items-center" onClick={closeMobile}>
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
        <div className="flex items-center gap-2">
          {/* Below sm there is no room for this label next to the logo and the
              menu toggle - it wrapped to two lines and doubled the bar's
              height - so on phones it moves into the menu panel instead. */}
          <div className="hidden sm:block">
            <Button href="/ai-ops-score" variant="primary" size="md" className="whitespace-nowrap">
              Get Your Free Audit Now
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist lg:hidden"
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Main"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-100%)] overflow-y-auto border-b border-ink/10 bg-white shadow-lift lg:hidden"
          >
            <div className="container-x flex flex-col gap-6 py-6">
              <ul className="flex flex-col">
                <li>
                  <Link href="/" className={mobileLinkClass("/")} onClick={closeMobile}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className={mobileLinkClass("/services")} onClick={closeMobile}>
                    Services
                  </Link>
                  <ul className="mb-1 ml-3 flex flex-col border-l border-line pl-3">
                    {SERVICES.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="block py-2 text-16 text-slate transition-colors hover:text-brand"
                          onClick={closeMobile}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {[
                  { href: "/case-studies", label: "Case Studies" },
                  { href: "/blog", label: "Blog" },
                  { href: "/team", label: "Our Team" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={mobileLinkClass(link.href)} onClick={closeMobile}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Only below sm - from sm up the same CTA is already in the bar. */}
              <div className="sm:hidden">
                <Button href="/ai-ops-score" variant="primary" size="lg" className="w-full" onClick={closeMobile}>
                  Get Your Free Audit Now
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
