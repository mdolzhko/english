import type { MDXComponents } from "mdx/types";
import { Gap } from "@/components/gap";
import { Dialogue, Exercise, Item, Items, Turn } from "@/components/exercise";
import { Chart } from "@/components/chart";
import { Rule } from "@/components/rule";
import { Note, Topic } from "@/components/topic";
import { Pair, Translation } from "@/components/translation";
import { IrregularVerbs } from "@/components/irregular-verbs";

/**
 * Components available inside every .mdx lesson without an import.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Gap,
    Chart,
    Rule,
    Topic,
    Note,
    Exercise,
    Items,
    Item,
    Dialogue,
    Turn,
    Translation,
    Pair,
    IrregularVerbs,
    ...components,
  };
}
