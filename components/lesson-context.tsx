"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LessonRule, LessonStatus } from "@/lib/lessons";
import type { WordIndex } from "@/lib/vocabulary";
import { wordKey } from "@/lib/hints";
import type { WordRow } from "./vocabulary";

type LessonContextValue = {
  rules: Record<string, LessonRule>;
  status: LessonStatus;
  words: WordIndex;
};

const LessonContext = createContext<LessonContextValue>({
  rules: {},
  status: "done",
  words: {},
});

/**
 * Makes the lesson's rules, status and the vocabulary reachable from any
 * gap or sentence, however deep in the MDX tree it sits — a gap only
 * carries a rule id, a hint only a word, not the text, and a gap decides
 * from the status whether to open on its answer or blank.
 */
export function LessonProvider({
  rules,
  status = "done",
  words = {},
  children,
}: {
  rules: Record<string, LessonRule>;
  status?: LessonStatus;
  words?: WordIndex;
  children: ReactNode;
}) {
  return <LessonContext value={{ rules, status, words }}>{children}</LessonContext>;
}

export function useWord(word: string): WordRow | undefined {
  return useContext(LessonContext).words[wordKey(word)];
}

export function useRule(id: string | undefined): LessonRule | undefined {
  const { rules } = useContext(LessonContext);
  return id ? rules[id] : undefined;
}

export function useLessonStatus(): LessonStatus {
  return useContext(LessonContext).status;
}
