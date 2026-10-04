import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseLessonSource } from "./lesson-source";

describe("parseLessonSource", () => {
  it("lists headings, cards and exercises in source order, by kind", () => {
    const { sections } = parseLessonSource(`
## Topic

<Topic id="first" title="First card" gist="One.">
text
</Topic>

<Exercise id="exercise-1" title="Exercise 1">
</Exercise>
`);
    expect(sections).toEqual([
      { id: "topic", title: "Topic", kind: "notes" },
      { id: "first", title: "First card", kind: "notes" },
      { id: "exercise-1", title: "Exercise 1", kind: "exercise" },
    ]);
  });

  it("makes a rule of every <Rule> and every <Topic>, never of an <Exercise>", () => {
    const { rules } = parseLessonSource(`
<Topic id="card" title="Card" hint="Card hint.">
<Rule id="inner" title="Inner" hint="Inner hint.">
</Rule>
</Topic>
<Topic id="plain" title="Plain">
</Topic>
<Exercise id="exercise-1" title="Exercise 1">
</Exercise>
`);
    expect(rules).toEqual({
      card: { id: "card", title: "Card", hint: "Card hint." },
      inner: { id: "inner", title: "Inner", hint: "Inner hint." },
      plain: { id: "plain", title: "Plain", hint: "" },
    });
  });

  it("reads multi-line tags and keeps curly quotes and apostrophes", () => {
    const { topics, rules } = parseLessonSource(`
<Topic
  id="agreeing"
  title="Agreeing with so and neither"
  form="so / neither + auxiliary + subject"
  gist="It’s “so”, then the auxiliary."
  hint="Don’t repeat the verb."
>
</Topic>
`);
    expect(topics).toEqual([
      { id: "agreeing", title: "Agreeing with so and neither", gist: "It’s “so”, then the auxiliary." },
    ]);
    expect(rules.agreeing.hint).toBe("Don’t repeat the verb.");
  });

  it("skips a tag that has no id or no title", () => {
    const outline = parseLessonSource(`
<Topic title="No id">
</Topic>
<Exercise id="exercise-1">
</Exercise>
`);
    expect(outline.sections).toEqual([]);
    expect(outline.topics).toEqual([]);
    expect(outline.rules).toEqual({});
  });
});

describe("the lessons in content/", () => {
  const dir = path.join(process.cwd(), "content", "lessons");
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

  it.each(files)("%s has an outline and every gap points at a known rule", (file) => {
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    const outline = parseLessonSource(source);

    expect(outline.sections.length).toBeGreaterThan(0);

    const referenced = [...source.matchAll(/\brule="([^"]+)"/g)].map((m) => m[1]);
    const unknown = referenced.filter((id) => !(id in outline.rules));
    expect(unknown).toEqual([]);

    const ids = outline.sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
