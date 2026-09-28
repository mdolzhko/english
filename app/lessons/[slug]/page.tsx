import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  return lesson ? { title: lesson.title } : {};
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
        className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        ← All lessons
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <time dateTime={lesson.date}>{formatLessonDate(lesson.date)}</time>
          <span aria-hidden>·</span>
          <span>{lesson.topic}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {lesson.title}
          </h1>
          <StatusBadge status={lesson.status} />
        </div>

        {lesson.source && (
          <p className="mt-3 text-xs text-zinc-500">
            Original exercise:{" "}
            <a
              href={lesson.source}
              className="underline underline-offset-2"
              target="_blank"
              rel="noreferrer noopener"
            >
              {lesson.source}
            </a>
          </p>
        )}
      </header>

      <div className="prose prose-zinc mt-10 max-w-none dark:prose-invert">
        <Content />
      </div>
    </article>
  );
}
