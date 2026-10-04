"use client";

import { useState } from "react";

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
        <div
          role="radiogroup"
          aria-label="Which verbs"
          className="inline-flex rounded-lg border border-line bg-surface p-0.5 text-xs"
        >
          {[
            { all: false, label: `Top ${TOP}` },
            { all: true, label: "All" },
          ].map(({ all, label }) => {
            const isOn = all === showAll;
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={isOn}
                onClick={() => setShowAll(all)}
                className={`rounded-md px-2.5 py-1 transition ${
                  isOn
                    ? "bg-accent text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search any form or the translation"
          aria-label="Search verbs"
          className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm placeholder:text-faint focus:border-accent focus:outline-none sm:w-72"
        />
      </div>

      <p className="mt-3 text-xs text-muted">{caption}</p>

      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          Nothing matches “{query}”.
        </p>
      ) : (
        <div className="mt-3 overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-panel">
                <th scope="col" className="w-10 px-4 py-2.5">
                  <span className="sr-only">Number</span>
                </th>
                {["Base", "Past simple", "Past participle", "Translation"].map(
                  (column) => (
                    <th
                      key={column}
                      scope="col"
                      className="eyebrow px-4 py-2.5"
                    >
                      {column}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((verb, index) => {
                const [base, past, participle, translation] = verb;
                // The content file is not type-checked, so a row with a
                // missing form is flagged rather than silently blank.
                const incomplete = !base || !past || !participle || !translation;
                return (
                  <tr
                    key={base || index}
                    className={`border-t border-line  ${
                      incomplete ? "bg-warn" : ""
                    }`}
                  >
                    <td className="px-4 py-2 text-right font-mono text-xs tabular-nums text-faint">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 font-medium">{base || "?"}</td>
                    <td className="px-4 py-2">{past || "?"}</td>
                    <td className="px-4 py-2">{participle || "?"}</td>
                    <td className="px-4 py-2 text-muted">
                      {translation || "?"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/** Lower-case, and one apostrophe for the two the keyboard and the content use. */
function normalise(text: string): string {
  return text.toLowerCase().replace(/[’']/g, "'").trim();
}
