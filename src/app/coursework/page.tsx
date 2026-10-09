import { Navbar } from "@/components/Navbar";
import { Suspense } from "react";
import { CourseworkExplorer } from "@/components/CourseworkExplorer";
import { coursework } from "@/data/coursework";
import { siteUrl } from "@/lib/site";
import { toCourseworkListItem } from "@/lib/coursework";

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
          按学期与课程整理作业，查找知识点、阅读解答与回顾学习过程。
        </p>
        <Suspense
          fallback={<p className="mt-8 text-ink/70">正在打开课程目录…</p>}
        >
          <CourseworkExplorer items={coursework.map(toCourseworkListItem)} />
        </Suspense>
      </section>
    </main>
  );
}
