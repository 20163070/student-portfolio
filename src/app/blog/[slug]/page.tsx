import Link from "next/link";
import { Children, isValidElement, type ReactNode } from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Image from "next/image";
import { assetPath, siteUrl } from "@/lib/site";
import { Navbar } from "@/components/Navbar";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function headingText(children: React.ReactNode) {
  return Children.toArray(children)
    .map((child): string => {
      if (typeof child === "string" || typeof child === "number")
        return String(child);
      if (isValidElement<{ children?: ReactNode }>(child))
        return headingText(child.props.children);
      return "";
    })
    .join("");
}

function fallbackHeadingId(text: string) {
  return slugify(text) || "section";
}

function Callout({
  children,
  type = "note",
}: {
  children: React.ReactNode;
  type?: "note" | "tip" | "warning";
}) {
  const styles = {
    note: "border-moss bg-paper",
    tip: "border-moss bg-cream",
    warning: "border-clay bg-paper",
  };

  return (
    <div className={`my-8 border-l-4 px-6 py-4 shadow-soft ${styles[type]}`}>
      {children}
    </div>
  );
}

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  return {
    title: `${post.title}`,
    description: post.summary,
    alternates: { canonical: siteUrl + "/blog/" + slug + "/" },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: siteUrl + "/blog/" + slug + "/",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  let headingIndex = 0;

  return (
    <main>
      <Navbar />
      <article className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <Link
            className="inline-flex rounded-full border border-ink/15 px-4 py-2 text-sm font-bold text-ink/70 transition hover:border-clay hover:text-clay"
            href="/blog"
          >
            ← 返回 Blog
          </Link>

          <div className="mt-10">
            <div className="flex flex-wrap gap-3 text-sm font-bold text-ink/70">
              <span>{post.date}</span>
              {post.updated ? <span>Update {post.updated}</span> : null}
              <span>{post.readingTime}</span>
              {post.tags.map((tag) => (
                <span key={tag}># {tag}</span>
              ))}
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight text-ink sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg italic leading-8 text-ink/70">
              {post.summary}
            </p>
          </div>

          {post.reviewNote && (
            <p
              className="mt-8 rounded-xl border border-ink/10 p-5 leading-7 text-ink"
              role="note"
            >
              {post.reviewNote}
            </p>
          )}
          {post.unfinished && (
            <p
              className="mt-8 rounded-xl border border-clay bg-paper p-5 leading-7 text-ink"
              role="note"
            >
              未完成笔记：原文仍含 TODO
              或待补充内容，保留作为学习过程记录，不作为完整教程或已验证成果。
            </p>
          )}
          <div className="prose-blog mt-12">
            <ReactMarkdown
              components={{
                img: ({ src, alt }) => {
                  if (typeof src !== "string") return null;
                  if (!src.startsWith("/"))
                    return (
                      <span className="text-sm">
                        外部图片：<a href={src}>{alt || "查看图片"}</a>
                      </span>
                    );
                  return (
                    <Image
                      src={assetPath(src)}
                      alt={alt || "文章插图"}
                      width={960}
                      height={640}
                      className="h-auto max-w-full"
                    />
                  );
                },
                a: ({ href, children }) =>
                  href?.startsWith("/") ? (
                    <Link href={href}>{children}</Link>
                  ) : (
                    <a href={href}>{children}</a>
                  ),
                table: ({ children }) => (
                  <div
                    className="overflow-x-auto"
                    tabIndex={0}
                    role="region"
                    aria-label="文章表格"
                  >
                    {" "}
                    <table>{children}</table>
                  </div>
                ),
                h2: ({ children }) => {
                  const text = headingText(children);
                  const id =
                    post.headings[headingIndex]?.id ?? fallbackHeadingId(text);
                  headingIndex += 1;
                  return <h2 id={id}>{children}</h2>;
                },
                h3: ({ children }) => {
                  const text = headingText(children);
                  const id =
                    post.headings[headingIndex]?.id ?? fallbackHeadingId(text);
                  headingIndex += 1;
                  return <h3 id={id}>{children}</h3>;
                },
                blockquote: ({ children }) => {
                  const text = headingText(children).toLowerCase();
                  const type = text.includes("[!warning]")
                    ? "warning"
                    : text.includes("[!tip")
                      ? "tip"
                      : "note";
                  return <Callout type={type}>{children}</Callout>;
                },
              }}
              rehypePlugins={[rehypeHighlight, rehypeKatex]}
              remarkPlugins={[remarkGfm, remarkMath]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto rounded-[1.5rem] border border-ink/10 bg-paper/80 p-6 shadow-soft">
            <h2 className="text-sm font-black uppercase tracking-[0.22em] text-ink">
              Table of Contents
            </h2>
            <nav aria-label="文章目录" className="mt-5 space-y-3">
              {post.headings.map((heading) => (
                <a
                  className={`block text-sm leading-6 text-ink/70 transition hover:text-clay ${
                    heading.level === 3 ? "pl-4" : ""
                  }`}
                  href={`#${heading.id}`}
                  key={`${heading.id}-${heading.text}`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </article>
    </main>
  );
}
