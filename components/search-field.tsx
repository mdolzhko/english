"use client";

/** A search box for a table; full width on a phone, a fixed width beside controls. */
export function SearchField({
  value,
  onChange,
  placeholder,
  label = "Search",
  className = "sm:w-72",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
  className?: string;
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={label}
      className={`w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm placeholder:text-faint focus:border-accent focus:outline-none ${className}`}
    />
  );
}
