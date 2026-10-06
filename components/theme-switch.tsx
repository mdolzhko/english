"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { applyTheme, getTheme, setTheme, subscribe, type Theme } from "@/lib/theme";

const ICON = "h-5 w-5";

/** A sun: light. */
const Sun = (
  <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

/** A crescent moon: dark. */
const Moon = (
  <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

/** A circle half filled: auto, whichever the system says. */
const Auto = (
  <svg viewBox="0 0 24 24" className={ICON} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
  </svg>
);

const NEXT: Record<Theme, Theme> = { auto: "light", light: "dark", dark: "auto" };
const ICONS: Record<Theme, { icon: ReactNode; name: string; said: string }> = {
  light: { icon: Sun, name: "Light", said: "Light" },
  dark: { icon: Moon, name: "Dark", said: "Dark" },
  auto: { icon: Auto, name: "Follow the system", said: "Auto · following the system" },
};

/** How long the label stays after a click, before it fades. */
const SAY_FOR = 1600;

/**
 * One button that shows the current theme and cycles to the next:
 * auto → light → dark → auto. The choice is kept for this browser; in auto
 * the page follows the system live, easing between the two when it
 * changes — at sunset, on a Mac or a phone set to switch by itself.
 *
 * Every click says what it did, in a label that fades: a switch to auto
 * often changes no colour at all, since auto is one of the two, and a
 * click with nothing to show for it would look broken.
 */
export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "auto" as Theme);
  const [saying, setSaying] = useState<Theme | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const choose = (next: Theme) => {
    setTheme(next);
    setSaying(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSaying(null), SAY_FOR);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (getTheme() === "auto") applyTheme("auto");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const current = ICONS[theme];
  const next = ICONS[NEXT[theme]];

  return (
    <span className="flex items-center gap-2">
      <span
        aria-live="polite"
        className={`font-mono text-xs text-muted transition-opacity duration-500 ${
          saying ? "opacity-100" : "opacity-0"
        }`}
      >
        {saying && ICONS[saying].said}
      </span>
      <button
        type="button"
        onClick={() => choose(NEXT[theme])}
        aria-label={`Theme: ${current.name}. Switch to ${next.name.toLowerCase()}`}
        title={`${current.name} · click for ${next.name.toLowerCase()}`}
        className="rounded-lg p-2 text-muted transition hover:text-ink"
      >
        {/* Keyed by theme, so the icon turns in on each change. */}
        <span key={theme} className="theme-icon block">
          {current.icon}
        </span>
      </button>
    </span>
  );
}
