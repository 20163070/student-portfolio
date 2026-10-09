# WisePen Lab 1A 集成说明

## 检查与选择

网站实际安装 Next.js 15.5.27、React 19.2.5、TypeScript 5.9.3、Tailwind CSS 3.4.19。已有 Learning 实验列表、作业文件夹、博客、标签、全局搜索、Markdown 高亮与文章目录；GitHub Actions 推送 `codex/portfolio-site` 后静态导出到 GitHub Pages。

实验目录安装 React 19.3.0、TypeScript 6.0.3、Vite 8.3.4。实际 `App.tsx` 使用 `useState(0)`、`setCount(prev => prev + 1)`、HeroUI `Button` 的 `onPress`，但原清单和安装中均没有 HeroUI。原源码、包清单、锁文件保持原样，未在原目录执行会产生文件的安装或构建。

三页实验 PDF 的任务与三道思考题已读取并渲染核对；原文件不公开上传。未复制模板图片、图标或未知许可的课程材料。技术解释引用 React、HeroUI 官方文档。

## 集成范围

- 入口：`/learning/#wisepen` → WisePen 分类内的 Lab 1A 卡片。
- 详情：`/blog/wisepen-lab1a-hello-frontend/`，标题为 `Lab 1A | Hello Frontend!`。
- 标签分类：`/tags/WisePen/`，同时归类 Lab 0。
- 全局搜索沿用博客索引，文章标题、摘要和标签提供 WisePen、Lab 1A、React、计数器和 useState 等入口。
- Markdown frontmatter `demo: counter` 只选择预定义 React 组件；复用原渲染管线，未引入 MDX、HeroUI 或新高亮依赖。
- `CounterDemo` 使用原生按钮、`useState` 和函数式更新；有状态播报、键盘操作、移动端及主题样式。无持久化或服务端。
- Demo 目录项与正文目录共用现有页面；其余博客仍按原机制渲染。
- 未修改 Projects、Coursework 数据、全局搜索引擎、GitHub Actions 或原实验目录；不增加主要工程项目数量。

主要文件：`src/data/labs.ts`、`src/components/Labs.tsx`、`src/components/CounterDemo.tsx`、`src/lib/posts.ts`、`src/app/blog/[slug]/page.tsx`、两篇 WisePen Markdown、`tests/lab1a.spec.ts`、`tests/portfolio.spec.ts`、README 和内容核查说明。

## 授权公开的源码副本

用户后续明确要求协助上传 GitHub；仅对此源码仓库执行提交与推送：

https://github.com/20163070/wisepen-lab1a

副本保留 `src/App.tsx`，补齐 HeroUI 3.2.6 依赖及锁文件，通过预编译样式和 Vite 别名解决该版本未导出预编译 CSS 子路径的问题。Vite 配置使用独立 PostCSS 选项，避免继承父目录的构建配置。README 说明整理范围。副本不包含 node_modules、dist、PDF、第三方模板图片、环境变量或私人邮箱；提交采用 GitHub noreply 身份。没有改动原实验文件。

作品集网站发布单独取得授权。公开 Vite 源码使用 HeroUI；作品集只复用计数逻辑和已有样式系统，二者不会互相要求安装对方依赖。

## 复查与发布

本次执行结果：网站 `npm run lint`、`npm run typecheck`、GitHub Pages 模式 `npm run build` 均通过，静态导出 42 个页面。原有 12 项浏览器回归通过；新增 3 项 Lab 1A 检查通过（其中键盘测试先因链接定位不唯一失败，改用准确链接名称后重测通过）。覆盖初始值、连续点击、Enter / Space、Tab、刷新重置、WisePen 分类、源码链接、目录与真实标题对应、搜索、手机深浅主题和无溢出；无障碍扫描包含新报告。

公开源码副本的构建、Lint 和浏览器点击/键盘检查通过；从 GitHub 重新克隆后 `npm ci`、`npm run build`、`npm run lint` 也通过。原实验 App、包清单及锁文件的 SHA256 与开始时一致；原有 Bomb Lab 修改也保持相同 SHA256。验证阶段未提交或推送作品集；用户随后于 2026-10-09 明确授权部署网站，按现有工作流发布。

```powershell
npm run lint
npm run typecheck
$env:PORTFOLIO_GITHUB_PAGES = 'true'
npm run build
npm run test:e2e
npm run preview
```

静态预览为 `http://127.0.0.1:4173/student-portfolio/`。需要有前缀的部署构建，普通开发模式仍为 `npm run dev`、`http://localhost:3000/`。

GitHub Pages 使用 `basePath=/student-portfolio`、`output=export`、`trailingSlash=true`，无需额外 assetPrefix。链接经 Next Link 处理，Demo 不加载额外静态资源；未引入服务端接口或运行时 GitHub API。

发布前只暂存本次文件，保留已有 Bomb Lab 修改与临时文件。建议网站提交消息：`Add WisePen Lab 1A interactive counter and learning report`。确认发布后推送 `codex/portfolio-site`，现有 Actions 构建部署；等待成功并复查线上课程实验、计数器、分类和搜索。
