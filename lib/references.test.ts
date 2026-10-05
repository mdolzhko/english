import { describe, expect, it } from "vitest";
import { getReferenceSlugs } from "./references";

describe("getReferenceSlugs", () => {
  it("finds the content files beside lessons/, and nothing inside it", () => {
    const slugs = getReferenceSlugs();
    expect(slugs).toContain("irregular-verbs");
    expect(slugs).toContain("verb-patterns");
    expect(slugs.every((slug) => !slug.includes("/"))).toBe(true);
  });
});
