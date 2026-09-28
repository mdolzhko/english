export type GapProps = {
  /** The correct option — the one I picked. */
  answer: string;
  /**
   * Every option the original exercise offered, including the answer.
   * Left out when the original expects a typed answer rather than a choice.
   * Unused while gaps are static; this is what the future <select> reads.
   */
  options?: string[];
  /** Gap number, when the original numbers the gaps rather than the sentences. */
  n?: number;
};

/**
 * One blank in an exercise.
 *
 * Static phase (now): renders the answer as a filled-in blank.
 * Interactive phase (later): the same markup becomes a <select> where
 * `options` is present and a text <input> where it is not — no content
 * file has to change.
 */
export function Gap({ answer, options, n }: GapProps) {
  return (
    <span>
      {n !== undefined && (
        <sup className="mr-0.5 font-mono text-[0.6rem] text-zinc-400">{n}</sup>
      )}
      <span
        className="font-medium text-emerald-700 underline decoration-emerald-400 decoration-2 underline-offset-4 dark:text-emerald-400 dark:decoration-emerald-500/70"
        title={options?.length ? `Options: ${options.join(" / ")}` : undefined}
      >
        {answer}
      </span>
    </span>
  );
}
