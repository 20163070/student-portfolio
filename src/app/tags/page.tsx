import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata = {
  alternates: {
    canonical: "https://20163070.github.io/student-portfolio/tags/",
  },
  title: "Tags",
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
        <h1 className="text-5xl font-black text-ink sm:text-6xl">标签</h1>
        <div className="mt-10 flex flex-wrap gap-3">
          {tags.map((tag) => {
            const count = posts.filter((post) =>
              post.tags.includes(tag),
            ).length;
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
