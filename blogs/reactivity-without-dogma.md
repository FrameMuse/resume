---
title: Reactivity is useful when it stays legible
publishedAt: 2025-09-09
summary: Fine-grained reactivity can be powerful, but only when the resulting mental model stays readable enough for product engineers to work with confidently.
tags:
  - Reactivity
  - Runtime
  - Architecture
---

I am interested in reactivity models, but I do not think reactivity is automatically good just because it is more granular.

The real question is whether the model gives better leverage without making the application harder to understand. If the runtime is clever but the product code becomes mystical, the trade is often not worth it.

## Granularity is not the whole story

Fine-grained systems can reduce unnecessary work and express updates elegantly. That is real value. But every reactive model also creates a mental model for the engineer reading the code. Where does the value live? What triggers recomputation? How explicit is the dependency graph? What happens when async behavior enters the picture?

If those answers are hard to see, the performance gain may come with a clarity tax.

## What I want from reactive tools

I want the reactive primitive to feel close to normal reasoning. It should be easy to follow what depends on what. It should not force the whole application into one magical pattern. Ideally it should compose with normal functions and familiar UI boundaries.

That is one reason I like exploring smaller, interoperable reactive pieces instead of demanding one state model for everything. It gives teams more room to choose the level of sophistication they actually need.

## The right balance

My bias is simple: prefer the most powerful model that still reads clearly to the people shipping the product. If a team cannot explain the update flow without sounding like they are describing a spell, the architecture is probably too proud of itself.

Good reactivity should feel like precision, not mysticism.
