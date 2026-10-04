import Link from "next/link";
import { StatusBadge } from "@/components/status-badge";
import { formatLessonDate, getLessons } from "@/lib/lessons";

export default async function HomePage() {
  const lessons = await getLessons();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Lessons</h1>
      <p className="mt-2 text-muted">
        Every lesson topic with the homework I did for it.
      </p>

      {lessons.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No lessons yet.</p>
      ) : (
        <ul className="mt-10 space-y-3">
          {lessons.map((lesson) => (
            <li key={lesson.slug}>
              <Link
                href={`/lessons/${lesson.slug}`}
                className="block rounded-lg border border-line bg-surface p-5 transition hover:border-line-strong"
              >
                <div className="flex items-center gap-3 text-xs text-muted">
                  <time dateTime={lesson.date}>
                    {formatLessonDate(lesson.date)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{lesson.topic}</span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    {lesson.title}
                  </h2>
                  <StatusBadge status={lesson.status} />
                </div>

                {lesson.tags && lesson.tags.length > 0 && (
                  <p className="mt-2 font-mono text-xs text-muted">
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
