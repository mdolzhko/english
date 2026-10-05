"use client";

import { useState } from "react";
import { formatDate } from "@/lib/format-date";
import { highlight } from "./highlight";
import { SearchField } from "./search-field";
import { Segmented } from "./segmented";
import { CELL, ROW, Table } from "./table";

/** One word as the content file writes it: word, translation, example sentence. */
export type WordRow = [string, string, string?];

/** The words added on one day, with where they came from. */
export type WordGroup = {
  /** ISO date, YYYY-MM-DD — newest group first. */
  date: string;
  /** The lesson or text the words came up in. */
  source?: string;
  /** A heading within the day — "Phrasal verbs" — when the words were sent in kinds. */
  title?: string;
  words: WordRow[];
};

type Mode = "both" | "practice";

/**
 * The vocabulary list, grouped by the day the words were added. A group is
 * the unit of review — the handful of words from one lesson — so the page
 * is long rather than paginated: a page number says nothing about what is
 * on it, a date and a source do. "Practice" hides every translation until
 * the word is clicked. Searching looks through every group at once.
 */
export function Vocabulary({ groups }: { groups: WordGroup[] }) {
  const [mode, setMode] = useState<Mode>("both");
  const [query, setQuery] = useState("");

  const total = groups.reduce((sum, group) => sum + group.words.length, 0);
  if (total === 0) {
    return <p className="not-prose mt-10 text-sm text-muted">No words yet.</p>;
  }

  const needle = normalise(query);
  const practice = mode === "practice";

  let shown: { key: string; heading?: string; title?: string; words: WordRow[] }[];
  let caption: string;

  if (needle) {
    const words = groups
      .flatMap((group) => group.words)
      .filter((word) => word.some((part) => part && normalise(part).includes(needle)));
    shown = [{ key: "search", words }];
    caption = words.length === 1 ? "1 match" : `${words.length} matches`;
  } else {
    // Several groups on one day keep their file order; the date is shown
    // once, above the first of them.
    const ordered = [...groups].sort((a, b) => b.date.localeCompare(a.date));
    shown = ordered.map((group, index) => ({
      key: `${group.date}-${index}`,
      heading:
        ordered[index - 1]?.date === group.date
          ? undefined
          : group.source
            ? `${formatDate(group.date)} · ${group.source}`
            : formatDate(group.date),
      title: group.title,
      words: group.words,
    }));
    caption = practice
      ? `${total} words. Translations are hidden — click a word to check.`
      : `${total} words, newest first.`;
  }

  return (
    <div className="not-prose mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="View"
          value={mode}
          onChange={setMode}
          options={[
            { value: "both", label: "Both languages" },
            { value: "practice", label: "Practice" },
          ]}
        />

        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search a word, the translation or the example"
          label="Search words"
        />
      </div>

      <p className="mt-3 text-xs text-muted">{caption}</p>

      {shown.every((group) => group.words.length === 0) ? (
        <p className="mt-6 text-sm text-muted">Nothing matches “{query}”.</p>
      ) : (
        shown.map((group) => (
          <section key={group.key} className={group.heading ? "mt-10 first:mt-3" : "mt-6"}>
            {group.heading && <h2 className="eyebrow">{group.heading}</h2>}
            {group.title && (
              <h3 className="mt-2 font-display text-base font-semibold tracking-tight">
                {group.title}
                <span className="ml-2 font-mono text-xs font-normal text-faint">
                  {group.words.length}
                </span>
              </h3>
            )}
            {/* Keyed by mode so every translation hides again on a switch. */}
            <Table
              key={mode}
              className="mt-3"
              minWidth="36rem"
              // Fixed shares, so the columns line up from one group to the next.
              columns={[
                { label: "Word", className: "w-[22%]" },
                { label: "Translation", className: "w-[26%]" },
                "Example",
              ]}
            >
              {group.words.map((word, index) => (
                <Word key={word[0] || index} row={word} practice={practice} />
              ))}
            </Table>
          </section>
        ))
      )}
    </div>
  );
}

function Word({ row, practice }: { row: WordRow; practice: boolean }) {
  const [revealed, setRevealed] = useState(false);
  const [word, translation, example] = row;
  // The content file is not type-checked, so a row with a missing part
  // is flagged rather than silently blank.
  const incomplete = !word || !translation;
  const hidden = practice && !revealed;

  return (
    <tr className={`${ROW} ${incomplete ? "bg-warn" : ""}`}>
      <td className={`${CELL} font-medium`}>
        {hidden ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="text-left decoration-line-strong decoration-dotted underline-offset-4 hover:underline"
          >
            {word || "?"}
          </button>
        ) : (
          word || "?"
        )}
      </td>
      <td className={`${CELL} text-muted`}>
        {hidden ? (
          <span className="font-mono text-xs text-faint">click the word</span>
        ) : (
          translation || "?"
        )}
      </td>
      <td className={`${CELL} text-muted`}>{example ? highlight(example) : ""}</td>
    </tr>
  );
}

/** Lower-case, and one apostrophe for the two the keyboard and the content use. */
function normalise(text: string): string {
  return text.toLowerCase().replace(/[’']/g, "'").trim();
}
