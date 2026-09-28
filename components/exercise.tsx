import type { CSSProperties, ReactNode } from "react";

/**
 * One numbered exercise. `id` and `title` are what the page's side
 * navigation reads, and the section is the unit a future practice mode
 * scores on its own ("Exercise 2: 8/10").
 */
export function Exercise({
  id,
  title,
  instruction,
  example,
  children,
}: {
  id: string;
  title: string;
  instruction?: string;
  example?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="not-prose mt-14 scroll-mt-8 first:mt-0">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>

      {instruction && (
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {instruction}
        </p>
      )}

      {example && (
        <p className="mt-3 border-l-2 border-zinc-200 pl-3 text-sm text-zinc-500 dark:border-zinc-700">
          <span className="font-mono text-xs uppercase tracking-wide">
            Example
          </span>
          <br />
          {example}
        </p>
      )}

      <div className="mt-6">{children}</div>
    </section>
  );
}

/** Numbered list of items, for exercises made of separate sentences. */
export function Items({ children }: { children: ReactNode }) {
  return (
    <ol
      className="ml-6 list-decimal space-y-6 marker:font-mono marker:text-sm marker:text-zinc-400"
      style={{ "--speaker-w": "1.25rem" } as CSSProperties}
    >
      {children}
    </ol>
  );
}

export function Item({ children }: { children: ReactNode }) {
  return <li className="space-y-1 pl-2">{children}</li>;
}

/**
 * Continuous dialogue, for exercises that number the gaps instead of the
 * sentences. Wider speaker column than {@link Items} because the speakers
 * have names rather than letters.
 */
export function Dialogue({ children }: { children: ReactNode }) {
  return (
    <div
      className="space-y-3"
      style={{ "--speaker-w": "4.75rem" } as CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * Inline speaker label, for exercises whose source keeps both turns of an
 * exchange on one line. {@link Turn} is the block equivalent.
 */
export function Say({
  speaker,
  children,
}: {
  speaker: string;
  children: ReactNode;
}) {
  return (
    <span>
      <span className="font-mono text-sm text-zinc-400">{speaker}:</span>{" "}
      {children}
    </span>
  );
}

/** One line of dialogue, or a plain sentence when there is no speaker. */
export function Turn({
  speaker,
  children,
}: {
  speaker?: string;
  children: ReactNode;
}) {
  // Deliberately a <div>, not a <p>: MDX wraps multi-line children in their
  // own <p>, and a <p> inside a <p> is invalid HTML that the browser
  // restructures, which breaks hydration.
  if (!speaker) return <div className="leading-relaxed">{children}</div>;

  return (
    <div className="flex gap-2 leading-relaxed">
      <span className="w-[var(--speaker-w,1.25rem)] shrink-0 font-mono text-sm text-zinc-400">
        {speaker}:
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
