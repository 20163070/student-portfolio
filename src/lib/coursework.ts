import { courseCatalog } from "@/data/course-catalog";
import type { Course, Coursework } from "@/data/coursework-types";
import { normalizeSearch } from "./search-utils";

export const unknownSemester = "学期待确认";
export const unknownSemesterId = "unconfirmed";
export const unknownCourseId = "unconfirmed";

export function getCourse(courseId?: string): Course {
  return (
    courseCatalog.find((course) => course.id === courseId) ?? {
      id: unknownCourseId,
      name: "课程待确认",
    }
  );
}

export function semesterId(work: Coursework) {
  return work.semester || unknownSemesterId;
}

export function courseworkHref(work: Pick<Coursework, "slug">) {
  return "/coursework/" + work.slug + "/";
}

export function getRelatedCoursework(works: Coursework[], current: Coursework) {
  return current.courseId
    ? works.filter(
        (work) =>
          work.courseId === current.courseId && work.slug !== current.slug,
      )
    : [];
}

export function courseFolderHref(work: Coursework) {
  const params = new URLSearchParams({
    semester: semesterId(work),
    course: getCourse(work.courseId).id,
  });
  return "/coursework/?" + params.toString();
}

export type CourseworkListItem = {
  slug: string;
  title: string;
  courseId: string;
  courseName: string;
  semester: string;
  semesterId: string;
  date?: string;
  updatedAt?: string;
  dateLabel?: string;
  summary: string;
  tags: string[];
  status: string;
  documentCount: number;
  solutionUrl?: string;
  searchText: string;
};

export function toCourseworkListItem(work: Coursework): CourseworkListItem {
  const course = getCourse(work.courseId);
  return {
    slug: work.slug,
    title: work.title,
    courseId: course.id,
    courseName: course.name,
    semester: work.semester || unknownSemester,
    semesterId: semesterId(work),
    date: work.date,
    updatedAt: work.updatedAt,
    dateLabel: work.dateLabel,
    summary: work.summary,
    tags: work.tags,
    status: work.status,
    documentCount: work.documents.length,
    solutionUrl: work.documents.find((document) => document.role === "solution")
      ?.url,
    searchText: normalizeSearch(
      [
        work.title,
        course.name,
        course.englishName,
        work.semester,
        work.assignmentNumber,
        work.date,
        work.dateLabel,
        work.summary,
        ...work.tags,
        work.background,
        ...work.topics,
        ...work.focus,
        ...work.notes,
        ...work.documents.flatMap((document) => [
          document.label,
          document.description,
          document.url.split("/").pop(),
        ]),
      ]
        .filter(Boolean)
        .join(" "),
    ),
  };
}

export type CourseworkSort = "updated" | "oldest" | "course";
export function sortCoursework(
  items: CourseworkListItem[],
  sort: CourseworkSort,
) {
  return [...items].sort((a, b) => {
    if (sort !== "course") {
      const aDate = sort === "updated" ? a.updatedAt || a.date : a.date;
      const bDate = sort === "updated" ? b.updatedAt || b.date : b.date;
      if (aDate && bDate && aDate !== bDate)
        return sort === "updated"
          ? bDate.localeCompare(aDate)
          : aDate.localeCompare(bDate);
      if (aDate && !bDate) return -1;
      if (!aDate && bDate) return 1;
    }
    return (
      a.courseName.localeCompare(b.courseName, "zh-CN") ||
      a.title.localeCompare(b.title, "zh-CN") ||
      a.slug.localeCompare(b.slug)
    );
  });
}

export function groupCoursework(items: CourseworkListItem[]) {
  const groups = new Map<
    string,
    {
      id: string;
      label: string;
      count: number;
      courses: { id: string; name: string; count: number }[];
    }
  >();
  for (const item of items) {
    const group = groups.get(item.semesterId) ?? {
      id: item.semesterId,
      label: item.semester,
      count: 0,
      courses: [],
    };
    group.count++;
    const course = group.courses.find((course) => course.id === item.courseId);
    if (course) course.count++;
    else
      group.courses.push({
        id: item.courseId,
        name: item.courseName,
        count: 1,
      });
    groups.set(group.id, group);
  }
  return [...groups.values()]
    .sort((a, b) => {
      if (a.id === unknownSemesterId) return 1;
      if (b.id === unknownSemesterId) return -1;
      return b.label.localeCompare(a.label, "zh-CN");
    })
    .map((group) => ({
      ...group,
      courses: group.courses.sort((a, b) =>
        a.name.localeCompare(b.name, "zh-CN"),
      ),
    }));
}
