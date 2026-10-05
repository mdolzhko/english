"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLink = { href: string; label: string };

/**
 * Site-wide navigation in the header; the current section is underlined.
 * The lessons link is fixed; the reference pages come from their content
 * files, so a new one appears here by itself.
 */
export function SiteNav({ references }: { references: NavLink[] }) {
  const pathname = usePathname();
  const links: NavLink[] = [{ href: "/", label: "Lessons" }, ...references];

  return (
    <nav aria-label="Site" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
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
            className={`underline-offset-[6px] transition ${
              isActive
                ? "font-medium text-ink underline decoration-accent decoration-2"
                : "text-muted hover:text-ink"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
