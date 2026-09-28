import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export type LessonStatus = "todo" | "in-progress" | "done";

/** Exported as `metadata` from every content/lessons/*.mdx file. */
export type LessonMeta = {
  title: string;
  /** ISO date, YYYY-MM-DD — also drives ordering. */
  date: string;
  topic: string;
  status: LessonStatus;
  tags?: string[];
  /** Where the original exercise came from, if anywhere. */
  source?: string;
};

/** One entry in a lesson's side navigation. */
export type LessonSection = { id: string; title: string };

export type Lesson = LessonMeta & { slug: string };
export type LessonWithContent = Lesson & {
  Content: ComponentType;
  sections: LessonSection[];
};

type LessonModule = { default: ComponentType; metadata: LessonMeta };

const LESSONS_DIR = path.join(process.cwd(), "content", "lessons");

export function getLessonSlugs(): string[] {
  if (!fs.existsSync(LESSONS_DIR)) return [];
  return fs
    .readdirSync(LESSONS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

async function importLesson(slug: string): Promise<LessonModule> {
  return (await import(`../content/lessons/${slug}.mdx`)) as LessonModule;
}

/** Same slug rehype-slug derives from a heading, for the headings we use. */
function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Side navigation for a lesson, read straight from the .mdx source so it
 * cannot drift out of sync with the content: every `## heading` and every
 * `<Exercise id title>`, in the order they appear in the file.
 */
function getSections(slug: string): LessonSection[] {
  const source = fs.readFileSync(path.join(LESSONS_DIR, `${slug}.mdx`), "utf8");
  const found: Array<LessonSection & { at: number }> = [];

  for (const match of source.matchAll(/^## +(.+?)\s*$/gm)) {
    const title = match[1];
    found.push({ id: slugify(title), title, at: match.index });
  }

  for (const match of source.matchAll(
    /<Exercise\b[^>]*?\bid="([^"]+)"[^>]*?\btitle="([^"]+)"/g,
  )) {
    found.push({ id: match[1], title: match[2], at: match.index });
  }

  return found
    .sort((a, b) => a.at - b.at)
    .map(({ id, title }) => ({ id, title }));
}

/** All lessons, newest first. Metadata only — no content compiled. */
export async function getLessons(): Promise<Lesson[]> {
  const lessons = await Promise.all(
    getLessonSlugs().map(async (slug) => ({
      slug,
      ...(await importLesson(slug)).metadata,
    })),
  );
  return lessons.sort((a, b) => b.date.localeCompare(a.date));
}

/** One lesson with its renderable content, or null if the slug is unknown. */
export async function getLesson(slug: string): Promise<LessonWithContent | null> {
  // Also guards the dynamic import against arbitrary slugs.
  if (!getLessonSlugs().includes(slug)) return null;
  const { default: Content, metadata } = await importLesson(slug);
  return { slug, ...metadata, Content, sections: getSections(slug) };
}

export function formatLessonDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
