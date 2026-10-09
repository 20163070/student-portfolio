import { Navbar } from "@/components/Navbar";
import { SearchBox } from "@/components/SearchBox";
import { Suspense } from "react";
import { getSearchIndex } from "@/lib/search";

export const metadata = {
  alternates: {
    canonical: "https://20163070.github.io/student-portfolio/search/",
  },
  title: "Search",
  description: "搜索博客文章、项目案例和课程作业。",
};

export default function SearchPage() {
  const items = getSearchIndex();

  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Search</p>
        <h1 className="section-title">全站搜索</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/68">
          查找文章、项目和课程作业。支持标题、摘要、标签及作业的学习说明和附件名称；不包含
          PDF 内部全文。
        </p>
        <Suspense fallback={<p className="mt-8 text-ink/70">正在准备搜索…</p>}>
          <SearchBox items={items} />
        </Suspense>
      </section>
    </main>
  );
}
