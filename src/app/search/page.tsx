import { Navbar } from "@/components/Navbar";
import { SearchBox } from "@/components/SearchBox";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Search | 学生学习档案",
  description: "搜索博客教程和学习笔记。",
};

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Search</p>
        <h1 className="font-[var(--font-display)] text-5xl font-black text-ink sm:text-6xl">
          搜索文章
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/68">
          输入关键词，快速找到相关教程、lab 记录和思考笔记。
        </p>
        <SearchBox posts={posts} />
      </section>
    </main>
  );
}
