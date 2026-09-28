import type { ReactNode } from "react";

/**
 * Renders `[bracketed]` fragments as the highlighted auxiliary, so chart rows
 * stay plain strings in the lesson file.
 */
function highlight(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\])/).map((part, index) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <b
        key={index}
        className="rounded bg-emerald-50 px-1 py-0.5 font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
      >
        {part.slice(1, -1)}
      </b>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

/**
 * A reference table of example sentences. Scrolls sideways rather than
 * reflowing, because each row only makes sense read across.
 */
export function Chart({
  columns,
  rows,
  note,
  labelColumn = false,
}: {
  columns: string[];
  /** One entry per column; `[...]` marks the auxiliary to highlight. */
  rows: string[][];
  note?: string;
  /** Style the first column as a muted label rather than an example. */
  labelColumn?: boolean;
}) {
  return (
    <div className="not-prose my-6">
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/60">
              {columns.map((column, index) => (
                <th
                  key={column || index}
                  scope="col"
                  className="px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-zinc-500"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-zinc-200 dark:border-zinc-800"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      labelColumn && cellIndex === 0
                        ? "whitespace-nowrap px-4 py-2.5 align-middle font-mono text-xs text-zinc-500"
                        : "px-4 py-2.5 align-middle leading-relaxed"
                    }
                  >
                    {highlight(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && <p className="mt-2 text-xs text-zinc-500">{note}</p>}
    </div>
  );
}
