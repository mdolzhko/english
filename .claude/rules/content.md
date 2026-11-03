---
paths:
  - "content/**"
---

# Content

- Content is MDX: a lesson or a reference page is one file in `content/`.
  It never imports anything — every component it may use is registered in
  `mdx-components.tsx`.
- Metadata lives in the file (`export const metadata`), and so does data
  (`verbs`, `groups`). Nothing about a lesson is hard-coded in `app/`.
- Only the build reads these files: MDX is not type-checked, and lint, types
  and tests never open it. That is why `pnpm check` includes the build.
- No names of real people (see CLAUDE.md): the owner is “the owner”, the
  teacher “the teacher”. Characters in an exercise are fine.

## Where material comes from

- test-english.com, the site the teacher uses, blocks `curl` and plain
  fetches. Read it in the owner’s Chrome, and wait a moment after navigating
  for its check to pass. Its pages follow one pattern: the explanation at
  `test-english.com/explanation/<level>/<slug>/`, exercise N at
  `test-english.com/grammar-points/<level>/<slug>/N/`.
- Anything else arrives as a file — a PDF, a screenshot — and the owner
  gives its path; Read it there. Search for it online first: if it is
  there, `source` links to it.
- Whatever the source, the notes are written in our own words and regrouped
  for looking up; short examples may be kept. `source` in the metadata says
  where it came from.
