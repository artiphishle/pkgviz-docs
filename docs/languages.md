---
title: Language support
---

# Language support

PKGViz separates **project detection** from **parser selection**.

Project inspection is delegated to `@ankhorage/project-detector`. PKGViz then chooses one parser from the supported languages using a deterministic ranking:

1. strongest detector score
2. number of evidence paths
3. stable parser order: TypeScript, Java, C++, Python, Delphi, Kotlin

The score represents heuristic evidence strength; it is not a probability.

## Supported parsers

| Language | Parsed files | Source-root behavior |
| --- | --- | --- |
| TypeScript | `.ts`, `.tsx` | project root |
| Java | `.java` | requires the Java source root used by PKGViz, currently `src/main/java` |
| C++ | `.cpp`, `.cc`, `.cxx`, `.h`, `.hpp`, `.hxx` | `src/` when present, otherwise project root |
| Python | `.py` | `src/`, then `app/`, then project root |
| Delphi | `.pas`, `.pp`, `.dpr` | `src/`, then `Source/`, then project root |
| Kotlin | `.kt`, `.kts` | `src/main/kotlin/`, then `src/`, then project root |

For TypeScript, import analysis is delegated to the reusable `@ankhorage/dependency-graph` boundary rather than being duplicated in the UI application.

## Polyglot repositories

Detection can retain several language candidates. PKGViz currently runs one parser per audit, so it chooses the strongest supported candidate and records the candidate information in audit metadata.

For repositories containing multiple independently structured applications, run PKGViz from the relevant application directory rather than assuming one audit will merge every language into a single graph.

## Detected does not always mean parseable

A language can be recognized by project detection without having a PKGViz parser. JavaScript is one example: detection evidence may exist, but the current parser set is the list above.

If no supported parser can be selected, PKGViz fails explicitly instead of silently generating a partial graph.

## Ignored directories

During recursive source parsing PKGViz excludes common non-source or self-test paths such as:

- `.git`
- `.github`
- `.next`
- `node_modules`
- `dist`
- `coverage`
- `.cache`
- `examples`
- `test`
- `@types`

The project detector also prunes dependency/build paths so parser selection is based on the project rather than generated or vendored content.
