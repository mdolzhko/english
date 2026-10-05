# English Lessons

Lesson topics and completed homework, as a static site.

## Development

```bash
pnpm dev     # http://localhost:3000
pnpm build   # static build, one prerendered page per lesson
pnpm lint
pnpm test    # the source parser in lib/lesson-source.ts, and every lesson against it
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

## A lesson that is still to do

Give it `status: "todo"` or `"in-progress"`. In a lesson that is not `done`
every `<Gap>` with `options` starts blank, whatever its `answer`, so it can be
tried first: a right pick turns green, a wrong one red with the rule's hint.
Set the status to `done` and the same gaps open on their answers, as finished
homework. `answer` may be a list when the original accepts more than one
option. A gap with no `answer` at all can be picked but is never marked, and
a gap with no options and no answer is a plain blank. An `<Exercise>` taken
from somewhere else names the page in `source`, shown as a small link under
the instruction.

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

## How a lesson is made

The notes and the exercises come from test-english.com, the site the teacher
uses. It blocks `curl` and plain fetches, so read it in a browser. Its pages
follow one pattern:

- explanation: `test-english.com/explanation/<level>/<slug>/`
- exercise N: `test-english.com/grammar-points/<level>/<slug>/N/`

A new lesson: `status: "todo"`, one `<Topic>` card per idea with the
explanation's examples, a `<Chart>` for the form, `<Note>`s for the traps, a
"Choosing between them" card when the lesson contrasts several forms, and one
`<Exercise>` per card with `topic`, `topicId` and `source`. Gaps carry the
answer and a `rule`, so a wrong pick explains itself; the lesson's status
decides whether they open blank or filled.

Translation homework is written by Max. Set it up as `<Pair ua="…" />` with
no `en`, mark paragraph starts with `paragraph`, and add the English later,
with the verb form in `[brackets]` and a `rule`.

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

An exercise that practises one card names it: `<Exercise topic="Past Perfect"
topicId="past-perfect" …>` shows the topic as a label above the title, linking
back to the card.

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
in `<Chart>`; with a `rule`, clicking that form shows the rule's `hint`.

In `ua`, a word Max does not know yet is marked with the vocabulary word that
explains it: `Андрій уже [промок: get wet], коли…` shows "промок" with a
dotted underline, and hovering or clicking it opens the vocabulary row for
"get wet" — in every mode, so the hint is there while translating. The row
is found by any of its words ("get wet / get soaked" by either), so the word
has to be in `content/vocabulary.mdx` first; a hint that finds nothing is
highlighted as a warning. The note links to the row on the vocabulary page,
by an anchor made from its first word (`/vocabulary#get-wet`), where the row
is lit up. A
`<Pair>` without `en` renders as "not translated yet", so unfinished homework
is visible rather than missing. `paragraph` on a `<Pair>` marks the first sentence of
a new paragraph of the source text and draws a gap before it. Keep each `<Pair>` on one line for the same
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

## Verb patterns

`content/verb-patterns.mdx` is the second reference page: which verbs take
`to do`, which take `doing`, and which take both. It exports `groups`, four
lists with a row per verb — `[verb, translation, example]`, or for the verbs
whose meaning changes `[verb, meaning with to, example, meaning with -ing,
example]`. Brackets in an example highlight the form.

## Vocabulary

`content/vocabulary.mdx` is the third reference page: the words that were new
to Max when they came up. It exports `groups`, one per day words were added:

```js
export const groups = [
  {
    date: "2026-10-05",
    source: "Past tenses, the motorcycle story",
    words: [
      ["hose", "шланг", "One of the [hoses] had been damaged."],
    ],
  },
];
```

A row is `[word, translation, example]`; the example is optional and
brackets in it highlight the word. When the teacher sends the words in kinds
— words, phrasal verbs, set expressions — make one group per kind with a
`title`, all on the same date; the page shows the date once and the titles
under it. Append new groups at the end — the page shows the newest day first
regardless. The list is long rather than paginated,
because a day's words are the unit worth reviewing together; *Practice*
hides every translation until the word is clicked, and search looks through
every group. *Cards* shows the same words one at a time in random order, with
the translation and the example — for flipping through, not for testing —
and is dealt from whatever the search leaves. A row without a word or a
translation is highlighted.

## Reference pages

Every `.mdx` directly in `content/` (not in `lessons/`) is a reference page,
served at `/<filename>` by `app/[reference]/page.tsx` through
`lib/references.ts`. Its `metadata` carries `title` and `description` as a
lesson's does, plus `label`, the short name in the site navigation, and
`order`, its place there. The navigation is built from these, so a new
reference page needs no code.

## Layout

| Path | Role |
| --- | --- |
| `app/globals.css` | the design tokens: colours for both themes, fonts, the `eyebrow` label |
| `app/layout.tsx` | the title, the sticky navigation and the page frame |
| `content/lessons/*.mdx` | the lessons |
| `lib/lessons.ts` | reads and sorts them from the filesystem |
| `lib/lesson-source.ts` | reads navigation, cards and rules out of a lesson's source |
| `lib/references.ts` | reads the reference pages the same way |
| `lib/format-date.ts` | the one date format, shared by lessons and vocabulary |
| `components/gap.tsx` | one blank in a cloze exercise |
| `components/exercise.tsx` | numbered items and dialogue turns |
| `components/translation.tsx` | sentence pairs for a text to translate |
| `components/topic.tsx` | a numbered card of the notes, and the `<Note>` aside |
| `components/lesson-summary.tsx` | the cards with their gists, above the notes |
| `components/rule.tsx`, `components/rule-note.tsx` | a rule in the notes, and its one-line form shown next to a gap |
| `components/site-nav.tsx` | the tabs under the title: lessons, then every reference page |
| `content/irregular-verbs.mdx` | the irregular verbs reference: notes, the verb list and the table in one file |
| `components/irregular-verbs.tsx` | the searchable table, top 50 by default |
| `content/verb-patterns.mdx` | verbs + to-infinitive / -ing: four lists and the table |
| `components/verb-patterns.tsx` | the grouped, searchable table |
| `content/vocabulary.mdx` | new words, grouped by the day they were added |
| `components/vocabulary.tsx` | the grouped table with practice mode and search |
| `components/word-cards.tsx` | the words one at a time, shuffled |
| `lib/vocabulary.ts`, `lib/hints.ts` | the vocabulary as a lookup, and the `[слово: word]` parser |
| `components/word-hint.tsx`, `components/word-note.tsx` | a marked word in a Ukrainian sentence, and the vocabulary row it opens |
| `components/table.tsx`, `segmented.tsx`, `search-field.tsx` | the table shell, the segmented control and the search box every list uses |
| `app/page.tsx` | lesson list |
| `app/[reference]/page.tsx` | one reference page |
| `app/lessons/[slug]/page.tsx` | one lesson |
