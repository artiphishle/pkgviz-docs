---
title: Status and roadmap
---

# Status and roadmap

PKGViz is currently released as **0.7.x alpha**.

The project already has a coherent end-to-end workflow, but the word *alpha* is intentional: internal responsibilities are being modularized and the automation surface is still growing.

## Available today

Current repository behavior includes:

- project and language detection
- parser selection with retained language candidates/evidence
- TypeScript, Java, C++, Python, Delphi, and Kotlin parsing
- package dependency graph construction
- vendor/intrinsic dependency semantics
- dependency weights
- cyclic-component detection
- concrete import evidence for cycle edges
- interactive Cytoscape visualization
- package-depth and vendor filtering
- multiple graph layouts
- CLI JSON audit export
- browser JSON/XML audit export

## Architecture work in progress

The repository is moving generic responsibilities into focused reusable packages instead of letting PKGViz become one monolithic analyzer.

That includes continued migration around:

- graph algorithms
- dependency/import analysis
- language analyzers
- reusable audit/rule contracts
- CI/build-tool adapters

The rule for this work is behavioral equivalence first, extraction second.

## Automation direction

Audit rules are intended to be reusable outside the UI.

The first mandatory blocking rule defined by the project is `cyclic-dependencies`. Future integrations can then consume the same rule semantics from different environments—for example Node/TypeScript workflows or build-tool plugins—without duplicating the analyzer.

## More languages and ecosystems

The parser architecture already supports several ecosystems with different project layouts. Additional languages should be added as focused analyzers with representative fixtures and explicit project-root behavior rather than generic regex accumulation.

## Open-source positioning

PKGViz aims to make structural architecture analysis inspectable and automatable without requiring a proprietary architecture platform.

The strongest contribution areas are:

- higher-fidelity dependency analysis
- additional language support
- richer architecture rules
- CI/build integration
- better evidence and diagnostics
- large-graph UX and visualization
- documentation and reproducible examples

Follow development on [GitHub](https://github.com/artiphishle/pkgviz).
