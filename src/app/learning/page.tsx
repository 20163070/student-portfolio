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
          这里保留技术文章、实验与学习过程。实验记录按证据分别标注，原有课程和短思考仍等待本人确认。
        </p>
      </section>
      <BlogPreview />
      <Labs />
      <div>
        <p className="section-shell py-0 text-sm font-semibold text-clay">
          待确认档案 / 以下条目均未独立核实
        </p>
        <Courses />
        <Thoughts />
      </div>
    </main>
  );
}
