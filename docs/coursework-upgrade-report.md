# 课程档案与搜索升级交付报告

本地实现与验证完成，2026-10-09。已获得本人推送与部署授权，使用 `codex/portfolio-site` 分支的现有 GitHub Pages 工作流发布；发布结果以该提交的工作流状态为准。

## 完成情况

- 作业使用独立 `Coursework` / `CourseworkDocument` 类型，不再借用 `Project`。课程名称与已有英文名称集中在课程目录，以 `courseId` 引用。
- `/coursework/` 改为学期、课程、作业的虚拟文件夹。桌面目录默认展开，支持折叠、数量与选中状态；手机使用选择器。空课程不会生成文件夹。
- 实时组合关键词搜索、课程/学期筛选、结果数量、清空/重置和无结果状态；最近更新、最早创建、课程名称三种排序。
- 全站搜索覆盖 Blog、Projects、Coursework，提供内容类型标识和类型筛选。未完成博客与待复核提示保留，不将未经核实的 Learning 示例加入索引。
- 两处搜索均支持 URL 参数、刷新恢复、筛选历史的前进/后退、文本关键词高亮。输入关键词替换当前历史记录；目录、排序、类型切换增加记录。
- 作业详情独立为 `CourseworkDetail`，展示面包屑、真实课程信息、学期回退、日期标签、主题和原有说明。文件入口移到长正文与截图之前。
- 附件按「我的解答 / 作业题目 / 课程材料 / 其他附件」标注，提供查看与下载。PDF 点击后才创建内嵌预览，同一时刻只加载一份；关闭后移除，提供新窗口原文件及下载备用入口。
- 同课程相关作业自动按 `courseId` 生成，无其他作业时隐藏。当前每门课程只有一份作业，因此页面没有空的相关模块。
- 导航显示当前栏目，手机菜单支持滚动与 Escape 关闭；沿用原有配色、焦点、响应式布局和 reduced-motion 设置。
- 增加作业模板、轻量校验与 README 维护说明。构建前自动校验，避免发布重复路由或缺失文件。

## 数据结构与真实性

`course-catalog.ts` 只保存课程 `id`、`name`、可选 `englishName`。`coursework.ts` 是作业的唯一数据源，主要字段为：

```text
slug / title / courseId?
semester? / assignmentNumber? / date? / updatedAt? / dateLabel?
summary / tags / background / myRole / topics / focus / notes / status
screenshots / documents / documentNote?
```

每个附件包含 `label / url / description / role / format`。目录、统计、列表、详情、相关作业、搜索与 sitemap 都从这些数据自动生成，物理文件路径不决定目录层级。

公司金融学期为课程材料中确认的 `2026 秋季`。集合与图论仅保留原稿中的 `9.29` 标签，学期与完整日期不补造；显示「学期待确认」「年份待确认」。未知 `courseId` 可省略并显示「课程待确认」，拼错的非空 ID 会在校验时被拒绝。

没有完整日期的作业置于有日期的作业之后，再按课程与标题稳定排列；课程作业截止日期不被当成创建时间。目前两份作业均没有可靠的完整创建/更新日期。

原有两个 slug、详情 URL、数学与金融说明、真实性声明、附件说明及图片全部保留。已逐字段核对迁移前后数据，并逐字节核对所有已跟踪的 `public/files` 和 `public/images` 文件，均一致。本次没有新增原始附件或引入其他私人文件。

## 搜索范围

| 类型 | 已索引的结构化字段 |
| --- | --- |
| Blog | 标题、摘要、标签；结果保留未完成或待复核提示 |
| Projects | 名称、摘要、问题、个人角色、技术栈、架构、难点与结果 |
| Coursework | 标题、课程已知中英文名、学期、编号、日期标签、摘要、标签、背景、学习说明、分析重点、作品说明、附件名称、实际文件名与描述 |

构建阶段整理索引，通过静态页面数据交给客户端过滤。忽略首尾空格与英文大小写，兼容中文与部分匹配，多关键词须全部匹配。没有 PDF 内部全文搜索、OCR、向量搜索或搜索服务依赖。

## 主要文件

| 文件 | 职责 |
| --- | --- |
| `src/data/coursework-types.ts` | 独立作业、课程与附件类型 |
| `src/data/course-catalog.ts`、`src/data/coursework.ts` | 课程元数据、迁移后的作业数据 |
| `src/lib/coursework.ts` | 目录、列表数据、排序、回退、相关作业与链接 |
| `src/lib/search.ts`、`src/lib/search-utils.ts` | 构建阶段统一索引与搜索匹配 |
| `src/components/CourseworkExplorer.tsx` | 作业目录、组合搜索、统计、排序与手机选择器 |
| `src/components/CourseworkDetail.tsx`、`CourseworkDocuments.tsx` | 作业阅读与按需文件预览 |
| `src/components/SearchBox.tsx`、`Highlight.tsx`、`useUrlFilters.ts` | 全站搜索、文本高亮与 URL 状态 |
| `src/components/NavLink.tsx`、`Navbar.tsx`、`MobileMenu.tsx` | 当前栏目反馈和手机导航 |
| `src/app/coursework/page.tsx`、`src/app/coursework/[slug]/page.tsx`、`src/app/search/page.tsx` | 保留 URL 的页面接入 |
| `src/lib/coursework-validation.ts`、`scripts/validate-coursework.ts` | 数据与资源路径校验 |
| `templates/coursework.ts`、`README.md` | 添加作业模板与维护流程 |
| `tests/coursework.spec.ts`、`tests/portfolio.spec.ts` | 新功能与原有功能回归 |
| `package.json`、`tsconfig.json` | 构建前校验、Node 原生 TypeScript 校验脚本兼容 |

项目数据、原有项目展示组件、文章内容、部署工作流与静态导出配置未改动。已有的 `bomb-lab-tutorial.md` 未提交修改保持原样，SHA256 仍为 `41E998741F82172087BBFDF0111F4B3FA110BCBA4C7386C6BB99A66877E0A815`。

## 添加下一份作业

1. 放入已获公开授权的 PDF/图片，如 `public/files/<slug>/solution.pdf`。
2. 按 `templates/coursework.ts` 在 `src/data/coursework.ts` 添加一条数据；引用已有 `courseId`。首次出现的新课程在 `course-catalog.ts` 添加一次名称。
3. 仅填写已确认的学期和日期，附件标明真实角色与格式。数据中的资源路径不带 `/student-portfolio`。
4. 执行 `npm run validate:coursework`、`npm run typecheck`、`npm run build`，必要时执行浏览器回归。目录、搜索、详情和 sitemap 自动更新。

## 验证结果

| 检查 | 结果 |
| --- | --- |
| `npm run validate:coursework` | 通过：2 门课程、2 份作业、5 个附件 |
| `npm run lint` | 通过 |
| `npm run typecheck` | 通过 |
| `PORTFOLIO_GITHUB_PAGES=true npm run build`（PowerShell 环境变量方式） | 通过，静态生成 25 个页面，保留 `/student-portfolio` 子路径与原有详情 URL |
| `npm run test:e2e` | 最终全量 10/10 通过，34.4 秒 |
| 原始内容与附件保留检查 | 作业字段逐项一致，所有已跟踪公开附件/图片逐字节一致 |
| 视觉 QA | 已检查桌面目录、手机深色目录、作业详情和全站搜索截图 |

自动化覆盖：重复 slug、非法 courseId、缺失课程名称、无效日期、缺失/非法文件路径、未知分类回退、空分组、日期排序、同课程关联、中文/英文/附件名搜索、课程与查询组合、清空与无结果、刷新恢复和前进/后退、手机仅课程参数选择、旧 URL、下载、按需 PDF 预览与备用入口、所有导出页内部链接与资源、原有博客/项目、深浅主题与移动导航。关键页面执行 WCAG A/AA 自动检查。

首轮发现 PDF 预览按钮的读屏名称含额外空格，已改为明确的 `aria-label` 并重跑通过。课程参数未带学期的手机筛选状态也已修复。原有全站无障碍测试一次扫描多页，独立超时上限调整为 120 秒；最终运行没有超时。

Node 26 本机运行校验脚本会输出模块类型自动检测提示，不影响校验或构建；未更改整个项目的模块类型以消除该提示。

## 截图与本地预览

截图位于 `output/qa/coursework-upgrade/`：

- `coursework-desktop.png`：完整桌面目录。
- `coursework-mobile-dark.png`：手机深色主题、课程筛选与关键词高亮。
- `coursework-detail.png`：详情面包屑、基本信息与文件入口。
- `search-desktop.png`：三类内容统一搜索与真实性提示。

运行 `npm run preview` 后访问 `http://127.0.0.1:4173/student-portfolio/coursework/` 与 `/student-portfolio/search/`。当前静态产物使用 GitHub Pages 子路径。

## 限制与下一阶段

内嵌 PDF 的实际显示由浏览器决定，原文件查看和下载始终可用；自动化与桌面/手机视口检查不能替代所有实体手机浏览器测试。PDF 预览默认关闭，尚无内嵌阅读器批注或页码同步。

分类、排序只使用真实元数据；集合与图论的学期与完整日期仍需本人确认。当前每门课程仅有一份作业，相关作业显示逻辑使用合成测试数据验证，没有添加虚构作业。

下一阶段可先补齐已确认的学期/日期，再按实际增长情况增加课程介绍、课程内标签筛选和大列表分页；无需提前引入数据库、登录或复杂 CMS。本次已经完成关键词高亮、URL 持久化与排序，未为这些功能推迟核心检查。
