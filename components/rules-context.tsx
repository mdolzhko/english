"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LessonRule } from "@/lib/lessons";

const RulesContext = createContext<Record<string, LessonRule>>({});

/**
 * Makes the lesson's rules reachable from any gap, however deep in the MDX
 * tree it sits — a gap only carries a rule id, not the text.
 */
export function RulesProvider({
  rules,
  children,
}: {
  rules: Record<string, LessonRule>;
  children: ReactNode;
}) {
  return <RulesContext value={rules}>{children}</RulesContext>;
}

export function useRule(id: string | undefined): LessonRule | undefined {
  const rules = useContext(RulesContext);
  return id ? rules[id] : undefined;
}
