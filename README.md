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

## Why `<Gap>` carries `options`

Right now a gap renders as the filled-in answer and the site has no state at
all. `options` is the full list the original exercise offered, stored so that
the interactive version — a real `<select>` per gap, answers kept across
sessions, and a shareable link that shows the teacher what was chosen — can be
built without touching a single content file.

## Layout

| Path | Role |
| --- | --- |
| `content/lessons/*.mdx` | the lessons |
| `lib/lessons.ts` | reads and sorts them from the filesystem |
| `components/gap.tsx` | one blank in a cloze exercise |
| `components/exercise.tsx` | numbered items and dialogue turns |
| `app/page.tsx` | lesson list |
| `app/lessons/[slug]/page.tsx` | one lesson |
