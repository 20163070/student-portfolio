import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="rounded-[1.75rem] border border-ink/10 bg-paper/85 p-6 shadow-soft transition hover:-translate-y-1">
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
        <span className="shrink-0 text-sm font-bold text-ink/45">{post.date}</span>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink/60">
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
