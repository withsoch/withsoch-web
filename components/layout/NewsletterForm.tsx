// components/layout/NewsletterForm.tsx
//
// Client island for the footer newsletter capture. Posts to the
// "Newsletter Subscribe -> Notify Rizwan" n8n workflow, which emails
// rizwan@withsoch.com whenever someone subscribes.

"use client";

import { useState } from "react";

const WEBHOOK_URL = "https://sochconsulting.app.n8n.cloud/webhook/newsletter-subscribe";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-sm text-white/75">Thanks - you&apos;re subscribed.</p>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/30"
        />
        <button
          type="submit"
          disabled={sending}
          className="shrink-0 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
        >
          {sending ? "Sending..." : "Subscribe"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-brand">{error}</p>}
    </div>
  );
}
