import type { MetadataRoute } from "next";

/**
 * Asks every crawler — search engines and the bots that gather text for AI —
 * not to fetch the site at all. The `noindex` in the layout only works on a
 * page a bot has already fetched; this keeps them from fetching it.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
