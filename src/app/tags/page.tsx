import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata = {
  title: "Tags | 学生学习档案",
  description: "按标签浏览博客教程和学习笔记。",
};

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();

  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Tags</p>
        <h1 className="font-[var(--font-display)] text-5xl font-black text-ink sm:text-6xl">
          标签
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          {tags.map((tag) => {
            const count = posts.filter((post) => post.tags.includes(tag)).length;
            return (
              <Link
                className="rounded-full bg-ink px-5 py-3 text-sm font-black text-paper transition hover:bg-clay"
                href={`/tags/${tag}`}
                key={tag}
              >
                #{tag} · {count}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
