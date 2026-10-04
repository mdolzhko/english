import { GapChoice } from "./gap-choice";
import { EMPTY, RIGHT } from "./gap-styles";

export type GapProps = {
  /**
   * The correct option — or every correct option, when the original accepts
   * more than one. Left out while the exercise has no answer yet: the gap
   * then shows as a blank, and with `options` it can be tried without
   * anything being marked right or wrong.
   */
  answer?: string | string[];
  /**
   * Every option the original exercise offered, including the answer.
   * Left out when the original expects a typed answer rather than a choice.
   */
  options?: string[];
  /** Gap number, when the original numbers the gaps rather than the sentences. */
  n?: number;
  /** id of the <Rule> or <Topic> that explains this gap, shown when the pick is wrong. */
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
  const answers = answer === undefined ? [] : [answer].flat();

  return (
    <span>
      {n !== undefined && (
        <sup className="mr-0.5 font-mono text-[0.6rem] text-faint">{n}</sup>
      )}
      {options?.length ? (
        <GapChoice answers={answers} options={options} rule={rule} />
      ) : answers.length > 0 ? (
        <span className={RIGHT}>{answers.join(" / ")}</span>
      ) : (
        <span className={EMPTY} aria-label="not answered yet">
          …
        </span>
      )}
    </span>
  );
}
