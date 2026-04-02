---
title: Design-to-code works best when you stop promising magic
publishedAt: 2025-12-14
summary: Automation between design and implementation is most valuable when it removes repetitive setup and preserves engineering control, not when it pretends to replace real frontend work.
tags:
  - Figma
  - Automation
  - Frontend
---

I like design-to-code automation, but I do not trust design-to-code marketing.

The useful version is much more grounded. It helps with reconstruction, scaffolding, translation of structured data, and repetitive asset handling. It closes the boring part of the gap between a design file and a working UI. It does not eliminate the need for frontend engineering, because the hard part was never only drawing the rectangles.

## The real work starts after the screenshot

A product interface is not just a layout. It is data states, focus rules, keyboard behavior, loading transitions, failure handling, performance constraints, responsive changes, copy length variation, analytics hooks, and all the awkward conditions that appear after launch.

That is why fully automatic generation is usually over-sold. It can produce a first shape, but a first shape is not the system.

## Where automation actually helps

I find automation useful in three places:

- structured extraction of reusable design data
- repeated UI reconstruction for internal workflows
- reducing the manual gap between design assets and implementation starting points

That is enough to save meaningful time. It removes tedious setup, improves consistency, and gives engineers a stronger base to work from.

## Keep the engineer in control

The right question is not, "Can this tool generate the final product?" The better question is, "Can this tool remove work that should never have been manual in the first place?"

That mindset produces better tools. It avoids fragile promises and focuses on leverage instead. The result is a workflow that respects both disciplines: design remains a source of intent and structure, while engineering keeps responsibility for behavior, resilience, and the real product surface.

That division is healthier and more realistic. It is also how design-to-code starts becoming genuinely useful rather than just impressive in a demo.
