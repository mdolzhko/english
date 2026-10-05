import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReference, getReferenceSlugs } from "@/lib/references";

// Only the pages that exist at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getReferenceSlugs().map((reference) => ({ reference }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[reference]">): Promise<Metadata> {
  const { reference: slug } = await params;
  const reference = await getReference(slug);
  return reference
    ? { title: reference.title, description: reference.description }
    : {};
}

/** A reference page — not a lesson — rendered from one content file. */
export default async function ReferencePage({
  params,
}: PageProps<"/[reference]">) {
  const { reference: slug } = await params;
  const reference = await getReference(slug);

  if (!reference) notFound();

  const { Content } = reference;

  return (
    <article>
      <header className="max-w-3xl">
        <p className="eyebrow">Reference</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {reference.title}
        </h1>
        {reference.description && (
          <p className="mt-3 text-[17px] leading-relaxed text-muted">
            {reference.description}
          </p>
        )}
      </header>

      <div className="prose mt-10 max-w-none">
        <Content />
      </div>
    </article>
  );
}
