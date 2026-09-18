---
sidebar_position: 3
title: CLI
---

# CLI

The `pkgviz` binary is designed for running an audit from the directory being analyzed.

## Basic usage

```bash
bunx pkgviz
```

The current working directory becomes the analysis root and PKGViz writes `audit.json` into that project.

## Output

Choose another output file:

```bash
bunx pkgviz --out reports/architecture.json
```

Write compact JSON:

```bash
bunx pkgviz --no-pretty
```

The output path is resolved through PKGViz's rooted-filesystem boundary and must stay inside the analyzed project.

## Viewer mode

PKGViz can also start its packaged Next.js viewer:

```bash
bunx pkgviz --serve
```

Useful related options include:

| Option | Purpose |
| --- | --- |
| `--serve` | Start the viewer and keep its server running |
| `--open` | Open the viewer UI |
| `--prod` | Prefer the packaged production Next.js build |
| `-p, --port <n>` | Request a port; PKGViz otherwise finds a free one |
| `-v, --verbose` | Show additional CLI/server output |
| `-o, --out <file>` | Select the audit output file |
| `--no-pretty` | Minify JSON output |
| `-h, --help` | Print CLI help |

When viewer mode is used, PKGViz passes the caller's working directory to the application as the project path.

## Exit behavior

A normal audit exits after the JSON file is written. Analysis errors are reported to stderr and the process exits unsuccessfully.

This makes the CLI suitable as a building block for scripts even though the broader reusable rule/CI integration layer is still evolving.
