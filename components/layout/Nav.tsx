// components/layout/Nav.tsx
//
// Sticky top nav — white bg, border-bottom, flat per DESIGN.md §6.
// "Menu" opens a hover-triggered mega-menu; stays open while hovering
// either the trigger or the panel.

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SERVICES, CASE_STUDIES, SCHEDULER_URL } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icons";

const featured = CASE_STUDIES[0];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-ink/10">
      <div className="container-x flex items-center justify-between py-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/soch-logo-removebg-preview.png"
            alt="Soch"
            width={173}
            height={58}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full bg-mist px-4 py-2 text-base font-medium text-ink"
          >
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-base font-medium text-ink/70 transition-colors hover:text-ink"
              aria-expanded={open}
            >
              Menu
              <Icon
                name="chevron"
                className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-3">
                <div className="flex gap-8 rounded-xl border border-line bg-white p-8 shadow-lift">
                  <div className="w-44 shrink-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted after:mt-1 after:block after:h-0.5 after:w-6 after:bg-brand">
                      Services
                    </p>
                    <ul className="mt-4 space-y-3">
                      {SERVICES.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="text-sm text-ink hover:text-brand"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-44 shrink-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted after:mt-1 after:block after:h-0.5 after:w-6 after:bg-brand">
                      Resources
                    </p>
                    <ul className="mt-4 space-y-3">
                      <li>
                        <Link href="/team" className="text-sm text-ink hover:text-brand">
                          Our Team
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog" className="text-sm text-ink hover:text-brand">
                          Blog
                        </Link>
                      </li>
                      <li>
                        <Link href="/case-studies" className="text-sm text-ink hover:text-brand">
                          Case Studies
                        </Link>
                      </li>
                    </ul>

                    <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted after:mt-1 after:block after:h-0.5 after:w-6 after:bg-brand">
                      Support
                    </p>
                    <ul className="mt-4 space-y-3">
                      <li>
                        <Link href="/contact" className="text-sm text-ink hover:text-brand">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="text-sm text-ink hover:text-brand">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="w-px shrink-0 self-stretch bg-line" />

                  <div className="w-56 shrink-0">
                    <div className="aspect-[16/10] w-full rounded-lg bg-mist" />
                    <p className="mt-3 text-sm font-bold text-ink">{featured.title}</p>
                    <Button href={SCHEDULER_URL} variant="primary" size="md" className="mt-4 w-full">
                      Book a free call
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/about"
            className="rounded-full px-4 py-2 text-base font-medium text-ink/70 transition-colors hover:text-ink"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-base font-medium text-ink/70 transition-colors hover:text-ink"
          >
            Contact
          </Link>
        </nav>
        <Button href="/ai-ops-score" variant="primary" size="md">
          Get Your Free Audit Now
        </Button>
      </div>
    </header>
  );
}
