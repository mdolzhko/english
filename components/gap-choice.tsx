"use client";

import { useState } from "react";
import { RIGHT, WRONG } from "./gap-styles";
import { useRule } from "./rules-context";

/**
 * A gap the original exercise offered a choice for.
 *
 * Starts on the answer, so the page reads as finished homework. Picking
 * another option turns it red and, where the gap names a rule, shows that
 * rule's one-line form right there — the explanation comes to the reader
 * rather than sending them up the page and losing their place. The full rule
 * is one click away from inside the hint.
 *
 * The <select> is transparent and laid over the text rather than replacing it,
 * because a <select> sizes itself to its widest option, which would push the
 * surrounding words around as the choice changes.
 */
export function GapChoice({
  answer,
  options,
  rule: ruleId,
}: {
  answer: string;
  options: string[];
  rule?: string;
}) {
  const [picked, setPicked] = useState(answer);
  const rule = useRule(ruleId);
  const isWrong = picked !== answer;

  return (
    <span className="relative inline-block">
      <span className={isWrong ? WRONG : RIGHT}>{picked}</span>
      <span aria-hidden className="ml-0.5 text-[0.6rem] text-faint">
        ▾
      </span>

      <select
        aria-label={`Options offered for “${answer}”`}
        value={picked}
        onChange={(event) => setPicked(event.target.value)}
        className="absolute inset-0 w-full cursor-pointer opacity-0"
      >
        {options.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>

      {isWrong && rule && (
        // Every element here is phrasing content styled as a block: a real
        // <div> inside this inline span would be invalid HTML.
        <span
          role="note"
          className="absolute left-0 top-full z-20 mt-2 block w-max max-w-[min(20rem,calc(100vw-3rem))] rounded-lg border border-warn-line bg-warn p-3 text-left text-xs font-normal not-italic leading-relaxed text-ink shadow-sm"
        >
          <span className="block font-medium">{rule.title}</span>
          {rule.hint && <span className="mt-1 block">{rule.hint}</span>}
          <a
            href={`#${rule.id}`}
            className="mt-2 block font-medium underline underline-offset-2"
          >
            Read the full rule →
          </a>
        </span>
      )}
    </span>
  );
}
