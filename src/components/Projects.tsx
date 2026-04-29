import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="section-shell">
      <p className="section-kicker">Projects</p>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="section-title">项目作品</h2>
        <p className="max-w-xl text-sm leading-6 text-ink/60">
          这里记录我做过的项目。以后添加新作品时，只需要修改 `src/data/projects.ts`。
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
            <div className="mt-6 flex flex-wrap gap-3">
              {project.githubUrl ? (
                <a
                  className="rounded-full bg-ink px-4 py-2 text-sm font-black text-paper transition hover:bg-clay"
                  href={project.githubUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  查看代码
                </a>
              ) : null}
              {project.demoUrl ? (
                <a
                  className="rounded-full border border-ink/20 px-4 py-2 text-sm font-black text-ink transition hover:border-clay hover:text-clay"
                  href={project.demoUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  在线预览
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
