export type GapProps = {
  /** The correct option — the one I picked. */
  answer: string;
  /**
   * Every option the original exercise offered, including the answer.
   * Unused while gaps are static; this is what the future <select> reads.
   */
  options?: string[];
};

/**
 * One blank in a cloze exercise.
 *
 * Static phase (now): renders the answer as a filled-in blank.
 * Interactive phase (later): the same markup in every lesson becomes a
 * <select> over `options` — no content file has to change.
 */
export function Gap({ answer, options }: GapProps) {
  return (
    <span
      className="font-medium text-emerald-700 underline decoration-emerald-400 decoration-2 underline-offset-4 dark:text-emerald-400 dark:decoration-emerald-500/70"
      title={options?.length ? `Options: ${options.join(" / ")}` : undefined}
    >
      {answer}
    </span>
  );
}
