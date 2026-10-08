import Link from "next/link";
import { profile } from "@/data/profile";
export function About() {
  return (
    <section id="about" className="section-shell">
      <p className="section-kicker">About</p>
      <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
        <h2 className="section-title">
          你好，我是
          <br />
          {profile.name}。
        </h2>
        <div className="space-y-4 leading-8 text-ink/70">
          <p>{profile.identity}，关注 Harness、算法与 AI Infra。</p>
          <p>
            这个作品集保留项目的实现与学习过程：从自动化工具的数据流，到 Web
            应用的静态交付，再到计算机系统的实验笔记。
          </p>
          <p>
            我希望用具体问题、源代码和技术写作介绍自己的工作，也把尚待验证的部分说清楚。
          </p>
          <Link className="inline-block font-bold text-clay" href="/learning">
            浏览学习档案 →
          </Link>
        </div>
      </div>
    </section>
  );
}
