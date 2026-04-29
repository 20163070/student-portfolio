import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PostCard } from "@/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  return {
    title: `#${tag} | 学生学习档案`,
    description: `浏览 #${tag} 标签下的文章。`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <section className="section-shell">
        <p className="section-kicker">Tag</p>
        <h1 className="font-[var(--font-display)] text-5xl font-black text-ink sm:text-6xl">
          #{tag}
        </h1>
        <div className="mt-10 space-y-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
