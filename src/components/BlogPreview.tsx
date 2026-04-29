import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

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
          <article
            className="rounded-[1.75rem] border border-ink/10 bg-paper/85 p-6 shadow-soft transition hover:-translate-y-1"
            key={post.slug}
          >
            <p className="text-sm font-bold text-ink/45">{post.date}</p>
            <Link
              className="mt-4 block text-2xl font-black leading-tight text-ink transition hover:text-clay"
              href={`/blog/${post.slug}`}
            >
              {post.title}
            </Link>
            <p className="mt-4 leading-7 text-ink/68">{post.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink/70"
                  key={tag}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
