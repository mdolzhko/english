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

## Formats

A lesson is built from formats, chosen with the owner when the lesson is
planned: which of these to use, or a new one. None is required and the list
is not closed — a new format is added here once it exists.

Notes:

- **Cards** — a numbered `<Topic>` per idea with `<Rule>`s inside, and a
  summary of the cards above the notes. For theory that will be looked up.
- **Sections** — plain `## Topic`, `## Task` and `## My answers`: the notes
  from the lesson, the task as the teacher set it, and the owner’s answers in
  whichever exercise format fits. The side navigation lists the headings;
  there is no summary.

Exercises, each written as `exercises.md` says:

- **Gaps** — pick the right option in a sentence.
- **Translation** — a Ukrainian text, sentence by sentence, with the owner’s
  English under each.
- **Marked sentences** — finished English sentences with the rule behind
  every article.
- **Quiz** — questions answered by picking an option: true or false, or
  which sentence is correct.
- **Dialogue** — a conversation with numbered gaps.

Formats mix: the definite article lesson has cards, marked sentences and a
quiz.

## Status

The status drives behaviour. In a `done` lesson every `<Gap>` opens on its
answer, as finished homework; in any other it opens blank, to be tried
first. A new lesson starts as `todo` and becomes `done` once the owner has
worked through it. Behaviour keyed to status goes through the lesson context
(`components/lesson-context.tsx`), never a second copy of the content.

## Cards

In the cards format the notes are numbered cards, one per idea, all before
the exercises:

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

## A new lesson

Plan it first and agree its formats with the owner. Then `status: "todo"`;
with cards, one `<Topic>` per idea with the source’s examples, a `<Chart>`
for the form and `<Note>`s for the traps; the exercises after the notes,
every gap with its answer and a `rule`. Where the source hides its answer
key, work the answers out from the rules and say so in “Where things stand”.
