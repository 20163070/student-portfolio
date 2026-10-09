import { notFound } from "next/navigation";
import { CourseworkDetail } from "@/components/CourseworkDetail";
import { coursework } from "@/data/coursework";
import { siteUrl } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return coursework.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = coursework.find((item) => item.slug === slug);
  return {
    title: p?.title ?? "作业不存在",
    description: p?.summary,
    alternates: { canonical: siteUrl + "/coursework/" + slug + "/" },
    openGraph: {
      title: p?.title,
      description: p?.summary,
      url: siteUrl + "/coursework/" + slug + "/",
    },
  };
}
export default async function CourseworkPage({ params }: Props) {
  const { slug } = await params;
  const p = coursework.find((item) => item.slug === slug);
  if (!p) notFound();
  return <CourseworkDetail work={p} />;
}
