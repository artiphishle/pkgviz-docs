---
sidebar_position: 4
title: CI integrations
---

# CI integrations

PKGViz uses the same audit and rule contract in the CLI and build-tool adapters. A CI integration
does not need its own dependency analysis implementation: it runs PKGViz, preserves the generated
audit artifact, and maps the shared exit behavior into the build.

## Rule policy

Each audit rule has one mode:

| Mode | Audit result | CI behavior |
| --- | --- | --- |
| `off` | Rule is not evaluated | Never fails because of that rule |
| `audit` | Finding is recorded as advisory | Does not fail CI |
| `block` | Finding is recorded as blocking | Fails CI when enforcement is enabled |

The current default is:

```text
cyclic-dependencies=block
failOnRuleViolation=true
```

PKGViz writes the audit artifact before enforcing blocking rules. Exit code `2` means a blocking
audit rule failed; other non-zero exit codes indicate an execution or configuration error.

## GitHub Actions

A dedicated PKGViz GitHub Action is not required for the current contract. Run the published CLI
directly and upload the audit with `actions/upload-artifact`.

Pin the PKGViz version in CI so rule behavior changes only when you deliberately update it:

```yaml
name: PKGViz audit

on:
  pull_request:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  pkgviz:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: '1.4.2'

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '24'

      - name: Run PKGViz audit
        run: |
          mkdir -p reports
          bunx pkgviz@0.7.7 --out reports/pkgviz-audit.json

      - name: Upload PKGViz audit
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: pkgviz-audit
          path: reports/pkgviz-audit.json
          if-no-files-found: error
```

With the default policy, a cyclic dependency makes the audit step fail while the following
`if: always()` step still uploads the generated evidence.

### Audit without failing CI

If findings should be collected but not block the workflow, keep the blocking policy in the audit
and disable rule-violation enforcement:

```yaml
- name: Run PKGViz audit
  run: bunx pkgviz@0.7.7 --out reports/pkgviz-audit.json --no-fail-on-rule-violation
```

This is different from GitHub Actions `continue-on-error`: PKGViz still fails for execution and
configuration errors, while rule findings alone return success.

To make only cyclic dependencies advisory:

```yaml
- name: Run PKGViz audit
  run: bunx pkgviz@0.7.7 --out reports/pkgviz-audit.json --rule cyclic-dependencies=audit
```

To disable that rule entirely:

```yaml
- name: Run PKGViz audit
  run: bunx pkgviz@0.7.7 --out reports/pkgviz-audit.json --rule cyclic-dependencies=off
```

## Maven plugin

PKGViz also contains a thin Maven plugin adapter. The Java plugin does not duplicate graph analysis
or rule logic; it invokes the PKGViz CLI and translates the shared exit contract into Maven build
semantics.

The current plugin coordinate in the PKGViz repository is:

```text
io.github.artiphishle:pkgviz-maven-plugin:0.1.0-SNAPSHOT
```

:::note Release status
The Maven adapter is implemented and tested in the PKGViz repository, but the current coordinate is
still a snapshot. Use the released plugin version once a Maven artifact is published. The
configuration contract below reflects the implemented adapter.
:::

The `pkgviz:audit` goal is bound to Maven's `verify` phase by default:

```xml
<plugin>
  <groupId>io.github.artiphishle</groupId>
  <artifactId>pkgviz-maven-plugin</artifactId>
  <version>0.1.0-SNAPSHOT</version>
  <executions>
    <execution>
      <goals>
        <goal>audit</goal>
      </goals>
    </execution>
  </executions>
  <configuration>
    <packageSpec>pkgviz@0.7.7</packageSpec>
    <rules>
      <rule>cyclic-dependencies=block</rule>
    </rules>
    <failOnRuleViolation>true</failOnRuleViolation>
  </configuration>
</plugin>
```

By default the adapter executes:

```text
npx --yes pkgviz --out target/pkgviz-audit.json
```

The PKGViz binary itself runs with Bun, so the current Maven adapter environment needs Maven/Java,
Node/npm, and Bun available.

The audit is written to `target/pkgviz-audit.json` before a blocking rule is surfaced as a Maven
failure.

### Maven rule modes

Keep a cyclic-dependency finding but make it advisory:

```xml
<configuration>
  <rules>
    <rule>cyclic-dependencies=audit</rule>
  </rules>
</configuration>
```

Keep the rule blocking in the audit but never fail the Maven build because of rule findings:

```xml
<configuration>
  <failOnRuleViolation>false</failOnRuleViolation>
</configuration>
```

Disable cyclic-dependency evaluation:

```xml
<configuration>
  <rules>
    <rule>cyclic-dependencies=off</rule>
  </rules>
</configuration>
```

The adapter accepts repeated `<rule>id=mode</rule>` values, so future audit rules can use the same
configuration surface without adding rule-specific Maven code.

Available Maven properties include `pkgviz.executable`, `pkgviz.packageSpec`, `pkgviz.output`,
`pkgviz.cli`, `pkgviz.rules`, `pkgviz.failOnRuleViolation`, and `pkgviz.skip`.

Setting `pkgviz.skip=true` skips analysis completely and therefore does not create an audit
artifact.
