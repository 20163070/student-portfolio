import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | 学生学习档案",
  description: "记录项目教程、课程 lab 和学习思考。",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Blog</p>
        <div className="mb-10 max-w-3xl">
          <h1 className="font-[var(--font-display)] text-5xl font-black text-ink sm:text-6xl">
            教程和学习笔记
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink/68">
            这里用 Markdown 写长文章，比如 ICS Lab 教程、课程总结、踩坑记录和项目复盘。
          </p>
        </div>

        <div className="space-y-5">
          {posts.map((post) => (
            <article
              className="rounded-[1.75rem] border border-ink/10 bg-paper/85 p-6 shadow-soft transition hover:-translate-y-1"
              key={post.slug}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Link
                    className="text-2xl font-black text-ink transition hover:text-clay"
                    href={`/blog/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                  <p className="mt-3 max-w-3xl leading-7 text-ink/68">
                    {post.summary}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-bold text-ink/45">
                  {post.date}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink/60">
                  {post.readingTime}
                </span>
                {post.tags.map((tag) => (
                  <span
                    className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-paper"
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
    </main>
  );
}
