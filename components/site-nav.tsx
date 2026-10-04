"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Lessons", matches: (path: string) => path === "/" || path.startsWith("/lessons") },
  { href: "/irregular-verbs", label: "Irregular verbs", matches: (path: string) => path.startsWith("/irregular-verbs") },
] as const;

/** Site-wide navigation in the header; the current section is underlined. */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Site" className="flex items-center gap-5 text-sm">
      {LINKS.map(({ href, label, matches }) => {
        const isActive = matches(pathname);
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
