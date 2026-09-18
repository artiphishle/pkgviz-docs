---
sidebar_position: 2
title: Getting started
---

# Getting started

There are three practical ways to use PKGViz today:

- generate an `audit.json` directly from a project with the CLI
- enforce or collect architecture rules in CI
- run the PKGViz application locally for interactive visualization

## Prerequisites

The current package requires:

- Node.js 24 or newer
- Bun 1.2.18 or newer

The repository currently uses Bun 1.4.x as its package manager.

## Fastest path: generate an audit

Open a terminal in the root of the project you want to analyze:

```bash
bunx pkgviz
```

By default PKGViz writes:

```text
./audit.json
```

Use a custom output path inside the analyzed project with:

```bash
bunx pkgviz --out reports/pkgviz-audit.json
```

PKGViz constrains the output path to the selected project root.

The default audit rule policy blocks cyclic dependencies. Use
`--rule cyclic-dependencies=audit` for an advisory result or
`--no-fail-on-rule-violation` to preserve blocking findings without failing because of them.

For CI setup, continue with [CI integrations](./ci.md).

## Run the interactive viewer

Clone PKGViz and install dependencies:

```bash
git clone https://github.com/artiphishle/pkgviz.git
cd pkgviz
bun install
```

Create a local environment file:

```bash
cp .env.tpl .env
```

Set the absolute project path:

```dotenv
NEXT_PUBLIC_PROJECT_PATH=/absolute/path/to/project
```

Start the application:

```bash
bun dev
```

The viewer analyzes the configured project and renders its dependency graph.

## Optional viewer defaults

The application supports these runtime settings:

```dotenv
NEXT_PUBLIC_SETTINGS_SHOW_COMPOUNDNODES=true
NEXT_PUBLIC_SETTINGS_SHOW_VENDORPACKAGES=false
NEXT_PUBLIC_SETTINGS_LAYOUT=concentric
NEXT_PUBLIC_SETTINGS_LAYOUT_SPACING=1
NEXT_PUBLIC_SETTINGS_SUBPACKAGE_DEPTH=1
```

The UI persists changed graph settings locally in the browser.

Available layouts are:

- `breadthfirst`
- `circle`
- `concentric`
- `elk`
- `grid`

## What happens during analysis

At a high level PKGViz:

1. inspects project files and metadata
2. collects language evidence
3. selects the strongest supported parser deterministically
4. resolves the parser-specific source root
5. parses files and import relationships
6. builds the package dependency graph
7. identifies cyclic components and keeps evidence for their edges
8. evaluates configured audit rules
9. exposes the result to the viewer or serializes it as an audit

Continue with [Language support](./languages.md) for parser-specific behavior.
