# Context

The words for the parts of this site. Use them as defined here — in
conversation, in code, in commits — and add a term here when a new one is
needed rather than letting two words mean one thing. The owner writes in
Ukrainian; the words they use are in the last column.

## People

| Term | Means | The owner may say |
| --- | --- | --- |
| owner | the one learning English; reads the theory, does the homework, decides. Never named | — |
| teacher | sends material and homework, checks the owner’s texts. Never named | вчителька |

## Content

| Term | Means | In code | The owner may say |
| --- | --- | --- | --- |
| lesson | one subject’s notes and exercises, one file | `content/lessons/*.mdx` | топік, тема, урок |
| reference page | a page looked up more than read: irregular verbs, verb patterns, vocabulary; a tab, no status, no date | `content/*.mdx` | довідник |
| notes | the theory part of a lesson, before the exercises | — | теорія |
| card | one numbered idea of the notes | `<Topic>` | картка |
| rule | one case a gap or a mark can point at; a card with a `hint` is one too | `<Rule>`, `<Topic hint>` | правило |
| gist | a card’s one-sentence summary, shown above the notes, not on the card | `gist` | — |
| summary | the list of cards with their gists above the notes | `LessonSummary` | — |
| subject area | the label above a lesson’s title, such as Grammar | `metadata.topic` | — |
| format | a way a lesson’s notes or exercises are built: cards, sections, gaps, translation, marked sentences, quiz, dialogue | `.claude/rules/lessons.md` | формат |
| exercise | a numbered block of tasks after the notes | `<Exercise>` | вправа |
| homework | an exercise the teacher set; done by the owner, never by a session | — | домашка |
| gap | a blank with the options the original offered | `<Gap>` | пропуск |
| pair | one sentence of a translation: the Ukrainian and the owner’s English under it | `<Pair>` | речення |
| mark | the reason for an article, put on the word in a finished sentence | `[the: rule-id]` in `<Marked>` | підкреслення |
| status | todo, in progress or done; done opens the gaps on their answers | `metadata.status` | статус |
| source | where the material came from; linked when its text is used | `source` | джерело |

## Hints

“Hint” means two things here; say which.

| Term | Means | In code |
| --- | --- | --- |
| rule hint | a rule’s one-line form, shown in a rule note under a wrong pick, a verb form or a mark | `hint` on `<Rule>` and `<Topic>`, `RuleNote` |
| word hint | an unknown word marked in a Ukrainian sentence, opening its vocabulary row in a word note | `[слово: word]` in `ua`, `WordNote` |

## Vocabulary

| Term | Means | In code | The owner may say |
| --- | --- | --- | --- |
| batch | the words the owner sends after a lesson | — | слова |
| group | the words of one kind added on one day | an entry of `groups` | — |
| kind | how the teacher sorts a batch: words, phrasal verbs, set expressions… | a group’s `title` | — |
| row | one word with its translation and an example | `[word, translation, example]` | — |

## Work

| Term | Means |
| --- | --- |
| green | `pnpm check` passes: lint, types, tests, build |
| workspace | an Orca workspace: a git worktree with its own branch and, often, its own session |
