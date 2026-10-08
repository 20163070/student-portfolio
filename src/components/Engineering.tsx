import Link from "next/link";
export function Engineering() {
  return (
    <section id="engineering" className="section-shell">
      <p className="section-kicker">Engineering & Open Source</p>
      <h2 className="section-title">关注实现，也关注边界</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-ink/10 bg-paper p-7">
          <p className="font-mono text-xs text-clay">01 / Engineering</p>
          <h3 className="mt-4 text-xl font-bold text-ink">
            内容建模与静态交付
          </h3>
          <p className="mt-3 leading-7 text-ink/70">
            个人网站将结构化项目数据与 Markdown
            文章统一生成静态页面，并处理子路径部署、文章目录、主题与无障碍阅读。案例记录这些实现的结构与约束。
          </p>
          <Link
            className="mt-5 inline-block text-sm font-bold text-clay"
            href="/projects"
          >
            查看实现依据 →
          </Link>
        </article>
        <article className="rounded-2xl border border-ink/10 bg-paper p-7">
          <p className="font-mono text-xs text-clay">
            02 / Public Repositories
          </p>
          <h3 className="mt-4 text-xl font-bold text-ink">
            让代码成为讨论的起点
          </h3>
          <p className="mt-3 leading-7 text-ink/70">
            公开仓库提供可阅读的实现。个人贡献将以负责模块、提交记录与协作背景说明，目前先展示已核实的仓库事实。
          </p>
          <p className="mt-5 text-sm text-ink/70">
            待补充：个人负责模块、工程经历和可公开的协作记录。
          </p>
        </article>
      </div>
    </section>
  );
}
