# English Lessons

Lesson topics and completed homework, as a static site.

## Development

```bash
pnpm dev     # http://localhost:3000
pnpm build   # static build, one prerendered page per lesson
pnpm lint
```

## Adding a lesson

Drop one file into `content/lessons/`. The filename becomes the URL
(`content/lessons/my-lesson.mdx` → `/lessons/my-lesson`), and `date` in the
metadata decides the order on the home page.

```mdx
export const metadata = {
  title: "Auxiliary verbs: Different uses",
  description: "",             // one or two sentences, optional
  date: "2026-09-29",          // YYYY-MM-DD
  topic: "Grammar",
  status: "done",              // todo | in-progress | done
  tags: ["auxiliary-verbs"],
  source: "",                  // link to the original exercise, optional
};

## Topic

Notes from the lesson.

## Task

What the teacher asked for.

## My answers

<Exercise>
  <Item>
    <Turn speaker="A">I've never seen anything like this before.</Turn>
    <Turn speaker="B">
      Neither <Gap answer="have" options={["have", "do", "are"]} /> I.
    </Turn>
  </Item>
</Exercise>
```

No imports needed — `Gap`, `Exercise`, `Item` and `Turn` are registered
globally in `mdx-components.tsx`.

## Keep each `<Gap>` on one line

Write a gap inline with the text around it, on a single physical line:

```mdx
<Turn speaker="B">Neither <Gap answer="will I" options={["won’t I", "will I", "do I", "won’t me"]} />.</Turn>
```

Never break it across lines:

```mdx
<Turn speaker="B">
  Neither{" "}
  <Gap
    answer="will I"
    options={["won’t I", "will I", "do I", "won’t me"]}
  />
  .
</Turn>
```

MDX treats a JSX tag that occupies a whole line by itself as a block, and a
block ends the paragraph — so the sentence renders split over three lines
instead of one. A trailing `{" "}` on the tag's line does not prevent it.
Lines get long, which is the price of the rule.

## Cards and notes

A lesson's notes are numbered cards, one per idea:

```mdx
<Topic
  id="past-perfect"
  title="Past Perfect"
  form="had + past participle"
  chips={["an earlier past"]}
  gist="Something that had already happened before the main event."
>

Paragraphs, `<Rule>`s and `<Chart>`s, as before.

</Topic>
```

The number is a CSS counter, so cards renumber themselves when reordered.
`gist` is not shown on the card: the lesson page reads every `<Topic>` from
the source and lists them, with their gists, as a summary above the notes —
the same way the side navigation is built. Lessons without `<Topic>` cards
(plain `## headings`) get no summary.

A card can be the rule itself: give it a `hint` and a `<Gap rule="…">` can
point at the card's `id`, exactly as it points at a `<Rule>`. Use `<Rule>`
inside a card when one card holds several rules.

`<Note label="Two past simples">…</Note>` is a short emphasised aside; the
label leads the sentence in bold. Keep the body to one or two sentences.

## Translation exercises

For a text to translate, `<Translation>` holds one `<Pair>` per sentence: the
Ukrainian source and my English under it, so the two can be read together.
A reader can switch the exercise to *Practice*, which hides every translation
until the sentence is clicked.

```mdx
<Translation>
  <Pair ua="Коли вона відчинила двері, він уже пішов." en="When she opened the door, he [had already left]." rule="earlier-past" />
  <Pair ua="Ще не перекладене речення." />
</Translation>
```

`[brackets]` in `en` highlight the verb form the sentence is about, as they do
in `<Chart>`; with a `rule`, clicking that form shows the rule's `hint`. A
`<Pair>` without `en` renders as "not translated yet", so unfinished homework
is visible rather than missing. Keep each `<Pair>` on one line for the same
reason as `<Gap>`.

## Why `<Gap>` carries `options`

Right now a gap renders as the filled-in answer and the site has no state at
all. `options` is the full list the original exercise offered, stored so that
the interactive version — a real `<select>` per gap, answers kept across
sessions, and a shareable link that shows the teacher what was chosen — can be
built without touching a single content file.

## Irregular verbs

`content/irregular-verbs.mdx` is a reference page rather than a lesson, linked
from the site header. It exports `verbs`, one row per verb — base, past simple,
past participle, translation — plus a fifth value, the frequency rank, on the
50 most common only. The rank is not shown; it picks the verbs the table opens
with and their order. Rows without it appear under "All", alphabetically. A
row with a missing form is highlighted in the table, since MDX is not
type-checked.

## Layout

| Path | Role |
| --- | --- |
| `app/globals.css` | the design tokens: colours for both themes, fonts, the `eyebrow` label |
| `content/lessons/*.mdx` | the lessons |
| `lib/lessons.ts` | reads and sorts them from the filesystem |
| `components/gap.tsx` | one blank in a cloze exercise |
| `components/exercise.tsx` | numbered items and dialogue turns |
| `components/translation.tsx` | sentence pairs for a text to translate |
| `components/topic.tsx` | a numbered card of the notes, and the `<Note>` aside |
| `components/lesson-summary.tsx` | the cards with their gists, above the notes |
| `components/rule.tsx`, `components/rule-note.tsx` | a rule in the notes, and its one-line form shown next to a gap |
| `content/irregular-verbs.mdx` | the irregular verbs reference: notes, the verb list and the table in one file |
| `components/irregular-verbs.tsx` | the searchable table, top 50 by default |
| `app/page.tsx` | lesson list |
| `app/irregular-verbs/page.tsx` | the reference page |
| `app/lessons/[slug]/page.tsx` | one lesson |
