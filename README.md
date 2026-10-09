# 20163070 / Developer Portfolio

复旦大学 2025 级本科生，关注 Harness、算法与 AI Infra。基于 Next.js、TypeScript、Tailwind CSS 与 Markdown 的静态作品集。

## 本地开发

要求 Node.js 22.18+。首次运行：

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

先构建，再测试。覆盖静态导出页面、内部链接与资源、文章目录、移动端导航、主题记忆、作业目录、搜索筛选、URL 恢复、按需 PDF 预览与深浅主题无障碍。默认仅绑定本机地址。

## 内容维护

- 个人资料：src/data/profile.ts。
- 项目唯一数据源：src/data/projects.ts。支持 problem、myRole、techStack、architecture、challenges、results、screenshots、githubUrl、demoUrl、status 等字段。
- 作业独立数据源：src/data/coursework.ts，独立类型在 src/data/coursework-types.ts，课程名称在 src/data/course-catalog.ts。列表和详情位于 /coursework，不进入首页精选、项目列表或项目数量统计。
- 精选项目：featured 字段；每个 slug 自动生成详情页。
- 文章：src/content/posts/*.md；frontmatter 包含 title、date、summary、tags，可选 updated。
- 未完成状态：原文含 TODO、占位或待补充时，展示未完成提示，不进入首页精选。文章正文不被改写。
- 数学公式：支持美元符号包裹的行内公式和双美元符号包裹的块公式，构建时用 KaTeX 渲染。
- 课程与短思考：保留在 /learning，真实性待本人确认。实验逐条标注：公开提交已核验的 Lab 与原有待确认示例分开。
- 站点地图：自动从路由、项目与文章生成，不需手工维护。
- 图片：放在 public 下，数据记录不带 basePath 的绝对路径；展示组件用 assetPath 添加部署子路径。

## 添加课程与作业

课程目录按「学期 → 课程 → 作业」自动生成，不要求文件按相同层级存放。没有作业的课程不显示文件夹。

1. 附件放入 `public/files/<作业 slug>/`，预览图可放在 `public/images/coursework/`。只加入已经同意公开的文件；检查姓名、学号、联系方式和课程资料的公开范围。
2. 首次添加一门课程时，在 `src/data/course-catalog.ts` 增加 `{ id, name, englishName? }`。只填写已确认的名称，英文名可省略；同一课程以后复用这个 ID。
3. 参考 `templates/coursework.ts`，在 `src/data/coursework.ts` 新增一条 `Coursework`。已有课程只需添加文件和这一条数据，不用修改页面、搜索或站点地图。
4. 运行 `npm run validate:coursework`、`npm run typecheck`、`npm run build`。构建也会自动校验作业数据。先构建，再运行 `npm run test:e2e`。

`Coursework` 的主要字段：

| 字段                                                         | 用途                                                                         |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `slug`, `title`                                              | 稳定详情 URL 与作业标题；已发布 slug 不改名                                  |
| `courseId?`                                                  | 引用课程目录；省略时显示「课程待确认」                                       |
| `semester?`                                                  | 已确认的学期名称；省略时显示「学期待确认」                                   |
| `assignmentNumber?`                                          | 作业编号，如 Homework 1 或 5.1—5.8                                           |
| `date?`, `updatedAt?`                                        | 已确认的完整 `YYYY-MM-DD` 日期；缺失时不参与日期排序，排列在有日期的作业之后 |
| `dateLabel?`                                                 | 原稿中的不完整日期，如 9.29；不会推断年份或用于日期排序                      |
| `summary`, `tags`                                            | 摘要与知识点                                                                 |
| `background`, `myRole`, `topics`, `focus`, `notes`, `status` | 保留原始作业描述、个人工作、学习内容、分析重点与真实性说明                   |
| `screenshots`                                                | 原有图片、替代文本、尺寸和说明；没有图片时填 `[]`                            |
| `documents`, `documentNote?`                                 | 公开附件与来源说明；没有公开附件时填 `[]`                                    |

附件需要 `label`、`url`、`description`、`role` 和 `format`。`role` 为 `solution`（我的解答）、`assignment`（题目）、`material`（课程材料）或 `other`；`format` 为 `pdf`、`image` 或 `file`。路径从 public 根开始，例如 `/files/my-homework/solution.pdf`，不要添加 `/student-portfolio`。

校验会拒绝重复/非法 slug、未知 courseId、缺失课程名称、非法日期、更新日期早于创建日期、缺失附件/图片、重复附件、格式与扩展名不符及不合法资源路径。未知课程和学期可以省略，不需要创建假课程或假日期。文件缺失时构建失败并指明作业与路径，避免发布坏链接。

现有数据：公司金融的 `2026 秋季` 来自作业材料；集合与图论仅确认课程名称与 `9.29` 标签，学期和完整日期留空。课程已有的截止日期不被当成作业创建日期。

## 搜索与阅读

- `/coursework/` 支持作业标题、课程中英文名称（已有时）、编号、摘要、标签、学习说明、附件名称/文件名与附件描述的组合关键词搜索。搜索可与课程/学期筛选组合；可按最近更新、最早创建或课程名称排序。
- `/search/` 覆盖博客、项目、作业，支持全部/文章/项目/作业类型筛选。博客保留标题、摘要、标签与未完成/待复核提示；项目搜索项目介绍、技术栈与案例说明；作业使用相同结构化索引。未经核实的 Learning 示例不加入搜索。
- 搜索在构建时整理索引，浏览器本地过滤；大小写不敏感，支持中文、部分匹配和多个以空格分隔的关键词（需全部匹配）。不读取 PDF 内部全文，不提供 OCR 或语义搜索。
- URL 参数：`q`（关键词）、`semester`、`course`、`sort=oldest|course`；全站搜索使用 `q` 与 `type=blog|project|coursework`。`unconfirmed` 表示待确认分类。输入关键词会替换当前 URL；切换文件夹、排序或类型会增加历史记录，支持刷新、前进、后退和分享。示例：`/coursework/?q=IRR&course=corporate-finance`。
- 作业详情提供面包屑、已确认的基本信息、分角色附件、原始截图和同课程其他作业（有其他作业时出现）。PDF 只有点击「预览 PDF」后才请求，同一时刻只打开一份；始终保留打开原文件和下载入口。内嵌能力由浏览器决定，手机上可直接打开或下载。

校验脚本使用 Node 的 TypeScript 类型剥离功能，建议 Node 22.18+。未引入数据库、服务端 API 或第三方搜索服务。

## 发布边界

WisePen Lab 1A 入口为 `/learning/#wisepen`，详情为 `/blog/wisepen-lab1a-hello-frontend/`，分类复用 `/tags/WisePen/`。Markdown frontmatter 的 `demo: counter` 只启用预定义的 `CounterDemo` Client Component，不执行 Markdown 内的代码，也没有引入 MDX 或额外组件库。文章目录包含 Demo；搜索仍使用现有博客索引。公开实验源码在 https://github.com/20163070/wisepen-lab1a ，与网站内使用原生按钮的适配代码分别说明。见 `docs/lab1a-integration.md`。

WisePenCat Lab 0 位于 `/learning/#labs`，报告复用 `/blog/wisepencat-lab0-git-workflow/`。维护数据在 `src/data/labs.ts`：`verified` 仅表示提交证据核验，`status` 另记完成与 PR 审核状态及核验日期；原有示例省略该字段，继续显示待确认。`reportSlug` 链接现有 Markdown 文章，标签、搜索与站点地图由博客管线自动生成。实验不加入 Projects 数据或项目数量。证据来源与历史故障记录的边界见文章；原始 PDF 不公开上传。

GitHub Actions 原有流程保留：推送 codex/portfolio-site 分支会构建并部署 GitHub Pages。发布须经本人授权；推送该分支后由 GitHub Actions 构建并部署。

配置的网站地址：https://20163070.github.io/student-portfolio/ 。

## 内容真实性

详见 docs/content-audit.md。仓库结构与个人贡献分别表述，不引用未复现的性能与用户数。OpenCode 贡献按本人要求不展示。
