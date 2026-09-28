import type { ReactNode } from "react";

/**
 * One named rule inside the lesson notes. Addressable on its own so a gap can
 * point at the rule that explains it, using the same anchors the side
 * navigation uses.
 *
 * `hint` is deliberately not rendered here: it is the one-line version shown
 * next to a wrong answer, and it is read out of the .mdx source by
 * `getRules` rather than from this component. Keeping it on the tag means the
 * rule and its short form stay side by side in the content file.
 */
export function Rule({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h3>{title}</h3>
      {children}
    </section>
  );
}
