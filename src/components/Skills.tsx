import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="section-shell">
      <p className="section-kicker">Skills</p>
      <div className="rounded-[2rem] bg-ink p-8 text-paper shadow-soft sm:p-10">
        <h2 className="section-title text-paper">技能栈</h2>
        <p className="mt-4 max-w-2xl leading-7 text-paper/70">
          这些是当前正在学习和使用的技术。作品集保持简单，是为了方便之后逐步加入后端、
          数据库、登录系统或博客模块。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              className="rounded-full border border-paper/15 bg-paper/10 px-4 py-2 text-sm font-bold"
              key={skill}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
