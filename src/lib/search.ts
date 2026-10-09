import { coursework } from "@/data/coursework";
import { projects } from "@/data/projects";
import { getAllPosts } from "./posts";
import { courseworkHref, toCourseworkListItem } from "./coursework";
import { normalizeSearch, type SearchItem } from "./search-utils";

/** Built on the server at export time. No PDF parsing or browser filesystem access. */
export function getSearchIndex(): SearchItem[] {
  return [
    ...getAllPosts().map((post): SearchItem => ({
      id: "blog:" + post.slug,
      kind: "blog",
      title: post.title,
      href: "/blog/" + post.slug + "/",
      summary: post.summary,
      tags: post.tags,
      context: "博客文章",
      note: post.unfinished ? "未完成笔记" : post.reviewNote,
      searchText: normalizeSearch(
        [post.title, post.summary, ...post.tags].join(" "),
      ),
    })),
    ...projects.map((project): SearchItem => ({
      id: "project:" + project.slug,
      kind: "project",
      title: project.name,
      href: "/projects/" + project.slug + "/",
      summary: project.summary,
      tags: project.techStack,
      context: project.status,
      searchText: normalizeSearch(
        [
          project.name,
          project.summary,
          project.problem,
          project.myRole,
          ...project.techStack,
          ...project.architecture,
          ...project.challenges,
          ...project.results,
        ].join(" "),
      ),
    })),
    ...coursework.map((work): SearchItem => {
      const item = toCourseworkListItem(work);
      return {
        id: "coursework:" + work.slug,
        kind: "coursework",
        title: work.title,
        href: courseworkHref(work),
        summary: work.summary,
        tags: work.tags,
        context: item.semester + " / " + item.courseName,
        searchText: item.searchText,
      };
    }),
  ];
}
