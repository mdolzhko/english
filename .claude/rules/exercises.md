---
paths:
  - "content/lessons/**"
---

# Exercises

Exercises sit after the cards, all together, each in an `<Exercise>`:

```mdx
<Exercise
  id="exercise-1"
  title="Exercise 1"
  topic="Past Perfect"
  topicId="past-perfect"
  instruction="Choose the correct option."
  source="https://…"
>
  <Items>
    <Item><Turn>Sentence with a <Gap answer="gap" options={["gap", "hole"]} rule="past-perfect" />.</Turn></Item>
  </Items>
</Exercise>
```

`topic` and `topicId` name the card the exercise practises; `source`, when it
was taken from elsewhere, becomes a link under the instruction. `<Items>`
numbers separate sentences; `<Dialogue>` holds a continuous dialogue whose
gaps are numbered instead (`<Gap n={3} …>`); `<Turn speaker="A">` is one
line of either.

## One tag, one line

Every `<Gap>`, `<Pair>` and `<Marked>` sits on one physical line with the
text around it. MDX makes a tag alone on its line a block, and a block ends
the paragraph, so the sentence would render split in three; a `{" "}` does
not help. Long lines are the price.

## Gaps

- `options`: every option the original offered, the answer among them.
- `answer`: a list when more than one is accepted. Left out while there is
  no answer yet: the gap can be picked but is never marked.
- `rule`: the id of the `<Rule>` or `<Topic>` that explains it; a wrong pick
  shows that rule’s hint.
- With neither `options` nor `answer`, a gap is a plain blank.

## Translations

The homework is the owner’s: never translate it. Set the text up first, one
`<Pair>` per sentence without `en`, and `paragraph` on the first sentence of
each paragraph of the source:

```mdx
<Translation>
  <Pair paragraph ua="Коли вона відчинила двері, він уже пішов." />
</Translation>
```

A `<Pair>` without `en` shows as “not translated yet”. When the owner sends
the English, insert it as sent, with the verb form the sentence is about in
`[brackets]` and a `rule`; clicking the form shows the rule’s hint:

```mdx
<Pair ua="Коли вона відчинила двері, він уже пішов." en="When she opened the door, he [had already left]." rule="earlier-past" />
```

Words the owner does not know are marked in `ua`: `Андрій уже [промок: get
wet], коли…` underlines “промок” and opens the vocabulary row for “get wet”,
in every mode. The owner lists the words; their rows go into
`content/vocabulary.mdx` first, then the marks. A mark whose word is not in
the vocabulary shows as a warning.

## Articles

For a finished English sentence whose point is its articles, `<Marked>` puts
the reason on each one:

```mdx
<Item><Turn><Marked text="[The: superlatives] best movie I’ve seen recently is [Dune: titles]." /></Turn></Item>
```

`[The: superlatives]` underlines the article and opens the rule with that
id. A mark on any other word — `[Dune: titles]` — is a place left without an
article on purpose, and is dotted. A missing rule shows as a warning.
