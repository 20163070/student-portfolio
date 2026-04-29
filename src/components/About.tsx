export function About() {
  return (
    <section id="about" className="section-shell">
      <p className="section-kicker">About</p>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="section-title">关于我</h2>
        <div className="space-y-4 text-base leading-8 text-ink/70">
          <p>
            我是一名软件工程专业学生，正在系统学习前端开发、编程基础和软件工程实践。
            这个网站是我的学习档案：项目是结果，lab 是练习，课程是脉络，思考是复盘。
          </p>
          <p>
            我会持续把真实做过的东西放上来。即使一开始很简单，也能留下成长轨迹，
            方便以后回看、改进，也方便别人快速了解我学过什么、做过什么。
          </p>
        </div>
      </div>
    </section>
  );
}
