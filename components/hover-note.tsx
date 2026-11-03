"use client";

import { useState, type ReactNode } from "react";

/**
 * A word that opens a note under it on hover or focus, and keeps it open
 * when clicked, since a phone has no hover. Hover and focus are tracked on
 * the wrapper, which holds the note too, so moving the pointer or the focus
 * from the word into the note keeps it open; it closes once both have left.
 */
export function HoverNote({
  look,
  note,
  children,
}: {
  /** Classes of the word itself — how the reader can tell it opens something. */
  look: string;
  /** What opens under the word, positioned against the wrapper. */
  note: ReactNode;
  children: ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);

  const open = hover || focused || pinned;
  return (
    <span
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        setFocused(false);
        setPinned(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setPinned((on) => !on)}
        className={`cursor-help ${look}`}
      >
        {children}
      </button>
      {open && note}
    </span>
  );
}
