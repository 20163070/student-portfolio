import { labs } from "@/data/labs";
import Link from "next/link";

export function Labs() {
  return (
    <section id="labs" className="section-shell">
      <p className="section-kicker">Labs</p>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="section-title">实验记录</h2>
        <p className="max-w-xl text-sm leading-6 text-ink/70">
          有公开提交证据的实践单独标注；原有示例仍保留待确认状态。
        </p>
      </div>
      <div className="space-y-4">
        {labs.map((lab) => (
          <article
            className="rounded-[1.5rem] border border-ink/10 bg-paper/85 p-6 shadow-soft"
            key={lab.title}
          >
            <p className="mb-3 text-sm font-bold text-clay">
              {lab.verified
                ? "Verified Engineering Lab · 提交已核验"
                : "待确认示例 · 完成情况未核实"}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-black text-ink">{lab.title}</h3>
                <p className="mt-1 text-sm font-bold text-clay">{lab.course}</p>
              </div>
              <span className="text-sm font-semibold text-ink/70">
                {lab.date}
              </span>
            </div>
            <p className="mt-4 leading-7 text-ink/68">{lab.summary}</p>
            {lab.status && (
              <p className="mt-3 text-sm font-semibold text-ink/70">
                {lab.status}
              </p>
            )}
            {lab.tags && (
              <ul
                aria-label="实验技术标签"
                className="mt-4 flex flex-wrap gap-2"
              >
                {lab.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-ink/15 px-3 py-1 text-sm text-ink/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 rounded-2xl bg-cream px-4 py-3 text-sm leading-6 text-ink/70">
              学到：{lab.result}
            </p>
            {lab.reportSlug && (
              <Link
                href={`/blog/${lab.reportSlug}/`}
                className="mt-5 inline-flex rounded-full border border-ink/15 px-4 py-2 text-sm font-bold text-ink hover:border-clay hover:text-clay"
              >
                查看实验报告 →
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
