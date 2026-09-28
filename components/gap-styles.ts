/** Shared so the filled-in look cannot drift between the two kinds of gap. */
const BASE =
  "font-medium underline decoration-2 underline-offset-4 transition-colors";

export const RIGHT = `${BASE} text-emerald-700 decoration-emerald-400 dark:text-emerald-400 dark:decoration-emerald-500/70`;

export const WRONG = `${BASE} text-red-700 decoration-red-400 dark:text-red-400 dark:decoration-red-500/70`;
