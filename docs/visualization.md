---
title: Interactive visualization
---

# Interactive visualization

PKGViz renders the dependency model with Cytoscape. The graph is not a separate analysis implementation: it is a visual projection of the same parsed project relationships used for the audit.

## What the graph represents

Nodes represent packages or package hierarchy. Edges represent dependencies discovered from source imports.

The graph model can also carry:

- dependency weights
- intrinsic/vendor classification
- cyclic-package markers
- cyclic-edge markers
- cycle evidence
- package hierarchy for compound nodes

## Explore at the right level

Large codebases become unreadable if every nested package is shown at once. PKGViz therefore lets you control subpackage depth and whether compound nodes are displayed.

You can also hide vendor dependencies to focus on the architecture owned by the project itself.

## Layouts

The viewer currently offers five Cytoscape layouts:

- **Breadth-first** — useful for directional dependency structure
- **Circle** — useful for a neutral overview
- **Concentric** — the default family for compact structural inspection
- **ELK** — graph layout powered by `cytoscape-elk`
- **Grid** — predictable spatial organization

Layout spacing can be adjusted independently.

## Cycles are evidence-bearing findings

PKGViz detects cyclic package components using shared graph algorithms from `@ankhorage/graph`.

For a concrete cycle, PKGViz keeps the source evidence for each edge: which parsed file imported which target package. Cyclic nodes and edges are annotated in the Cytoscape model instead of being inferred only from presentation styling.

This distinction matters: a cycle can be exported and reasoned about outside the browser.

## Persistent local preferences

Viewer settings are stored in browser local storage, including:

- selected layout
- layout spacing
- vendor visibility
- compound-node visibility
- subpackage depth

That lets the visualization remain a working view rather than resetting on every reload.
