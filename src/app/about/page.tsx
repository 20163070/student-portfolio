import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "About | 学生学习档案",
  description: "关于我、这个网站和学习方向。",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">About</p>
        <h1 className="font-[var(--font-display)] text-5xl font-black text-ink sm:text-6xl">
          关于这个学习档案
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] bg-ink p-8 text-paper shadow-soft">
            <p className="text-sm uppercase tracking-[0.28em] text-paper/50">
              Profile
            </p>
            <h2 className="mt-6 text-3xl font-black">20163070</h2>
            <p className="mt-4 leading-7 text-paper/70">
              软件工程学生。这个网站用来记录我做过的项目、课程 lab、读过的资料和阶段性思考。
            </p>
          </div>
          <div className="space-y-5 text-lg leading-9 text-ink/70">
            <p>
              我希望这个网站不是一次性写完的简历，而是一个持续生长的学习档案。
              每做完一个 lab、每完成一个项目、每想明白一个概念，都可以留下记录。
            </p>
            <p>
              目前网站采用静态部署：所有内容都写在 Markdown 或 TypeScript 数据文件里。
              这样虽然没有后台上传按钮，但最稳定、最容易维护，也最适合 GitHub Pages。
            </p>
            <p>
              后续如果需要真正的评论、搜索索引、访问量统计或后台管理，可以再接入外部服务。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
