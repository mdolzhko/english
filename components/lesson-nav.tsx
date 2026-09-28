"use client";

import { useEffect, useState } from "react";
import type { LessonSection } from "@/lib/lessons";

/**
 * Table of contents for a lesson. Sticky beside the content on wide
 * screens, stacked above it on narrow ones.
 */
export function LessonNav({ sections }: { sections: LessonSection[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  const ids = sections.map((section) => section.id).join(",");

  useEffect(() => {
    const elements = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const topmost = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (topmost) setActive(topmost.target.id);
      },
      // Only count a section as active once it reaches the upper band of
      // the viewport, so the highlight follows reading position.
      { rootMargin: "0px 0px -70% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="lg:sticky lg:top-8 lg:self-start"
    >
      <p className="font-mono text-xs uppercase tracking-wide text-zinc-400">
        On this page
      </p>
      <ul className="mt-3 space-y-2 border-l border-zinc-200 dark:border-zinc-800">
        {sections.map((section) => {
          const isActive = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`-ml-px block border-l py-0.5 pl-4 text-sm transition ${
                  isActive
                    ? "border-emerald-500 font-medium text-zinc-900 dark:text-zinc-100"
                    : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
                }`}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
