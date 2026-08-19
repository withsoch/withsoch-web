// components/sections/AutomationLottie.tsx
//
// Client-only wrapper around the self-hosted automation .lottie asset, used
// inside AboutStats's animated panel. Isolated in its own client component so
// the parent (AboutStats) can stay a server component.
"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function AutomationLottie() {
  return (
    <DotLottieReact
      src="/animations/automation.lottie"
      loop
      autoplay
      className="absolute inset-0 h-full w-full"
    />
  );
}
