# Silk Road Agent 依赖安全与技术发布报告

日期：2026-10-31。继续 PR #1；不合并、不部署，不改变 UI。

## 公告与修复矩阵

当前版本列同时记录修复前与目标安装版本。每条编号链接到本次阅读的公告；同一漏洞沿传递链产生多个 npm 告警，不应当成不同漏洞。

| 依赖 | 漏洞编号 | 当前版本（前 → 后） | 公告修复版本 | 实际暴露条件 | 状态 |
|---|---|---|---|---|---|
| katex | [GHSA-238p-pmpm-9mq7](https://github.com/advisories/GHSA-238p-pmpm-9mq7) | 0.16.47 → 0.18.2 | 0.18.2 | 已存在原型污染或选项原型可控，结合恶意公式及未消毒输出可绕过 trust；公式构建时处理，仍更新并加针对性回归。 | 已安装修复版本；完整回归见下表 |
| next | [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw) | 15.5.27 → 15.5.28 | 15.5.28 | 在线 Next 服务端路径；本项目 export、images.unoptimized=true，无部署 Node 服务端或 Server Actions，仍更新补丁。 | 已安装修复版本；完整回归见下表 |
| next | [GHSA-p3m5-59mp-jv5r](https://github.com/advisories/GHSA-p3m5-59mp-jv5r) | 15.5.27 → 15.5.28 | 15.5.28 | 在线 Next 服务端路径；本项目 export、images.unoptimized=true，无部署 Node 服务端或 Server Actions，仍更新补丁。 | 已安装修复版本；完整回归见下表 |
| postcss | [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) | 8.4.31（Next 内嵌）；根 8.5.29 → 全部 8.5.29 | 8.5.10 | 恶意 CSS / sourceMappingURL 在构建进程读取文件或被嵌入 HTML；站点无访客 CSS 输入，但第三方构建依赖仍需修复。 | 已安装修复版本；完整回归见下表 |
| postcss | [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q) | 8.4.31（Next 内嵌）；根 8.5.29 → 全部 8.5.29 | 8.5.12 | 恶意 CSS / sourceMappingURL 在构建进程读取文件或被嵌入 HTML；站点无访客 CSS 输入，但第三方构建依赖仍需修复。 | 已安装修复版本；完整回归见下表 |
| postcss | [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) | 8.4.31（Next 内嵌）；根 8.5.29 → 全部 8.5.29 | 8.5.23 | 恶意 CSS / sourceMappingURL 在构建进程读取文件或被嵌入 HTML；站点无访客 CSS 输入，但第三方构建依赖仍需修复。 | 已安装修复版本；完整回归见下表 |
| postcss | [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) | 8.4.31（Next 内嵌）；根 8.5.29 → 全部 8.5.29 | 8.5.18 | 恶意 CSS / sourceMappingURL 在构建进程读取文件或被嵌入 HTML；站点无访客 CSS 输入，但第三方构建依赖仍需修复。 | 已安装修复版本；完整回归见下表 |
| postcss-selector-parser | [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) | 6.1.4 → 6.1.5 | 6.1.5 / 7.1.6 | 同步处理攻击者可控选择器耗尽 CPU；仅构建受版本控制的 CSS，不提供在线解析入口。 | 已安装修复版本；完整回归见下表 |
| rehype-katex | GHSA-238p-pmpm-9mq7（传递） | 7.0.1（保留） | 传递 KaTeX ≥0.18.2 | 继承 KaTeX 上述前提，无独立公告 | 统一使用 0.18.2，已修复传递告警 |
| remark-math | GHSA-238p-pmpm-9mq7（传递） | 6.0.0（保留） | 传递 KaTeX ≥0.18.2 | 继承 KaTeX 上述前提，无独立公告 | 统一使用 0.18.2，已修复传递告警 |
| micromark-extension-math | GHSA-238p-pmpm-9mq7（传递） | 3.1.0（保留） | 传递 KaTeX ≥0.18.2 | 继承 KaTeX 上述前提，无独立公告 | 统一使用 0.18.2，已修复传递告警 |

rehype-katex 7.0.1、remark-math 6.0.0、micromark-extension-math 3.1.0 无独立公告；原 4 low 来自 KaTeX 及其父依赖传播，保留插件版本，统一覆盖 KaTeX。

## 兼容性决定

Next 与 eslint-config-next 保持 15.5 补丁系列。Next 15.5.28 仍声明 postcss 8.4.31，因此通过 scoped override 使用项目直接依赖 PostCSS 8.5.29，避免保留隐藏旧副本。选择器解析器只升 6.1.5，同主版本。

KaTeX 0.16 → 0.18 超出插件声明的 ^0.16 范围，因此属于显式兼容性覆盖，不是普通补丁。已检查两个消费者只调用 renderToString；保留现有选项、默认导出及 dist/katex.min.css 入口，并让 CSS 与 HTML 渲染共用同一直接依赖版本。锁定最小安全版 0.18.2；不降级 remark/rehype，不盲目采用 audit fix --force。数学 MathML、行内/块公式、静态字体资源、真实文章及两主题回归是此覆盖的发布门槛。额外测试模拟继承的 trust=true，确认不能生成受信任链接。后续插件原生支持时应移除覆盖。

## 新发现的中危告警

[minimatch GHSA-g3hv-75wg-m249 / CVE-2026-118764](https://github.com/advisories/GHSA-g3hv-75wg-m249)：当前 3.1.5 / 10.2.5，修复版 11.0.1。恶意 glob 且高优化级别可能造成构建工具 CPU/内存放大。仅 ESLint 工具链使用；模式来自仓库配置和固定 lint 命令，无浏览器或用户可提交 glob 的接口。保留告警；不将调用式 minimatch 3 API 强制替换成新主版本对象导出，也不忽略 audit 条目。仅在已审查仓库和依赖上构建；审查配置变更，继续跟进工具链原生升级。此中危项不被宣称修复，不作为服务端漏洞不可达性的替代。

## 公开证据与真实性

历史日志中的本机绝对路径已替换成 <workspace>/；保留退出码、测试结果与失败原因。已人工查看现有截图，均为匿名公开 Demo / 作品页面，无登录凭据或本机 UI；检查 PNG 不携带个人路径元数据。扫描常见 token、私钥、Bearer、API key 格式及路径，并人工复核。不能将有限扫描说成全面安全审计。历史提交仍保留原日志版本；未发现凭证，未重写 Git 历史。

团队项目、个人贡献待补充、Agent 原有七项测试未复跑、词典与市场评分边界均保留。本次安全回归只针对作品网站，不验证 Agent 后端。

审计复核：原 7 个告警全部消除。当前 npm audit 完整报告仍为 14 Moderate、0 High、0 Critical、0 Low，14 个节点均传播自 minimatch 的同一公告；生产依赖审计为 0。audit 退出码 1 是被保留的真实残余风险，不是测试执行错误。证据见 verification/dependency-audit-after.json、dependency-audit-production.json、security-versions.log。

minimatch 3 的可调用 API 由 eslint-plugin-react 的 forbid-component-props/jsx-handler-names 等规则实际使用；强制换成 11 的导出会破坏消费者。升级应由 ESLint、相关插件与 typescript-eslint 一起迁移，而不是全局 override。当前固定 CLI、无不可信 glob 接口的边界仅适用于此仓库；未来新增上传、在线 lint 或第三方配置时需重新评估。

## 发布适用范围与人工待办

技术判断只适用于锁文件固定依赖、受审查源码、静态 GitHub Pages 发布及既有功能。minimatch 中危属于仍存在的开发工具链风险：本次不宣称零漏洞；如引入不可信 glob、远程 lint 服务或自动执行外部配置，需要暂停使用并重新评估。维护者应跟踪兼容 minimatch 11 的上游工具链迁移。

个人贡献、团队署名、Agent 七项原始测试和 Windows/Linux 记录仍待本人补充，不能称为已验证；不是本轮网站技术检查通过的证明。外部 Demo 本轮回归链接属性和目标地址，沿用此前匿名交互日志，未重复对 Agent 服务做全功能验收。发布或合并仍需要用户明确授权。

## 最终回归与技术发布状态

| 检查 | 结果 | 证据（verification/） |
|---|---|---|
| npm ci | PASS，退出码 0 | security-final-ci.log / security-status.log |
| 全量 npm audit --json | 原告警已修复；残余 minimatch：14 Moderate，退出码 1 | dependency-audit-after.json |
| npm audit --omit=dev --json | 0，仅补充证据，不替代全量报告 | dependency-audit-production.json |
| npm run lint / typecheck | PASS，均退出码 0 | security-lint.log / security-typecheck.log |
| npm run build / npm run test | PASS，28/28（原有 27 + 新增安全回归） | security-build.log / security-test.log |
| Pages 子路径构建 / E2E | PASS，28/28 | security-pages-build.log / security-pages-test.log |
| 路径、凭证模式、PNG 元数据检查 | PASS，无命中；结合人工截图复核 | security-privacy-check.json |

**READY TO MERGE（技术发布状态）**。原 Critical / High 全部通过版本修复；保留已披露的 minimatch 中危开发工具链风险，不宣称零漏洞。判断依据包含公告、真实依赖树、静态暴露条件、两路径全站回归、针对性安全测试和公开证据检查。src 与 public 和 4dca4c8 相同，未进行视觉重构。未合并、部署或更改 Pages 设置。
