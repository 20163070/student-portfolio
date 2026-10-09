// Compatibility view only. All project content lives in projects.ts.
import { projects } from "./projects";
import { assetPath } from "@/lib/site";
export const projectGroups = [
  {
    title: "Projects",
    description: "个人项目与课程作品",
    items: projects.map((project) => ({
      name: project.name,
      description: project.summary,
      links: project.githubUrl
        ? [{ label: "GitHub", href: project.githubUrl }]
        : (project.documents ?? []).map((document) => ({
            label: document.label,
            href: assetPath(document.url),
          })),
    })),
  },
];
