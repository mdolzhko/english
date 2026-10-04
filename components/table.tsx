import type { ReactNode } from "react";

/** A column heading; `hidden` keeps it for screen readers only. */
export type Column = string | { label: string; hidden?: boolean; className?: string };

/** Classes for a body row and a cell, so callers match the head. */
export const ROW = "border-t border-line";
export const CELL = "px-4 py-2.5";

/**
 * The one table shell: scrolls sideways inside a card rather than
 * reflowing, with eyebrow headings on a panel. Callers supply the body
 * rows, using {@link ROW} and {@link CELL} so every table reads alike.
 */
export function Table({
  columns,
  minWidth = "32rem",
  className = "",
  children,
}: {
  columns: Column[];
  /** Below this the table scrolls instead of wrapping. */
  minWidth?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`card overflow-x-auto ${className}`}>
      <table
        className="w-full border-collapse text-left text-sm"
        style={{ minWidth }}
      >
        <thead>
          <tr className="bg-panel">
            {columns.map((column, index) => {
              const { label, hidden, className: extra } =
                typeof column === "string" ? { label: column } : column;
              return (
                <th
                  key={label || index}
                  scope="col"
                  className={`eyebrow ${CELL} ${extra ?? ""}`}
                >
                  {hidden ? <span className="sr-only">{label}</span> : label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
