import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { loadLesson } from "./content";
import { formatDate } from "./format-date";
import {
  parseLessonSource,
  type LessonRule,
  type LessonSection,
  type LessonTopic,
} from "./lesson-source";

export type LessonStatus = "todo" | "in-progress" | "done";

/** Exported as `metadata` from every content/lessons/*.mdx file. */
export type LessonMeta = {
  title: string;
  /** One or two sentences under the title, on the lesson and in the list. */
  description?: string;
  /** ISO date, YYYY-MM-DD — also drives ordering. */
  date: string;
  topic: string;
  status: LessonStatus;
  tags?: string[];
  /** Where the original exercise came from, if anywhere. */
  source?: string;
};

export type { LessonRule, LessonSection, LessonTopic } from "./lesson-source";

export type Lesson = LessonMeta & { slug: string };
export type LessonWithContent = Lesson & {
  Content: ComponentType;
  sections: LessonSection[];
  rules: Record<string, LessonRule>;
  topics: LessonTopic[];
};

const LESSONS_DIR = path.join(process.cwd(), "content", "lessons");

export function getLessonSlugs(): string[] {
  if (!fs.existsSync(LESSONS_DIR)) return [];
  return fs
    .readdirSync(LESSONS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** All lessons, newest first. Metadata only — no content compiled. */
export async function getLessons(): Promise<Lesson[]> {
  const lessons = await Promise.all(
    getLessonSlugs().map(async (slug) => ({
      slug,
      ...(await loadLesson(slug)).metadata,
    })),
  );
  return lessons.sort((a, b) => b.date.localeCompare(a.date));
}

/** One lesson with its renderable content, or null if the slug is unknown. */
export async function getLesson(slug: string): Promise<LessonWithContent | null> {
  // Also guards the dynamic import against arbitrary slugs.
  if (!getLessonSlugs().includes(slug)) return null;
  const { Content, metadata } = await loadLesson(slug);
  // The outline is read from the source rather than the compiled module, so
  // navigation and hints cannot drift from the content.
  const source = fs.readFileSync(path.join(LESSONS_DIR, `${slug}.mdx`), "utf8");
  return { slug, ...metadata, Content, ...parseLessonSource(source) };
}

export const formatLessonDate = formatDate;
