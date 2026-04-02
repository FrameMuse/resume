---
title: Small libraries can improve the web more than big frameworks
publishedAt: 2025-11-22
summary: There is a lot of value in shipping focused libraries that solve one awkward problem well, especially when they leave teams free to compose their own systems.
tags:
  - OSS
  - Libraries
  - Web Platform
---

I have a bias toward small libraries.

Not because large frameworks are bad, but because the web gets healthier when more problems can be solved through clear, narrow, composable tools. A small library that does one thing well often creates more long-term room for teams than a broad abstraction that wants to own everything.

## Smaller scope usually means sharper intent

When a package is focused, the contract is easier to understand. You know why it exists, where it starts, and where it stops. That helps with adoption, debugging, replacement, and maintenance. It also encourages better composition. Teams can take the parts they need without inheriting an entire worldview.

The opposite pattern is familiar: one package solves the original problem, then gradually absorbs routing, data loading, animation, theming, and state. At some point it becomes a framework in denial.

## Why this matters to me

Much of the work I find interesting sits close to boundaries: rendering, reactivity, DOM behavior, i18n tooling, SVG utilities, API facades. Those areas benefit from precision. The package should be easy to explain and easy to remove if the team outgrows it.

That keeps the web stack more honest. Instead of endless dependency faith, you get explicit tradeoffs.

## Small does not mean unserious

There is a lazy assumption that a small library must be less ambitious. In reality, it can be more disciplined. A tight scope forces the author to understand the real problem clearly. It also makes performance, ergonomics, and documentation more visible because there is less surface area to hide behind.

I would rather ship a modest library that solves an awkward issue cleanly than a giant abstraction that demands loyalty. The web does not need fewer ideas. It needs more tools that cooperate well.
