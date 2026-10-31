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
  documentNote?: string;
  demoUrl?: string;
  status: string;
  featured: boolean;
  evidence: { label: string; url: string }[];
};
export const projects: Project[] = [
  {
    slug: "silk-road-agent",
    name: "Silk Road Agent",
    summary:
      "丝路跨境直播智能助理。面向跨境主播，串联直播前准备、直播中评论辅助与直播后内容生成。",
    problem:
      "跨境主播需要将商品文化转译为适合目标观众的表达，快速理解直播评论，并准备不同平台的传播内容。多工具切换与语言、文化和合规差异增加了准备和响应成本。",
    myRole:
      "团队项目。本人分工为技术 C：主播端展示面板与评论分类（本人提供）。本地快照已核实相关功能，个人提交与代码作者证据仍待补充；直播后文案为选做，贡献待确认。",
    techStack: ["Python", "Streamlit", "Agent Workflow", "规则引擎"],
    architecture: [
      "输入商品信息或评论，经输入校验交给原有 Python Agent 工作流处理。",
      "规则引擎、内置数据与模板产出结构化结果，由 Streamlit 展示并提供 Markdown 导出。",
      "直播前方案、模拟直播评论处理、直播后传播草稿为三条可独立体验的流程。",
      "公开 Demo 强制隔离外部模型请求，访客 Session 独立，错误反馈对外脱敏。",
    ],
    challenges: [
      "将真实业务流程包装成无需配置 API Key 的公开体验，同时避免把模板输出冒充大模型能力。",
      "限制评论输入长度、避免不安全文本渲染，保持不同访客的会话数据隔离。",
      "兼顾 Windows 本地开发与 Linux Python 3.12 CI 环境。",
    ],
    results: [
      "提供直播前、模拟直播中和直播后三条独立交互流程（根据项目交付说明）。",
      "项目交付记录：7 项自动化集成测试通过，已完成桌面与手机尺寸的浏览器交互检查；作品集集成本身需另行验收。",
      "公开演示使用本地规则与模板；词典以外的英文评论翻译明确提示不支持，市场评分仍待完善。",
    ],
    screenshots: [
      {
        src: "/images/projects/silk-road-agent-demo.png",
        alt: "Silk Road Agent 真实运行首页：公开规则模板模式与三个独立工作流入口",
        caption: "2026-10-31 匿名浏览器实拍：公开 Demo 首页，未展示个人数据；实际输出来自规则与模板。",
        width: 1280,
        height: 720,
      },
    ],
    demoUrl:
      "https://silk-road-agent-awwmpa4xozpwr2pkcpz6rn.streamlit.app/",
    status: "交互 Demo · 团队项目",
    featured: true,
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
