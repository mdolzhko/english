"use client";

import { useState } from "react";
import { highlight } from "./highlight";
import { SearchField } from "./search-field";
import { Segmented } from "./segmented";
import { CELL, ROW, Table, type Column } from "./table";

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
  const columns: Column[] = [
    "Verb",
    ...(contrast ? ["+ to-infinitive", "+ -ing"] : ["Translation", "Example"]),
    ...(needle ? ["Group"] : []),
  ];

  return (
    <div className="not-prose mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="Which verbs"
          value={needle ? "" : open.id}
          onChange={(id) => {
            setOpenId(id);
            setQuery("");
          }}
          options={groups.map((group) => ({ value: group.id, label: group.title }))}
        />

        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search a verb, a translation or an example"
          label="Search verbs"
          className="sm:w-80"
        />
      </div>

      <p className="mt-3 text-xs text-muted">{caption}</p>
      {!needle && open.lead && (
        <p className="mt-2 max-w-[70ch] text-sm text-muted">{open.lead}</p>
      )}

      {hits.length === 0 ? (
        <p className="mt-6 text-sm text-muted">Nothing matches “{query}”.</p>
      ) : (
        <Table className="mt-4" minWidth="40rem" columns={columns}>
          {hits.map(({ row, group }) => (
            <tr key={`${group.id}-${row[0]}`} className={`${ROW} align-top`}>
              <td className={`${CELL} font-medium`}>{row[0]}</td>
              {row.length === 5 ? (
                <>
                  <td className={`${CELL} leading-relaxed`}>
                    <span className="block text-muted">{row[1]}</span>
                    <span className="mt-1 block">{highlight(row[2])}</span>
                  </td>
                  <td className={`${CELL} leading-relaxed`}>
                    <span className="block text-muted">{row[3]}</span>
                    <span className="mt-1 block">{highlight(row[4])}</span>
                  </td>
                </>
              ) : contrast ? (
                // A plain row inside a search that also found contrast rows
                <td colSpan={2} className={`${CELL} leading-relaxed`}>
                  <span className="block text-muted">{row[1]}</span>
                  <span className="mt-1 block">{highlight(row[2])}</span>
                </td>
              ) : (
                <>
                  <td className={`${CELL} text-muted`}>{row[1]}</td>
                  <td className={`${CELL} leading-relaxed`}>{highlight(row[2])}</td>
                </>
              )}
              {needle && (
                <td className={`${CELL} whitespace-nowrap font-mono text-xs text-faint`}>
                  {group.pattern}
                </td>
              )}
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}

function normalise(text: string): string {
  return text.toLowerCase().replace(/[’']/g, "'").replace(/[\[\]]/g, "").trim();
}
