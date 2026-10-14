import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import { loadReference } from "./content";

/** Exported as `metadata` from every content/*.mdx file that is not a lesson. */
export type ReferenceMeta = {
  title: string;
  description?: string;
  /** The short name in the site navigation, where the title is too long. */
  label: string;
  /** Position in the navigation; lower first. */
  order: number;
};

export type Reference = ReferenceMeta & { slug: string };
export type ReferenceWithContent = Reference & { Content: ComponentType };

const CONTENT_DIR = path.join(process.cwd(), "content");

/** The reference pages are the .mdx files directly in content/, not in lessons/. */
export function getReferenceSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Every reference page, in navigation order. */
export async function getReferences(): Promise<Reference[]> {
  const references = await Promise.all(
    getReferenceSlugs().map(async (slug) => ({
      slug,
      ...(await loadReference(slug)).metadata,
    })),
  );
  return references.sort((a, b) => a.order - b.order);
}

/** One reference page with its content, or null if the slug is unknown. */
export async function getReference(slug: string): Promise<ReferenceWithContent | null> {
  // Also guards the dynamic import against arbitrary slugs.
  if (!getReferenceSlugs().includes(slug)) return null;
  const { Content, metadata } = await loadReference(slug);
  return { slug, ...metadata, Content };
}
