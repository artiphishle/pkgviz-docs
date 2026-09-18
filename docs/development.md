---
title: Development and contribution
---

# Development and contribution

PKGViz is open source and welcomes improvements to analysis quality, language support, visualization, auditability, and documentation.

## Local setup

```bash
git clone https://github.com/artiphishle/pkgviz.git
cd pkgviz
bun install
cp .env.tpl .env
```

Set `NEXT_PUBLIC_PROJECT_PATH` to a project you are allowed to analyze, then:

```bash
bun dev
```

## Required validation

Before a PKGViz pull request is merged, the repository requires the applicable validation commands:

```bash
bun run lint
bun run format:check
bun run test
bun run build
```

The protected `CI / validate` check is authoritative for pull requests to `main`.

Additional maintenance commands include:

```bash
bun run test:cov
bun run knip:check
```

## Regression-first analysis changes

Graph and parser migrations should protect behavior before replacing implementation.

Relevant semantics include:

- project/language selection
- intrinsic/vendor classification
- graph node and edge construction
- edge weights
- cycle membership and evidence
- vendor filtering
- depth projection and lifted-edge aggregation
- representative fixtures for affected languages

Tests should prefer observable behavior over internal implementation details.

## Repository engineering standards

Before source changes, contributors must read the repository `AGENTS.md` and the required local skills under `.agents/skills/`.

New or materially changed architecture follows the repository's current Ankhorage coding, project-structure, and hexagonal-architecture rules.

Cross-package usage must go through published package APIs. Do not copy sibling repository source into PKGViz.

## Adding analysis capability

A new capability should answer three questions clearly:

1. Is this PKGViz-specific product behavior or a reusable analysis primitive?
2. Which layer owns the type and implementation?
3. Can the behavior be consumed without the browser UI?

Reusable rules and analyzers should remain usable by future CLI, Maven, Node/TypeScript, or other build integrations.

## Keep PRs narrow

PKGViz intentionally favors independently revertible changes. Large migrations should be split into regression protection and focused implementation steps instead of combining parser extraction, graph rewrites, and UI redesign in one PR.
