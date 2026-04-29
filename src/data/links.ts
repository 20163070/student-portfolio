export type LinkGroup = {
  title: string;
  links: {
    name: string;
    description: string;
    href: string;
  }[];
};

export const linkGroups: LinkGroup[] = [
  {
    title: "Common Links",
    links: [
      {
        name: "GitHub",
        description: "我的代码仓库和项目记录。",
        href: "https://github.com/20163070",
      },
      {
        name: "MDN Web Docs",
        description: "查询 HTML、CSS、JavaScript 的权威文档。",
        href: "https://developer.mozilla.org/",
      },
      {
        name: "Next.js Docs",
        description: "学习 Next.js App Router 和部署方式。",
        href: "https://nextjs.org/docs",
      },
    ],
  },
  {
    title: "Study Links",
    links: [
      {
        name: "CSAPP",
        description: "计算机系统学习的重要参考。",
        href: "https://csapp.cs.cmu.edu/",
      },
      {
        name: "TypeScript Handbook",
        description: "TypeScript 官方手册。",
        href: "https://www.typescriptlang.org/docs/",
      },
    ],
  },
];
