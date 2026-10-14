import { describe, expect, it } from "vitest";
import { readGroups, readLessonMeta, readReferenceMeta } from "./content";

const Content = () => null;

describe("readLessonMeta", () => {
  it("reads what a lesson file exports", () => {
    const metadata = { title: "T", date: "2026-10-01", topic: "Grammar", status: "done", tags: ["a"] };
    expect(readLessonMeta({ default: Content, metadata }, "x.mdx")).toEqual({
      ...metadata,
      description: undefined,
      source: undefined,
    });
  });

  it("names the file and the field that is wrong", () => {
    const metadata = { title: "T", date: "2026-10-01", topic: "Grammar", status: "soon" };
    expect(() => readLessonMeta({ metadata }, "x.mdx")).toThrow("x.mdx: metadata.status");
    expect(() => readLessonMeta({}, "x.mdx")).toThrow("x.mdx: must export a metadata object");
  });
});

describe("readReferenceMeta", () => {
  it("needs a label and an order", () => {
    expect(() => readReferenceMeta({ metadata: { title: "T", label: "L" } }, "r.mdx")).toThrow(
      "metadata.order",
    );
  });
});

describe("readGroups", () => {
  it("keeps well-formed rows and drops the rest", () => {
    const groups = readGroups({
      groups: [
        { date: "2026-10-05", words: [["hose", "шланг"], ["bad"], ["ok", "так", "An [ok] example."]] },
        { words: [["no date", "x"]] },
        "not a group",
      ],
    });
    expect(groups).toEqual([
      {
        date: "2026-10-05",
        source: undefined,
        title: undefined,
        words: [["hose", "шланг"], ["ok", "так", "An [ok] example."]],
      },
    ]);
  });

  it("is empty when the file exports nothing usable", () => {
    expect(readGroups(undefined)).toEqual([]);
  });
});
