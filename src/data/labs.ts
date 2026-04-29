export type Lab = {
  title: string;
  course: string;
  date: string;
  summary: string;
  result: string;
};

export const labs: Lab[] = [
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
