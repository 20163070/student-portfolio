import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="section-shell">
      <p className="section-kicker">Blog</p>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="section-title">教程和学习笔记</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60">
            长教程用 Markdown 写，比如 ICS Lab 踩坑、项目复盘和课程总结。
          </p>
        </div>
        <Link className="text-sm font-black text-clay" href="/blog">
          查看全部文章 →
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
