import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
export const metadata = {
  alternates: {
    canonical: "https://20163070.github.io/student-portfolio/projects/",
  },
  title: "Projects",
  description: "个人项目与工程案例：问题、实现与原始依据。",
};
export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Projects / {projects.length}</p>
        <h1 className="section-title">项目与工程案例</h1>
        <p className="mt-5 max-w-2xl leading-8 text-ink/70">
          从具体问题到技术实现，记录个人工作与可查阅的项目依据。
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
