import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { formatLessonDate, getLessons } from "@/lib/lessons";

export default async function HomePage() {
  const lessons = await getLessons();

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Lessons</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Every lesson topic with the homework I did for it.
      </p>

      {lessons.length === 0 ? (
        <p className="mt-10 text-sm text-zinc-500">No lessons yet.</p>
      ) : (
        <ul className="mt-10 space-y-3">
          {lessons.map((lesson) => (
            <li key={lesson.slug}>
              <Link
                href={`/lessons/${lesson.slug}`}
                className="block rounded-xl border border-zinc-200 p-5 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50"
              >
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <time dateTime={lesson.date}>
                    {formatLessonDate(lesson.date)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{lesson.topic}</span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-medium tracking-tight">
                    {lesson.title}
                  </h2>
                  <StatusBadge status={lesson.status} />
                </div>

                {lesson.tags && lesson.tags.length > 0 && (
                  <p className="mt-2 font-mono text-xs text-zinc-500">
                    {lesson.tags.map((tag) => `#${tag}`).join("  ")}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
