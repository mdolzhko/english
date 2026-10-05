/** A piece of a Ukrainian sentence: plain text, or a word with a vocabulary key. */
export type HintPart = { text: string; key?: string };

/**
 * Splits `[промок: get wet]` out of a sentence: the text before the colon is
 * what the reader sees, the text after it is the vocabulary word that
 * explains it. A bracket without a colon is left as it is, since the
 * Ukrainian text may use brackets of its own.
 */
export function parseHints(sentence: string): HintPart[] {
  return sentence
    .split(/(\[[^\]]*:[^\]]*\])/)
    .filter((part) => part !== "")
    .map((part) => {
      const match = /^\[([^\]]*?):([^\]]*)\]$/.exec(part);
      if (!match) return { text: part };
      return { text: match[1].trim(), key: match[2].trim() };
    });
}

/** The index key for a vocabulary word: lower-case, one apostrophe. */
export function wordKey(word: string): string {
  return word.toLowerCase().replace(/[’']/g, "'").trim();
}

/** The anchor of a vocabulary row on its page: its first word, as a slug. */
export function wordAnchor(word: string): string {
  return wordKey(word.split("/")[0])
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "");
}
