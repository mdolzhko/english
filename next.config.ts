import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Lesson content lives in /content as .mdx, so no extra pageExtensions needed.
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
