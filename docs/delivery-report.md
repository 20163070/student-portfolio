# 本地改版交付

状态：本地检查完成；已获得推送与部署授权，使用现有 GitHub Pages 工作流发布。

## 重要改动与原因

| 改动 | 原因 |
| --- | --- |
| 首页按 Hero、精选项目、工程与开源、技术写作、关于、联系组织 | 让项目和工程能力优先呈现，学习过程移至二级入口 |
| 确认后的身份、方向与邮箱集中于 profile.ts | 避免不同页面出现不一致或示例个人资料 |
| 删除无依据的示例项目展示，统一 projects.ts | 修正错误链接、两套项目数据及数量不一致 |
| 项目支持完整类型字段，新增两个静态详情页 | 提供问题、角色、架构、挑战和结果的可审阅案例 |
| 学习档案移到 /learning 并标注待确认 | 保留原始内容，同时避免将示例记录当成真实经历 |
| 文章自动标注未完成状态，Data Lab 显示复核提示 | 保留原文，不把未完成笔记作为完整教程推荐 |
| 浅深主题改为 CSS 变量，使用系统字体，精简装饰 | 保留个人辨识度，减少覆盖样式和字体网络依赖 |
| Markdown AST 提取目录、KaTeX 公式渲染、代码和表格滚动 | 避免代码围栏中的标题误入目录，改善技术阅读体验 |
| 提升小字对比度、焦点、跳转链接、菜单和搜索标签 | 支持键盘、读屏、手机与减少动画的系统偏好 |
| trailingSlash、统一图片 basePath、自动 sitemap、PNG Open Graph | 兼容 GitHub Pages 子路径与静态托管，避免路由或社交预览遗漏 |
| 新增静态预览与浏览器回归检查 | 直接验证静态产物，避免只验证开发服务器 |
| 在现有版本范围内修复依赖 | Next.js 更新为 15.5.27，保留 Next 15 / Tailwind 3，不做强制大版本迁移 |

## 修改文件列表

以下为本次新增、修改或替换的文件。public/sitemap.xml 删除，由 src/app/sitemap.ts 自动生成。

- .gitignore
- README.md
- docs/content-audit.md
- docs/delivery-report.md
- docs/previews/home-dark.png
- docs/previews/home-light.png
- docs/previews/home-mobile.png
- next.config.ts
- package-lock.json
- package.json
- playwright.config.ts
- public/images/projects/portfolio-writing.png
- public/og-card.png
- public/og-card.svg
- public/sitemap.xml
- scripts/preview.mjs
- src/app/about/page.tsx
- src/app/archive/page.tsx
- src/app/blog/[slug]/page.tsx
- src/app/blog/page.tsx
- src/app/globals.css
- src/app/layout.tsx
- src/app/learning/page.tsx
- src/app/links/page.tsx
- src/app/page.tsx
- src/app/projects/[slug]/page.tsx
- src/app/projects/page.tsx
- src/app/search/page.tsx
- src/app/sitemap.ts
- src/app/tags/[tag]/page.tsx
- src/app/tags/page.tsx
- src/components/About.tsx
- src/components/BlogPreview.tsx
- src/components/Contact.tsx
- src/components/Courses.tsx
- src/components/Engineering.tsx
- src/components/Hero.tsx
- src/components/Labs.tsx
- src/components/MobileMenu.tsx
- src/components/Navbar.tsx
- src/components/PostCard.tsx
- src/components/ProjectCard.tsx
- src/components/Projects.tsx
- src/components/SearchBox.tsx
- src/components/SiteStats.tsx
- src/components/ThemeToggle.tsx
- src/components/Thoughts.tsx
- src/data/profile.ts
- src/data/projectGroups.ts
- src/data/projects.ts
- src/lib/posts.ts
- src/lib/site.ts
- tailwind.config.ts
- tests/portfolio.spec.ts

## 已保护的原有修改

src/content/posts/bomb-lab-tutorial.md 在开始前已有未提交改动，本次没有写入该文件。

开始与结束 SHA256 均为：41E998741F82172087BBFDF0111F4B3FA110BCBA4C7386C6BB99A66877E0A815。

## 需要本人补充

- 项目具体负责的模块、时间线、协作和提交依据。
- 课程、实验与短思考的真实性与完成情况确认。
- 个人工程经历、实验室经历与简历（如希望公开）。
- Bomb Lab 剩余 TODO 和验证过程。

个人昵称、学校年级、方向与邮箱已按本人确认写入。OpenCode 贡献按要求不展示。

## 尚未解决与验证范围

- 仓库归属不能证明全部模块均为本人独立完成，因此角色仍明确待补充。
- 现有学习档案的部分条目缺少真实性证据，保留但不用于成果或技能证明。
- 依赖审计仍有 19 项：8 high、7 moderate、4 low，无 critical。主要涉及 Next 内嵌 PostCSS、Tailwind 构建依赖、gray-matter 的 YAML 依赖及数学渲染依赖。自动建议包含 Next 16 / Tailwind 4 或其他不兼容版本调整，本次未执行强制修复。静态导出不提供 Next 生产服务，但构建依赖仍应继续维护。
- 自动无障碍检测覆盖关键模板和两种主题，不能替代真实设备与读屏人工验收。
- 发布结果以本次 GitHub Actions 运行记录为准。

## 验证结果

- npm run lint：通过，无错误或警告。
- npm run typecheck：通过。
- npm run build：普通静态导出通过。
- PORTFOLIO_GITHUB_PAGES=true 下 npm run build：带 /student-portfolio 子路径的静态导出通过。
- npm run test:e2e：4 项浏览器回归检查，覆盖公式 MathML、所有导出 HTML 页面的链接/资源/目录、手机导航/主题/搜索/未完成文章、两种主题的 WCAG A/AA 自动检查。
- 页面截图：已人工检查浅色、深色与手机首页。
- git diff --check：通过；Windows 的 LF/CRLF 提示不影响内容。
- 本地验证环境：Node.js 26.5.0；工作流使用 Node.js 22，推送发布分支后自动执行。

## 本地预览

当前静态产物带 GitHub Pages 子路径，已启动预览：

http://127.0.0.1:4173/student-portfolio/

重新启动：在项目目录运行 npm run preview（或 npm start）。

开发预览：npm run dev，访问 http://localhost:3000 。

完整构建、子路径验证和测试步骤见 README.md。线上配置地址 https://20163070.github.io/student-portfolio/ 发布结果以部署记录为准。

## UI 后续调整：暖色极客工作台

按后续反馈改为暖白／炭黑与琥珀强调色。Hero 使用静态终端式个人简介、细网格与命令提示符；导航和项目卡片增加等宽标签、仓库栏和利落边框。正文保留易读字体，提高文章正文对比度，代码块使用暖深色背景。没有新增动画或运行时依赖。

主要调整文件：src/app/globals.css、tailwind.config.ts、src/components/Hero.tsx、src/components/Navbar.tsx、src/components/ProjectCard.tsx、src/components/PostCard.tsx、src/components/BlogPreview.tsx。预览截图已更新在 docs/previews/。Bomb Lab 原文校验值一致。

## 发布范围

按本人最新要求，仅展示个人网站项目。已清理其他项目案例、相关介绍和旧预览截图。此次发布包含作品集改版与暖色极客 UI，不包含 Bomb Lab 原有未提交修改。
