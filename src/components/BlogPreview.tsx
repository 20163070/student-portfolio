import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export function BlogPreview() {
  const posts = getAllPosts()
    .filter((post) => !post.unfinished)
    .slice(0, 3);

  return (
    <section id="blog" className="section-shell">
      <p className="section-kicker">Technical Writing</p>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="section-title">技术写作</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/70">
            把问题拆开，把思路写清楚。留下一段代码，也留下理解它的过程。
          </p>
        </div>
        <Link className="text-sm font-black text-clay" href="/blog">
          查看全部文章 →
        </Link>
      </div>

      <div
        className={`grid gap-5 ${posts.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
