import type { LessonStatus } from "@/lib/lessons";

const STYLES: Record<LessonStatus, string> = {
  done: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  "in-progress":
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
  todo: "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-400 dark:ring-zinc-400/20",
};

const LABELS: Record<LessonStatus, string> = {
  done: "Done",
  "in-progress": "In progress",
  todo: "To do",
};

export function StatusBadge({ status }: { status: LessonStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
