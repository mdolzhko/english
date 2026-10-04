/** Shared so the filled-in look cannot drift between the two kinds of gap. */
const BASE =
  "font-medium underline decoration-2 underline-offset-4 transition-colors";

export const RIGHT = `${BASE} text-good-ink decoration-good-line`;

export const WRONG = `${BASE} text-leak-ink decoration-leak`;
