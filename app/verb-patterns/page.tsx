import type { Metadata } from "next";
import { ReferencePage, type ReferenceModule } from "@/components/reference-page";

async function load(): Promise<ReferenceModule> {
  return (await import("../../content/verb-patterns.mdx")) as ReferenceModule;
}

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await load();
  return { title: metadata.title, description: metadata.description };
}

export default async function VerbPatternsPage() {
  return <ReferencePage module={await load()} />;
}
