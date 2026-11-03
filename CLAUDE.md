# English Lessons

A static Next.js site: lesson notes, homework and reference pages, one MDX
file each. This file is read at the start of every session. The rules in
`.claude/rules/` add to it: those without `paths` at the start too, the
others when a file under their paths is read.

## Purpose

The owner is learning English with a teacher. The teacher sends material
(mostly from test-english.com), explanations and homework; the homework used
to arrive as `.pages` files, which neither of them could look back on. This
site is the shared place instead: the owner opens it to read the theory and
do the task, the teacher opens it to see which material goes with which task
and to check the owner’s texts. Nothing else should land on the teacher.

Homework follows two patterns — translate a Ukrainian text into English, or
fix an English text by picking the right option — and they map to
`<Translation>` and `<Gap>`. There is no fixed shape for the finished site;
the one direction is accumulating theory with exercises per topic. Add
structure when a real inconvenience of either reader calls for it, not
before.

The repository is public, so it holds no names of real people and no
account but `mdolzhko`: not the owner’s name, not the teacher’s, no email.

## Map

```
content/lessons/   one .mdx per lesson
content/*.mdx      reference pages: irregular verbs, verb patterns, vocabulary
app/               routes: the lesson list, /lessons/[slug], /[reference]
components/        what content files use (registered in mdx-components.tsx), and page parts
lib/               pure logic — loading content through guards, the source parser,
                   hints, the vocabulary index — with tests beside it
.claude/rules/     how each kind of file is written; a rule loads with the files it covers
README.md          what the site is and how to run it
```

## Workflow

- Open files with Read, not `cat` or `sed`: a rule in `.claude/rules/` scoped
  to a path loads only when a file under it is read that way.
- Before writing a new content file, Read an existing one of the same kind:
  the rules for that kind load with it, and the new file should look like it.
- A non-trivial change starts with a plan and waits for the owner’s explicit
  “yes”: anything that adds a file, a component or a rule, changes how
  something behaves, or could reasonably be done more than one way. A trivial
  fix — a typo, a wrong class, a one-line bug with one obvious answer — is
  made right away.
- A new lesson starts with its formats — cards or plain sections, gaps,
  translation, quiz… Read the list in `.claude/rules/lessons.md` and agree
  with the owner which to use, or a new one, before writing anything.
- The homework is the owner’s. Never translate or complete an exercise for
  them: set up the empty sentences, then insert and mark up what they send.
- Logic in `lib/` is written test first: a failing test, then the code.
  Content and components have no tests here; `pnpm check` and a look in the
  browser check them.
- Nothing is committed until the owner says so; they look at it in the
  browser first.
- When a rule stands in the way of a better solution, say so and propose the
  change to the rule. Never work around it quietly.
- At the end of a session that changed where things stand, update that
  section.

## Commands

```
pnpm check    the one definition of green: lint, types, tests, build
pnpm dev      http://localhost:3000 — often already running; several Orca
              workspaces share the port, so check which checkout it serves
pnpm lint · typecheck · test · build    the steps of check, one at a time
```

## Conventions

How content is written: `.claude/rules/content.md`, `lessons.md`,
`exercises.md`, `references.md`, `vocabulary.md`.

1. Code is TSX. Structure is read from the source, never duplicated:
   navigation, summary, rules and hints come from the tags in the .mdx, via
   `lib/lessons.ts`.
2. Colours go through the tokens in `app/globals.css`; no palette classes
   (`zinc-500`), no `dark:` variants. Each token is a `light-dark()` pair,
   and `color-scheme` picks the half.
3. Type: headings `font-display`, labels `eyebrow`, numbers and verb forms
   `font-mono`. Cards are `card`; tables, segmented controls and search
   fields come from the shared components, not from copied classes.
4. A component that holds state is a client component with one job;
   everything else is a server component. State never leaves the exercise it
   belongs to.
5. Comments explain why, not what; a prop's doc comment says what it is for.
   A new kind of content gets its section in the `.claude/rules/` file for
   the files it is written in.
6. A lesson's status drives behaviour: `done` shows answers, anything else
   opens blank. New behaviour keyed to status goes through the lesson
   context.

Commits, branches and pushes: `.claude/rules/git.md`.

## Where things stand

Updated at the end of a session that changes it. Last: 2026-11-03.

- Lessons: Auxiliary verbs (done), Past tenses (in progress), Conditionals
  (to do), The definite article (in progress). References: Irregular verbs,
  Verb patterns, Vocabulary.
- The definite article: notes from English with Lucy’s PDF *Everything to
  know about ‘the’*, which is not online (the owner has the file), regrouped
  into six cards with a `<Rule>` per case. Exercise 1 is the teacher’s,
  completed by the owner, with every article marked by its rule through
  `<Marked>`; the quiz is Lucy’s and still to do.
- Vocabulary: three days of words so far, from the motorcycle story and
  Exercise 1 of the past tenses lesson.
- Past tenses, Exercise 5 is the teacher's text: all 30 sentences
  translated, 16–30 not yet checked by the teacher. Exercises 1–4 are
  ten-sentence sets; 1 is translated, 2–4 not yet.
- Conditionals: the answers in all 70 gaps were worked out from the rules,
  not taken from test-english's key, which the site does not show. The status
  becomes `done` once the owner has worked through it.
- The Ukrainian translations in both reference pages have not been reviewed
  by the owner.
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

- **Lesson metadata without compiling the MDX.** `getLessons` imports every
  lesson to read its `metadata`, which compiles the whole file. Trigger: the
  build of the home page gets slow, around ten lessons, or a page needs every
  lesson's metadata but no content (tags, filters). Then read `metadata` from
  the source in `lib/lesson-source.ts`, as the tags already are.
- **The two-meaning branch in `components/verb-patterns.tsx`.** A search that
  mixes plain rows with two-meaning rows uses a `colSpan` branch that is hard
  to read. Trigger: any other change to that component. Then render three
  columns always and drop the branch.
