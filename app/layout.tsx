import type { Metadata } from "next";
import Link from "next/link";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Condensed,
} from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="border-b border-line">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
            <Link href="/" className="font-display text-base font-semibold tracking-tight">
              English Lessons
            </Link>
            <SiteNav />
          </div>
        </header>

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
