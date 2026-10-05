import Link from "next/link";
import type { WordRow } from "./vocabulary";
import { highlight } from "./highlight";
import { wordAnchor } from "@/lib/hints";

/**
 * A vocabulary row shown where the reader needs it: under a Ukrainian word
 * they do not know yet. Same shape and placement as the rule note, so the
 * two kinds of help read alike. The gap above the box is padding, not
 * margin, so the pointer can cross it to reach the link without leaving
 * the note.
 */
export function WordNote({ row }: { row: WordRow }) {
  const [word, translation, example] = row;
  return (
    <span role="note" className="absolute left-0 top-full z-20 block pt-2">
      <span className="block w-max max-w-[min(20rem,calc(100vw-3rem))] rounded-lg border border-line-strong bg-surface p-3 text-left text-xs font-normal not-italic leading-relaxed text-ink shadow-sm">
        <span className="block font-display text-sm font-semibold">{word}</span>
        <span className="mt-0.5 block text-muted">{translation}</span>
        {example && <span className="mt-1.5 block">{highlight(example)}</span>}
        <Link href={`/vocabulary#${wordAnchor(word)}`} className="mt-2 block font-medium underline underline-offset-2">
          In the vocabulary →
        </Link>
      </span>
    </span>
  );
}
