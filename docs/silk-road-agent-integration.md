# Silk Road Agent 作品集集成

本集成只修改静态作品网站，不复制、发布或调用 Agent 私有源码。

- 项目路径：/projects/silk-road-agent/
- 公开 Demo URL： https://silk-road-agent-awwmpa4xozpwr2pkcpz6rn.streamlit.app/
- 外部链接：新标签页，noopener noreferrer
- 不使用 iframe；所有 Agent 运算由独立 Streamlit 服务执行。
- 封面图片是清楚标注的流程示意，不是伪造的网页截图。

## 依据与表述边界

项目功能、7 项集成测试、桌面与手机交互检查来自项目交付说明；本次添加的是作品集展示，并不构成对 Agent 运行环境的重新测试。匿名公开访问与实际最新线上功能仍须由项目所有人用无痕窗口检查。

团队项目的个人角色暂时标记为待补充；没有公开私有 GitHub 源码链接。市场评分、词典翻译覆盖、模板草稿和模拟评论限制在页面显式说明。

## 本地复核

在 Node 22.18+ 环境中：

1. npm ci
2. npm run lint
3. npm run typecheck
4. npm run build
5. npx playwright install chromium
6. npm run test:e2e

子路径回归请使用 PORTFOLIO_GITHUB_PAGES=true 构建和预览，确保 /student-portfolio/projects/silk-road-agent/ 可以访问。

## 发布前必做

- 使用无痕窗口测试外部 Streamlit URL 是否无需登录。未验证前页面仅写“打开交互 Demo”，不写“无需登录”。
- 测试首页“在线体验”与“查看项目”、详情首尾链接和手机宽度布局。
- 复核 7 项自动化测试与 CI 等声明对应的交付材料。
- 替换示意图为真实脱敏截图（可选）。
- 补充本人承担的模块、设计决策及贡献证据。
- 在正式部署分支上合并后再发布。仅创建功能分支不会触发既有 GitHub Pages 部署工作流。
