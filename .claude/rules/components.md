---
paths:
  - "components/**"
  - "app/**"
  - "mdx-components.tsx"
---

# Components

- A server component by default. A component that holds state is a client
  component with one job; state never leaves the exercise it belongs to.
- What depends on the lesson — its status, its rules, the vocabulary — is
  read through the lesson context (`components/lesson-context.tsx`), so a gap
  or a mark deep in the MDX carries only an id. New behaviour keyed to status
  goes through it too.
- A component a content file uses is registered in `mdx-components.tsx`, and
  gets its section in the `.claude/rules/` file for the content it is written
  in — `exercises.md` for an exercise.
- Tables, segmented controls and search fields come from `table.tsx`,
  `segmented.tsx` and `search-field.tsx`; a note that opens under a word
  comes from `hover-note.tsx`. Not from copied classes.
- Comments explain why, not what. A component’s doc comment says what it is
  for, and so does a prop’s.
