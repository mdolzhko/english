import type { ReactNode } from "react";

/** The look of a highlighted verb form, shared by charts and translations. */
export const MARK =
  "rounded bg-good px-1 py-0.5 font-medium text-good-ink";

/**
 * Splits `[bracketed]` fragments out of a plain string, so content files can
 * mark the verb form to highlight without any JSX. `renderMark` decides what a
 * marked fragment becomes; by default a highlighted <b>.
 */
export function highlight(
  text: string,
  renderMark: (fragment: string, index: number) => ReactNode = (
    fragment,
    index,
  ) => (
    <b key={index} className={MARK}>
      {fragment}
    </b>
  ),
): ReactNode[] {
  return text.split(/(\[[^\]]+\])/).map((part, index) =>
    part.startsWith("[") && part.endsWith("]") ? (
      renderMark(part.slice(1, -1), index)
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}
