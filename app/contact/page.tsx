// app/contact/page.tsx

import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { ContactFaq } from "@/components/sections/ContactFaq";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Soch to cut through complexity, execute with clarity, and schedule a consultation to scale your business with confidence.",
};

const CONTACT_ITEMS = [
  {
    icon: "mail" as const,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: "phone" as const,
    label: "Phone",
    value: SITE.phone,
    href: SITE.phoneHref,
  },
  {
    icon: "pin" as const,
    label: "Office address",
    value: SITE.address,
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-line bg-mist">
        <div className="container-x py-16 sm:py-20 lg:py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h1 className="text-display text-[clamp(2.5rem,1.5rem+3.2vw,3.9rem)]">
              Connect with <span className="italic text-brand">us</span>
            </h1>
            <p className="lead max-w-xl">
              We&apos;d love to help you out and see if there is potential for collaboration. Schedule a call with
              us and let&apos;s start a conversation that moves your startup forward.
            </p>
          </div>

          <Reveal>
            <div
              className="mx-auto mt-10 max-w-3xl rounded-xl border border-line bg-mist"
              style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}
            >
              <iframe
                src="https://cal.com/consult-with-riz/sochwork"
                style={{
                  width: "100%",
                  height: "900px",
                  border: "3",
                  borderRadius: "20px",
                }}
                loading="lazy"
                allowFullScreen
                title="Book a call with Soch"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal as="section">
        <Section className="bg-white" tight>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CONTACT_ITEMS.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-line bg-mist p-6 transition-colors hover:border-ink/25"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand ring-1 ring-line">
                    <Icon name={item.icon} className="h-4.5 w-4.5" />
                  </span>
                  <h2 className="text-h3 !text-[1.05rem]">{item.label}</h2>
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-3 block text-slate transition-colors hover:text-brand"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-3 text-slate">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal as="section">
        <ContactFaq />
      </Reveal>

      <Reveal as="section">
        <CtaBand />
      </Reveal>
    </main>
  );
}
