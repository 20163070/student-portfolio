export type Project = {
  kind?: "coursework";
  slug: string;
  name: string;
  summary: string;
  problem: string;
  myRole: string;
  techStack: string[];
  architecture: string[];
  challenges: string[];
  results: string[];
  screenshots: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
  githubUrl?: string;
  documents?: { label: string; url: string; description: string }[];
  demoUrl?: string;
  status: string;
  featured: boolean;
  evidence: { label: string; url: string }[];
};
export const projects: Project[] = [
  {
    slug: "corporate-finance-homework-1",
    kind: "coursework",
    name: "公司金融 · Homework 1",
    summary:
      "2026 秋季 Corporate Finance 课程作业：从现金流与货币时间价值，到资本预算、盈亏平衡和敏感性分析。附手写解答与课程要求原件。",
    problem:
      "围绕 Ross 等《Corporate Finance》第 11 版的相关习题，完成 4 道概念题和 5 组计算题，解释核心概念并记录计算步骤。",
    myRole:
      "本人完成的课程作业。解答以原始手写 PDF 展示；题目和课程指南单独标注为课程提供的参考材料。",
    techStack: ["Corporate Finance", "现金流", "NPV / IRR", "敏感性分析"],
    architecture: [
      "概念部分：永续年金与增长年金、企业组织形式、利率对年金价值的影响，以及企业价值目标。",
      "计算部分：经营现金流、现值与利率及期数、融资型现金流的 IRR 判断、项目 NPV。",
      "综合分析：会计盈亏平衡、基准现金流与 NPV、销量和单位变动成本的敏感性。",
    ],
    challenges: [
      "区分经营现金流与利润，并在项目现金流中考虑折旧和税收。",
      "根据融资型现金流的方向理解 IRR 与 NPV 决策。",
      "将销量和成本的变化转化为现金流及项目价值的变化。",
    ],
    results: [
      "提供 6 页原始手写解答，保留概念解释、计算步骤与结果。",
      "附 3 页作业题目和 1 页课程指南，便于对照阅读。",
      "此处为个人课程作品展示；未附教师批改或成绩，计算结果以原稿为准。",
    ],
    screenshots: [
      {
        src: "/images/projects/corporate-finance-homework-1.png",
        alt: "公司金融 Homework 1 原始手写解答第 2 页，包含概念题答案",
        caption: "原始解答第 2 页：概念题手写内容。完整 6 页请查看下方 PDF。",
        width: 683,
        height: 882,
      },
    ],
    status: "已完成 · 2026 秋季课程作业",
    featured: true,
    documents: [
      {
        label: "我的手写解答",
        url: "/files/corporate-finance-homework-1/solution-1.pdf",
        description: "本人作品 · 原始 PDF · 6 页",
      },
      {
        label: "Homework 1 作业题目",
        url: "/files/corporate-finance-homework-1/homework-1.pdf",
        description: "课程材料 · 原始 PDF · 3 页",
      },
      {
        label: "课程作业指南",
        url: "/files/corporate-finance-homework-1/course-guideline.pdf",
        description: "课程材料 · 原始 PDF · 1 页",
      },
    ],
    evidence: [],
  },
  {
    slug: "student-portfolio",
    name: "Developer Portfolio",
    summary:
      "以结构化项目案例和 Markdown 技术写作为核心的静态作品集，保留学习档案与文章检索。",
    problem:
      "通过代码、架构与技术笔记介绍项目，同时让内容易于维护、支持静态托管。",
    myRole: "当前维护的个人网站项目。具体开发分工与工具协作方式待补充。",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown"],
    architecture: [
      "项目索引、精选卡片与独立详情页共用一份带类型的数据。",
      "构建时读取 Markdown，生成博客、标签、归档和站点地图。",
      "静态导出到 GitHub Pages；链接与图片适配仓库子路径。",
    ],
    challenges: [
      "静态托管需要预生成项目和文章详情页。",
      "长代码、数学公式和表格需要在移动端独立滚动。",
      "区分项目事实、未完成文章与待确认的学习记录。",
    ],
    results: [
      "提供项目案例、博客、搜索、标签与归档页面。",
      "支持浅色/深色模式与移动端导航；搜索范围为标题、摘要和标签。",
    ],
    screenshots: [
      {
        src: "/images/projects/portfolio-writing.png",
        alt: "个人网站技术文章页：正文、代码高亮与目录",
        caption: "本地静态构建的真实文章页面，2026-10-08 截图。",
        width: 1280,
        height: 800,
      },
    ],
    githubUrl: "https://github.com/20163070/student-portfolio",
    demoUrl: "https://20163070.github.io/student-portfolio/",
    status: "持续维护",
    featured: true,
    evidence: [
      {
        label: "源代码",
        url: "https://github.com/20163070/student-portfolio/tree/codex/portfolio-site",
      },
    ],
  },
];
export const featuredProjects = projects.filter((project) => project.featured);
