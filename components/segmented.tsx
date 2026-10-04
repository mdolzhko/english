"use client";

import type { KeyboardEvent } from "react";

export type SegmentedOption<T extends string> = { value: T; label: string };

/**
 * A row of mutually exclusive choices, styled as one control. Behaves like
 * a radio group: arrow keys move the selection, so it is not just a row of
 * buttons with a radio role painted on. `value` may match no option — then
 * nothing is selected, which a search that spans every group needs.
 */
export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | "";
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
}) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!step) return;
    event.preventDefault();
    const index = options.findIndex((option) => option.value === value);
    const next = options[(index + step + options.length) % options.length];
    onChange(next.value);
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="inline-flex flex-wrap rounded-lg border border-line bg-surface p-0.5 text-xs"
    >
      {options.map((option) => {
        const isOn = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isOn}
            tabIndex={isOn || (value === "" && option === options[0]) ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={`rounded-md px-2.5 py-1 transition ${
              isOn ? "bg-accent text-white" : "text-muted hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
