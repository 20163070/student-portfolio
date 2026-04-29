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
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        updated: data.updated ? String(data.updated) : undefined,
        summary: String(data.summary ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        readingTime: estimateReadingTime(content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: estimateReadingTime(content),
    content,
    headings: getHeadings(content),
  };
}
