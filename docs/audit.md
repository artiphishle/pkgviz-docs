---
title: Audit output
---

# Audit output

The audit is PKGViz's machine-readable representation of an analysis.

The CLI writes JSON. The browser UI can download both JSON and XML.

## Current JSON shape

At a high level:

```json
{
  "evaluation": {
    "cyclicPackages": []
  },
  "files": {},
  "meta": {
    "language": {},
    "projectName": "example",
    "timeStart": 0,
    "timeEnd": 0
  }
}
```

The exact nested file and dependency data depends on the selected parser.

## Metadata

`meta` records:

- project name
- analysis start and end timestamps
- selected parser language
- detector/parser-selection information, including language candidates and evidence

Language scores are heuristic strengths, not probabilities.

## Parsed files

`files` contains the parsed directory structure. Parsed source files retain the package/import information needed to build the dependency graph and explain findings.

## Cyclic package evaluation

`evaluation.cyclicPackages` contains cycle details.

Each cycle includes:

- an ordered package path, including the closing package
- edge records for each package-to-package step
- `via` evidence describing source files/imports that created that dependency

Conceptually:

```json
{
  "packages": ["A", "B", "A"],
  "edges": [
    {
      "from": "A",
      "to": "B",
      "via": [
        {
          "filePath": "src/a/example.ts",
          "importName": "B"
        }
      ]
    }
  ]
}
```

This is deliberately more useful than a boolean `hasCycles`: downstream tooling can explain *why* a relationship was reported.

## JSON from the CLI

```bash
bunx pkgviz
```

or:

```bash
bunx pkgviz --out reports/pkgviz.json
```

## JSON and XML from the viewer

The settings panel exposes audit downloads in both formats.

XML is a serialization of the same current audit object; JSON should generally be preferred for programmatic consumers.

## Audit rules and CI

PKGViz's architecture treats audit/rule behavior as reusable logic that should not be owned by the UI. Build-tool integrations are expected to consume the shared audit/rule contract rather than reimplementing analysis.

The first mandatory blocking architecture rule targeted by the project is `cyclic-dependencies`.

:::note Current versus target architecture
The portable audit and cyclic dependency evaluation exist today. The broader rule engine and build-tool/CI integration surface is still being modularized, so integrations should be documented as they become released public APIs rather than assumed from internal code.
:::
