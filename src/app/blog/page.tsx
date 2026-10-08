import { Navbar } from "@/components/Navbar";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  alternates: {
    canonical: "https://20163070.github.io/student-portfolio/blog/",
  },
  title: "Blog",
  description: "记录项目教程、课程 lab 和学习思考。",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Blog</p>
        <div className="mb-10 max-w-3xl">
          <h1 className="text-5xl font-black text-ink sm:text-6xl">
            教程和学习笔记
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink/68">
            这里用 Markdown 写长文章，比如 ICS Lab
            教程、课程总结、踩坑记录和项目复盘。
          </p>
        </div>

        <div className="space-y-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
