import type { Metadata } from "next";
import type { ComponentType } from "react";

type ReferenceModule = {
  default: ComponentType;
  metadata: { title: string; description?: string };
};

/** The one content file behind this page: text, data and table together. */
async function loadReference(): Promise<ReferenceModule> {
  return (await import("../../content/irregular-verbs.mdx")) as ReferenceModule;
}

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await loadReference();
  return { title: metadata.title, description: metadata.description };
}

export default async function IrregularVerbsPage() {
  const { default: Content, metadata } = await loadReference();

  return (
    <article>
      <header className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {metadata.title}
        </h1>
        {metadata.description && (
          <p className="mt-2 text-muted">
            {metadata.description}
          </p>
        )}
      </header>

      <div className="prose mt-10 max-w-none">
        <Content />
      </div>
    </article>
  );
}
