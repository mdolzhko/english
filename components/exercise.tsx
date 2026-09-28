import type { ReactNode } from "react";

/** Numbered list of exercise items. */
export function Exercise({ children }: { children: ReactNode }) {
  return (
    <ol className="not-prose my-8 ml-6 list-decimal space-y-6 marker:font-mono marker:text-sm marker:text-zinc-400">
      {children}
    </ol>
  );
}

/**
 * One item of an exercise — the unit the interactive phase will check,
 * so each one stays addressable even while everything is static.
 */
export function Item({ children }: { children: ReactNode }) {
  return <li className="space-y-1 pl-2">{children}</li>;
}

/** One line of a dialogue inside an item. */
export function Turn({
  speaker,
  children,
}: {
  speaker: string;
  children: ReactNode;
}) {
  return (
    <p className="flex gap-2 leading-relaxed">
      <span className="w-4 shrink-0 font-mono text-sm text-zinc-400">
        {speaker}:
      </span>
      <span>{children}</span>
    </p>
  );
}
