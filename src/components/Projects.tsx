import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
export function Projects() {
  return (
    <section id="projects" className="section-shell">
      <p className="section-kicker">Featured Projects</p>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="section-title">从问题到实现</h2>
        <Link className="text-sm font-bold text-clay" href="/projects">
          全部项目（{featuredProjects.length} 个精选） →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
