import { GapChoice } from "./gap-choice";
import { RIGHT } from "./gap-styles";

export type GapProps = {
  /** The correct option — the one I picked. */
  answer: string;
  /**
   * Every option the original exercise offered, including the answer.
   * Left out when the original expects a typed answer rather than a choice.
   */
  options?: string[];
  /** Gap number, when the original numbers the gaps rather than the sentences. */
  n?: number;
  /** id of the <Rule> that explains this gap, shown when the pick is wrong. */
  rule?: string;
};

/**
 * One blank in an exercise.
 *
 * With `options`, the gap is a choice the reader can reopen — see
 * {@link GapChoice}. Without them the original expects a typed answer, so the
 * gap stays plain text and ships no JavaScript; that is where a text input
 * will go when the exercise becomes playable.
 */
export function Gap({ answer, options, n, rule }: GapProps) {
  return (
    <span>
      {n !== undefined && (
        <sup className="mr-0.5 font-mono text-[0.6rem] text-zinc-400">{n}</sup>
      )}
      {options?.length ? (
        <GapChoice answer={answer} options={options} rule={rule} />
      ) : (
        <span className={RIGHT}>{answer}</span>
      )}
    </span>
  );
}
