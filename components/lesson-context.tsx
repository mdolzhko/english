"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LessonRule, LessonStatus } from "@/lib/lessons";

type LessonContextValue = {
  rules: Record<string, LessonRule>;
  status: LessonStatus;
};

const LessonContext = createContext<LessonContextValue>({
  rules: {},
  status: "done",
});

/**
 * Makes the lesson's rules and status reachable from any gap, however deep
 * in the MDX tree it sits — a gap only carries a rule id, not the text, and
 * decides from the status whether to open on its answer or blank.
 */
export function LessonProvider({
  rules,
  status = "done",
  children,
}: {
  rules: Record<string, LessonRule>;
  status?: LessonStatus;
  children: ReactNode;
}) {
  return <LessonContext value={{ rules, status }}>{children}</LessonContext>;
}

export function useRule(id: string | undefined): LessonRule | undefined {
  const { rules } = useContext(LessonContext);
  return id ? rules[id] : undefined;
}

export function useLessonStatus(): LessonStatus {
  return useContext(LessonContext).status;
}
