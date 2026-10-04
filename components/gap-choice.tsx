"use client";

import { useState } from "react";
import { EMPTY, PENDING, RIGHT, WRONG } from "./gap-styles";
import { RuleNote } from "./rule-note";
import { useLessonStatus, useRule } from "./rules-context";

/**
 * A gap the original exercise offered a choice for.
 *
 * In a finished lesson it starts on the answer, so the page reads as
 * finished homework. In a lesson still to do it starts blank, so the reader
 * can try it first. Either way a wrong pick turns red and, where the gap
 * names a rule, shows that rule's one-line form right there — the
 * explanation comes to the reader rather than sending them up the page and
 * losing their place. The full rule is one click away from inside the hint.
 *
 * With no answers at all, options can still be picked but nothing is marked
 * right or wrong.
 *
 * The <select> is transparent and laid over the text rather than replacing it,
 * because a <select> sizes itself to its widest option, which would push the
 * surrounding words around as the choice changes.
 */
export function GapChoice({
  answers,
  options,
  rule: ruleId,
}: {
  /** Every correct option; empty when the exercise has no answer yet. */
  answers: string[];
  options: string[];
  rule?: string;
}) {
  const status = useLessonStatus();
  const rule = useRule(ruleId);
  const hasAnswer = answers.length > 0;
  const startsFilled = hasAnswer && status === "done";

  const [picked, setPicked] = useState(startsFilled ? answers[0] : "");

  const isRight = hasAnswer && answers.includes(picked);
  const isWrong = hasAnswer && picked !== "" && !isRight;

  const look = !picked ? EMPTY : !hasAnswer ? PENDING : isWrong ? WRONG : RIGHT;

  return (
    <span className="relative inline-block">
      <span className={look}>{picked || "…"}</span>
      <span aria-hidden className="ml-0.5 text-[0.6rem] text-faint">
        ▾
      </span>

      <select
        aria-label={
          hasAnswer ? `Options offered for “${answers.join(" / ")}”` : "Options"
        }
        value={picked}
        onChange={(event) => setPicked(event.target.value)}
        className="absolute inset-0 w-full cursor-pointer opacity-0"
      >
        {!startsFilled && (
          <option value="" disabled>
            Choose…
          </option>
        )}
        {options.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>

      {isWrong && rule && <RuleNote rule={rule} />}
    </span>
  );
}
