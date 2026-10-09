export type Lab = {
  title: string;
  course: string;
  date: string;
  summary: string;
  result: string;
  verified?: boolean;
  status?: string;
  tags?: string[];
  reportSlug?: string;
  category?: "WisePen";
  verificationLabel?: string;
};

export const labs: Lab[] = [
  {
    title: "Lab 1A | Hello Frontend!",
    course: "React 入门：从交互式计数器理解组件与状态管理",
    category: "WisePen",
    date: "2026-10-09",
    summary:
      "从初始值 0 开始，每次点击加 1；在线体验计数器，阅读真实核心代码与三道状态管理思考题解析。",
    result: "组件、JSX / TSX、useState、事件处理、重新渲染与状态快照的关系。",
    verificationLabel: "本地源码已核对 · 交互演示",
    status: "计数器核心实现已检查 · 展示站点适配",
    tags: ["WisePen", "Lab 1A", "React", "TypeScript", "State", "HeroUI"],
    reportSlug: "wisepen-lab1a-hello-frontend",
  },
  {
    title: "WisePenCat Lab 0：在命令行通关 Git",
    course: "Git 与开源协作实践",
    category: "WisePen",
    date: "2026-10-09",
    summary:
      "完成 Fork、克隆、本地运行、贡献者与头像提交，并记录网络、JSON 和 Windows 路径问题的排查。",
    result:
      "区分工作区、暂存区、本地与远程仓库；通过两次提交完成一次可追溯的 GitHub 协作。",
    verified: true,
    status: "实验已完成 · PR 已提交，等待审核（2026-10-09 核验）",
    tags: ["Git", "GitHub", "CLI", "Vite", "Version Control", "Open Source"],
    reportSlug: "wisepencat-lab0-git-workflow",
  },
  {
    title: "Lab 01：HTML 与 CSS 个人主页",
    course: "Web 开发基础",
    date: "2026 春季",
    summary: "用语义化 HTML 和基础 CSS 搭建第一个个人主页。",
    result: "理解了页面结构、盒模型和响应式布局的基本思路。",
  },
  {
    title: "Lab 02：JavaScript 待办清单",
    course: "程序设计实践",
    date: "2026 春季",
    summary: "实现新增、完成、删除任务，并把数据保存到浏览器本地。",
    result: "练习了 DOM 操作、事件监听和 LocalStorage。",
  },
  {
    title: "Lab 03：React 组件拆分",
    course: "前端框架入门",
    date: "2026 春季",
    summary: "把一个复杂页面拆成多个小组件，并通过 props 传递数据。",
    result: "开始理解组件复用和数据流。",
  },
];
