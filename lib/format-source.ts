/** "https://www.test-english.com/…" → "test-english.com", a source link's text. */
export function formatSource(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}
