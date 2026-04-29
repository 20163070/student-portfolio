import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="section-shell">
      <p className="section-kicker">Projects</p>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="section-title">示例项目</h2>
        <p className="max-w-xl text-sm leading-6 text-ink/60">
          这里的数据放在 `src/data/projects.ts`，以后添加真实项目时只需要改数据即可。
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <article
            className="flex min-h-72 flex-col rounded-[1.75rem] border border-ink/10 bg-paper/85 p-6 shadow-soft transition hover:-translate-y-1"
            key={project.title}
          >
            <h3 className="text-2xl font-black text-ink">{project.title}</h3>
            <p className="mt-4 flex-1 leading-7 text-ink/68">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-ink/70"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            <a className="mt-6 text-sm font-black text-clay" href={project.link}>
              了解更多 →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
