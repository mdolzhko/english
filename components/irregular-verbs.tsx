"use client";

import { useState } from "react";
import { SearchField } from "./search-field";
import { Segmented } from "./segmented";
import { CELL, ROW, Table } from "./table";

/**
 * One verb as the content file writes it: base, past simple, past
 * participle, translation, and a frequency rank for the most common ones.
 */
export type VerbRow = [string, string, string, string, number?];

const TOP = 50;

/**
 * The irregular verbs table. Opens on the most common verbs in frequency
 * order, because that is the part worth learning first; "All" switches to
 * the full list alphabetically. Searching looks through every verb in every
 * form, whichever view is on, so a verb is never hidden by the toggle.
 */
export function IrregularVerbs({ verbs }: { verbs: VerbRow[] }) {
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");

  const needle = normalise(query);
  const byAlphabet = (a: VerbRow, b: VerbRow) => a[0].localeCompare(b[0]);

  let rows: VerbRow[];
  let caption: string;

  if (needle) {
    rows = verbs
      .filter((verb) => verb.slice(0, 4).some((form) => normalise(String(form)).includes(needle)))
      .sort(byAlphabet);
    caption = rows.length === 1 ? "1 match" : `${rows.length} matches`;
  } else if (showAll) {
    rows = [...verbs].sort(byAlphabet);
    caption = `All ${rows.length} verbs, alphabetical`;
  } else {
    rows = verbs
      .filter((verb) => verb[4] !== undefined)
      .sort((a, b) => (a[4] ?? 0) - (b[4] ?? 0));
    caption = `The ${rows.length} most common, by frequency`;
  }

  return (
    <div className="not-prose mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="Which verbs"
          value={showAll ? "all" : "top"}
          onChange={(view) => setShowAll(view === "all")}
          options={[
            { value: "top", label: `Top ${TOP}` },
            { value: "all", label: "All" },
          ]}
        />

        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search any form or the translation"
          label="Search verbs"
        />
      </div>

      <p className="mt-3 text-xs text-muted">{caption}</p>

      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          Nothing matches “{query}”.
        </p>
      ) : (
        <Table
          className="mt-3"
          minWidth="36rem"
          columns={[
            { label: "Number", hidden: true, className: "w-10" },
            "Base",
            "Past simple",
            "Past participle",
            "Translation",
          ]}
        >
        {rows.map((verb, index) => {
          const [base, past, participle, translation] = verb;
          // The content file is not type-checked, so a row with a
          // missing form is flagged rather than silently blank.
          const incomplete = !base || !past || !participle || !translation;
          return (
            <tr
              key={base || index}
              className={`${ROW} ${incomplete ? "bg-warn" : ""}`}
            >
              <td className={`${CELL} text-right font-mono text-xs tabular-nums text-faint`}>
                {index + 1}
              </td>
              <td className={`${CELL} font-medium`}>{base || "?"}</td>
              <td className={CELL}>{past || "?"}</td>
              <td className={CELL}>{participle || "?"}</td>
              <td className={`${CELL} text-muted`}>{translation || "?"}</td>
            </tr>
          );
        })}
        </Table>
      )}
    </div>
  );
}

/** Lower-case, and one apostrophe for the two the keyboard and the content use. */
function normalise(text: string): string {
  return text.toLowerCase().replace(/[’']/g, "'").trim();
}
