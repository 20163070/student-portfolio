import { Navbar } from "@/components/Navbar";

export function Hero() {
  return (
    <section id="top" className="min-h-screen">
      <Navbar />
      <div className="section-shell grid min-h-[calc(100vh-96px)] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="section-kicker">软件工程学生 · 学习档案馆</p>
          <h1 className="font-[var(--font-display)] text-5xl font-black leading-tight text-ink sm:text-6xl lg:text-7xl">
            记录项目、实验、课程，
            <span className="block text-clay">也记录我怎么思考。</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
            这个网站不是只放简历，而是用来整理我做过的项目、完成过的 lab、上过的课，
            以及学习软件工程时慢慢想明白的东西。
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
              href="#thoughts"
            >
              看思考笔记
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-ink/10 bg-paper/80 p-6 shadow-soft backdrop-blur">
          <div className="rounded-[1.5rem] bg-ink p-6 text-paper">
            <p className="text-sm uppercase tracking-[0.28em] text-paper/60">
              Learning Log
            </p>
            <div className="mt-8 space-y-5">
              {["记录项目作品", "整理课程 lab", "写下学习思考"].map(
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
