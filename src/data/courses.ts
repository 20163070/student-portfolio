export type Course = {
  name: string;
  semester: string;
  focus: string;
  takeaway: string;
};

export const courses: Course[] = [
  {
    name: "软件工程导论",
    semester: "大一",
    focus: "需求分析、软件生命周期、团队协作",
    takeaway: "写代码之前先想清楚用户、场景和边界条件。",
  },
  {
    name: "程序设计基础",
    semester: "大一",
    focus: "变量、函数、数组、循环、基础算法",
    takeaway: "把问题拆小，比一开始追求复杂技巧更重要。",
  },
  {
    name: "Web 开发基础",
    semester: "大一",
    focus: "HTML、CSS、JavaScript、响应式页面",
    takeaway: "能被别人打开和使用的作品，会让学习更有反馈。",
  },
];
