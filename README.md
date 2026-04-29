# 学生学习档案网站

这是一个用来记录项目、课程 lab、上过的课和学习思考的网站。它使用 Next.js、TypeScript 和 Tailwind CSS 构建，项目结构尽量保持简单，适合大一软件工程学生继续维护。

## 功能

- 响应式首页
- About、Projects、Labs、Courses、Thoughts、Skills 等区块
- 项目、实验、课程、思考都放在独立数据文件里
- 清晰的组件拆分
- TypeScript 类型支持
- GitHub Pages 静态部署

## 技术栈

- Next.js
- TypeScript
- Tailwind CSS
- ESLint

## 项目结构

```txt
src/
  app/
    globals.css      全局样式
    layout.tsx       页面布局和元信息
    page.tsx         首页入口
  components/        页面组件
  data/              项目、实验、课程、思考、技能数据
```

## 如何使用这个网站

这个网站不需要后台，也不需要数据库。你以后主要改 `src/data/` 里的文件：

- 项目作品：`src/data/projects.ts`
- 实验记录：`src/data/labs.ts`
- 课程学习：`src/data/courses.ts`
- 思考笔记：`src/data/thoughts.ts`
- 技能列表：`src/data/skills.ts`

长教程和博客文章使用 Markdown，放在：

```txt
src/content/posts/
```

每新增一个 `.md` 文件，网站会自动生成一篇博客文章。

## 添加一篇 Markdown 教程

在 `src/content/posts/` 下新建文件，比如：

```txt
ics-data-lab-guide.md
```

文件开头写文章信息：

```md
---
title: "ICS Lab：Data Lab 踩坑记录"
date: "2026-05-01"
updated: "2026-05-01"
summary: "记录我做 ICS Data Lab 时的准备、思路、常见坑和复盘方式。"
tags:
  - ICS
  - Lab
  - C
---
```

下面就可以正常写 Markdown：

```md
## 写前须知

这里写 lab 背景、注意事项和自己的理解。

## 常见坑

- 不要直接抄答案。
- 先手算小例子。
- 注意边界情况。

```c
int bitXor(int x, int y) {
  return ~(~(x & ~y) & ~(~x & y));
}
```
```

写完后访问：

```txt
/blog/文件名
```

例如：

```txt
/blog/ics-data-lab-guide
```

改完之后提交到 GitHub，GitHub Actions 会自动重新部署网站。

## 添加一个项目

打开 `src/data/projects.ts`，在 `projects` 数组里加一段：

```ts
{
  title: "我的课程管理系统",
  description: "一个用于记录课程、作业和考试时间的小项目。",
  tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  githubUrl: "https://github.com/20163070/example-project",
  demoUrl: "https://example.com"
}
```

如果暂时没有在线预览，可以不写 `demoUrl`：

```ts
{
  title: "算法练习笔记",
  description: "整理常见算法题和自己的解题思路。",
  tags: ["TypeScript", "Algorithms"],
  githubUrl: "https://github.com/20163070/algorithm-notes"
}
```

## 添加一条 lab 记录

打开 `src/data/labs.ts`，新增：

```ts
{
  title: "Lab 04：数据库基础练习",
  course: "数据库系统",
  date: "2026 春季",
  summary: "练习表设计、主键、外键和简单 SQL 查询。",
  result: "理解了数据表之间如何建立关系。"
}
```

## 添加一门课

打开 `src/data/courses.ts`，新增：

```ts
{
  name: "离散数学",
  semester: "大一",
  focus: "集合、命题逻辑、图论基础",
  takeaway: "很多编程问题背后其实是数学结构。"
}
```

## 添加一条思考

打开 `src/data/thoughts.ts`，新增：

```ts
{
  title: "今天我理解了什么是组件",
  date: "2026-05",
  content: "组件不是为了把代码拆散，而是为了让每一块代码有清楚的责任。"
}
```

## 安装依赖

```bash
npm install
```

## 本地运行

```bash
npm run dev
```

打开浏览器访问：

```txt
http://localhost:3000
```

## 代码检查

```bash
npm run lint
```

## 构建项目

```bash
npm run build
```

## 生产环境运行

```bash
npm run start
```

## 部署说明

这个项目已经配置为 GitHub Pages 静态部署。推送到 `codex/portfolio-site` 分支后，GitHub Actions 会自动构建并发布。

网站地址：

```txt
https://20163070.github.io/student-portfolio/
```

部署前可以先在本地运行：

```bash
npm run lint
npm run build
```

## 如何修改内容

- 修改个人介绍：编辑 `src/components/About.tsx`
- 修改项目列表：编辑 `src/data/projects.ts`
- 修改 lab 记录：编辑 `src/data/labs.ts`
- 修改课程记录：编辑 `src/data/courses.ts`
- 修改思考笔记：编辑 `src/data/thoughts.ts`
- 修改技能列表：编辑 `src/data/skills.ts`
- 修改联系方式：编辑 `src/components/Contact.tsx`
- 修改整体颜色：编辑 `tailwind.config.ts` 和 `src/app/globals.css`

## 学习建议

如果你刚开始学习前端，可以按这个顺序继续扩展：

1. 把示例项目替换成自己的真实项目。
2. 每完成一个 lab，就在 `labs.ts` 里记录目标和收获。
3. 每门课结束后，在 `courses.ts` 写一句 takeaway。
4. 每周写一条 `thoughts.ts`，记录自己真正想明白的东西。
5. 等以后学习后端，再考虑加入登录、数据库和真正的在线上传。
