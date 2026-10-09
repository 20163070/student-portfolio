import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { toString } from "mdast-util-to-string";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  summary: string;
  tags: string[];
  readingTime: string;
  year: string;
  unfinished: boolean;
  reviewNote?: string;
};

export type Post = PostMeta & {
  content: string;
  demo?: "counter";
  headings: {
    id: string;
    text: string;
    level: number;
  }[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueHeadingId(baseId: string, counts: Map<string, number>) {
  const safeBaseId = baseId || "section";
  const count = counts.get(safeBaseId) ?? 0;
  counts.set(safeBaseId, count + 1);

  return count === 0 ? safeBaseId : `${safeBaseId}-${count + 1}`;
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function getYear(date: string) {
  return date.slice(0, 4) || "Unknown";
}

function getMarkdownFiles() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function getHeadings(content: string) {
  const counts = new Map<string, number>();
  const tree = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .parse(content);
  return tree.children.flatMap((node) => {
    if (node.type !== "heading" || (node.depth !== 2 && node.depth !== 3))
      return [];
    const text = toString(node);
    return [
      { id: uniqueHeadingId(slugify(text), counts), text, level: node.depth },
    ];
  });
}

export function getAllPosts(): PostMeta[] {
  return getMarkdownFiles()
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContent = fs.readFileSync(fullPath, "utf8");

      try {
        const { data, content } = matter(fileContent);

        return {
          slug,
          title: String(data.title ?? slug),
          date: String(data.date ?? ""),
          updated: data.updated ? String(data.updated) : undefined,
          summary: String(data.summary ?? ""),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          readingTime: estimateReadingTime(content),
          year: getYear(String(data.date ?? "")),
          unfinished: /\bTODO\b|占位|待补充/.test(content),
          reviewNote:
            slug === "ics-data-lab-guide"
              ? "原始学习笔记：内容与实验完成情况待本人复核。"
              : undefined,
        };
      } catch {
        return {
          slug,
          title: slug,
          date: "",
          summary: "这篇文章的 frontmatter 格式需要修复。",
          tags: ["draft"],
          readingTime: "1 min read",
          year: "Unknown",
          unfinished: true,
        };
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf8");

  try {
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      updated: data.updated ? String(data.updated) : undefined,
      summary: String(data.summary ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingTime: estimateReadingTime(content),
      year: getYear(String(data.date ?? "")),
      unfinished: /\bTODO\b|占位|待补充/.test(content),
      reviewNote:
        slug === "ics-data-lab-guide"
          ? "原始学习笔记：内容与实验完成情况待本人复核。"
          : undefined,
      content,
      demo: data.demo === "counter" ? "counter" : undefined,
      headings: [
        ...(data.demo === "counter"
          ? [{ id: "counter-demo", text: "在线交互 Demo", level: 2 }]
          : []),
        ...getHeadings(content),
      ],
    };
  } catch {
    const content = [
      "## Frontmatter 格式需要修复",
      "",
      "这篇文章开头的 YAML frontmatter 格式有问题。请确认文件第一行是 `---`，并且 `title`、`summary` 等含冒号的字段使用双引号。",
      "",
      "```md",
      "---",
      'title: "文章标题"',
      'date: "2026-05-10"',
      'summary: "一句话简介"',
      "tags:",
      "  - ICS",
      "---",
      "```",
    ].join("\n");

    return {
      slug,
      title: slug,
      date: "",
      summary: "这篇文章的 frontmatter 格式需要修复。",
      tags: ["draft"],
      readingTime: "1 min read",
      year: "Unknown",
      unfinished: true,
      content,
      headings: getHeadings(content),
    };
  }
}

export function getAllTags() {
  return Array.from(new Set(getAllPosts().flatMap((post) => post.tags))).sort();
}

export function getPostsByTag(tag: string) {
  return getAllPosts().filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
  );
}

export function getPostsByYear() {
  return getAllPosts().reduce<Record<string, PostMeta[]>>((groups, post) => {
    groups[post.year] = groups[post.year] ?? [];
    groups[post.year].push(post);
    return groups;
  }, {});
}
