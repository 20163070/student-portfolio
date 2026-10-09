"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  matchesSearch,
  type SearchItem,
  type SearchKind,
} from "@/lib/search-utils";
import { Highlight } from "./Highlight";
import { useUrlFilters } from "./useUrlFilters";

const filters: { id: SearchKind | ""; label: string; badge: string }[] = [
  { id: "", label: "全部", badge: "" },
  { id: "blog", label: "文章", badge: "BLOG" },
  { id: "project", label: "项目", badge: "PROJECT" },
  { id: "coursework", label: "作业", badge: "COURSEWORK" },
];

export function SearchBox({ items }: { items: SearchItem[] }) {
  const { params, update } = useUrlFilters();
  const query = params.get("q") ?? "";
  const kind = filters.some((filter) => filter.id === params.get("type"))
    ? (params.get("type") ?? "")
    : "";
  const matches = useMemo(
    () => items.filter((item) => matchesSearch(item.searchText, query)),
    [items, query],
  );
  const results = matches.filter((item) => !kind || item.kind === kind);

  return (
    <div className="mt-8">
      <label
        className="block text-sm font-semibold text-ink"
        htmlFor="site-search"
      >
        搜索文章、项目、课程与作业
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="site-search"
          className="min-w-0 flex-1 rounded-xl border border-ink/20 bg-paper px-4 py-3 text-ink placeholder:text-ink/70"
          onChange={(event) => update({ q: event.target.value }, "replace")}
          placeholder="搜索 ICS、React、IRR、鸽巢原理…"
          type="search"
          value={query}
        />
        <button
          className="shrink-0 rounded-xl border border-ink/20 px-3 text-sm font-semibold text-ink disabled:opacity-50"
          disabled={!query}
          onClick={() => update({ q: "" }, "replace")}
        >
          清空搜索
        </button>
      </div>
      <div
        className="mt-5 flex flex-wrap gap-2"
        role="group"
        aria-label="搜索内容类型"
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            aria-pressed={kind === filter.id}
            onClick={() => update({ type: filter.id })}
            className={
              "rounded-lg border px-4 py-2 text-sm font-semibold " +
              (kind === filter.id
                ? "border-clay/30 bg-clay/10 text-clay"
                : "border-ink/15 bg-paper text-ink/70 hover:border-clay/50")
            }
          >
            {filter.label}{" "}
            <span className="ml-1">
              {
                matches.filter((item) => !filter.id || item.kind === filter.id)
                  .length
              }
            </span>
          </button>
        ))}
      </div>
      <p className="mt-5 text-sm text-ink/70" role="status">
        找到 {results.length} 条结果
      </p>
      <div className="mt-5 space-y-4">
        {results.map((item) => (
          <article
            className="rounded-xl border border-ink/15 bg-paper p-5 transition-colors hover:border-clay/50 sm:p-6"
            key={item.id}
          >
            <p className="flex flex-wrap items-center gap-3 text-xs leading-6 text-ink/70">
              <span className="rounded-md border border-clay/30 bg-clay/10 px-2 font-mono font-semibold text-clay">
                {filters.find((filter) => filter.id === item.kind)?.badge}
              </span>
              <span>
                <Highlight text={item.context} query={query} />
              </span>
            </p>
            <h2 className="mt-3 text-xl font-bold text-ink">
              <Link className="hover:text-clay" href={item.href}>
                <Highlight text={item.title} query={query} />
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink/70">
              <Highlight text={item.summary} query={query} />
            </p>
            {item.note && (
              <p className="mt-3 text-sm font-semibold text-clay">
                {item.note}
              </p>
            )}
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="标签">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-cream px-2.5 py-1 text-xs text-ink"
                >
                  <Highlight text={tag} query={query} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {!results.length && (
        <div className="mt-5 rounded-xl border border-dashed border-ink/20 bg-paper p-8 text-center">
          <h2 className="text-lg font-bold text-ink">没有找到匹配的内容</h2>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            换个关键词，或选择其他内容类型。
          </p>
          <button
            className="button-secondary mt-5"
            onClick={() => update({ q: "", type: "" })}
          >
            重置搜索
          </button>
        </div>
      )}
    </div>
  );
}
