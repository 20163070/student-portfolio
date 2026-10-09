import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import type { Project } from "@/data/projects";
import { assetPath } from "@/lib/site";

export function WorkDetail({ p }: { p: Project }) {
  const coursework = p.kind === "coursework";
  return (
    <main>
      <Navbar />
      <article className="section-shell max-w-4xl">
        <Link
          className="text-sm font-bold text-clay"
          href={coursework ? "/coursework" : "/projects"}
        >
          ← {coursework ? "全部作业" : "全部项目"}
        </Link>
        <p className="section-kicker mt-10">
          {coursework ? "Coursework / 2026 Autumn" : "Project Case Study"}
        </p>
        <h1 className="break-words text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {p.name}
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">{p.summary}</p>
        <p className="mt-4 text-sm font-semibold text-clay">{p.status}</p>
        <ul
          className="mt-5 flex flex-wrap gap-2"
          aria-label={coursework ? "学习主题" : "技术栈"}
        >
          {p.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-cream px-3 py-1 text-sm text-ink"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.githubUrl && (
            <a className="button-primary" href={p.githubUrl}>
              GitHub 源代码 ↗
            </a>
          )}
          {p.documents?.[0] && (
            <a className="button-primary" href={assetPath(p.documents[0].url)}>
              查看我的解答 PDF ↗
            </a>
          )}
          {p.documents && (
            <a className="button-secondary" href="#documents">
              作业题目与课程指南 ↓
            </a>
          )}
          {p.demoUrl && (
            <a className="button-secondary" href={p.demoUrl}>
              已配置的网站地址 ↗
            </a>
          )}
        </div>
        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-ink">
              {coursework ? "作业背景 / Assignment" : "问题 / Problem"}
            </h2>
            <p className="mt-4 leading-8 text-ink/70">{p.problem}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-ink">个人角色 / My Role</h2>
            <p className="mt-4 rounded-xl border border-ink/10 bg-paper p-5 leading-8 text-ink/70">
              {p.myRole}
            </p>
          </section>
          {(
            [
              [
                coursework ? "学习内容 / Topics" : "架构 / Architecture",
                p.architecture,
              ],
              [
                coursework ? "分析重点 / Focus" : "工程难点 / Challenges",
                p.challenges,
              ],
              [
                coursework ? "作品说明 / Work" : "可核实结果 / Results",
                p.results,
              ],
            ] as const
          ).map(([title, items]) => (
            <section key={title}>
              <h2 className="text-2xl font-bold text-ink">{title}</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-ink/70">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
          <section>
            <h2 className="text-2xl font-bold text-ink">
              {coursework ? "手写解答预览 / Preview" : "项目截图 / Screenshots"}
            </h2>
            {p.screenshots.length ? (
              p.screenshots.map((shot) => (
                <figure className="mt-5" key={shot.src}>
                  <Image
                    className="w-full rounded-xl border border-ink/10"
                    src={assetPath(shot.src)}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                  />
                  <figcaption className="mt-2 text-sm text-ink/70">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))
            ) : (
              <p className="mt-4 leading-8 text-ink/70">
                暂无可公开的脱敏截图。
              </p>
            )}
          </section>
          {p.documents && (
            <section id="documents">
              <h2 className="text-2xl font-bold text-ink">
                原始文件 / Documents
              </h2>
              <p className="mt-3 leading-7 text-ink/70">
                解答为本人作品；作业题目与指南为课程材料。指南要求概念题每题不超过
                100 词、按要点简答，计算题列出关键步骤和结果。
              </p>
              <ul className="mt-5 space-y-4">
                {p.documents.map((document) => (
                  <li
                    className="rounded-xl border border-ink/10 bg-paper p-5"
                    key={document.url}
                  >
                    <p className="font-bold text-ink">{document.label}</p>
                    <p className="mt-2 text-sm text-ink/70">
                      {document.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-5 text-sm font-semibold text-clay">
                      <a
                        className="underline underline-offset-4"
                        href={assetPath(document.url)}
                      >
                        查看 PDF ↗
                      </a>
                      <a
                        className="underline underline-offset-4"
                        href={assetPath(document.url)}
                        download
                      >
                        下载 PDF ↓
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {p.evidence.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-ink">实现依据</h2>
              <p className="mt-3 text-sm text-ink/70">
                依据项目源代码与部署工作流整理；远程链接可能随仓库更新。
              </p>
              <ul className="mt-4 space-y-3">
                {p.evidence.map((source) => (
                  <li key={source.url}>
                    <a
                      className="font-semibold text-clay underline underline-offset-4"
                      href={source.url}
                    >
                      {source.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
