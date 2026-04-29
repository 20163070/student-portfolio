import { labs } from "@/data/labs";

export function Labs() {
  return (
    <section id="labs" className="section-shell">
      <p className="section-kicker">Labs</p>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="section-title">实验记录</h2>
        <p className="max-w-xl text-sm leading-6 text-ink/60">
          这里记录课程 lab、实验目标和我从中学到的东西。
        </p>
      </div>
      <div className="space-y-4">
        {labs.map((lab) => (
          <article
            className="rounded-[1.5rem] border border-ink/10 bg-paper/85 p-6 shadow-soft"
            key={lab.title}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-black text-ink">{lab.title}</h3>
                <p className="mt-1 text-sm font-bold text-clay">{lab.course}</p>
              </div>
              <span className="text-sm font-semibold text-ink/50">{lab.date}</span>
            </div>
            <p className="mt-4 leading-7 text-ink/68">{lab.summary}</p>
            <p className="mt-3 rounded-2xl bg-cream px-4 py-3 text-sm leading-6 text-ink/70">
              学到：{lab.result}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
