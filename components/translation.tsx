"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { highlight, MARK } from "./highlight";
import { RuleNote } from "./rule-note";
import { useRule } from "./rules-context";

type Mode = "both" | "practice";

const ModeContext = createContext<Mode>("both");

/**
 * A translation exercise: the source text in Ukrainian, sentence by sentence,
 * each with its English translation underneath, so the pair can be read
 * together — the reason this is not two tabs.
 *
 * "Both" is the finished homework. "Practice" hides every translation and
 * lets the reader try a sentence before clicking it open; switching modes
 * hides everything again.
 */
export function Translation({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("both");

  return (
    <ModeContext value={mode}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          {mode === "practice"
            ? "English is hidden. Click a sentence to check your version."
            : "Each sentence with its translation. Verb forms are highlighted."}
        </p>

        <div
          role="radiogroup"
          aria-label="View"
          className="inline-flex rounded-lg border border-line bg-surface p-0.5 text-xs"
        >
          {(["both", "practice"] as const).map((option) => {
            const isOn = option === mode;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isOn}
                onClick={() => setMode(option)}
                className={`rounded-md px-2.5 py-1 transition ${
                  isOn
                    ? "bg-accent text-white"
                    : "text-muted hover:text-ink"
                }`}
              >
                {option === "both" ? "Both languages" : "Practice"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Keyed by mode so every sentence closes again on a switch. */}
      <ol
        key={mode}
        className="mt-6 ml-6 list-decimal space-y-5 marker:font-mono marker:text-sm marker:text-faint"
      >
        {children}
      </ol>
    </ModeContext>
  );
}

/**
 * One sentence of the text and my translation of it. `[brackets]` in `en`
 * mark the verb form the sentence is about; with a `rule`, clicking that form
 * shows the rule's one-line explanation. Leave `en` out while the sentence is
 * still to do — it renders as a visible gap, not as nothing.
 */
export function Pair({
  ua,
  en,
  rule: ruleId,
}: {
  ua: string;
  en?: string;
  rule?: string;
}) {
  const mode = useContext(ModeContext);
  const rule = useRule(ruleId);
  const [revealed, setRevealed] = useState(false);
  const [showRule, setShowRule] = useState(false);

  const practice = mode === "practice";
  const hidden = practice && !revealed;

  if (hidden) {
    return (
      <li className="pl-2">
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="block text-left leading-relaxed decoration-line-strong decoration-dotted underline-offset-4 hover:underline"
        >
          {ua}
          <span className="mt-1 block font-mono text-xs text-faint">
            show translation
          </span>
        </button>
      </li>
    );
  }

  return (
    <li className="pl-2">
      <p
        className={
          practice
            ? "leading-relaxed"
            : "text-sm leading-relaxed text-muted"
        }
      >
        {ua}
      </p>

      <div className="relative mt-1 leading-relaxed">
        {en ? (
          highlight(en, (form, index) =>
            rule ? (
              <button
                key={index}
                type="button"
                aria-expanded={showRule}
                onClick={() => setShowRule((open) => !open)}
                className={`${MARK} cursor-help`}
              >
                {form}
              </button>
            ) : (
              <b key={index} className={MARK}>
                {form}
              </b>
            ),
          )
        ) : (
          <span className="rounded border border-dashed border-line-strong px-2 py-0.5 text-sm italic text-faint">
            not translated yet
          </span>
        )}

        {showRule && rule && <RuleNote rule={rule} />}
      </div>
    </li>
  );
}
