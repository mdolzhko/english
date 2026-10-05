import type { WordGroup, WordRow } from "@/components/vocabulary";
import { wordKey } from "./hints";

/** Every vocabulary row, reachable by any of its words ("get wet / get soaked" by either). */
export type WordIndex = Record<string, WordRow>;

/**
 * The vocabulary as a lookup, for the hints under a lesson's Ukrainian
 * sentences. Read from the same content file as the vocabulary page, so a
 * hint can only point at a word that is in the list.
 */
export async function getWordIndex(): Promise<WordIndex> {
  const { groups } = (await import("../content/vocabulary.mdx")) as unknown as { groups: WordGroup[] };
  const index: WordIndex = {};
  for (const group of groups) {
    for (const row of group.words) {
      for (const word of row[0].split("/")) {
        index[wordKey(word)] = row;
      }
    }
  }
  return index;
}
