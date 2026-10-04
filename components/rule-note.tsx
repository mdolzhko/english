import type { LessonRule } from "@/lib/lessons";

/**
 * The one-line form of a rule, shown right where the reader needs it — under
 * a wrong pick in a gap, or under a verb form in a translation — so the
 * explanation comes to them instead of sending them up the page. The full
 * rule is one click away.
 *
 * Positioned against the nearest `relative` ancestor. Every element is
 * phrasing content styled as a block, because the note also has to be valid
 * inside an inline <span>.
 */
export function RuleNote({ rule }: { rule: LessonRule }) {
  return (
    <span
      role="note"
      className="absolute left-0 top-full z-20 mt-2 block w-max max-w-[min(20rem,calc(100vw-3rem))] rounded-lg border border-warn-line bg-warn p-3 text-left text-xs font-normal not-italic leading-relaxed text-ink shadow-sm"
    >
      <span className="block font-medium text-warn-ink">{rule.title}</span>
      {rule.hint && <span className="mt-1 block">{rule.hint}</span>}
      <a
        href={`#${rule.id}`}
        className="mt-2 block font-medium underline underline-offset-2"
      >
        Read the full rule →
      </a>
    </span>
  );
}
