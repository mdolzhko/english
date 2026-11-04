---
paths:
  - "**/*.tsx"
  - "app/globals.css"
---

# Styling

- Colours go through the tokens in `app/globals.css` (`text-muted`,
  `bg-warn`, `border-line`…): no palette classes like `zinc-500`, no `dark:`
  variants. Each token is a `light-dark()` pair, and `color-scheme` picks the
  half; a new colour is a new pair, with both halves.
- Type: headings `font-display`, labels `eyebrow`, numbers and verb forms
  `font-mono`; the rest is the default sans.
- A white box with a hairline — a card, an exercise, a table — is `card`.

## Themes

`color-scheme` on `<html>` follows `data-theme`, which an inline script in
`app/layout.tsx` sets before the first paint, so a page never flashes the
other theme. The button in the header (`components/theme-switch.tsx`,
`lib/theme.ts`) cycles auto → light → dark: light and dark are kept in
`localStorage` for this browser, auto forgets the choice and follows the
system. Each click names what it did in a label that fades, because a switch
to auto often changes no colour. A change is a cross-fade of the whole page
through the View Transitions API, never a `transition` on elements; why is
in `decisions.md`.
