import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="rounded-2xl border border-ink/10 bg-paper p-6 shadow-soft transition hover:border-clay/40 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            className="text-2xl font-black text-ink transition hover:text-clay"
            href={`/blog/${post.slug}`}
          >
            {post.title}
          </Link>
          <p className="mt-3 max-w-3xl leading-7 text-ink/68">{post.summary}</p>
        </div>
        <span className="shrink-0 text-sm font-bold text-ink/70">
          {post.date}
        </span>
      </div>
      {post.reviewNote && (
        <p className="mt-4 text-sm leading-6 text-ink/70">{post.reviewNote}</p>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {post.unfinished && (
          <span className="rounded-md border border-clay px-3 py-1 text-xs font-bold text-clay">
            未完成笔记 · 含待补充内容
          </span>
        )}
        <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink/70">
          {post.readingTime}
        </span>
        {post.tags.map((tag) => (
          <Link
            className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-paper transition hover:bg-clay"
            href={`/tags/${tag}`}
            key={tag}
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
