/** Shared so the filled-in look cannot drift between the two kinds of gap. */
const BASE =
  "font-medium underline decoration-2 underline-offset-4 transition-colors";

export const RIGHT = `${BASE} text-good-ink decoration-good-line`;

export const WRONG = `${BASE} text-leak-ink decoration-leak`;

/** A pick in a gap that has no answer yet: neither right nor wrong. */
export const PENDING = `${BASE} text-ink decoration-dotted decoration-line-strong`;

/** A gap nobody has filled: the blank itself. */
export const EMPTY =
  "inline-block min-w-14 rounded border border-dashed border-line-strong px-1.5 text-center text-faint";
