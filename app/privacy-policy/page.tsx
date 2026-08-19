// app/privacy-policy/page.tsx
//
// Simple prose page. Content ported verbatim from the Webflow export
// (privacy-policy.html) — no paraphrasing, no invented clauses.

import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Soch Consulting collects, uses, and protects your personal information. Your privacy and data security are important to us.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1">
      <div className="bg-mist py-16 sm:py-20">
        <div className="container-x text-center">
          <h1 className="text-display">Privacy Policy</h1>
        </div>
      </div>

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-10 text-slate">
          <div className="space-y-4">
            <h2 className="text-h3 text-ink">Collecting Personal Information</h2>
            <p>
              We collect only the information required to operate our services, respond to
              inquiries, and improve our site experience. This includes:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Contact details submitted via forms or email</li>
              <li>Analytics data from tools like Google Analytics</li>
              <li>Scheduling and payment info via third-party platforms</li>
              <li>Any business context shared during consulting conversations</li>
            </ul>
            <p>
              We do <strong className="text-ink-soft">not</strong> sell or rent your data. All
              data is processed securely and stored with appropriate safeguards.{" "}
              <em>
                You may request access, correction, or deletion at any time by emailing us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-brand hover:text-brand-dark">
                  {SITE.email}
                </a>
                .
              </em>
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-h3 text-ink">Sharing Personal Information</h2>
            <p>
              We only share personal data with trusted sub-processors that enable our business
              operations.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Google Analytics for site performance tracking</li>
              <li>Calendly and Zoom for scheduling and meetings</li>
              <li>Stripe for secure payments</li>
              <li>Cloud storage and email service providers</li>
            </ul>
            <p>
              We ensure all partners meet high privacy and security standards. We never share or
              sell your data for advertising purposes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-h3 text-ink">Your Rights</h2>
            <p>If you are located in the EU or EEA, your data is processed under:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Legitimate interest (e.g., improving services)</li>
              <li>Contractual necessity (e.g., fulfilling engagements)</li>
            </ul>
            <p>
              <strong className="text-ink-soft">You have the right to:</strong>
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Access your data</li>
              <li>Request corrections</li>
              <li>Request deletion</li>
              <li>Object to or restrict processing</li>
            </ol>
            <p>
              To exercise these rights, email us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand hover:text-brand-dark">
                {SITE.email}
              </a>
              . We aim to respond within 30 days.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-h3 text-ink">Cookies and Tracking</h2>
            <p>We use cookies to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Keep the site secure</li>
              <li>Store preferences</li>
              <li>Understand user behavior</li>
            </ul>
            <p>
              You can manage cookie preferences through your browser or our on-site banner.
              Essential cookies are required for the site to function properly.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-h3 text-ink">Data Retention</h2>
            <p>
              We retain personal data only as long as necessary to fulfill the purpose it was
              collected for, including:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Providing services</li>
              <li>Legal or regulatory requirements</li>
              <li>Analytics and troubleshooting</li>
            </ul>
            <p>Data is securely stored, reviewed periodically, and deleted when no longer needed.</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-h3 text-ink">Questions or Concerns?</h2>
            <p>
              If you have any questions about how we handle your data, email us at{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand hover:text-brand-dark">
                {SITE.email}
              </a>
              . For accessibility issues, contact{" "}
              <a href={`mailto:${SITE.email}`} className="text-brand hover:text-brand-dark">
                {SITE.email}
              </a>{" "}
              and we&rsquo;ll work to address them promptly.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
