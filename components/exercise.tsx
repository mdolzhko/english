import type { CSSProperties, ReactNode } from "react";

/**
 * One numbered exercise. `id` and `title` are what the page's side
 * navigation reads, and the section is the unit a future practice mode
 * scores on its own ("Exercise 2: 8/10").
 */
export function Exercise({
  id,
  title,
  topic,
  topicId,
  instruction,
  example,
  source,
  children,
}: {
  id: string;
  title: string;
  /** The card this exercise practises, shown as a label above the title. */
  topic?: string;
  /** id of that card, so the label links back to it. */
  topicId?: string;
  instruction?: string;
  example?: string;
  /** Where the exercise was taken from, when it was not written here. */
  source?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="not-prose card my-10 scroll-mt-8 p-6 first:mt-0 sm:p-8"
    >
      {topic &&
        (topicId ? (
          <a href={`#${topicId}`} className="eyebrow mb-1.5 block transition hover:text-accent">
            {topic}
          </a>
        ) : (
          <p className="eyebrow mb-1.5">{topic}</p>
        ))}

      <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>

      {instruction && (
        <p className="mt-1 text-sm text-muted">
          {instruction}
        </p>
      )}

      {source && (
        <p className="mt-1 font-mono text-xs text-faint">
          from{" "}
          <a
            href={source}
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent underline underline-offset-2"
          >
            test-english.com
          </a>
        </p>
      )}

      {example && (
        <p className="mt-3 border-l-2 border-line pl-3 text-sm text-muted">
          <span className="eyebrow">Example</span>
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
      className="ml-6 list-decimal space-y-6 marker:font-mono marker:text-sm marker:text-faint"
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
      <span className="w-[var(--speaker-w,1.25rem)] shrink-0 font-mono text-sm text-faint">
        {speaker}:
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
