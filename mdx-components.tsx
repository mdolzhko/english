import type { MDXComponents } from "mdx/types";
import { Gap } from "@/components/gap";
import { Dialogue, Exercise, Item, Items, Turn } from "@/components/exercise";
import { Chart } from "@/components/chart";
import { Rule } from "@/components/rule";
import { Pair, Translation } from "@/components/translation";

/**
 * Components available inside every .mdx lesson without an import.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Gap,
    Chart,
    Rule,
    Exercise,
    Items,
    Item,
    Dialogue,
    Turn,
    Translation,
    Pair,
    ...components,
  };
}
