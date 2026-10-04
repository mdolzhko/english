import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonNav } from "@/components/lesson-nav";
import { LessonSummary } from "@/components/lesson-summary";
import { LessonProvider } from "@/components/lesson-context";
import { StatusBadge } from "@/components/status-badge";
import { formatLessonDate, getLesson, getLessonSlugs } from "@/lib/lessons";

export function generateStaticParams() {
  return getLessonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/lessons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getLesson(slug);
  return lesson
    ? { title: lesson.title, description: lesson.description }
    : {};
}

export default async function LessonPage({
  params,
}: PageProps<"/lessons/[slug]">) {
  const { slug } = await params;
  const lesson = await getLesson(slug);

  if (!lesson) notFound();

  const { Content } = lesson;

  return (
    <article>
      <Link
        href="/"
        className="text-sm text-muted transition hover:text-ink"
      >
        ← All lessons
      </Link>

      <header className="mt-8 flex max-w-3xl flex-col gap-3">
        <p className="eyebrow">
          {lesson.topic} ·{" "}
          <time dateTime={lesson.date}>{formatLessonDate(lesson.date)}</time>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {lesson.title}
          </h1>
          <StatusBadge status={lesson.status} />
        </div>

        {lesson.description && (
          <p className="text-[17px] leading-relaxed text-muted">
            {lesson.description}
          </p>
        )}

        {lesson.source && (
          <p className="font-mono text-xs text-faint">
            original exercises ·{" "}
            <a
              href={lesson.source}
              className="text-accent underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              test-english.com
            </a>
          </p>
        )}
      </header>

      <div className="mt-12 gap-12 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)]">
        <LessonNav sections={lesson.sections} />

        <div className="mt-10 lg:mt-0">
          <LessonSummary topics={lesson.topics} />

          <div
            className={`topics prose max-w-none ${lesson.topics.length > 0 ? "mt-10" : ""}`}
          >
            <LessonProvider rules={lesson.rules} status={lesson.status}>
              <Content />
            </LessonProvider>
          </div>
        </div>
      </div>
    </article>
  );
}
