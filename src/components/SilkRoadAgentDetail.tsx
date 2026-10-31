import Image from "next/image";
import { SilkRoadContribution } from "@/components/SilkRoadContribution";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import type { Project } from "@/data/projects";
import { assetPath } from "@/lib/site";

const scenarios = [
  {
    stage: "01 / PRE-LIVE",
    name: "直播前",
    question: "如何把商品信息变成适合中国观众的故事与话术？",
    solution: "整理文化背景、本地化表达、规则风险提示和活动流程。",
  },
  {
    stage: "02 / IN-LIVE",
    name: "模拟直播中",
    question: "如何快速理解中文观众的问题并判断回应顺序？",
    solution: "通过模拟评论流进行分类、优先级判断与主播建议。",
  },
  {
    stage: "03 / POST-LIVE",
    name: "直播后",
    question: "如何从商品信息快速起草多平台传播内容？",
    solution: "生成不同平台的传播草稿与双语字幕模板。",
  },
];

const experiences = [
  {
    number: "01",
    name: "直播前方案",
    description:
      "输入商品信息，生成文化故事、直播话术、规则风险提示、活动流程及短视频文案。",
    note: "使用实际 Python 工作流，公开模式输出来自规则与模板。",
  },
  {
    number: "02",
    name: "模拟直播间",
    description:
      "分批展示模拟评论，进行意图分类、优先级判断、英文词典翻译与主播行动建议，并支持手动输入。",
    note: "这是模拟评论，不是实时平台弹幕；词典外的句子明确标记为不支持翻译。",
  },
  {
    number: "03",
    name: "直播后传播",
    description:
      "不依赖前两步，独立生成抖音、小红书、视频号文案与双语字幕模板。",
    note: "仅提供待人工审核的传播草稿，不保证直接发布效果。",
  },
];

const workflow = [
  "商品 / 评论输入",
  "输入校验",
  "原有 Agent 工作流",
  "规则与模板处理",
  "结构化结果",
  "可读界面 / Markdown 导出",
];

const engineering = [
  {
    title: "复用业务工作流",
    detail:
      "Streamlit 直接复用 Python 业务工作流，避免在 Web 层重写规则造成行为分歧。三个入口分别接收所需输入，直播后流程不依赖前两步结果。具体函数边界待源码证据补充。",
  },
  {
    title: "公开演示零模型成本",
    detail:
      "按项目说明，公开模式在服务端隔离外部模型请求，以避免访客承担 Key 配置与模型调用费用；结果由本地规则、内置数据和模板产生。隔离实现仍需代码证据核对。",
  },
  {
    title: "输入与会话边界",
    detail:
      "按项目说明，输入限制长度，动态文本安全渲染，错误反馈隐藏内部细节；每个访客使用独立 Session。长度阈值、异常分支与隔离测试仍待源码和测试记录核对。",
  },
  {
    title: "跨平台验证",
    detail:
      "项目交付说明记录了 Windows 本地验证、Linux Python 3.12 CI 及桌面和手机交互检查。本次仅验证作品网站；Agent 的命令、环境日志与 CI 链接待补充，不据此宣称本次已复测。",
  },
];

engineering.push({
  title: "翻译失败也必须可识别",
  detail:
    "词典匹配只支持覆盖范围内的评论。未命中时应明确提示不支持，保留原文供主播判断，避免将原文或不可靠结果标记为翻译成功；2026-10-31 匿名会话已抽样验证词典外评论的提示行为。",
});

const boundaries = [
  "公开 Demo 不调用外部大模型，不能将模板结果等同于生成式模型推理。",
  "英文评论翻译只覆盖内置词典；超出覆盖范围会明确提示不支持。",
  "市场评分模块待完善，不宣称具备智能市场预测能力。",
  "传播文案与双语字幕仅为需要人工审核的模板草稿。",
  "直播间使用模拟评论，不代表网站接入了真实平台弹幕。",
  "不宣称生产级、高并发、商业落地或完整多语言翻译能力。",
];

export function SilkRoadAgentDetail({ project }: { project: Project }) {
  const demoUrl = project.demoUrl;
  const cover = project.screenshots[0];

  return (
    <main>
      <Navbar />
      <article className="section-shell max-w-6xl">
        <Link className="text-sm font-bold text-clay" href="/projects">
          ← 全部项目
        </Link>

        <header className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="section-kicker">
              FEATURED PROJECT / AI AGENT · TEAM PROJECT
            </p>
            <p className="mb-3 text-sm font-semibold text-clay">
              Silk Road Agent · 丝路跨境直播智能助理
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              跨越语言，让好物被理解。
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/75">
              为跨境主播提供文化故事与本地化话术、中文评论分类与翻译辅助，以及多平台传播文案。
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="技术栈">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-ink/15 bg-cream px-3 py-1.5 font-mono text-xs font-semibold text-ink"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {demoUrl && (
                <a
                  className="button-primary"
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try the Agent · 在线体验 ↗
                </a>
              )}
              <a className="button-secondary" href="#experience">
                了解三条体验 ↓
              </a>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink/75">
              公开 Demo 使用规则与模板，无需提供 API
              Key；2026-10-31 已以匿名会话检查三个入口与样例交互。
            </p>
          </div>

          {cover && (
            <figure className="min-w-0 overflow-hidden rounded-2xl border border-ink/15 bg-paper shadow-soft">
              <Image
                className="w-full"
                src={assetPath(cover.src)}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                priority
              />
              <figcaption className="px-4 py-3 text-xs leading-5 text-ink/75">
                {cover.caption}
              </figcaption>
            </figure>
          )}
        </header>

        <section id="scenarios" className="mt-20 scroll-mt-8">
          <p className="section-kicker">USE CASES / 使用场景</p>
          <h2 className="section-title">一场跨境直播，三个需要被解决的问题</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {scenarios.map((item) => (
              <div
                key={item.stage}
                className="rounded-2xl border border-ink/15 bg-paper p-6"
              >
                <p className="font-mono text-xs font-semibold text-clay">
                  {item.stage}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-ink">
                  {item.name}
                </h3>
                <p className="mt-4 font-semibold leading-7 text-ink">
                  {item.question}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink/70">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="mt-20 scroll-mt-8">
          <p className="section-kicker">TRY THE WORKFLOWS / 在线体验</p>
          <h2 className="section-title">三条独立流程，从输入走到结果</h2>
          <p className="mt-4 max-w-3xl leading-8 text-ink/70">
            实际操作由独立部署的 Streamlit
            应用承载。本作品网站不复制后端，也不使用 iframe。
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {experiences.map((item) => (
              <div
                key={item.number}
                className="flex flex-col rounded-2xl border border-ink/15 bg-paper p-6"
              >
                <span className="font-mono text-3xl font-bold text-clay">
                  {item.number}
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink">{item.name}</h3>
                <p className="mt-3 flex-1 leading-8 text-ink/75">
                  {item.description}
                </p>
                <p className="mt-5 border-t border-ink/10 pt-4 text-sm leading-6 text-ink/75">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
          {demoUrl && (
            <a
              className="button-primary mt-8"
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              打开交互 Demo ↗
            </a>
          )}
        </section>

        <section id="engineering" className="mt-20 scroll-mt-8">
          <p className="section-kicker">ENGINEERING / 工程实现</p>
          <h2 className="section-title">让多个能力按正确顺序协作</h2>
          <p className="mt-4 max-w-3xl leading-8 text-ink/70">
            以下链路依据项目交付说明整理，说明系统职责划分；具体技术实现与测试证据仍待补充。
          </p>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {workflow.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-3 rounded-xl border border-ink/15 bg-cream p-4"
              >
                <span className="font-mono text-xs font-bold text-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold leading-6 text-ink">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {engineering.map((item) => (
              <div
                key={item.title}
                className="border-l-2 border-clay py-2 pl-5"
              >
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 leading-7 text-ink/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <SilkRoadContribution />

        <section id="verification" className="mt-20 scroll-mt-8">
          <p className="section-kicker">VERIFICATION / 验证与边界</p>
          <h2 className="section-title">证明做到了什么，也说明还没做到什么</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-2xl border border-ink/15 bg-paper p-6">
              <p className="font-mono text-xs font-bold text-clay">
                PROJECT DELIVERY RECORD
              </p>
              <p className="mt-5 text-4xl font-black text-ink">
                7
                <span className="ml-2 text-base font-semibold">
                  项自动化集成测试
                </span>
              </p>
              <p className="mt-3 leading-7 text-ink/75">
                据项目交付记录，以上测试已通过；同时已进行桌面与手机尺寸的浏览器交互检查。
                这些是 Agent
                项目的验收记录，不代表本作品页面已独立完成相同测试。
              </p>
              <p className="mt-4 text-sm leading-6 text-ink/75">
                公开模式：本地规则、内置数据与模板。无需访客提供 API
                Key，不调用外部大模型。
              </p>
            </div>
            <div className="rounded-2xl border border-ink/15 bg-paper p-6">
              <h3 className="text-xl font-bold text-ink">能力边界</h3>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-ink/75">
                {boundaries.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-2xl border border-ink/15 bg-cream p-6 sm:p-9">
          <p className="section-kicker">CONTRIBUTION / 项目归属</p>
          <h2 className="text-2xl font-bold text-ink">
            团队项目，个人贡献待补充
          </h2>
          <p className="mt-3 max-w-3xl leading-8 text-ink/75">
            {project.myRole}
          </p>
          <p className="mt-3 text-sm leading-7 text-ink/75">
            待补充：本人负责的模块、代码或设计决策、具体遇到的工程问题与解决过程。
          </p>
        </section>

        <footer className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-ink/15 pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-bold text-ink">想看看它怎么工作？</p>
            <p className="mt-1 text-sm text-ink/75">
              打开独立的 Streamlit 应用，体验真实交互流程。
            </p>
          </div>
          {demoUrl && (
            <a
              className="button-primary"
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              打开交互 Demo ↗
            </a>
          )}
        </footer>
      </article>
    </main>
  );
}
