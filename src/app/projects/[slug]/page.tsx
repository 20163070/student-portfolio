import { notFound } from "next/navigation";
import { WorkDetail } from "@/components/WorkDetail";
import { SilkRoadAgentDetail } from "@/components/SilkRoadAgentDetail";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((item) => item.slug === slug);
  return {
    title: p?.name ?? "项目不存在",
    description: p?.summary,
    alternates: { canonical: siteUrl + "/projects/" + slug + "/" },
    openGraph: {
      title: p?.name,
      description: p?.summary,
      url: siteUrl + "/projects/" + slug + "/",
    },
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((item) => item.slug === slug);
  if (!p) notFound();
  if (p.slug === "silk-road-agent") return <SilkRoadAgentDetail project={p} />;
  return <WorkDetail p={p} />;
}
