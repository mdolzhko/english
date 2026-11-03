"use client";

import { parseHints } from "@/lib/hints";
import { HoverNote } from "./hover-note";
import { useRule } from "./lesson-context";
import { RuleNote } from "./rule-note";

const ARTICLE = /^(the|an?)$/i;

/**
 * A finished English sentence with the reason for each article marked on
 * it: `[the: superlatives]` underlines "the", and hovering, focusing or
 * clicking it opens that rule's one-line form, linking to the full rule. A
 * mark on any other word — `[Japan: place-names]` — is a place where the
 * article is left out on purpose; it is dotted rather than underlined, so
 * the articles still stand out. A rule id that matches nothing is flagged.
 */
export function Marked({ text }: { text: string }) {
  return (
    <>
      {parseHints(text).map((part, index) =>
        part.key ? (
          <Mark key={index} text={part.text} ruleId={part.key} />
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}

function Mark({ text, ruleId }: { text: string; ruleId: string }) {
  const rule = useRule(ruleId);

  if (!rule) {
    return (
      <span className="rounded bg-warn px-1 text-warn-ink" title={`No rule with the id ${ruleId}`}>
        {text}
      </span>
    );
  }

  const look = ARTICLE.test(text)
    ? "font-medium underline decoration-accent decoration-2 underline-offset-4"
    : "underline decoration-line-strong decoration-dotted underline-offset-4";

  return (
    <HoverNote look={look} note={<RuleNote rule={rule} />}>
      {text}
    </HoverNote>
  );
}
