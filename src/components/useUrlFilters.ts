"use client";

import { useSearchParams } from "next/navigation";

/** Native history integrates with Next's search params without fetching a server route. */
export function useUrlFilters() {
  const params = useSearchParams();
  function update(
    changes: Record<string, string>,
    mode: "push" | "replace" = "push",
  ) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const query = next.toString();
    const href =
      window.location.pathname +
      (query ? "?" + query : "") +
      window.location.hash;
    if (
      href ===
      window.location.pathname + window.location.search + window.location.hash
    )
      return;
    window.history[mode === "push" ? "pushState" : "replaceState"](
      null,
      "",
      href,
    );
  }
  return { params, update };
}
