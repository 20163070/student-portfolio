import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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
};

export type Post = PostMeta & {
  content: string;
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
  return content
    .split("\n")
    .map((line) => /^(#{2,3})\s+(.+)$/.exec(line))
    .filter((match): match is RegExpExecArray => Boolean(match))
    .map((match) => ({
      id: slugify(match[2]),
      text: match[2],
      level: match[1].length,
    }));
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
      content,
      headings: getHeadings(content),
    };
  } catch {
    const content = [
      "## Frontmatter 格式需要修复",
      "",
      "这篇文章开头的 YAML frontmatter 格式有问题。请确认文件第一行是 `---`，并且 `title`、`summary` 等含冒号的字段使用双引号。",
      "",
      "```md",
      "---",
      "title: \"文章标题\"",
      "date: \"2026-05-10\"",
      "summary: \"一句话简介\"",
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
