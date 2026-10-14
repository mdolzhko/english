import type { ComponentType } from "react";
import type { WordGroup, WordRow } from "@/components/vocabulary";
import type { LessonMeta, LessonStatus } from "./lessons";
import type { ReferenceMeta } from "./references";

/**
 * The one door for content files. MDX is not type-checked, so what a file
 * exports is `unknown` until it is read: every `import()` of content lives
 * here, and every value leaves through a guard that checks its shape.
 * Required metadata that is wrong stops the build with the file's name;
 * a malformed vocabulary row is left out, and the page flags it.
 */

export type LessonContent = { Content: ComponentType; metadata: LessonMeta };
export type ReferenceContent = { Content: ComponentType; metadata: ReferenceMeta };

export async function loadLesson(slug: string): Promise<LessonContent> {
  const file = `content/lessons/${slug}.mdx`;
  const exported: unknown = await import(`../content/lessons/${slug}.mdx`);
  return { Content: readComponent(exported, file), metadata: readLessonMeta(exported, file) };
}

export async function loadReference(slug: string): Promise<ReferenceContent> {
  const file = `content/${slug}.mdx`;
  const exported: unknown = await import(`../content/${slug}.mdx`);
  return { Content: readComponent(exported, file), metadata: readReferenceMeta(exported, file) };
}

export async function loadVocabulary(): Promise<WordGroup[]> {
  const exported: unknown = await import("../content/vocabulary.mdx");
  return readGroups(exported);
}

const STATUSES: LessonStatus[] = ["todo", "in-progress", "done"];

/** `metadata` of a lesson, as `content/lessons/*.mdx` must export it. */
export function readLessonMeta(module: unknown, file: string): LessonMeta {
  const meta = metadataOf(module, file);
  const status = requireString(meta, "status", file);
  if (!isStatus(status)) {
    throw new Error(`${file}: metadata.status must be one of ${STATUSES.join(", ")}`);
  }
  return {
    title: requireString(meta, "title", file),
    date: requireString(meta, "date", file),
    topic: requireString(meta, "topic", file),
    status,
    description: optionalString(meta.description),
    tags: optionalStrings(meta.tags),
    source: optionalString(meta.source),
  };
}

/** `metadata` of a reference page, as `content/*.mdx` must export it. */
export function readReferenceMeta(module: unknown, file: string): ReferenceMeta {
  const meta = metadataOf(module, file);
  if (typeof meta.order !== "number") throw new Error(`${file}: metadata.order must be a number`);
  return {
    title: requireString(meta, "title", file),
    label: requireString(meta, "label", file),
    order: meta.order,
    description: optionalString(meta.description),
  };
}

/** `groups` of the vocabulary file; a group or a row of the wrong shape is left out. */
export function readGroups(module: unknown): WordGroup[] {
  if (!isRecord(module) || !Array.isArray(module.groups)) return [];
  return module.groups.flatMap((group): WordGroup[] => {
    if (!isRecord(group) || typeof group.date !== "string" || !Array.isArray(group.words)) {
      return [];
    }
    return [
      {
        date: group.date,
        source: optionalString(group.source),
        title: optionalString(group.title),
        words: group.words.filter(isWordRow),
      },
    ];
  });
}

function readComponent(module: unknown, file: string): ComponentType {
  if (!isRecord(module) || !isComponent(module.default)) {
    throw new Error(`${file}: no default export to render`);
  }
  return module.default;
}

function metadataOf(module: unknown, file: string): Record<string, unknown> {
  if (!isRecord(module) || !isRecord(module.metadata)) {
    throw new Error(`${file}: must export a metadata object`);
  }
  return module.metadata;
}

function requireString(record: Record<string, unknown>, key: string, file: string): string {
  const value = record[key];
  if (typeof value !== "string" || value === "") {
    throw new Error(`${file}: metadata.${key} must be a non-empty string`);
  }
  return value;
}

function isStatus(value: string): value is LessonStatus {
  return STATUSES.some((status) => status === value);
}

function isComponent(value: unknown): value is ComponentType {
  return typeof value === "function";
}

function isWordRow(row: unknown): row is WordRow {
  return (
    Array.isArray(row) &&
    typeof row[0] === "string" &&
    typeof row[1] === "string" &&
    (row[2] === undefined || typeof row[2] === "string")
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function optionalStrings(value: unknown): string[] | undefined {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : undefined;
}
