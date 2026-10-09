import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
export const metadata = {
  alternates: {
    canonical: "https://20163070.github.io/student-portfolio/projects/",
  },
  title: "Projects",
  description: "个人项目与课程作品：项目实现、学习内容与原始材料。",
};
export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Projects / {projects.length}</p>
        <h1 className="section-title">项目与课程作品</h1>
        <p className="mt-5 max-w-2xl leading-8 text-ink/70">
          从技术实现到课程学习，记录具体问题、个人工作与可查阅的原始材料。
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
