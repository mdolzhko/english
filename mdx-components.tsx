import type { MDXComponents } from "mdx/types";
import { Gap } from "@/components/gap";
import { Exercise, Item, Turn } from "@/components/exercise";

/**
 * Components available inside every .mdx lesson without an import.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Gap,
    Exercise,
    Item,
    Turn,
    ...components,
  };
}
