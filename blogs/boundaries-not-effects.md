---
title: Effects are edges, not the system
publishedAt: 2026-03-18
summary: A practical way to keep React code understandable is to treat effects as synchronization boundaries, not as the place where the application decides how it works.
tags:
  - React
  - Architecture
  - DX
---

The more time I spend in production React codebases, the more convinced I am that many teams do not have a `useEffect` problem. They have a boundary problem.

Effects are useful when the application must synchronize with something outside itself: the browser, a network request, a subscription, a timer, analytics, or an imperative library. That is a clean edge. The moment an effect starts carrying domain logic, orchestration logic, and state transitions that could have lived in normal code paths, the component becomes harder to reason about.

## The smell is usually indirect control flow

You see it when a component updates state in one place, then another effect watches that state, then a third effect reacts to the second update. The application still works, but the sequence is now hidden in timing and dependency arrays instead of being stated directly.

That kind of code is expensive. It is harder to debug, harder to review, and harder to refactor because the real behavior is distributed across reactive side effects rather than shaped as an explicit flow.

## What I prefer instead

If a button click should update local state and call an API, do both in the event path. If derived data can be calculated from current inputs, calculate it during render. If a piece of logic really describes a state machine, model it as one rather than hoping a set of effects will accidentally behave like one.

Then keep effects for the narrow set of tasks they are actually good at:

- subscribing and unsubscribing
- synchronizing a non-React system
- reacting to a value only because the outside world requires it

## Why this matters for larger systems

On a small screen it is easy to tolerate some messy effects. On a bigger product, that mess becomes organizational debt. New engineers cannot easily tell what is business logic and what is synchronization code. Performance issues become harder to isolate because too much work is attached to lifecycle reactions. Testing also becomes more annoying because basic logic now needs a component mount just to execute.

The discipline is simple: use effects for edges, not for the heart of the system. If the code reads more like a script and less like a haunted chain reaction, you are usually in a better place.
