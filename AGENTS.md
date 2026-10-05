<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# English Lessons

A static Next.js site: lesson notes, homework and two reference pages, one
MDX file each. The README says how to write content; this file says how to
write code.

## Purpose

Max is learning English with a teacher. The teacher sends material (mostly
from test-english.com), explanations and homework; the homework used to
arrive as `.pages` files, which neither of them could look back on. This
site is the shared place instead: Max opens it to read the theory and do the
task, the teacher opens it to see which material goes with which task and to
check Max's texts. Nothing else should land on the teacher.

Homework follows two patterns — translate a Ukrainian text into English, or
fix an English text by picking the right option — and they map to
`<Translation>` and `<Gap>`. There is no fixed shape for the finished site;
the one direction is accumulating theory with exercises per topic. Add
structure when a real inconvenience of either reader calls for it, not
before.

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
12. Before committing: `pnpm lint`, `pnpm test`, `pnpm exec tsc --noEmit`,
    `pnpm build`.

## Decisions

Settled, with the reason, so they are not reopened by accident.

- **One lesson for the three past tenses, not three lessons.** The teacher's
  homework mixes them, and the point of the topic is choosing between them;
  the comparison has to live on one page.
- **Translation exercises are sentence pairs, not tabs.** Tabs break the pair:
  to check sentence 7 you would jump between tabs. Practice mode hides the
  English per sentence instead.
- **Topic cards, not `##` headings.** Each idea is a numbered card with the
  construction as a chip, the way the review documents Max likes are laid out;
  the summary above the notes is built from the cards.
- **Reference pages are not lessons.** Irregular verbs and verb patterns are
  looked up more often than any lesson, so they sit in the header, not in the
  lesson list, and have no status or date.
- **Reference data stays in the MDX file**, next to its notes, even though
  MDX is not type-checked. The table flags an incomplete row instead.
- **Past simple is not highlighted** in the past tenses lesson: it is the
  baseline of the story, and only the tense the lesson is about is marked.
- **Exercises sit after the cards, all together**, labelled with the card they
  practise, rather than inside each card. The side navigation keeps its two
  groups, notes and exercises.
- **A lesson's `done` status shows the answers; `todo` hides them.** One
  switch, no second set of content.

## Where things stand

Updated at the end of a session that changes it. Last: 2026-10-05.

- Lessons: Auxiliary verbs (done), Past tenses (in progress), Conditionals
  (to do). References: Irregular verbs, Verb patterns.
- Past tenses, Exercise 5 is the teacher's text: 15 of 30 sentences
  translated. Exercises 1–4 are ten-sentence sets, none translated yet. Max
  translates them himself and sends the English to be inserted with the verb
  form in brackets and a `rule`.
- Conditionals: the answers in all 70 gaps were worked out from the rules,
  not taken from test-english's key, which the site does not show. The status
  becomes `done` once Max has worked through it.
- The Ukrainian translations in both reference pages have not been reviewed
  by Max.
- Not deployed. When it is: Vercel from the browser under the personal
  account — the local CLI is logged into the work account.

## Ideas for later

Live as GitHub Issues with the `idea` label (`gh issue list --label idea`),
not as files in this tree: a thought for the future should not need a commit
to change. Each names its trigger — the condition under which it becomes
worth building.

## Known debt

Reviewed and left alone on purpose. Fix each when its trigger arrives, not
before — and when you are in that file anyway, take it with you.

- **One loader for the reference pages.** `app/irregular-verbs/page.tsx` and
  `app/verb-patterns/page.tsx` each import their MDX by hand. Trigger: a
  third reference page, or a list of references anywhere on the site. Then
  mirror `lib/lessons.ts` with a `lib/references.ts`.
- **Lesson metadata without compiling the MDX.** `getLessons` imports every
  lesson to read its `metadata`, which compiles the whole file. Trigger: the
  build of the home page gets slow, around ten lessons, or a page needs every
  lesson's metadata but no content (tags, filters). Then read `metadata` from
  the source in `lib/lesson-source.ts`, as the tags already are.
- **The two-meaning branch in `components/verb-patterns.tsx`.** A search that
  mixes plain rows with two-meaning rows uses a `colSpan` branch that is hard
  to read. Trigger: any other change to that component. Then render three
  columns always and drop the branch.
