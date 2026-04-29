export type Thought = {
  title: string;
  date: string;
  content: string;
};

export const thoughts: Thought[] = [
  {
    title: "为什么要做作品集？",
    date: "2026-04",
    content:
      "作品集不是简历的装饰，而是学习过程的证据。把项目、实验和反思留下来，能看见自己如何一点点变强。",
  },
  {
    title: "写代码和写作很像",
    date: "2026-04",
    content:
      "变量名、组件拆分、README 都是在和未来的自己沟通。代码能跑只是第一步，能读懂、能维护才更重要。",
  },
  {
    title: "先做出来，再慢慢做好",
    date: "2026-04",
    content:
      "初学时不要害怕作品简单。一个能运行的小东西，比脑子里完美但永远没开始的大项目更有价值。",
  },
];
