"use client";

import Link from "next/link";
import { useMemo } from "react";
import { assetPath } from "@/lib/site";
import {
  groupCoursework,
  sortCoursework,
  type CourseworkListItem,
  type CourseworkSort,
} from "@/lib/coursework";
import { matchesSearch } from "@/lib/search-utils";
import { Highlight } from "./Highlight";
import { useUrlFilters } from "./useUrlFilters";

export function CourseworkExplorer({ items }: { items: CourseworkListItem[] }) {
  const { params, update } = useUrlFilters();
  const query = params.get("q") ?? "";
  const semester = params.get("semester") ?? "";
  const course = params.get("course") ?? "";
  const rawSort = params.get("sort");
  const sort: CourseworkSort =
    rawSort === "oldest" || rawSort === "course" ? rawSort : "updated";
  const groups = useMemo(() => groupCoursework(items), [items]);
  const results = useMemo(
    () =>
      sortCoursework(
        items.filter(
          (item) =>
            (!semester || item.semesterId === semester) &&
            (!course || item.courseId === course) &&
            matchesSearch(item.searchText, query),
        ),
        sort,
      ),
    [items, semester, course, query, sort],
  );
  const currentSemester = groups.find((group) => group.id === semester);
  const currentCourse = items.find((item) => item.courseId === course);
  const validFolder =
    (!semester || !!currentSemester) &&
    (!course || !!currentCourse) &&
    (!semester ||
      !course ||
      !!currentSemester?.courses.some((folder) => folder.id === course));
  const folderValue = new URLSearchParams({ semester, course }).toString();
  const selectedClass = "border-clay/30 bg-clay/10 font-bold text-clay";
  const idleClass =
    "border-transparent text-ink/70 hover:border-ink/15 hover:bg-cream";

  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-3" aria-label="作业档案统计">
        {[
          ["课程", new Set(items.map((item) => item.courseId)).size],
          ["作业", items.length],
          [
            "附件",
            items.reduce((total, item) => total + item.documentCount, 0),
          ],
        ].map(([label, count]) => (
          <p
            key={label}
            className="rounded-xl border border-ink/10 bg-paper px-4 py-3 text-sm text-ink/70"
          >
            <strong className="mr-2 text-xl text-ink">{count}</strong>
            {label}
          </p>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-ink/15 bg-paper p-4 sm:p-5">
        <label
          htmlFor="coursework-search"
          className="block text-sm font-semibold text-ink"
        >
          搜索课程、作业与知识点
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="coursework-search"
            type="search"
            value={query}
            onChange={(event) => update({ q: event.target.value }, "replace")}
            placeholder="试试 IRR、鸽巢原理、Homework 1…"
            className="min-w-0 flex-1 rounded-lg border border-ink/20 bg-paper px-3 py-3 text-ink placeholder:text-ink/70"
          />
          <button
            type="button"
            onClick={() => update({ q: "" }, "replace")}
            disabled={!query}
            className="shrink-0 rounded-lg border border-ink/20 px-3 text-sm font-semibold text-ink disabled:opacity-50"
          >
            清空搜索
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside
          className="hidden self-start rounded-xl border border-ink/15 bg-paper p-4 lg:block"
          aria-label="课程文件夹"
        >
          <h2 className="mb-4 text-sm font-bold text-ink">课程目录</h2>
          <button
            className={
              "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm " +
              (!course && !semester ? selectedClass : idleClass)
            }
            aria-pressed={!course && !semester}
            onClick={() => update({ semester: "", course: "" })}
          >
            全部作业 <span>{items.length}</span>
          </button>
          {groups.map((group) => (
            <details open key={group.id} className="mt-4">
              <summary className="cursor-pointer rounded-md py-2 text-sm font-semibold text-ink">
                {group.label}
                <span className="ml-2 font-normal text-ink/70">
                  {group.count}
                </span>
              </summary>
              <div className="ml-2 space-y-1 border-l border-ink/15 pl-2">
                <button
                  className={
                    "w-full rounded-lg border px-3 py-2 text-left text-sm " +
                    (semester === group.id && !course
                      ? selectedClass
                      : idleClass)
                  }
                  aria-pressed={semester === group.id && !course}
                  onClick={() => update({ semester: group.id, course: "" })}
                >
                  本学期全部 <span className="float-right">{group.count}</span>
                </button>
                {group.courses.map((folder) => (
                  <button
                    key={folder.id}
                    className={
                      "flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm " +
                      ((!semester || semester === group.id) &&
                      course === folder.id
                        ? selectedClass
                        : idleClass)
                    }
                    aria-pressed={
                      (!semester || semester === group.id) &&
                      course === folder.id
                    }
                    onClick={() =>
                      update({ semester: group.id, course: folder.id })
                    }
                  >
                    <span>{folder.name}</span>
                    <span>{folder.count}</span>
                  </button>
                ))}
              </div>
            </details>
          ))}
          {!groups.length && (
            <p className="text-sm leading-6 text-ink/70">
              添加第一份作业后，课程目录会自动出现。
            </p>
          )}
        </aside>
        <div className="min-w-0">
          <div className="mb-5 lg:hidden">
            <label
              className="block text-sm font-semibold text-ink"
              htmlFor="coursework-folder"
            >
              选择学期与课程
            </label>
            <select
              id="coursework-folder"
              className="mt-2 w-full rounded-lg border border-ink/20 bg-paper px-3 py-3 text-ink"
              value={folderValue}
              onChange={(event) => {
                const value = new URLSearchParams(event.target.value);
                update({
                  semester: value.get("semester") ?? "",
                  course: value.get("course") ?? "",
                });
              }}
            >
              <option
                value={new URLSearchParams({
                  semester: "",
                  course: "",
                }).toString()}
              >
                全部作业（{items.length}）
              </option>
              {!semester && currentCourse && (
                <option value={folderValue}>
                  {currentCourse.courseName} · 全部学期
                </option>
              )}
              {groups.map((group) => (
                <optgroup key={group.id} label={group.label}>
                  <option
                    value={new URLSearchParams({
                      semester: group.id,
                      course: "",
                    }).toString()}
                  >
                    {group.label} · 全部（{group.count}）
                  </option>
                  {group.courses.map((folder) => (
                    <option
                      key={folder.id}
                      value={new URLSearchParams({
                        semester: group.id,
                        course: folder.id,
                      }).toString()}
                    >
                      {folder.name}（{folder.count}）
                    </option>
                  ))}
                </optgroup>
              ))}
              {!validFolder && (
                <option value={folderValue}>目录不存在，请重新选择</option>
              )}
            </select>
          </div>
          <nav
            aria-label="当前作业目录"
            className="flex flex-wrap gap-2 text-sm leading-6 text-ink/70"
          >
            <button
              className="font-semibold text-clay hover:underline"
              onClick={() => update({ semester: "", course: "" })}
            >
              全部作业
            </button>
            {semester && (
              <>
                <span aria-hidden="true">/</span>
                <button
                  className="text-clay hover:underline"
                  onClick={() => update({ course: "" })}
                >
                  {currentSemester?.label ?? "未知学期"}
                </button>
              </>
            )}
            {course && (
              <>
                <span aria-hidden="true">/</span>
                <span>{currentCourse?.courseName ?? "未知课程"}</span>
              </>
            )}
          </nav>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4">
            <p role="status" className="text-sm text-ink/70">
              找到 <strong className="text-ink">{results.length}</strong> 份作业
            </p>
            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="coursework-sort" className="text-ink/70">
                排序
              </label>
              <select
                id="coursework-sort"
                className="rounded-lg border border-ink/20 bg-paper px-3 py-2 text-ink"
                value={sort}
                onChange={(event) =>
                  update({
                    sort:
                      event.target.value === "updated"
                        ? ""
                        : event.target.value,
                  })
                }
              >
                <option value="updated">最近更新</option>
                <option value="oldest">最早创建</option>
                <option value="course">课程名称</option>
              </select>
            </div>
          </div>
          {sort !== "course" && (
            <p className="mt-3 text-xs leading-5 text-ink/70">
              仅用已确认的完整日期排序；无完整日期的作业置后，按课程、标题排列。
            </p>
          )}
          <div className="mt-5 space-y-4">
            {results.map((item) => (
              <article
                className="rounded-xl border border-ink/15 bg-paper p-5 transition-colors hover:border-clay/50 sm:p-6"
                key={item.slug}
              >
                <p className="text-xs font-semibold leading-6 text-clay">
                  <Highlight
                    text={item.semester + " / " + item.courseName}
                    query={query}
                  />
                </p>
                <h2 className="mt-2 text-xl font-bold text-ink">
                  <Link
                    className="hover:text-clay"
                    href={"/coursework/" + item.slug + "/"}
                  >
                    <Highlight text={item.title} query={query} />
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-7 text-ink/70">
                  <Highlight text={item.summary} query={query} />
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="学习主题">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-cream px-2.5 py-1 text-xs text-ink"
                    >
                      <Highlight text={tag} query={query} />
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs leading-6 text-ink/70">
                  <span>{item.status}</span>
                  <span>{item.documentCount} 个附件</span>
                  {item.date ? (
                    <time dateTime={item.date}>{item.date}</time>
                  ) : (
                    item.dateLabel && <span>{item.dateLabel} · 年份待确认</span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold text-clay">
                  <Link
                    className="underline underline-offset-4"
                    href={"/coursework/" + item.slug + "/"}
                  >
                    查看作业 →
                  </Link>
                  {item.solutionUrl && (
                    <a
                      className="underline underline-offset-4"
                      href={assetPath(item.solutionUrl)}
                    >
                      打开解答 ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          {!results.length && (
            <div className="mt-5 rounded-xl border border-dashed border-ink/20 bg-paper p-8 text-center">
              <h2 className="text-lg font-bold text-ink">
                {items.length ? "没有找到匹配的作业" : "还没有作业"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">
                {items.length
                  ? "试试其他关键词，或切换课程目录。"
                  : "添加作业后，课程和学期会自动归档。"}
              </p>
              {items.length > 0 && (
                <button
                  className="button-secondary mt-5"
                  onClick={() => update({ q: "", semester: "", course: "" })}
                >
                  查看全部作业
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
