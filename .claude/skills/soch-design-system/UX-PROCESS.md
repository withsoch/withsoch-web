---
name: soch-ux-process
description: Process for catching generic, templated, or "boring" UI/UX
  output before shipping it — read this alongside DESIGN.md whenever a
  prompt asks to build new UI, or asks to make something "look better,"
  "less boring," "more polished," or "attention-grabbing."
---

# UX Process — Soch Web

This is a companion to DESIGN.md. DESIGN.md defines the tokens (colors,
type, radius, no-gradients/glow rule) — this file defines the *process*
for using those tokens well instead of defaulting to the flattest,
safest interpretation of them.

## The core failure mode this fixes

Given a clean token system, the easiest thing to build is a generic
one: uniform-size elements, straight lines, static states, one flat
color used everywhere at the same weight. It technically follows
DESIGN.md and still feels lifeless — that's what "looks childish, no
effects, zero attention" means in practice. Following the rules is not
the same as using them well.

## Before building: plan in two passes

1. **First pass — describe the plan in prose, not code.** For the
   specific section being built, name: what should draw the eye first,
   what creates hierarchy (size/weight/spacing variation, not just one
   flat repeated unit), whether motion would genuinely help here or is
   just decoration, and the one "signature" detail that makes this
   section memorable rather than interchangeable with any other card
   grid on the internet.
2. **Second pass — critique the plan before writing code.** Ask: if I
   ran this same brief through the most generic possible interpretation
   of DESIGN.md, would I land here? If yes, revise. Specifically check
   for: every element the same size (add hierarchy), every connector a
   straight line (consider organic curves where it fits the content),
   zero motion anywhere (consider one deliberate entrance/ambient
   effect, not everywhere), a numbered list where the content isn't
   actually sequential (drop the numbers if order doesn't carry
   meaning).

## Restraint still applies

Spend boldness in one place per section, not evenly everywhere. One
signature moment (a hub node with emphasis ring, a hover state that
reveals something, one well-placed animated accent) reads as
intentional. The same flourish repeated on every element reads as
noise. Keep everything else around the signature moment quiet.

## Motion checklist

Ask three questions before adding any animation: does it serve the
subject (a network diagram implies flow — motion showing flow is
earned; a static stat card usually doesn't need motion at all), is it
one orchestrated moment rather than five small scattered effects, and
does it respect `prefers-reduced-motion`. If an animation can't answer
"yes, this specifically helps explain or emphasize the content," cut it.

## Self-critique before reporting done

Before saying a section is finished: take a screenshot and look at it
as if seeing it cold, with no context. Would this be visually
distinguishable from a generic Bootstrap/Tailwind-template version of
the same content? If every element is one size, one color weight, and
static, the honest answer is often no — go back and add hierarchy or
one motion/emphasis detail before reporting done.

## This does not override DESIGN.md

No gradients, no glow, no drop-shadows beyond the 3 defined shadow
tokens, Fraunces/Inter only, `#ff5c35` as the single accent — all of
that still applies exactly as written. This file is about composition,
hierarchy, and motion *within* those constraints, not permission to
break them for visual interest.
