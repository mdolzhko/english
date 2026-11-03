---
paths:
  - "content/*.mdx"
---

# Reference pages

Every `.mdx` directly in `content/` (not in `lessons/`) is a reference page,
served at `/<filename>`. Its metadata is a lesson’s `title` and
`description`, plus `label`, its tab in the navigation, and `order`, the
tab’s place. The tabs are built from these, so a new page needs no code. A
reference page has no status and no date.

The data is exported from the file, and the comment above it gives the shape
of a row: read it before adding one. MDX is not type-checked, so the page
flags an incomplete row rather than the build failing.

- `irregular-verbs.mdx` — `verbs`: base, past simple, past participle,
  translation, and a frequency rank on the 50 most common only. The rank
  picks and orders the default view and is never shown.
- `verb-patterns.mdx` — `groups`: verbs followed by `to do`, by `doing`, by
  either; a verb whose meaning changes carries a meaning and an example for
  each form.
- `vocabulary.mdx` — see `vocabulary.md`.
