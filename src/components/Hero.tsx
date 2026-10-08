import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { profile } from "@/data/profile";
export function Hero() {
  return (
    <section id="top">
      <Navbar />
      <div className="section-shell grid items-center gap-12 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="section-kicker">{profile.name} / Developer Portfolio</p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-ink sm:text-6xl">
            用代码构建，
            <br />
            <span className="text-clay">用文字解释。</span>
          </h1>
          <p className="mt-6 text-lg font-semibold text-ink">
            {profile.identity}
          </p>
          <p className="mt-2 font-mono text-sm text-clay">
            {profile.direction}
          </p>
          <p className="mt-5 max-w-xl leading-8 text-ink/70">
            关注让 AI
            系统可靠运行的工程实践，也持续学习算法与计算机系统。这里记录可查阅源代码的项目、实现取舍与技术思考。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button-primary" href="#projects">
              查看精选项目 ↗
            </a>
            <Link className="button-secondary" href="/blog">
              阅读技术文章
            </Link>
            <a className="button-secondary" href="#contact">
              联系我
            </a>
          </div>
        </div>
        <aside
          className="terminal-panel min-w-0 overflow-hidden rounded-xl border border-ink/20 bg-paper text-ink"
          aria-label="个人简介与技术兴趣"
        >
          <div className="flex items-center gap-2 border-b border-ink/10 bg-cream px-5 py-3">
            <span className="size-2 rounded-full bg-clay" aria-hidden="true" />
            <span
              className="size-2 rounded-full bg-ink/30"
              aria-hidden="true"
            />
            <span
              className="size-2 rounded-full bg-ink/20"
              aria-hidden="true"
            />
            <span className="ml-3 font-mono text-xs text-ink/70">
              profile / interests
            </span>
          </div>
          <div className="terminal-grid p-6 sm:p-8">
            <p className="font-mono text-sm text-clay">
              <span aria-hidden="true">❯ </span>whoami
            </p>
            <p className="mt-3 font-mono text-xl font-semibold">
              {profile.name}
              <span className="ml-2 text-clay" aria-hidden="true">
                _
              </span>
            </p>
            <p className="mt-2 text-sm text-ink/70">{profile.identity}</p>
            <p className="mt-8 font-mono text-sm text-clay">
              <span aria-hidden="true">❯ </span>interests --list
            </p>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="font-mono text-sm text-clay">[01] Harness</dt>
                <dd className="mt-1 font-semibold">运行环境、工具与反馈</dd>
              </div>
              <div>
                <dt className="font-mono text-sm text-clay">[02] Algorithms</dt>
                <dd className="mt-1 font-semibold">问题建模与计算过程</dd>
              </div>
              <div>
                <dt className="font-mono text-sm text-clay">[03] AI Infra</dt>
                <dd className="mt-1 font-semibold">数据流、调度与可靠性</dd>
              </div>
            </dl>
            <p className="mt-8 border-t border-ink/10 pt-4 font-mono text-xs text-ink/70">
              build / learn / document
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
