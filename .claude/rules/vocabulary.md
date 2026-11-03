---
paths:
  - "content/vocabulary.mdx"
---

# Vocabulary

The words that were new to the owner when they came up. The comment above
`groups` gives the shape: one group per day, `[word, translation, example]`
per row.

- The owner sends words in batches after a lesson, often sorted into kinds
  (words, verbs and their forms, phrasal verbs, set expressions…). A batch
  becomes groups dated that day, one per kind with a `title`, and a `source`
  naming where the words came from. Append at the end; the page shows the
  newest day first anyway.
- A word already in the list is not added again — a second row would also
  take over the hint lookup, since the last row wins. Its row gets the new
  note instead, and an example from the new text if it has none.
- The example comes from the exercise text where the word occurs, with the
  word in `[brackets]`.
- A row is found by any of its `/`-separated words, both by a lesson’s
  `[слово: word]` mark and by the anchor `/vocabulary#<first-word>`; keep the
  word a mark points to among them.
