import type { LessonStatus } from "@/lib/lessons";

const STYLES: Record<LessonStatus, string> = {
  done: "bg-good text-good-ink",
  "in-progress": "bg-warn text-warn-ink",
  todo: "border border-line-strong text-muted",
};

const LABELS: Record<LessonStatus, string> = {
  done: "Done",
  "in-progress": "In progress",
  todo: "To do",
};

export function StatusBadge({ status }: { status: LessonStatus }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold leading-snug ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
