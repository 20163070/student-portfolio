import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { projects } from "@/data/projects";
import { assetPath, siteUrl } from "@/lib/site";
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
  return (
    <main>
      <Navbar />
      <article className="section-shell max-w-4xl">
        <Link className="text-sm font-bold text-clay" href="/projects">
          ← 全部项目
        </Link>
        <p className="section-kicker mt-10">Project Case Study</p>
        <h1 className="break-words text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {p.name}
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">{p.summary}</p>
        <p className="mt-4 text-sm font-semibold text-clay">{p.status}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="技术栈">
          {p.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-cream px-3 py-1 text-sm text-ink"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="button-primary" href={p.githubUrl}>
            GitHub 源代码 ↗
          </a>
          {p.demoUrl && (
            <a className="button-secondary" href={p.demoUrl}>
              已配置的网站地址 ↗
            </a>
          )}
        </div>
        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-ink">问题 / Problem</h2>
            <p className="mt-4 leading-8 text-ink/70">{p.problem}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-ink">个人角色 / My Role</h2>
            <p className="mt-4 rounded-xl border border-ink/10 bg-paper p-5 leading-8 text-ink/70">
              {p.myRole}
            </p>
          </section>
          {(
            [
              ["架构 / Architecture", p.architecture],
              ["工程难点 / Challenges", p.challenges],
              ["可核实结果 / Results", p.results],
            ] as const
          ).map(([title, items]) => (
            <section key={title}>
              <h2 className="text-2xl font-bold text-ink">{title}</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 leading-8 text-ink/70">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
          <section>
            <h2 className="text-2xl font-bold text-ink">
              项目截图 / Screenshots
            </h2>
            {p.screenshots.length ? (
              p.screenshots.map((shot) => (
                <figure className="mt-5" key={shot.src}>
                  <Image
                    className="w-full rounded-xl border border-ink/10"
                    src={assetPath(shot.src)}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                  />
                  <figcaption className="mt-2 text-sm text-ink/70">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))
            ) : (
              <p className="mt-4 leading-8 text-ink/70">
                暂无可公开的脱敏截图。
              </p>
            )}
          </section>
          <section>
            <h2 className="text-2xl font-bold text-ink">实现依据</h2>
            <p className="mt-3 text-sm text-ink/70">
              核实日期：2026-10-08。远程链接可能随仓库更新；本地改版尚未推送。
            </p>
            <ul className="mt-4 space-y-3">
              {p.evidence.map((source) => (
                <li key={source.url}>
                  <a
                    className="font-semibold text-clay underline underline-offset-4"
                    href={source.url}
                  >
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
