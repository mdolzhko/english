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

    // The current section is the last one whose top has reached the line a
    // click on its link scrolls it to: its own scroll margin, under the
    // sticky bar. Taking the topmost section in a band instead picked the
    // tail of the previous one, which also sits in that band, so the
    // highlight lagged one item behind on the way up.
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = elements[0];
      for (const element of elements) {
        const line = parseFloat(getComputedStyle(element).scrollMarginTop) + 8;
        if (element.getBoundingClientRect().top <= line) current = element;
      }
      // At the very bottom a short last section can never reach the line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive((atBottom ? elements[elements.length - 1] : current).id);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="lg:sticky lg:top-20 lg:self-start"
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
