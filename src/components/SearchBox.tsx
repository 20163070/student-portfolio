"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";

export function SearchBox({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return posts;
    }

    return posts.filter((post) =>
      [post.title, post.summary, post.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );
  }, [posts, query]);

  return (
    <div className="mt-10">
      <input
        className="w-full rounded-full border border-ink/10 bg-paper px-6 py-4 text-lg font-semibold text-ink outline-none transition placeholder:text-ink/35 focus:border-clay"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="搜索 ICS、Lab、React、项目复盘..."
        type="search"
        value={query}
      />

      <div className="mt-8 space-y-4">
        {results.map((post) => (
          <article
            className="rounded-[1.5rem] border border-ink/10 bg-paper/85 p-5 shadow-soft"
            key={post.slug}
          >
            <Link
              className="text-2xl font-black text-ink transition hover:text-clay"
              href={`/blog/${post.slug}`}
            >
              {post.title}
            </Link>
            <p className="mt-3 leading-7 text-ink/68">{post.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
