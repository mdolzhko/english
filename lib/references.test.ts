import { describe, expect, it } from "vitest";
import { getReferenceSlugs } from "./references";

describe("getReferenceSlugs", () => {
  it("finds the content files beside lessons/, and nothing inside it", () => {
    const slugs = getReferenceSlugs();
    expect(slugs).toContain("irregular-verbs");
    expect(slugs).toContain("vocabulary");
    expect(slugs.every((slug) => !slug.includes("/"))).toBe(true);
  });
});
