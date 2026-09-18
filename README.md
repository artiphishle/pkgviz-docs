# PKGViz Docs

Documentation website for [PKGViz](https://github.com/artiphishle/pkgviz), the open-source package dependency and architecture analysis tool.

**Published docs:** https://artiphishle.github.io/pkgviz-docs/

## What this repository documents

The site covers the complete user-facing PKGViz workflow:

- project and language detection
- dependency parsing for TypeScript, Java, C++, Python, Delphi, and Kotlin
- interactive package graph visualization
- cyclic-dependency evidence
- JSON and XML audit output
- CLI usage and local viewer setup
- architecture, development, testing, and current project status

## Development

```bash
npm install
npm start
```

## Build

```bash
npm run build
npm run serve
```

## Deployment

Docusaurus deploys the generated site to the repository's `gh-pages` branch:

```bash
npm run deploy
```

The documentation is maintained separately from the PKGViz application repository so the product code and the public documentation can evolve independently.
