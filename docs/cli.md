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

## Audit rules

Audit rules use the shared `off | audit | block` policy.

The current default is:

```text
cyclic-dependencies=block
failOnRuleViolation=true
```

Override a rule with a repeatable `--rule` option:

```bash
bunx pkgviz --rule cyclic-dependencies=audit
```

Disable a rule:

```bash
bunx pkgviz --rule cyclic-dependencies=off
```

Keep blocking findings in the audit but return success for rule violations:

```bash
bunx pkgviz --no-fail-on-rule-violation
```

The audit is written before rule enforcement, so blocking findings remain available as evidence even
when the command exits unsuccessfully.

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
| `--rule <id>=<mode>` | Configure a rule as `off`, `audit`, or `block`; repeatable |
| `--no-fail-on-rule-violation` | Return success for audit-rule violations while preserving blocking findings |
| `-h, --help` | Print CLI help |

When viewer mode is used, PKGViz passes the caller's working directory to the application as the project path.

## Exit behavior

For an audit-only invocation:

- exit code `0`: analysis completed and no enforced blocking rule failed
- exit code `2`: a blocking audit rule failed while enforcement was enabled
- other non-zero exit codes: execution or configuration failure

This exit contract is shared by CI adapters. See [CI integrations](./ci.md) for GitHub Actions and
Maven examples.
