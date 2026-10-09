export type SearchKind = "blog" | "project" | "coursework";
export type SearchItem = {
  id: string;
  kind: SearchKind;
  title: string;
  href: string;
  summary: string;
  tags: string[];
  context: string;
  note?: string;
  searchText: string;
};

export function normalizeSearch(text: string) {
  return text.normalize("NFKC").trim().toLowerCase().replace(/\s+/g, " ");
}

export function matchesSearch(searchText: string, query: string) {
  return normalizeSearch(query)
    .split(" ")
    .every((token) => searchText.includes(token));
}
