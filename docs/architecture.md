---
title: Architecture
---

# Architecture

PKGViz is progressively separating reusable analysis capabilities from the presentation application.

The important design rule is that graph algorithms, project detection, dependency analysis, and filesystem safety should have canonical owners rather than being copied into the Next.js UI.

## Analysis flow

```text
project root
   │
   ▼
project inspection
@ankhorage/project-detector
   │
   ▼
PKGViz parser selection
   │
   ▼
language parser / dependency analysis
   │
   ▼
package graph construction
   │
   ├──► cyclic-component analysis + evidence
   │
   ├──► audit serialization
   │
   └──► Graph → Cytoscape projection
              │
              ▼
        interactive viewer
```

## Canonical package boundaries

PKGViz currently consumes these Ankhorage packages through published APIs:

| Package | Responsibility |
| --- | --- |
| `@ankhorage/project-detector` | project, language, and workspace inspection |
| `@ankhorage/graph` | generic graph model and algorithms, including cyclic components |
| `@ankhorage/graph-cytoscape` | conversion from generic graph data to Cytoscape elements |
| `@ankhorage/dependency-graph` | reusable dependency/import analysis |
| `@ankhorage/utility` | reusable utility boundaries, including rooted filesystem operations |

PKGViz retains application-specific decisions such as parser selection, parser-specific source-root behavior, audit composition, and the user interface.

## Server-side analysis

Next.js server actions currently coordinate the main application use cases:

- building the graph
- building the audit
- serializing audit downloads

The CLI can call the audit action directly when it only needs JSON output. Viewer mode starts the packaged Next.js application against the caller's project directory.

## Graph semantics

The graph includes package nodes and dependency edges. PKGViz preserves semantics that matter for architecture analysis, including:

- intrinsic/vendor classification
- edge weights
- hierarchy
- cycle membership
- source evidence associated with cycle edges

Depth projection and vendor filtering are presentation/projection concerns and must not silently rewrite the underlying architectural evidence.

## Cycle detection

PKGViz converts package adjacency into the canonical Ankhorage graph representation and delegates strongly connected component detection to `@ankhorage/graph`.

It then adds PKGViz-specific evidence by mapping each cycle edge back to parsed source imports.

This is a representative architecture pattern in the repository: generic algorithms belong in reusable packages; product-specific evidence and workflow remain in PKGViz.

## Migration discipline

The repository is actively modularizing older analysis code. Its engineering rules explicitly avoid a big-bang rewrite:

- protect behavior with regression tests first
- migrate one responsibility at a time
- migrate language analyzers independently
- keep the application usable after every PR
- remove an old path only after its replacement is proven equivalent

The tagged recovery point for the graph modularization is `pkgviz-baseline-pre-graph-modularization`.

## Filesystem safety

Analysis and CLI output use rooted filesystem helpers from `@ankhorage/utility`.

PKGViz intentionally constrains reads/writes to selected roots. Archive/JAR handling is expected to use isolated temporary directories, protect against traversal, and clean up after analysis.
