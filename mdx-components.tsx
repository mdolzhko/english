import type { MDXComponents } from "mdx/types";
import { Gap } from "@/components/gap";
import { Dialogue, Exercise, Item, Items, Say, Turn } from "@/components/exercise";

/**
 * Components available inside every .mdx lesson without an import.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Gap,
    Exercise,
    Items,
    Item,
    Dialogue,
    Turn,
    Say,
    ...components,
  };
}
