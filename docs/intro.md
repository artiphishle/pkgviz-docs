---
sidebar_position: 1
title: PKGViz
description: Open-source package dependency and architecture analysis with interactive graphs and portable audit evidence.
---

# Understand the architecture your code is creating

PKGViz analyzes a source project, discovers package relationships, and turns them into two useful views of the same architecture:

1. an **interactive dependency graph** for people, and
2. a **structured audit** for tooling, reviews, and automation.

The goal is simple: make dependency structure visible early enough that teams can discuss it with evidence instead of intuition.

## Why PKGViz exists

Architecture usually degrades gradually. A new import looks harmless. A package reaches across a boundary. Two modules start depending on each other. Eventually the structure encoded by the dependency graph no longer matches the structure the team intended.

PKGViz makes that graph inspectable.

It currently combines:

- automatic project/language inspection
- source parsing and dependency analysis
- package and subpackage graph construction
- intrinsic/vendor dependency classification
- edge weights
- cyclic-package detection with per-edge source evidence
- interactive Cytoscape visualization
- JSON audit generation from the CLI
- JSON and XML audit downloads from the browser UI

## Supported parser languages

PKGViz currently has parsers for:

- TypeScript
- Java
- C++
- Python
- Delphi
- Kotlin

Project detection can discover broader language evidence, but PKGViz intentionally selects **one supported parser** for an audit. Polyglot repositories keep their detected candidates in audit metadata; choose the relevant application or project directory when separate parts need separate audits.

## One command to start with

From the project you want to inspect:

```bash
bunx pkgviz
```

PKGViz analyzes the current working directory and writes `audit.json` there.

For an interactive graph, clone the application repository and run the viewer against a configured project path. See [Getting started](./getting-started.md).

:::info Project status
PKGViz is currently an **alpha** project. The core analysis and visualization workflow is usable, while reusable audit rules and additional build/CI integrations continue to evolve.
:::

## What PKGViz is not

PKGViz does not try to replace a compiler, type checker, linter, or full program-analysis platform. It focuses on **structural dependency intelligence**: how source-level relationships compose into package architecture and which relationships deserve attention.

That narrow focus makes the output useful both visually and as portable evidence for other tools.
