---
paths:
  - "content/lessons/**"
---

# Lessons

A lesson is one file in `content/lessons/`. The filename is the URL
(`the-definite-article.mdx` → `/lessons/the-definite-article`), and `date`
orders the home page, newest first.

```mdx
export const metadata = {
  title: "The definite article",
  description: "One or two sentences under the title.", // optional
  date: "2026-11-03",          // YYYY-MM-DD
  topic: "Grammar",
  status: "todo",              // todo | in-progress | done
  tags: ["articles"],
  source: "https://…",         // where the notes came from, optional; its host is the link text
};
```

## Status

The status drives behaviour. In a `done` lesson every `<Gap>` opens on its
answer, as finished homework; in any other it opens blank, to be tried
first. A new lesson starts as `todo` and becomes `done` once the owner has
worked through it. Behaviour keyed to status goes through the lesson context
(`components/lesson-context.tsx`), never a second copy of the content.

## Cards

The notes are numbered cards, one per idea, all before the exercises:

```mdx
<Topic
  id="past-perfect"
  title="Past Perfect"
  form="had + past participle"
  chips={["an earlier past"]}
  gist="Something that had already happened before the main event."
  hint="had + past participle, for what happened before the main past event."
>

Paragraphs, examples, `<Rule>`s, `<Chart>`s and `<Note>`s.

</Topic>
```

- The number is a CSS counter, so cards renumber themselves when reordered.
- `gist` is not shown on the card: the summary above the notes lists every
  card with its gist, read from the source like the side navigation.
- `hint` makes the card a rule that a gap or a mark can point at by its
  `id`; the hint is the one-line form shown there.
- `<Rule id title hint>` inside a card when it holds several rules. Each is
  addressable by its own `id`, and its title is a heading.
- `<Chart columns rows>` for a form or a set of examples; `[brackets]` in a
  cell highlight what the row is about, `labelColumn` mutes the first column.
- `<Note label="…">` is a short emphasised aside — a trap, a distinction easy
  to miss — of one or two sentences.
- A lesson that contrasts several forms ends its cards with one that sets
  them side by side.
- Attribute text (`gist`, `hint`, `title`, `instruction`, `label`) uses curly
  quotes ’ “ ” and never a straight `"` or a `>`: the source is read by a
  regex in `lib/lesson-source.ts`, which stops at either.

## From a source to a lesson

`status: "todo"`, one `<Topic>` per idea with the source’s examples, a
`<Chart>` for the form, `<Note>`s for the traps, then the exercises (see
`exercises.md`), every gap with its answer and a `rule`. Where the source
hides its answer key, work the answers out from the rules and say so in
“Where things stand”.
