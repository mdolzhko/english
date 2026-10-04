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
      <p className="eyebrow">On this page</p>
      <ul className="mt-3 space-y-2 border-l border-line">
        {sections.map((section, index) => {
          const isActive = section.id === active;
          const previous = sections[index - 1];
          return (
            <li
              key={section.id}
              className={
                // A gap with a line through it where the notes end and the
                // exercises begin.
                previous && previous.kind !== section.kind
                  ? "mt-4 border-t border-line pt-4"
                  : undefined
              }
            >
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`-ml-px block border-l py-0.5 pl-4 text-sm transition ${
                  isActive
                    ? "border-accent font-medium text-ink"
                    : "border-transparent text-muted hover:border-line-strong hover:text-ink"
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
