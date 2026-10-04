import type { LessonTopic } from "@/lib/lessons";

/**
 * The lesson in a few lines: every numbered card with its gist, linking
 * down to the card. Reads like a table of contents that already tells you
 * what each section will say.
 */
export function LessonSummary({ topics }: { topics: LessonTopic[] }) {
  if (topics.length === 0) return null;

  return (
    <nav aria-label="Topics" className="border-t border-line">
      {topics.map((topic, index) => (
        <a
          key={topic.id}
          href={`#${topic.id}`}
          className="group grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3 gap-y-1 border-b border-line px-1 py-3"
        >
          <span className="font-mono text-[13px] text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-[17px] font-semibold tracking-tight transition group-hover:text-accent">
            {topic.title}
          </span>
          {topic.gist && (
            <span className="col-start-2 text-sm text-muted">{topic.gist}</span>
          )}
        </a>
      ))}
    </nav>
  );
}
