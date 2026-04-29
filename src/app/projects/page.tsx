import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { projectGroups } from "@/data/projectGroups";

export const metadata = {
  title: "Projects | 学生学习档案",
  description: "我的项目、学习资料和课程产出。",
};

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Projects</p>
        <h1 className="font-[var(--font-display)] text-5xl font-black text-ink sm:text-6xl">
          项目和产出
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/68">
          这里像一个项目索引页：可以放代码项目、课程产出、笔记集合和长期维护的学习资料。
        </p>

        <div className="mt-12 space-y-10">
          {projectGroups.map((group) => (
            <section key={group.title}>
              <div className="mb-5">
                <h2 className="text-3xl font-black text-ink">{group.title}</h2>
                <p className="mt-2 text-ink/60">{group.description}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {group.items.map((item) => (
                  <article
                    className="rounded-[1.75rem] border border-ink/10 bg-paper/85 p-6 shadow-soft"
                    key={item.name}
                  >
                    <h3 className="text-2xl font-black text-ink">{item.name}</h3>
                    <p className="mt-3 leading-7 text-ink/68">{item.description}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {item.links.map((link) => (
                        <Link
                          className="rounded-full bg-ink px-4 py-2 text-sm font-black text-paper transition hover:bg-clay"
                          href={link.href}
                          key={link.href}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
