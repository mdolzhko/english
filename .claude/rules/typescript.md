---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript

- No `as` and no `any`; lint refuses both, and its message says what to do
  instead. A value from outside the type system — a content file, the DOM,
  JSON — is `unknown` until a guard narrows it or the code throws; a value
  that is already typed gets a better type, not a cast. `as const` is fine.
- Content files are read in one place: every `import()` of one, and the
  guards that type what comes out, live in `lib/content.ts`. Lint refuses
  `import()` anywhere else.
- Structure is read from the source, never duplicated: navigation, the
  summary, rules and hints come from the tags in a lesson’s `.mdx`, through
  `lib/lesson-source.ts` and `lib/lessons.ts`. Nothing about a lesson is
  listed again in code.
- Imports: `./` within a folder, `@/` across folders (`@/lib/hints`,
  `@/components/vocabulary`).
- Logic that is not rendering lives in `lib/`, written test first, with the
  test beside it (`hints.ts`, `hints.test.ts`). Parsing stays pure, so it can
  be tested on a string; the filesystem is read at the edge
  (`lesson-source.ts` parses, `lessons.ts` reads the files).
