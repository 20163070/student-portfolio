export type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
};

export const projects: Project[] = [
  {
    title: "校园二手书平台",
    description:
      "一个帮助同学发布、搜索和交换教材的小型 Web 应用，练习了表单、列表和基础状态管理。",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "#contact",
  },
  {
    title: "课程任务看板",
    description:
      "用卡片方式管理作业、考试和小组任务，重点练习组件拆分和响应式布局。",
    tags: ["React", "LocalStorage", "UI Design"],
    link: "#contact",
  },
  {
    title: "个人算法笔记",
    description:
      "整理常见数据结构和算法题解，包含复杂度分析和 TypeScript 示例代码。",
    tags: ["Algorithms", "Markdown", "Learning"],
    link: "#contact",
  },
];
