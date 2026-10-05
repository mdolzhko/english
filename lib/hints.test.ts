import { describe, expect, it } from "vitest";
import { parseHints, wordAnchor } from "./hints";

describe("parseHints", () => {
  it("splits a marked word out of the sentence, keeping the rest as text", () => {
    expect(parseHints("Андрій уже [промок: get wet], коли машина зупинилася.")).toEqual([
      { text: "Андрій уже " },
      { text: "промок", key: "get wet" },
      { text: ", коли машина зупинилася." },
    ]);
  });

  it("leaves brackets without a colon alone", () => {
    expect(parseHints("Він (здається) [не] прийшов.")).toEqual([
      { text: "Він (здається) [не] прийшов." },
    ]);
  });
});

describe("wordAnchor", () => {
  it("slugs the first of a row's words", () => {
    expect(wordAnchor("get wet / get soaked")).toBe("get-wet");
    expect(wordAnchor("it’s raining cats and dogs")).toBe("it-s-raining-cats-and-dogs");
  });
});
