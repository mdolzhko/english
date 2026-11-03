---
paths:
  - "lib/lessons.ts"
  - "lib/lesson-source.ts"
  - "components/verb-patterns.tsx"
---

# Known debt

Reviewed and left alone on purpose. Fix each when its trigger arrives, not
before — and when you are in that file anyway, take it with you. A paid debt
is deleted from here, and a new one is added with its trigger and its file
in `paths`.

- **Lesson metadata without compiling the MDX.** `getLessons` imports every
  lesson to read its `metadata`, which compiles the whole file. Trigger: the
  build of the home page gets slow, around ten lessons, or a page needs every
  lesson's metadata but no content (tags, filters). Then read `metadata` from
  the source in `lib/lesson-source.ts`, as the tags already are.
- **The two-meaning branch in `components/verb-patterns.tsx`.** A search that
  mixes plain rows with two-meaning rows uses a `colSpan` branch that is hard
  to read. Trigger: any other change to that component. Then render three
  columns always and drop the branch.
