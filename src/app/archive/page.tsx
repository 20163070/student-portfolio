import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { getPostsByYear } from "@/lib/posts";

export const metadata = {
  title: "Archive | 学生学习档案",
  description: "按年份归档的博客文章。",
};

export default function ArchivePage() {
  const groups = getPostsByYear();
  const years = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Archive</p>
        <h1 className="font-[var(--font-display)] text-5xl font-black text-ink sm:text-6xl">
          文章归档
        </h1>
        <div className="mt-12 space-y-10">
          {years.map((year) => (
            <section className="grid gap-5 md:grid-cols-[160px_1fr]" key={year}>
              <h2 className="text-4xl font-black text-clay">{year}</h2>
              <div className="space-y-4">
                {groups[year].map((post) => (
                  <Link
                    className="block rounded-2xl border border-ink/10 bg-paper/85 p-5 shadow-soft transition hover:-translate-y-1"
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                  >
                    <span className="text-sm font-bold text-ink/45">{post.date}</span>
                    <h3 className="mt-2 text-2xl font-black text-ink">{post.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
