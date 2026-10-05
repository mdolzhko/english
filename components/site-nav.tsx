"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLink = { href: string; label: string };

/**
 * Site-wide navigation: a row of tabs under the title, stuck to the top
 * while the page scrolls. The lessons tab is fixed; the reference pages
 * come from their content files, so a new one appears here by itself.
 */
export function SiteNav({ references }: { references: NavLink[] }) {
  const pathname = usePathname();
  const links: NavLink[] = [{ href: "/", label: "Lessons" }, ...references];

  return (
    <nav aria-label="Site" className="-mb-px flex gap-x-6 overflow-x-auto text-sm">
      {links.map(({ href, label }) => {
        const isActive =
          href === "/"
            ? pathname === "/" || pathname.startsWith("/lessons")
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`whitespace-nowrap border-b-2 py-3 transition ${
              isActive
                ? "border-accent font-medium text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
