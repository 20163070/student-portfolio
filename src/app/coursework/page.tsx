import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { coursework } from "@/data/coursework";
import { siteUrl } from "@/lib/site";

export const metadata = {
  title: "作业 / Coursework",
  description: "课程作业档案：个人解答、作业题目与课程指南。",
  alternates: { canonical: siteUrl + "/coursework/" },
};

export default function CourseworkPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Coursework / {coursework.length}</p>
        <h1 className="section-title">课程作业</h1>
        <p className="mt-5 max-w-2xl leading-8 text-ink/70">
          按课程记录作业与学习过程，保留个人解答、题目和课程要求，方便回顾与对照阅读。
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {coursework.map((work) => (
            <ProjectCard project={work} key={work.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
