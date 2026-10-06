import type { Metadata } from "next";
import Link from "next/link";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Condensed,
} from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { ThemeSwitch } from "@/components/theme-switch";
import { APPLY_STORED_THEME } from "@/lib/theme";
import { getReferences } from "@/lib/references";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Headings only, so no Cyrillic needed.
const plexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-plex-condensed",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "English Lessons",
    template: "%s — English Lessons",
  },
  description: "Lesson topics and completed homework.",
  // Public link for my teacher, but not something search engines need.
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const references = (await getReferences()).map(({ slug, label }) => ({
    href: `/${slug}`,
    label,
  }));

  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable} h-full antialiased`}
      // The theme script sets `data-theme` before React sees the page.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: APPLY_STORED_THEME }} />
      </head>
      <body className="flex min-h-full flex-col">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 pt-5">
          <Link href="/" className="font-display text-base font-semibold tracking-tight">
            English Lessons
          </Link>
          <ThemeSwitch />
        </header>

        {/* A sibling of the header, not inside it: sticky only holds within its parent. */}
        <div className="sticky top-0 z-30 border-b border-line bg-ground/95 backdrop-blur">
          <div className="mx-auto w-full max-w-5xl px-6">
            <SiteNav references={references} />
          </div>
        </div>

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-line px-6 py-6">
          <p className="mx-auto w-full max-w-5xl text-xs text-muted">
            Homework notebook.
          </p>
        </footer>
      </body>
    </html>
  );
}
