import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { assetPath } from "@/lib/site";
export function ProjectCard({ project }: { project: Project }) {
  const shot = project.screenshots[0];
  return (
    <article className="project-card flex min-w-0 flex-col overflow-hidden rounded-xl border border-ink/15 bg-paper transition-colors hover:border-clay/60">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 px-6 py-3 font-mono text-xs text-ink/70">
        <span>
          <span className="text-clay" aria-hidden="true">
            ⌘{" "}
          </span>
          repo / {project.slug}
        </span>
        <span aria-hidden="true">↗</span>
      </div>
      {shot ? (
        <Link
          href={"/projects/" + project.slug}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            className="aspect-[16/10] w-full object-cover object-top"
            src={assetPath(shot.src)}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
          />
        </Link>
      ) : (
        <div className="project-diagram border-b border-ink/10 px-6 py-8">
          <p className="mb-5 font-mono text-xs text-ink/70">
            Architecture / 技术结构示意
          </p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-sm text-ink">
            {["Markdown", "Next.js", "Static HTML"].map((step, i) => (
              <span
                className="rounded-md border border-ink/15 bg-paper px-3 py-2"
                key={step}
              >
                {i > 0 ? "→ " : ""}
                {step}
              </span>
            ))}
          </div>
          <p className="mt-5 text-xs text-ink/70">
            暂无可公开的项目截图 · 展示技术结构
          </p>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-xs font-semibold text-clay">{project.status}</p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
          <Link href={"/projects/" + project.slug}>{project.name}</Link>
        </h3>
        <p className="mt-4 leading-7 text-ink/70">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="技术栈">
          {project.techStack.map((tech) => (
            <li
              className="rounded border border-ink/10 bg-cream px-2.5 py-1 font-mono text-xs font-semibold text-ink"
              key={tech}
            >
              {tech}
            </li>
          ))}
        </ul>
        <p className="mt-5 flex-1 border-l-2 border-clay pl-3 text-sm leading-6 text-ink/70">
          {project.results[0]}
        </p>
        <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold">
          <Link className="text-clay" href={"/projects/" + project.slug}>
            阅读项目案例 →
          </Link>
          <a className="text-ink" href={project.githubUrl}>
            源代码 ↗
          </a>
        </div>
      </div>
    </article>
  );
}
