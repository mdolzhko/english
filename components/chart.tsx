import { highlight } from "./highlight";

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
      <div className="overflow-x-auto rounded-lg border border-line bg-surface">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-panel">
              {columns.map((column, index) => (
                <th
                  key={column || index}
                  scope="col"
                  className="eyebrow px-4 py-2.5"
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
                className="border-t border-line"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      labelColumn && cellIndex === 0
                        ? "whitespace-nowrap px-4 py-2.5 align-middle font-mono text-xs text-muted"
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

      {note && <p className="mt-2 text-xs text-muted">{note}</p>}
    </div>
  );
}
