import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
export const metadata = {
  alternates: {
    canonical: "https://20163070.github.io/student-portfolio/projects/",
  },
  title: "Projects",
  description: "可查阅源代码的项目案例：问题、架构、难点与实现依据。",
};
export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Projects / {projects.length}</p>
        <h1 className="section-title">项目与工程案例</h1>
        <p className="mt-5 max-w-2xl leading-8 text-ink/70">
          从具体问题到技术实现。每个案例区分仓库事实、个人角色和待验证的结果。
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
