import { highlight } from "./highlight";
import { CELL, ROW, Table } from "./table";

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
      <Table columns={columns}>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={ROW}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={
                  labelColumn && cellIndex === 0
                    ? `${CELL} whitespace-nowrap align-middle font-mono text-xs text-muted`
                    : `${CELL} align-middle leading-relaxed`
                }
              >
                {highlight(cell)}
              </td>
            ))}
          </tr>
        ))}
      </Table>

      {note && <p className="mt-2 text-xs text-muted">{note}</p>}
    </div>
  );
}
