# 20163070 / Developer Portfolio

复旦大学 2025 级本科生，关注 Harness、算法与 AI Infra。基于 Next.js、TypeScript、Tailwind CSS 与 Markdown 的静态作品集。

## 本地开发

要求 Node.js 22+。首次运行：

```sh
npm ci
npm run dev
```

访问 http://localhost:3000 。开发预览不带仓库子路径。

## 检查与静态预览

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

普通静态构建访问 http://127.0.0.1:4173/ 。GitHub Pages 子路径验证，在 PowerShell 中运行：

```powershell
$env:PORTFOLIO_GITHUB_PAGES = 'true'
npm run build
npm run preview
```

访问 http://127.0.0.1:4173/student-portfolio/ 。测试后清除环境变量：

```powershell
Remove-Item Env:PORTFOLIO_GITHUB_PAGES
```

预览服务会根据产物自动识别子路径。使用 Ctrl+C 停止。

## 浏览器回归检查

```sh
npx playwright install chromium
npm run test:e2e
```

先构建，再测试。覆盖静态导出页面、内部链接与资源、文章目录、移动端导航、主题记忆和文章搜索。默认仅绑定本机地址。

## 内容维护

- 个人资料：src/data/profile.ts。
- 项目唯一数据源：src/data/projects.ts。支持 problem、myRole、techStack、architecture、challenges、results、screenshots、githubUrl、demoUrl、status 等字段。
- 精选项目：featured 字段；每个 slug 自动生成详情页。
- 文章：src/content/posts/*.md；frontmatter 包含 title、date、summary、tags，可选 updated。
- 未完成状态：原文含 TODO、占位或待补充时，展示未完成提示，不进入首页精选。文章正文不被改写。
- 数学公式：支持美元符号包裹的行内公式和双美元符号包裹的块公式，构建时用 KaTeX 渲染。
- 课程、实验与短思考：保留在 /learning，真实性待本人确认。
- 站点地图：自动从路由、项目与文章生成，不需手工维护。
- 图片：放在 public 下，数据记录不带 basePath 的绝对路径；展示组件用 assetPath 添加部署子路径。

## 发布边界

GitHub Actions 原有流程保留：推送 codex/portfolio-site 分支会构建并部署 GitHub Pages。发布须经本人授权；推送该分支后由 GitHub Actions 构建并部署。

配置的网站地址：https://20163070.github.io/student-portfolio/ 。

## 内容真实性

详见 docs/content-audit.md。仓库结构与个人贡献分别表述，不引用未复现的性能与用户数。OpenCode 贡献按本人要求不展示。
