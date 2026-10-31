# 技术 C：本地源码审计与贡献证据

## 来源与归属

仅分析本地下载 ZIP，未访问 Gitee。三份归档原件未改动，安全解压到 Portfolio 外独立目录；检查路径越界与符号链接。agent-master (1).zip 与 (2).zip SHA-256 相同，agent-master.zip 为另一快照。哈希见 verification/agent-snapshot-manifest.json。归档无 .git 历史、分支引用或测试目录；ZIP 注释含 commit 标签：(1)/(2) 为 366db2760ea4d48c5dbe211903fabe8656bffd07，另一份为 18dbe7a9e81b732d8b06496caae226848bdd461c。这仅是归档声明，未验证 Git commit 对象、develop 归属或父子关系。README、AGENT.md、模型、工作流及依赖已阅读。不能确认 develop 对应 Commit，不能证明作者身份。文件夹名 master 不能当作 develop 证据。

用户提供的分工：技术 C——直播中翻译辅助面板、意图分类、重要评论高亮、刷新/暂停/清屏。源码能证明这些功能存在，不足以证明这些代码由本人提交；没有可独立验证作者归属的部分。直播后文案是选做，不能归为本人已完成贡献。需要开发提交、本人账号映射、分工文档或队友确认。

采用带 use_llm 开关的 (1) 快照。另一快照的 app、分类、面板、短视频代码相同；差异为 desktop_qt.py、translator/callApi.py 及三个单条工作流/翻译函数的 use_llm 参数传递。未执行桌面、OCR、外部翻译服务。没有将任一快照等同线上部署版本。

## 真实调用链（行号针对选定快照）

1. app.py:345–362：文本区 → strip / 非空检查 → LiveComment → LiveCommentAssistInput → run_live_comment_workflow → single_comment_result。src/models.py:55–78 定义输入输出；无 max_length，不是完整输入安全校验。
2. src/agent_workflow.py:62 run_live_comment_workflow → src/modules/live_comment_assist.py:21 run_live_comment_assist → comment_intent.py:47 classify_comment + comment_translate.py:78 translate_comment → LiveCommentAssistOutput。批量入口 workflow:67 → assist:49；逐条处理后 high/medium/low 排序（同优先级保留顺序）。
3. comment_intent.py:18–31 _INTENT_RULES；classify_comment:47 对每类统计命中的关键词条目数，最高分胜出，同分前序优先。关键词为子串匹配，不分词、无训练或语义模型；重复同一词不增加次数，但重叠关键词可分别计分。normalize_intent:42 映射旧名称。七核心类为价格、物流、口味、购买意向、负面反馈、文化兴趣、合规；另有无关闲聊及其他。CORE_INTENTS 过滤列表仅列七类。confidence 根据命中数 0/1/≥2 对应 low/medium/high，不是概率。
4. 优先级取自命中规则：文化兴趣 medium、闲聊 low，其余规则 high；未命中其他 medium。不是根据队列负载动态调权。app.py:412–434 统计并默认过滤为高+中。
5. live_comment_panel.py:27 result_to_panel_item → format_comment_title:46；high 使用“高优先级”，其他使用意图标签。app.py:532 _render_comment_card 使用 badge 与 error/warning/info；:546 _render_panel_item 高优先级红边 #f04f4f、浅红 #fff5f5。不是只有颜色，标题也提示优先级。
6. app.py:293–315 初始化 live_panel_paused=False、live_comments=[]。刷新 st.rerun()，没有拉取新平台评论或计时轮询。暂停/继续切换布尔值后 rerun。清屏清空列表并删除 single_comment_result/mock_results/mock_total，但不清除 pre_result、表单、暂停或筛选状态。
7. app.py:352–405：暂停不阻止调用分类和翻译，仍可更新结果区；只阻止 live_comments 更新。继续后缓存的单条结果可重新插入列表；批量赋值仅发生在点击批量按钮且未暂停时，不是通用待消费队列。单条通过字典相等去重，不是稳定评论 ID；批量替换列表，不是持续追加。Session State 为会话存储，未发现跨会话验证测试。
8. comment_translate.py:78：精确原文词典匹配 → 可选模型 → except Exception 吞掉错误 → 返回 [Language] 原文。不是翻译成功状态，输出模型没有独立成功字段；界面只展示字符串。use_llm=False 的单条链可禁用模型，但批量函数没有透传此开关，app 默认调用也未传 False。不能证明本快照强制隔离外部模型请求。
9. assist.py:7–18 _ACTION_TEMPLATES 使用“价格问题/物流问题/产品口味…”旧键，而分类已返回价格/物流/口味，故这些意图会取通用建议。真实案例保留结果，未为展示修改 Agent。
10. short_video_copy.py:6 generate_short_video_copy：商品字段插值生成抖音、小红书、视频号标题/正文/标签，字幕样例、评论回复、预告与高光模板。live_plan 参数没有读取；不是从真实直播抽取高光。_build_bilingual_sample:95 的英文槽保留部分中文字段，营销及个人体验表述需审核。workflow:86 可独立调用，但本快照 app.py:460 的 Tab 依赖 pre_result，不能以其证明 UI 三条独立入口。

## 工程能力：问题 → 方法 → 关键代码 → 结果 → 局限

| 能力 | 问题与方法 | 关键代码 | 可核实结果 | 局限 |
|---|---|---|---|---|
| 模块化 | 将 UI 与业务职责拆开，模型承接数据 | workflow:62 / assist:21 / models:64 | 单条函数可无 UI 执行 | 缺少作者和原始测试证据 |
| 规则分类 | 以可解释命中数决策类别 | comment_intent:47 | 七条实际结果可复现 | 子串误判、购买表述漏判；无训练指标 |
| 优先级 | 用业务类别映射三档，批量排序 | _INTENT_RULES / assist:49 | 文化 medium、负面 high | 高档覆盖宽泛；无动态评分 |
| 状态管理 | 分离结果缓存和看板列表 | app:293–405 | 暂停时结果仍可生成，列表不更新 | 暂停语义不等同停止处理；缓存恢复存在差异 |
| 展示交互 | 红边+文字标题，默认高/中过滤 | app:412–434 / :546 | 源码可确认可视标识 | 未以真实浏览器运行该快照 UI |
| 降级处理 | 词典优先，模型异常回退 | translate:78 | 两条命中、五条保留原文 | 异常被吞，无结构化失败状态 |
| 模块集成 | 统一意图名称、结构化面板适配 | normalize_intent / result_to_panel_item | 规则与 UI 数据可转换 | 建议模板键未同步；动态 HTML 未转义 |

## 实际运行与问题

在现有 Python 环境直接导入原始函数，English / use_llm=False，调用 classify_comment、run_live_comment_assist；无外部请求、不安装/执行整个应用。原件与源码不修改；Python 可能生成的 __pycache__ 不属于源码修改。七条完整输出见 verification/agent-snapshot-cases.json。这是本轮七个样例的观测结果，不是原 Agent 七项自动测试通过声明。

- “这个多少钱？”→价格/high；“这个咖啡酸不酸？”→口味/high；“多久能到？”→物流/high。
- “我想买这个”→其他/medium，购买意向漏判。
- “质量太差了”→负面反馈/high；“这个产地有什么故事？”→文化兴趣/medium。
- “火星量子香蕉”→口味/high，因子串“香”误判。
- 仅咖啡与产地故事词典命中；其余返回 [English] 原文。咖啡英文将“酸不酸”扩展为酸或苦，词典命中不代表翻译质量验证通过。

安全边界：app.py:546 将原文/翻译插入 unsafe_allow_html=True，未看到转义；comment models 无长度限制；UI 无强制公开模式隔离。上述均是快照问题，不据此断言当前线上 Demo 具有相同缺陷。作品站仅以 React 转义文本展示本轮结果，不公开 Agent 源码、配置值或私有仓库入口。新增公开内容为函数名、行号、哈希、审计摘要和观察输出。

## 个人贡献总结与待确认

可以如实表述：“项目中我的分工为技术 C，聚焦评论分类和主播端面板；本地快照可核实关键词计分、优先级映射、Session State 和高亮交互的实现。”不能表述“Git 历史已证明全部由我开发”，也不能称为智能语义分类或生产级实时系统。待补：develop SHA、我的提交/账号、分工材料、选做文案的实际参与范围、对应版本测试与真实 UI 截图。本轮不修改 Agent 来修复审计发现。

补充调用位置：comment_source.py:81 get_mock_comments 构造内置 LiveComment 列表，:97 get_mock_comment_batch 随机抽样；当前 Tab 的批量按钮使用前者切片，未调用后者。翻译模型路径为 comment_translate.py:99 _translate_with_llm → llm_client.py:50 call_model；未配置 key/base/model 时抛 ModelClientNotConfiguredError，网络异常亦转换为该异常，再由翻译模块吞掉并降级。没有运行此网络路径。

归档元数据复核：ZIP 全局注释包含上述 SHA 格式标识，文件条目注释为空；不能将“没有 .git”扩大为“没有任何提交元数据”。已据此修正作品页。

## 网站修改与验证

从 Portfolio 3b1b1ce 创建 feature/silk-road-agent-contribution-evidence。新增 SilkRoadContribution.tsx，详情页在工程架构后显示三块技术贡献、调用链与七条真实输出；数据仅为观测结果，非私有源码。projects.ts 将分工更新为用户提供的技术 C，同时保留作者待核验。新增贡献证据浏览器测试；原 Demo URL、首页卡片、其他页面和部署配置不变。

| 验证 | 结果 | 证据（verification/） |
|---|---|---|
| 七条原函数输出复现 | 一致；不代表语义全部正确 | agent-snapshot-cases.json / run-agent-snapshot-cases.py |
| ZIP / 已审计源文件完整性 | PASS，原件与源码未变 | agent-snapshot-manifest.json |
| lint / typecheck | PASS，退出码 0 | contribution-final-lint.log / contribution-final-typecheck.log |
| 普通路径 build / test | PASS，29/29 | contribution-build.log / contribution-test.log |
| Pages 初轮 build / test | PASS，29/29 | contribution-pages-build.log / contribution-pages-test.log |
| 归档注释说明修正后 Pages 最终回归 | PASS，29/29；build/test 均退出码 0 | contribution-final-pages-build.log / contribution-final-pages-test.log / contribution-final-status.log |
| 手机浅色 / 桌面深色截图复核 | PASS，包含最终归档说明 | contribution-390-light.png / contribution-1366-dark.png |
| Agent 原始七项测试、快照 Streamlit UI、代码作者 | NOT VERIFIED | 归档不含测试或 Git 历史，未运行完整 Agent UI |

最终 Pages 全量回归包含原有博客、作业、搜索、数学渲染、四种宽度、两种主题、自动无障碍、外链及新增贡献检查。普通路径完整回归发生在 ZIP 注释说明修正前，修正仅涉及版本证据文案；最终文案已由 Pages 全量回归验证。未公开私有源码、密钥或内部配置值，日志路径已脱敏。归档 SHA 标签本身不包含作者证据。

未连接 Gitee，未修改原 Agent 代码，未合并 PR、修改部署分支或发布网站。仅推送新贡献分支；原 PR #1 保持原分支。
