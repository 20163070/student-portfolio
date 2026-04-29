export function About() {
  return (
    <section id="about" className="section-shell">
      <p className="section-kicker">About</p>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="section-title">关于我</h2>
        <div className="space-y-4 text-base leading-8 text-ink/70">
          <p>
            我是一名软件工程专业学生，正在系统学习前端开发、编程基础和软件工程实践。
            我相信最好的学习方式是把知识做成可运行、可展示、可改进的项目。
          </p>
          <p>
            目前我重点练习 React 组件化、TypeScript 类型设计、Tailwind CSS 页面实现，
            以及如何写出清晰、容易维护的代码。
          </p>
        </div>
      </div>
    </section>
  );
}
