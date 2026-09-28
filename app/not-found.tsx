import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        There is no lesson at this address.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm underline underline-offset-4"
      >
        Back to all lessons
      </Link>
    </div>
  );
}
