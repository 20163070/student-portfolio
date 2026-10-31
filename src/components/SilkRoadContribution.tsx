import { commentEvidence } from "@/data/silk-road-evidence";

export function SilkRoadContribution() {
  return (
    <section id="contribution-evidence" className="mt-20 scroll-mt-8">
      <p className="section-kicker">MY CONTRIBUTION / 我的技术贡献</p>
      <h2 className="section-title">技术 C：主播端展示面板 + 评论分类</h2>
      <p className="mt-4 max-w-3xl leading-8 text-ink/75">我的任务分工是评论翻译辅助面板、意图分类、重要评论高亮，以及刷新、暂停与清屏交互。以下用本地源码快照和实际调用结果说明这部分工程设计；代码作者与提交归属尚不能独立核验。</p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {[
          { title: "A / Comment Classification", detail: "classify_comment 对每条规则统计命中的不同关键词数，取得分最高的意图；同分保留前序规则。优先级取自规则表，不是概率模型。", note: "价格、物流、口味、购买意向、负面反馈、文化兴趣、合规、无关闲聊，以及兜底“其他”。confidence 只是命中数分档。" },
          { title: "B / Live Dashboard", detail: "Session State 分开保存暂停标志、看板列表、单条结果与批量结果。high 评论采用红色边框、浅红背景和“高优先级”标题，批量结果按优先级排序。", note: "刷新只触发 rerun；暂停阻止看板列表更新，不会阻止分类和翻译。清屏删除列表及结果缓存，继续则恢复更新。不是实时平台接入。" },
          { title: "C / Engineering Decisions", detail: "将分类、翻译、编排与看板格式化拆成模块，以结构化输入输出衔接。规则容易解释和离线复现，但依赖词表覆盖及子串匹配。", note: "真实缺口：“我想买这个”漏判为其他；“火星量子香蕉”因“香”误判为口味。旧建议模板键未同步规范化意图，部分建议落入通用兜底。" },
        ].map((item) => <div key={item.title} className="rounded-2xl border border-ink/15 bg-paper p-6"><h3 className="text-lg font-bold text-ink">{item.title}</h3><p className="mt-4 leading-7 text-ink/75">{item.detail}</p><p className="mt-4 border-t border-ink/10 pt-4 text-sm leading-7 text-ink/75">{item.note}</p></div>)}
      </div>
      <ol aria-label="评论处理调用链" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {["手动 / 模拟评论 → LiveComment", "run_live_comment_workflow → 单条辅助", "classify_comment → 意图 + 优先级", "translate_comment → 词典 / fallback", "LiveCommentAssistOutput → 面板数据", "Session State → 高亮 / 过滤展示"].map((step, i) => <li key={step} className="min-w-0 rounded-xl border border-ink/15 bg-cream p-4 text-sm leading-7 text-ink [overflow-wrap:anywhere]"><span className="mr-3 font-mono font-bold text-clay">0{i + 1}</span>{step}</li>)}
      </ol>
      <h3 className="mt-10 text-2xl font-bold text-ink">七条评论，保留真实结果</h3>
      <p className="mt-3 leading-7 text-ink/75">本地快照，English、use_llm=False，直接运行分类与单条辅助函数，不调用外部模型。下列结果不是在线 Demo 的回放，也不是七项原始测试。</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {commentEvidence.map((item) => <article key={item.text} className="rounded-xl border border-ink/15 bg-paper p-5"><h4 className="font-bold text-ink">{item.text}</h4><p className="mt-2 font-mono text-sm text-clay">{item.intent} · {item.priority} · confidence: {item.confidence}</p><p className="mt-3 break-words text-sm leading-7 text-ink/75">{item.translation}</p><p className="mt-2 text-sm leading-6 text-ink/75">{item.translationStatus === "dictionary" ? "词典命中；不等于人工翻译质量通过" : "未翻译：快照仅添加 [English] 前缀并保留原文"}</p></article>)}
      </div>
      <aside className="mt-6 rounded-xl border border-ink/15 bg-cream p-5 text-sm leading-7 text-ink/75">证据边界：三份 ZIP 中两份相同；归档注释含 commit 标识，但无 .git 历史，无法确认 develop Commit 或代码作者。本地快照存在翻译失败提示、动态 HTML 转义和暂停语义等缺口，不能用它证明公开 Demo 的安全隔离实现。直播后 short_video_copy 模块可核实为多平台模板拼接，但我的选做贡献仍待确认。</aside>
    </section>
  );
}
