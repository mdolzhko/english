/**
 * The reader's theme choice: light, dark, or auto — the system's choice,
 * which on a Mac or a phone set to "Auto" changes at sunset. A choice is
 * kept in localStorage for this browser; auto is the absence of one.
 * Storage may be unavailable (private window, blocked), so every access
 * is guarded and the page works without it.
 *
 * The page always carries a concrete `data-theme`, resolved here even for
 * auto, so that the sunset change goes through the same cross-fade as a
 * click. The CSS default of `light dark` only covers the moment before
 * the inline script runs.
 */
export type Theme = "light" | "dark" | "auto";

const KEY = "theme";
const EVENT = "themechange";

export function getTheme(): Theme {
  try {
    const stored = localStorage.getItem(KEY);
    return stored === "light" || stored === "dark" ? stored : "auto";
  } catch {
    return "auto";
  }
}

/** What the page actually shows: a choice, or the system's answer for auto. */
export function resolve(theme: Theme): "light" | "dark" {
  if (theme !== "auto") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  try {
    if (theme === "auto") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, theme);
  } catch {
    // No storage: the choice still applies until the page is left.
  }
  applyTheme(theme);
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Shows the theme as a cross-fade of the whole page: the browser snapshots
 * the old look and the new one and blends them as a single animation.
 * Easing every element's colours instead started a transition per
 * element — 952 on the vocabulary page — and cost a 32 ms style
 * recalculation up front, which read as a jolt. Browsers without view
 * transitions switch at once.
 */
export function applyTheme(theme: Theme) {
  const swap = () => {
    document.documentElement.dataset.theme = resolve(theme);
  };
  if (typeof document.startViewTransition === "function") {
    document.startViewTransition(swap);
  } else {
    swap();
  }
}

/** For useSyncExternalStore: re-read on our own changes and on another tab's. */
export function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Runs before the first paint, as an inline script: applies the stored
 * choice, or the system's answer, so the page never flashes the other
 * theme. Kept as a string because it must not wait for React.
 */
export const APPLY_STORED_THEME = `try{var t=localStorage.getItem(${JSON.stringify(KEY)});if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;
