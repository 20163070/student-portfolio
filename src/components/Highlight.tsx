import { normalizeSearch } from "@/lib/search-utils";

export function Highlight({ text, query }: { text: string; query: string }) {
  const tokens = [
    ...new Set(normalizeSearch(query).split(" ").filter(Boolean)),
  ];
  if (!tokens.length) return <>{text}</>;
  const pattern = tokens
    .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length)
    .join("|");
  const parts = text.split(new RegExp("(" + pattern + ")", "gi"));
  return (
    <>
      {parts.map((part, index) =>
        index % 2 ? (
          <mark className="rounded-sm bg-clay/15 px-0.5 text-ink" key={index}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
