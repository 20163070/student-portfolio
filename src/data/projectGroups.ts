export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  links: ProjectLink[];
};

export type ProjectGroup = {
  title: string;
  description: string;
  items: ProjectItem[];
};

export const projectGroups: ProjectGroup[] = [
  {
    title: "Programs",
    description: "可以运行、可以展示的项目。",
    items: [
      {
        name: "学生学习档案网站",
        description: "用 Next.js 和 Tailwind CSS 搭建的个人学习记录网站。",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/20163070/student-portfolio",
          },
          {
            label: "Website",
            href: "https://20163070.github.io/student-portfolio/",
          },
        ],
      },
      {
        name: "课程任务看板",
        description: "用卡片记录作业、考试和小组任务的小项目。",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/20163070/example-task-board",
          },
        ],
      },
    ],
  },
  {
    title: "Learnings",
    description: "课程笔记、lab 经验和学习资料整理。",
    items: [
      {
        name: "ICS Lab 笔记",
        description: "记录计算机系统导论 lab 的踩坑、命令和复盘。",
        links: [
          {
            label: "Blog",
            href: "/blog/ics-data-lab-guide",
          },
        ],
      },
      {
        name: "算法练习笔记",
        description: "整理常见算法题和自己的解题思路。",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/20163070/example-algorithm-notes",
          },
        ],
      },
    ],
  },
];
