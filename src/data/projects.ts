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
