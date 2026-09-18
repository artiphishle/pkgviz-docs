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
  "configuration": {
    "failOnRuleViolation": true,
    "rules": [
      {
        "id": "cyclic-dependencies",
        "mode": "block"
      }
    ]
  },
  "evaluation": {
    "cyclicPackages": [],
    "rules": []
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

## Configuration

`configuration` records the effective audit policy used for the run.

Each rule has one mode:

- `off`: disabled
- `audit`: evaluated and recorded as advisory
- `block`: evaluated and recorded as blocking

The current default is `cyclic-dependencies=block` with `failOnRuleViolation=true`.

Keeping the effective policy in the artifact makes an audit self-describing: downstream tooling can
see not only what PKGViz found, but also how that run was configured to treat the finding.

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

## Rule results

`evaluation.rules` contains the evaluated audit-rule results. A result records its rule id, status,
policy, message, details, and rule-specific evidence.

For `cyclic-dependencies`, the result can therefore distinguish between the same detected cycle
being advisory or blocking without changing the underlying dependency evidence.

## JSON from the CLI

```bash
bunx pkgviz
```

or:

```bash
bunx pkgviz --out reports/pkgviz.json
```

The CLI writes the artifact before enforcing blocking rules. This means a CI build can fail on a
blocking rule and still retain the audit for inspection.

## JSON and XML from the viewer

The settings panel exposes audit downloads in both formats.

XML is a serialization of the same current audit object; JSON should generally be preferred for programmatic consumers.

## Audit rules and CI

Audit and rule behavior is shared outside the UI. The CLI exposes rule configuration directly, and
the Maven adapter forwards the same contract instead of reimplementing analysis in Java.

The first implemented rule is `cyclic-dependencies`.

See [CI integrations](./ci.md) for ready-to-use GitHub Actions and Maven configurations.
