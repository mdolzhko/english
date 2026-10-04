"use client";

import { useState } from "react";
import { highlight } from "./highlight";

/** `[verb, translation, example]`, or with two meanings `[verb, meaning with to, example, meaning with -ing, example]`. */
export type PatternRow =
  | [string, string, string]
  | [string, string, string, string, string];

export type PatternGroup = {
  id: string;
  title: string;
  /** The pattern in shorthand: "enjoy doing". */
  pattern: string;
  /** One or two sentences under the controls when the group is open. */
  lead?: string;
  rows: PatternRow[];
};

/**
 * Lists of verbs by what follows them. One group open at a time, chosen by
 * the segmented control; searching looks through every group at once and
 * tags each hit with its group, so a verb is found wherever it sits.
 */
export function VerbPatterns({ groups }: { groups: PatternGroup[] }) {
  const [openId, setOpenId] = useState(groups[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const needle = normalise(query);
  const open = groups.find((group) => group.id === openId) ?? groups[0];

  type Hit = { row: PatternRow; group: PatternGroup };
  let hits: Hit[];
  let caption: string;

  if (needle) {
    hits = groups
      .flatMap((group) => group.rows.map((row) => ({ row, group })))
      .filter(({ row }) => row.some((cell) => normalise(cell).includes(needle)))
      .sort((a, b) => a.row[0].localeCompare(b.row[0]));
    caption = hits.length === 1 ? "1 match" : `${hits.length} matches across all groups`;
  } else {
    hits = open.rows.map((row) => ({ row, group: open }));
    caption = `${hits.length} verbs · ${open.pattern}`;
  }

  const contrast = hits.some(({ row }) => row.length === 5);

  return (
    <div className="not-prose mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="radiogroup"
          aria-label="Which verbs"
          className="inline-flex flex-wrap rounded-lg border border-line bg-surface p-0.5 text-xs"
        >
          {groups.map((group) => {
            const isOn = !needle && group.id === open.id;
            return (
              <button
                key={group.id}
                type="button"
                role="radio"
                aria-checked={isOn}
                onClick={() => {
                  setOpenId(group.id);
                  setQuery("");
                }}
                className={`rounded-md px-2.5 py-1 transition ${
                  isOn
                    ? "bg-accent text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                {group.title}
              </button>
            );
          })}
        </div>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a verb, a translation or an example"
          aria-label="Search verbs"
          className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm placeholder:text-faint focus:border-accent focus:outline-none sm:w-80"
        />
      </div>

      <p className="mt-3 text-xs text-muted">{caption}</p>
      {!needle && open.lead && (
        <p className="mt-2 max-w-[70ch] text-sm text-muted">{open.lead}</p>
      )}

      {hits.length === 0 ? (
        <p className="mt-6 text-sm text-muted">Nothing matches “{query}”.</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-surface">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-panel">
                <th scope="col" className="eyebrow px-4 py-2.5">Verb</th>
                {contrast ? (
                  <>
                    <th scope="col" className="eyebrow px-4 py-2.5">+ to-infinitive</th>
                    <th scope="col" className="eyebrow px-4 py-2.5">+ -ing</th>
                  </>
                ) : (
                  <>
                    <th scope="col" className="eyebrow px-4 py-2.5">Translation</th>
                    <th scope="col" className="eyebrow px-4 py-2.5">Example</th>
                  </>
                )}
                {needle && <th scope="col" className="eyebrow px-4 py-2.5">Group</th>}
              </tr>
            </thead>
            <tbody>
              {hits.map(({ row, group }) => (
                <tr key={`${group.id}-${row[0]}`} className="border-t border-line align-top">
                  <td className="px-4 py-2.5 font-medium">{row[0]}</td>
                  {row.length === 5 ? (
                    <>
                      <td className="px-4 py-2.5 leading-relaxed">
                        <span className="block text-muted">{row[1]}</span>
                        <span className="mt-1 block">{highlight(row[2])}</span>
                      </td>
                      <td className="px-4 py-2.5 leading-relaxed">
                        <span className="block text-muted">{row[3]}</span>
                        <span className="mt-1 block">{highlight(row[4])}</span>
                      </td>
                    </>
                  ) : contrast ? (
                    // A plain row inside a search that also found contrast rows
                    <td colSpan={2} className="px-4 py-2.5 leading-relaxed">
                      <span className="block text-muted">{row[1]}</span>
                      <span className="mt-1 block">{highlight(row[2])}</span>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-2.5 text-muted">{row[1]}</td>
                      <td className="px-4 py-2.5 leading-relaxed">{highlight(row[2])}</td>
                    </>
                  )}
                  {needle && (
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-faint">
                      {group.pattern}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function normalise(text: string): string {
  return text.toLowerCase().replace(/[’']/g, "'").replace(/[\[\]]/g, "").trim();
}
