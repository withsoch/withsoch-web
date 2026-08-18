// components/team/TeamCard.tsx
//
// Team member card: photo + bio. Entrance is staggered by index via
// scroll-triggered motion (respects reduced motion). No hover effects.

"use client";

import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/Icons";

type Social = { href: string; icon: "linkedin" | "instagram"; label: string };

type TeamCardProps = {
  name: string;
  role: string;
  bio?: string;
  photo: string;
  socials: Social[];
  index: number;
};

export function TeamCard({ name, role, bio, photo, socials, index }: TeamCardProps) {
  const reduce = useReducedMotion();
  const delay = reduce ? 0 : (index % 3) * 0.08;

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(16,49,41,0.04)]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-mist">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        {/* role badge */}
        <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/85 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-dark backdrop-blur-sm">
          {role}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h3 text-ink font-semibold">{name}</h3>
        <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-slate">{bio}</p>

        {socials.length > 0 && (
          <div className="mt-4 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on ${social.label}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-mist text-slate"
              >
                <Icon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
