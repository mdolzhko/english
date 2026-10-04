import type { ReactNode } from "react";

/**
 * One numbered card of the lesson notes: a tense, a construction, one idea.
 * The number comes from a CSS counter on the lesson body, so cards can be
 * reordered in the content file without renumbering. `gist` is not shown
 * here — it is what the summary at the top of the lesson says about the card.
 */
export function Topic({
  id,
  title,
  form,
  chips = [],
  children,
}: {
  id: string;
  title: string;
  /** The construction, shown as a mono chip: "was / were + -ing". */
  form?: string;
  /** Short plain-text tags after the form. */
  chips?: string[];
  gist?: string;
  /**
   * Makes the card a rule a gap can point at, like `<Rule>`'s hint. Read
   * from the source by `getRules`, not rendered here.
   */
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="topic my-10 scroll-mt-8 rounded-lg border border-line bg-surface p-6 first:mt-0 sm:p-8"
    >
      <div className="not-prose flex flex-col gap-3">
        <div className="flex items-baseline gap-3">
          <span aria-hidden className="topic-num font-mono text-sm text-faint" />
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance">
            {title}
          </h2>
        </div>

        {(form || chips.length > 0) && (
          <div className="flex flex-wrap gap-1.5">
            {form && (
              <span className="inline-block rounded-full bg-code px-2.5 py-0.5 font-mono text-xs text-ink">
                {form}
              </span>
            )}
            {chips.map((chip) => (
              <span
                key={chip}
                className="inline-block rounded-full border border-line-strong px-2.5 py-0.5 text-xs text-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 [&>:first-child]:mt-0">{children}</div>
    </section>
  );
}

/**
 * A short emphasised aside — a warning, a key rule, a distinction that is
 * easy to miss. The label leads the sentence in bold, like a dictionary
 * headword, so the eye finds it when skimming the card.
 */
export function Note({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="note my-6 max-w-[90ch] rounded-md border border-warn-line bg-warn px-4 py-3 text-sm leading-relaxed text-ink">
      <strong className="font-semibold text-warn-ink">{label}.</strong>{" "}
      {children}
    </div>
  );
}
