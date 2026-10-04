import type { ComponentType } from "react";

export type ReferenceModule = {
  default: ComponentType;
  metadata: { title: string; description?: string };
};

/** A reference page — not a lesson — rendered from one content file. */
export function ReferencePage({ module }: { module: ReferenceModule }) {
  const { default: Content, metadata } = module;

  return (
    <article>
      <header className="max-w-3xl">
        <p className="eyebrow">Reference</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {metadata.title}
        </h1>
        {metadata.description && (
          <p className="mt-3 text-[17px] leading-relaxed text-muted">
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
