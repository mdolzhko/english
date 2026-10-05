"use client";

import { useEffect, useRef, useState } from "react";
import { highlight } from "./highlight";
import type { WordRow } from "./vocabulary";

/** A word with the line that says where it came from. */
export type Card = { row: WordRow; label: string };

const BUTTON =
  "rounded-lg border border-line bg-surface px-4 py-2 text-sm transition hover:border-line-strong";

/**
 * The words one at a time, in random order: a way to flip through the list
 * without the list, where a word is remembered by its place. It shows the
 * word with its translation, so it is browsing, not testing — "Practice"
 * is the test. Nothing is kept between visits; a new deck is shuffled each
 * time, and again on Shuffle.
 */
export function WordCards({ cards }: { cards: Card[] }) {
  const [order, setOrder] = useState(() => shuffle(cards.length));
  const [index, setIndex] = useState(0);

  const count = cards.length;
  const step = (delta: number) =>
    setIndex((current) => (current + delta + count) % count);

  // The deck takes focus when it appears, so the arrow keys reach it rather
  // than the segmented control that was just clicked.
  const deck = useRef<HTMLDivElement>(null);
  useEffect(() => deck.current?.focus(), []);

  // Arrow keys move the deck, unless the reader is in the search box or on
  // the segmented control, where the arrows already mean something.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, select, textarea, [role=radiogroup]")) return;
      const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!delta) return;
      event.preventDefault();
      setIndex((current) => (current + delta + count) % count);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count]);

  const card = cards[order[index]];
  const [word, translation, example] = card.row;

  return (
    <div className="mt-6">
      <div
        ref={deck}
        tabIndex={-1}
        aria-live="polite"
        className="card flex min-h-64 flex-col justify-center p-6 outline-none sm:p-10"
      >
        <p className="eyebrow">{card.label}</p>
        <p className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {word}
        </p>
        <p className="mt-2 text-lg text-muted">{translation}</p>
        {example && (
          <p className="mt-5 leading-relaxed">{highlight(example)}</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => step(-1)} className={`${BUTTON} flex-1 sm:flex-none`}>
          ← Back
        </button>
        <button type="button" onClick={() => step(1)} className={`${BUTTON} flex-1 sm:flex-none`}>
          Next →
        </button>
        <span className="font-mono text-xs tabular-nums text-faint">
          {index + 1} / {cards.length}
        </span>
        <button
          type="button"
          onClick={() => {
            setOrder(shuffle(cards.length));
            setIndex(0);
          }}
          className={`${BUTTON} ml-auto`}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}

/** A random order of 0…n-1 (Fisher–Yates). */
function shuffle(n: number): number[] {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
