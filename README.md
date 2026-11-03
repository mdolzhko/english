# English Lessons

Lesson notes and homework from English lessons with a teacher, as a static
Next.js site: one MDX file per lesson or reference page, in `content/`. The
owner reads the theory and does the task here; the teacher sees which
material goes with which task and checks the owner’s texts.

## Development

```bash
pnpm dev        # http://localhost:3000
pnpm check      # lint, types, tests and the build in one go — run before every commit
pnpm build      # static build, one prerendered page per lesson
pnpm lint       # also refuses `as`, `any` and `import()` outside lib/content.ts
pnpm typecheck
pnpm test       # the parsers and guards in lib/, and every lesson against them
```

`pnpm check` stops at the first step that fails, so its last lines are the
problem to fix. The build is part of it because it is the only step that
compiles the `.mdx` files: a broken tag or a wrong `status` in a lesson
passes lint, types and tests, and fails only there.

## How it is written

The site is written with Claude Code, and the rules for it sit next to the
code as plain Markdown. `CLAUDE.md` says what the project is and how the
work goes; `.claude/rules/` holds the rest, a file per kind of file — how a
lesson, an exercise, a reference page or the vocabulary is written, and how
git is used. Each rule names the paths it covers in its front matter.

## Themes

Every colour token is a `light-dark()` pair, and `color-scheme` on `<html>`
decides which half applies, from `data-theme`. The button in the header
shows the current theme and cycles auto → light → dark: sun and moon keep
the choice in `localStorage` for this browser; the half circle forgets it
and follows the system, so a Mac or a phone set to switch at sunset carries
the site with it. Each click says what it did in a label that fades,
because a switch to auto often changes no colour — auto is one of the two.
An inline script in the head sets `data-theme` before the first paint, so a
page never flashes the other theme.

A change — a click, or the system switching under auto — is shown as a
cross-fade of the whole page through the View Transitions API, half a
second long. Easing every element's own colours was tried first and
judders: one switch started 952 transitions on the vocabulary page and
cost a 32 ms style recalculation before the first frame.
