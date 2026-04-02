---
title: A UI system should feel like a toolkit, not a cage
publishedAt: 2026-02-11
summary: Design systems become more useful when they provide stable primitives and strong decisions without forcing every feature into one visual or architectural shape.
tags:
  - UI Systems
  - Design Systems
  - Frontend
---

I like component systems, but I do not like systems that behave like a polite prison.

The best internal UI libraries give teams a vocabulary, not a trap. They make common patterns easy, keep accessibility and consistency strong, and remove repetitive work. At the same time, they leave enough room for products to stay specific. A design system that can only produce one kind of screen usually becomes the reason people bypass it.

## The mistake is over-packaging intent

Many systems jump too quickly from primitive building blocks to very opinionated composite components. That feels productive at first because a feature team can assemble screens quickly. Later, the product grows, edge cases appear, and the abstractions become hostile. The team starts carrying twenty props to squeeze a new layout out of a component that was never meant to support it.

That is when the library stops being leverage and starts being negotiation.

## What I want from a system

I want a system to be confident about a few things:

- typography scales
- spacing rhythm
- states and feedback
- accessibility defaults
- composable layout primitives

I do not want it to pretend that every product flow should look identical. Products still need mood, hierarchy, and decisions that belong to the context of the feature.

## Strict foundations, flexible assembly

This is why I like a layered approach. Keep the most stable pieces small and obvious. Buttons, chips, cards, sections, fields, layout shells. Build upward only when the pattern has actually repeated enough to deserve its own abstraction. Even then, keep the internals readable.

The result is more boring in the best possible way. Teams know where to start, know what they can trust, and do not have to fight the component library every time the product needs a slightly different posture.

A UI system should make good work easier. The moment it makes product thinking smaller, it is doing too much.
