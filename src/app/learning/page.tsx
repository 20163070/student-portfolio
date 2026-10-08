import { Navbar } from "@/components/Navbar";
import { Labs } from "@/components/Labs";
import { Courses } from "@/components/Courses";
import { Thoughts } from "@/components/Thoughts";
import { BlogPreview } from "@/components/BlogPreview";
export const metadata = {
  alternates: {
    canonical: "https://20163070.github.io/student-portfolio/learning/",
  },
  title: "学习档案",
  description: "保留课程、实验与思考记录；尚未确认的条目明确标注。",
};
export default function LearningPage() {
  return (
    <main>
      <Navbar />
      <section className="section-shell pb-0">
        <p className="section-kicker">Learning Archive</p>
        <h1 className="section-title">保留探索的过程</h1>
        <p className="mt-5 max-w-3xl leading-8 text-ink/70">
          原有课程、实验和短思考保留在这里。下方课程、实验与思考条目来自原始网站，真实性、完成情况与作者归属待本人确认；暂不作为工程经历或成果。
        </p>
      </section>
      <BlogPreview />
      <div>
        <p className="section-shell py-0 text-sm font-semibold text-clay">
          待确认档案 / 以下条目均未独立核实
        </p>
        <Courses />
        <Labs />
        <Thoughts />
      </div>
    </main>
  );
}
