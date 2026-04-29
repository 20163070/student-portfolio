import { Navbar } from "@/components/Navbar";
import { linkGroups } from "@/data/links";

export const metadata = {
  title: "Links | 学生学习档案",
  description: "常用链接、学习资料和工具入口。",
};

export default function LinksPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Links</p>
        <h1 className="font-[var(--font-display)] text-5xl font-black text-ink sm:text-6xl">
          常用链接
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/68">
          这里放我常用的学习资料、文档、工具和个人主页入口。
        </p>

        <div className="mt-12 space-y-10">
          {linkGroups.map((group) => (
            <section key={group.title}>
              <h2 className="mb-5 text-3xl font-black text-ink">{group.title}</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {group.links.map((link) => (
                  <a
                    className="rounded-[1.75rem] border border-ink/10 bg-paper/85 p-6 shadow-soft transition hover:-translate-y-1"
                    href={link.href}
                    key={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <h3 className="text-2xl font-black text-ink">{link.name}</h3>
                    <p className="mt-3 leading-7 text-ink/68">{link.description}</p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
