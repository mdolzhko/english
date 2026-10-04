import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

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

/**
 * One entry in a lesson's side navigation. `kind` tells the notes (every
 * `## heading`) from the exercises, so the navigation can draw a line
 * between the two groups.
 */
export type LessonSection = {
  id: string;
  title: string;
  kind: "notes" | "exercise";
};

/** A rule from the lesson notes, in the short form a gap shows. */
export type LessonRule = { id: string; title: string; hint: string };

/** One numbered card of the lesson notes, as the summary at the top lists it. */
export type LessonTopic = { id: string; title: string; gist: string };

export type Lesson = LessonMeta & { slug: string };
export type LessonWithContent = Lesson & {
  Content: ComponentType;
  sections: LessonSection[];
  rules: Record<string, LessonRule>;
  topics: LessonTopic[];
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

/** One attribute of a JSX tag, from the text between `<Tag` and `>`. */
function attribute(attributes: string, name: string): string | undefined {
  return new RegExp(`\\b${name}="([^"]*)"`).exec(attributes)?.[1];
}

/**
 * Side navigation for a lesson, read straight from the .mdx source so it
 * cannot drift out of sync with the content: every `## heading`, every
 * `<Topic id title>` and every `<Exercise id title>`, in the order they
 * appear in the file.
 */
function getSections(slug: string): LessonSection[] {
  const source = fs.readFileSync(path.join(LESSONS_DIR, `${slug}.mdx`), "utf8");
  const found: Array<LessonSection & { at: number }> = [];

  for (const match of source.matchAll(/^## +(.+?)\s*$/gm)) {
    const title = match[1];
    found.push({ id: slugify(title), title, kind: "notes", at: match.index });
  }

  for (const match of source.matchAll(/<(Topic|Exercise)\b([^>]*)>/g)) {
    const id = attribute(match[2], "id");
    const title = attribute(match[2], "title");
    if (id && title) {
      found.push({
        id,
        title,
        kind: match[1] === "Topic" ? "notes" : "exercise",
        at: match.index,
      });
    }
  }

  return found
    .sort((a, b) => a.at - b.at)
    .map(({ id, title, kind }) => ({ id, title, kind }));
}

/**
 * The lesson's rules, read from the .mdx source the same way the sections are,
 * so a gap can name a rule and get its wording without the content file
 * repeating itself. A `<Topic>` card with a `hint` counts as a rule as well,
 * for lessons where each card is one rule.
 */
function getRules(slug: string): Record<string, LessonRule> {
  const source = fs.readFileSync(path.join(LESSONS_DIR, `${slug}.mdx`), "utf8");
  const rules: Record<string, LessonRule> = {};

  for (const match of source.matchAll(/<(?:Rule|Topic)\b([^>]*)>/g)) {
    const id = attribute(match[1], "id");
    const title = attribute(match[1], "title");
    if (id && title) {
      rules[id] = { id, title, hint: attribute(match[1], "hint") ?? "" };
    }
  }

  return rules;
}

/** The lesson's numbered cards, in order, for the summary above the notes. */
function getTopics(slug: string): LessonTopic[] {
  const source = fs.readFileSync(path.join(LESSONS_DIR, `${slug}.mdx`), "utf8");
  const topics: LessonTopic[] = [];

  for (const match of source.matchAll(/<Topic\b([^>]*)>/g)) {
    const id = attribute(match[1], "id");
    const title = attribute(match[1], "title");
    if (id && title) {
      topics.push({ id, title, gist: attribute(match[1], "gist") ?? "" });
    }
  }

  return topics;
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
  return {
    slug,
    ...metadata,
    Content,
    sections: getSections(slug),
    rules: getRules(slug),
    topics: getTopics(slug),
  };
}

export function formatLessonDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
