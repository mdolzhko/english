import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Lesson content lives in /content as .mdx, so no extra pageExtensions needed.
};

const withMDX = createMDX({
  options: {
    // Turbopack needs plugins named as strings, not imported functions.
    rehypePlugins: [["rehype-slug"]],
  },
});

export default withMDX(nextConfig);
