<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# English Lessons

A static Next.js site: lesson notes, homework and two reference pages, one
MDX file each. The README says how to write content; this file says how to
write code.

## Conventions

1. Content is MDX, code is TSX. A lesson or reference is one file in
   `content/`; it never imports anything — components are registered in
   `mdx-components.tsx`.
2. Metadata lives in the content file (`export const metadata`); data too
   (`verbs`, `groups`). Nothing about a lesson is hard-coded in `app/`.
3. Structure is read from the source, never duplicated: navigation, summary,
   rules and hints come from the tags in the .mdx, via `lib/lessons.ts`.
4. Any `<Gap>` or `<Pair>` sits on one physical line, because a tag alone on a
   line becomes a block in MDX and splits the sentence.
5. Attribute text (`hint`, `gist`, `instruction`) uses curly quotes ’ “ ” and
   never a straight `"` or a `>`; the source parser is a regex.
6. Colours go through the tokens in `app/globals.css`; no palette classes
   (`zinc-500`), no `dark:` variants. Dark mode is a second set of variables.
7. Type: headings `font-display`, labels `eyebrow`, numbers and verb forms
   `font-mono`. Cards are `card`; tables, segmented controls and search
   fields come from the shared components, not from copied classes.
8. A component that holds state is a client component with one job;
   everything else is a server component. State never leaves the exercise it
   belongs to.
9. Comments explain why, not what; a prop's doc comment says what it is for.
   A README section per feature says how to write content for it.
10. A lesson's status drives behaviour: `done` shows answers, anything else
    opens blank. New behaviour keyed to status goes through the lesson
    context.
11. Commits are one theme each, imperative mood, body says why. Nothing is
    committed or pushed until Max asks; authorship is the personal account
    (`mdolzhko`), set in the local git config.
12. Before committing: `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`.
