import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-5">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              English Lessons
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-zinc-200 px-6 py-6 dark:border-zinc-800">
          <p className="mx-auto w-full max-w-3xl text-xs text-zinc-500">
            Homework notebook.
          </p>
        </footer>
      </body>
    </html>
  );
}
