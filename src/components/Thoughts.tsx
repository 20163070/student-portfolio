import { thoughts } from "@/data/thoughts";

export function Thoughts() {
  return (
    <section id="thoughts" className="section-shell">
      <p className="section-kicker">Thoughts</p>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="section-title">思考笔记</h2>
        <p className="max-w-xl text-sm leading-6 text-ink/60">
          这里不一定放完整文章，也可以放学习中的问题、想法和阶段性反思。
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {thoughts.map((thought) => (
          <article
            className="rounded-[1.75rem] bg-ink p-6 text-paper shadow-soft"
            key={thought.title}
          >
            <p className="text-sm font-bold text-paper/50">{thought.date}</p>
            <h3 className="mt-4 text-2xl font-black">{thought.title}</h3>
            <p className="mt-4 leading-7 text-paper/70">{thought.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
