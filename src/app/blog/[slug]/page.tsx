import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/Navbar";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
    title: `${post.title} | 学生学习档案`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <article className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <Link
            className="inline-flex rounded-full border border-ink/15 px-4 py-2 text-sm font-bold text-ink/60 transition hover:border-clay hover:text-clay"
            href="/blog"
          >
            ← 返回 Blog
          </Link>

          <div className="mt-10">
            <div className="flex flex-wrap gap-3 text-sm font-bold text-ink/50">
              <span>{post.date}</span>
              {post.updated ? <span>Update {post.updated}</span> : null}
              <span>{post.readingTime}</span>
              {post.tags.map((tag) => (
                <span key={tag}># {tag}</span>
              ))}
            </div>
            <h1 className="mt-6 font-[var(--font-display)] text-4xl font-black leading-tight text-ink sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg italic leading-8 text-ink/60">
              {post.summary}
            </p>
          </div>

          <div className="prose-blog mt-12">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 id={slugify(String(children))}>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 id={slugify(String(children))}>{children}</h3>
                ),
                blockquote: ({ children }) => {
                  const text = String(children).toLowerCase();
                  const type = text.includes("[!warning]")
                    ? "warning"
                    : text.includes("[!tip]")
                      ? "tip"
                      : "note";
                  return <Callout type={type}>{children}</Callout>;
                },
              }}
              rehypePlugins={[
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
                rehypeHighlight,
              ]}
              remarkPlugins={[remarkGfm]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-[1.5rem] border border-ink/10 bg-paper/80 p-6 shadow-soft">
            <h2 className="text-sm font-black uppercase tracking-[0.22em] text-ink">
              Table of Contents
            </h2>
            <nav className="mt-5 space-y-3">
              {post.headings.map((heading) => (
                <a
                  className={`block text-sm leading-6 text-ink/58 transition hover:text-clay ${
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
