# Decisions

Settled, with the reason, so they are not reopened by accident. When a choice
is made that a later session might reopen, it is added here.

- **One lesson for the three past tenses, not three lessons.** The teacher's
  homework mixes them, and the point of the topic is choosing between them;
  the comparison has to live on one page.
- **Translation exercises are sentence pairs, not tabs.** Tabs break the pair:
  to check sentence 7 you would jump between tabs. Practice mode hides the
  English per sentence instead.
- **Topic cards, not `##` headings.** Each idea is a numbered card with the
  construction as a chip, the way the review documents the owner likes are
  laid out; the summary above the notes is built from the cards.
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
- **A `<Gap>` carries every option the original offered, not only the
  answer.** The options are what makes a gap a choice to try, and the same
  list is what saved answers and a link showing the teacher what was picked
  will need (issue #1) — without touching a content file again.
- **Vocabulary is grouped by the day it was added, not paginated.** A page
  number says nothing about what is on it; a date and a source name the
  handful of words worth reviewing together. Search spans every group.
- **Cards show the word with its translation; they are for flipping
  through, not for testing.** A random order removes the list's one
  giveaway, position; recall is what "Practice" is for. Not a quiz, no
  "knew it" buttons, nothing kept between visits.
- **No "learnt" marks on words yet.** They need state that survives a
  reload, which the site does not have; they go with the teacher's marks
  (issue #1), after a deploy.
- **"Auto" theme follows the system, not the clock.** A Mac or a phone set
  to switch at sunset already knows where the reader is; computing sunset
  on the site would mean asking for location or guessing a city. A chosen
  theme is kept in `localStorage` for that browser, nowhere else.
- **A theme change is a cross-fade of the page, not a transition per
  element.** `transition` on `*` started 952 colour transitions on the
  vocabulary page and a 32 ms style recalculation up front, which looked
  like a jolt; the View Transitions API blends two snapshots instead.
- **The navigation is tabs under the title, stuck to the top.** Three
  references beside the title no longer fit on a phone; the tabs come from
  the reference files, so a new page needs no code.
