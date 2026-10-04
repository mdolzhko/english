/**
 * What a lesson's .mdx source says about its own structure, read with
 * regular expressions rather than by compiling the MDX. Pure: no filesystem,
 * so it can be tested on a string.
 *
 * The tags it reads are `## heading`, `<Topic id title gist hint>`,
 * `<Exercise id title>` and `<Rule id title hint>`. Attribute values must not
 * contain a straight `"` or a `>` — the parser stops at the first of either.
 */

/** One entry in a lesson's side navigation. */
export type LessonSection = {
  id: string;
  title: string;
  /** Notes (headings and cards) and exercises are drawn as two groups. */
  kind: "notes" | "exercise";
};

/** A rule a gap can point at, in the short form a wrong pick shows. */
export type LessonRule = { id: string; title: string; hint: string };

/** One numbered card of the notes, as the summary at the top lists it. */
export type LessonTopic = { id: string; title: string; gist: string };

export type LessonOutline = {
  /** Headings, topic cards and exercises, in source order. */
  sections: LessonSection[];
  /** Every `<Rule>` and every `<Topic>`, by id. */
  rules: Record<string, LessonRule>;
  /** The `<Topic>` cards, in source order. */
  topics: LessonTopic[];
};

const HEADING = /^## +(.+?)\s*$/gm;
const TAG = /<(Topic|Exercise|Rule)\b([^>]*)>/g;

/** Same slug rehype-slug derives from a heading, for the headings we use. */
export function slugify(heading: string): string {
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

export function parseLessonSource(source: string): LessonOutline {
  const found: Array<LessonSection & { at: number }> = [];
  const rules: Record<string, LessonRule> = {};
  const topics: LessonTopic[] = [];

  for (const match of source.matchAll(HEADING)) {
    const title = match[1];
    found.push({ id: slugify(title), title, kind: "notes", at: match.index });
  }

  for (const match of source.matchAll(TAG)) {
    const [, name, attributes] = match;
    const id = attribute(attributes, "id");
    const title = attribute(attributes, "title");
    if (!id || !title) continue;

    if (name !== "Rule") {
      found.push({
        id,
        title,
        kind: name === "Topic" ? "notes" : "exercise",
        at: match.index,
      });
    }
    if (name !== "Exercise") {
      rules[id] = { id, title, hint: attribute(attributes, "hint") ?? "" };
    }
    if (name === "Topic") {
      topics.push({ id, title, gist: attribute(attributes, "gist") ?? "" });
    }
  }

  return {
    sections: found
      .sort((a, b) => a.at - b.at)
      .map(({ id, title, kind }) => ({ id, title, kind })),
    rules,
    topics,
  };
}
