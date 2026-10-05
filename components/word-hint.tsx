"use client";

import { useState } from "react";
import { useWord } from "./lesson-context";
import { parseHints } from "@/lib/hints";
import { WordNote } from "./word-note";

/**
 * A Ukrainian sentence with its unknown words marked: `[промок: get wet]`
 * shows "промок" with a dotted underline, and hovering, focusing or
 * clicking it opens the vocabulary row for "get wet". A word that is not
 * in the vocabulary is flagged rather than silently plain.
 */
export function Hinted({ text }: { text: string }) {
  return (
    <>
      {parseHints(text).map((part, index) =>
        part.key ? (
          <Hint key={index} text={part.text} word={part.key} />
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}

function Hint({ text, word }: { text: string; word: string }) {
  const row = useWord(word);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);

  if (!row) {
    return (
      <span className="rounded bg-warn px-1 text-warn-ink" title={`Not in the vocabulary: ${word}`}>
        {text}
      </span>
    );
  }

  const open = hover || focused || pinned;
  // Hover and focus are tracked on the wrapper, which holds the note too,
  // so moving the pointer or the focus from the word into the note keeps
  // it open; it closes once both have left.
  return (
    <span
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        setFocused(false);
        setPinned(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setPinned((on) => !on)}
        className="cursor-help underline decoration-line-strong decoration-dotted underline-offset-4"
      >
        {text}
      </button>
      {open && <WordNote row={row} />}
    </span>
  );
}
