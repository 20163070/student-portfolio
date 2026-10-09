import Image from "next/image";
import Link from "next/link";
import type { Coursework } from "@/data/coursework-types";
import { coursework } from "@/data/coursework";
import { assetPath } from "@/lib/site";
import {
  courseFolderHref,
  courseworkHref,
  getCourse,
  getRelatedCoursework,
  semesterId,
  unknownSemester,
} from "@/lib/coursework";
import { Navbar } from "./Navbar";
import { CourseworkDocuments } from "./CourseworkDocuments";

export function CourseworkDetail({ work }: { work: Coursework }) {
  const course = getCourse(work.courseId);
  const related = getRelatedCoursework(coursework, work);
  const solution = work.documents.find(
    (document) => document.role === "solution",
  );
  return (
    <main>
      <Navbar />
      <article className="section-shell max-w-4xl">
        <Link className="text-sm font-bold text-clay" href="/coursework">
          ← 全部作业
        </Link>
        <nav aria-label="面包屑" className="mt-6 text-sm leading-7 text-ink/70">
          <ol className="flex flex-wrap gap-x-2">
            <li>
              <Link className="text-clay hover:underline" href="/coursework">
                Coursework
              </Link>
            </li>
            <li>
              <span aria-hidden="true" className="mr-2">
                /
              </span>
              <Link
                className="text-clay hover:underline"
                href={
                  "/coursework/?" +
                  new URLSearchParams({ semester: semesterId(work) }).toString()
                }
              >
                {work.semester || unknownSemester}
              </Link>
            </li>
            <li>
              <span aria-hidden="true" className="mr-2">
                /
              </span>
              <Link
                className="text-clay hover:underline"
                href={courseFolderHref(work)}
              >
                {course.name}
              </Link>
            </li>
            <li aria-current="page">
              <span aria-hidden="true" className="mr-2">
                /
              </span>
              {work.assignmentNumber || work.title}
            </li>
          </ol>
        </nav>
        <p className="section-kicker mt-8">Coursework</p>
        <h1 className="break-words text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {work.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">{work.summary}</p>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm leading-6 text-ink/70">
          <div>
            <dt className="font-semibold text-ink">课程</dt>
            <dd>
              {course.name}
              {course.englishName && " / " + course.englishName}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">学期</dt>
            <dd>{work.semester || unknownSemester}</dd>
          </div>
          {(work.date || work.dateLabel) && (
            <div>
              <dt className="font-semibold text-ink">日期</dt>
              <dd>
                {work.date ? (
                  <time dateTime={work.date}>{work.date}</time>
                ) : (
                  work.dateLabel + "（年份待确认）"
                )}
              </dd>
            </div>
          )}
          {work.updatedAt && (
            <div>
              <dt className="font-semibold text-ink">更新</dt>
              <dd>
                <time dateTime={work.updatedAt}>{work.updatedAt}</time>
              </dd>
            </div>
          )}
        </dl>
        <p className="mt-4 text-sm font-semibold text-clay">{work.status}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="学习主题">
          {work.tags.map((tag) => (
            <li
              className="rounded-md bg-cream px-3 py-1 text-sm text-ink"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {solution && (
            <a className="button-primary" href={assetPath(solution.url)}>
              打开我的解答 ↗
            </a>
          )}
          <a className="button-secondary" href="#documents">
            查看题目与附件 ↓
          </a>
        </div>
        <section className="mt-10" id="documents">
          <h2 className="text-2xl font-bold text-ink">原始文件 / Documents</h2>
          <p className="mt-3 text-sm leading-7 text-ink/70">
            {work.documentNote ?? "个人解答与配套材料分开标注。"}
          </p>
          <CourseworkDocuments documents={work.documents} />
          {!work.documents.length && (
            <p className="mt-4 text-sm leading-7 text-ink/70">
              暂无公开附件。后续添加文件后会在此显示。
            </p>
          )}
        </section>
        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-ink">
              作业背景 / Assignment
            </h2>
            <p className="mt-4 leading-8 text-ink/70">{work.background}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-ink">个人角色 / My Role</h2>
            <p className="mt-4 rounded-xl border border-ink/10 bg-paper p-5 leading-8 text-ink/70">
              {work.myRole}
            </p>
          </section>
          {(
            [
              ["学习内容 / Topics", work.topics],
              ["分析重点 / Focus", work.focus],
              ["作品说明 / Work", work.notes],
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
          {work.screenshots.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-ink">
                作业预览 / Preview
              </h2>
              {work.screenshots.map((shot) => (
                <figure className="mt-5" key={shot.src}>
                  <Image
                    className="w-full rounded-xl border border-ink/10"
                    src={assetPath(shot.src)}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                  />
                  <figcaption className="mt-2 text-sm leading-6 text-ink/70">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </section>
          )}
          {related.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-ink">同课程的其他作业</h2>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      className="font-semibold text-clay underline underline-offset-4"
                      href={courseworkHref(item)}
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm leading-6 text-ink/70">
                      {item.summary}
                    </p>
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
