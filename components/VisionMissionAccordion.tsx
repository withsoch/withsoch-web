"use client";
// components/VisionMissionAccordion.tsx
//
// Vision/Mission accordion for the About page. Mirrors the exact
// interaction pattern from the homepage Services section
// (ServicesGrid.tsx): one row open at a time, +/- toggle, and a paired
// image panel that crossfades to match whichever row is open. Here the
// image sits on the left and the accordion on the right.

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { VISION, VISION_TAGS, MISSION } from "@/lib/content";
import { Icon, type IconName } from "@/components/Icons";

const ROWS: {
  key: string;
  label: string;
  icon: IconName;
  copy: string;
  tags?: string[];
  image: string;
  alt: string;
}[] = [
  {
    key: "vision",
    label: "Our Vision",
    icon: "compass",
    copy: VISION,
    tags: VISION_TAGS,
    image: "/images/about/vision.webp",
    alt: "Innovation and vision - idea taking shape.",
  },
  {
    key: "mission",
    label: "Our Mission",
    icon: "target",
    copy: MISSION,
    image: "/images/about/mission.webp",
    alt: "Team discussing numbers and paperwork.",
  },
];

export function VisionMissionAccordion() {
  const [openKey, setOpenKey] = useState(ROWS[0].key);
  const activeRow = ROWS.find((row) => row.key === openKey) ?? ROWS[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10">
      <div className="rounded-2xl border border-line bg-mist overflow-hidden aspect-[3/2]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeRow.key}
            src={activeRow.image}
            alt={activeRow.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-4">
        {ROWS.map((row) => {
          const isOpen = row.key === openKey;
          return (
            <div
              key={row.key}
              className={`rounded-xl border bg-white transition-colors duration-300 ease-in-out ${
                isOpen ? "border-brand/60" : "border-line hover:border-ink/20 hover:bg-mist/40"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenKey(row.key)}
                className="flex w-full items-center gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-peach text-brand">
                  <Icon name={row.icon} className="h-5.5 w-5.5" />
                </span>
                <span
                  className={`text-h4 text-18 flex-1 transition-colors duration-300 ease-in-out ${
                    isOpen ? "text-brand" : "text-ink"
                  }`}
                >
                  {row.label}
                </span>
                <Icon
                  name={isOpen ? "minus" : "plus"}
                  className={`h-5 w-5 shrink-0 transition-colors duration-300 ease-in-out ${
                    isOpen ? "text-brand" : "text-muted"
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="flex flex-col gap-4 px-6 pb-6 pl-[4.25rem]">
                      <p className="text-slate">{row.copy}</p>
                      {row.tags && (
                        <ul className="flex flex-wrap gap-2">
                          {row.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full bg-peach px-3.5 py-1.5 text-16 font-medium text-brand"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
