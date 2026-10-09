import { notFound } from "next/navigation";
import { WorkDetail } from "@/components/WorkDetail";
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
    title: p?.name ?? "作业不存在",
    description: p?.summary,
    alternates: { canonical: siteUrl + "/coursework/" + slug + "/" },
    openGraph: {
      title: p?.name,
      description: p?.summary,
      url: siteUrl + "/coursework/" + slug + "/",
    },
  };
}
export default async function CourseworkPage({ params }: Props) {
  const { slug } = await params;
  const p = coursework.find((item) => item.slug === slug);
  if (!p) notFound();
  return <WorkDetail p={p} />;
}
