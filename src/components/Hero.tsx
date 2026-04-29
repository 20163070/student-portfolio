import { Navbar } from "@/components/Navbar";

export function Hero() {
  return (
    <section id="top" className="min-h-screen">
      <Navbar />
      <div className="section-shell grid min-h-[calc(100vh-96px)] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="section-kicker">软件工程学生 · 个人作品集</p>
          <h1 className="font-[var(--font-display)] text-5xl font-black leading-tight text-ink sm:text-6xl lg:text-7xl">
            你好，我是
            <span className="block text-clay">一名正在成长的开发者。</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
            我喜欢把课堂知识做成真实的小项目：从页面布局、组件拆分，到数据结构和基础后端概念。
            这个网站用来记录我的学习过程、作品和下一步计划。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="rounded-full bg-ink px-6 py-3 text-center text-sm font-bold text-paper shadow-soft transition hover:-translate-y-0.5 hover:bg-clay"
              href="#projects"
            >
              查看项目
            </a>
            <a
              className="rounded-full border border-ink/20 px-6 py-3 text-center text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-clay hover:text-clay"
              href="#contact"
            >
              联系我
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-ink/10 bg-paper/80 p-6 shadow-soft backdrop-blur">
          <div className="rounded-[1.5rem] bg-ink p-6 text-paper">
            <p className="text-sm uppercase tracking-[0.28em] text-paper/60">
              Learning Log
            </p>
            <div className="mt-8 space-y-5">
              {["完成响应式首页", "整理 3 个项目案例", "继续学习数据库基础"].map(
                (item, index) => (
                  <div className="flex items-center gap-4" key={item}>
                    <span className="flex size-9 items-center justify-center rounded-full bg-clay text-sm font-black">
                      {index + 1}
                    </span>
                    <span className="text-lg font-semibold">{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
