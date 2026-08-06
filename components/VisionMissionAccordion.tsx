"use client";
// components/VisionMissionAccordion.tsx
//
// Presentation-only change from the previous two-block static layout: same
// VISION/MISSION copy, now collapsible. Vision starts open, Mission closed.

import { useState } from "react";
import { VISION, VISION_TAGS, MISSION } from "@/lib/content";
import { Icon } from "@/components/Icons";

const ROWS = [
  { key: "vision", label: "Vision", copy: VISION, tags: VISION_TAGS },
  { key: "mission", label: "Mission", copy: MISSION, tags: undefined },
];

export function VisionMissionAccordion() {
  const [open, setOpen] = useState<string>("vision");

  return (
    <div className="divide-y divide-line">
      {ROWS.map((row) => {
        const isOpen = open === row.key;
        return (
          <div key={row.key} className="py-6">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? "" : row.key)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="eyebrow w-fit">{row.label}</span>
              <Icon
                name={isOpen ? "minus" : "plus"}
                className="h-5 w-5 shrink-0 text-ink"
              />
            </button>
            {isOpen && row.tags ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-6 items-start">
                <div>
                  <p className="text-h3 text-ink-soft max-w-2xl">{row.copy}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {row.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-mist px-3 py-1 text-sm text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="aspect-[4/3] w-full rounded-2xl border border-line bg-cream" />
              </div>
            ) : (
              isOpen && <p className="text-h3 text-ink-soft mt-4 max-w-2xl">{row.copy}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
