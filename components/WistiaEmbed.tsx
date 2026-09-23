// components/WistiaEmbed.tsx
//
// Thin wrapper around Wistia's web-component embed. player.js registers the
// <wistia-player> custom element globally, so the two <script> tags only
// need to load once per page - `next/script` dedupes by src if this ever
// ends up on a page more than once.

"use client";

import Script from "next/script";

type WistiaEmbedProps = {
  mediaId: string;
  aspect?: number;
  className?: string;
};

export function WistiaEmbed({ mediaId, aspect = 16 / 9, className = "" }: WistiaEmbedProps) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-ink ${className}`}>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" async />
      <Script
        src={`https://fast.wistia.com/embed/${mediaId}.js`}
        strategy="afterInteractive"
        type="module"
        async
      />
      <wistia-player media-id={mediaId} aspect={aspect} />
    </div>
  );
}
