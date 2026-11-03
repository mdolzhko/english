"use client";

import { useWord } from "./lesson-context";
import { parseHints } from "@/lib/hints";
import { HoverNote } from "./hover-note";
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

  if (!row) {
    return (
      <span className="rounded bg-warn px-1 text-warn-ink" title={`Not in the vocabulary: ${word}`}>
        {text}
      </span>
    );
  }

  return (
    <HoverNote
      look="underline decoration-line-strong decoration-dotted underline-offset-4"
      note={<WordNote row={row} />}
    >
      {text}
    </HoverNote>
  );
}
