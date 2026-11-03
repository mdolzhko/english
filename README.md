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
work goes; `.claude/rules/` holds the rest, a file per subject — how a
lesson, an exercise, a reference page or the vocabulary is written, how code
and styles are, how git is used. Each rule names the paths it covers in its
front matter.
