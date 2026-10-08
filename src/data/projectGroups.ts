// Compatibility view only. All project content lives in projects.ts.
import { projects } from "./projects";
export const projectGroups = [
  {
    title: "Projects",
    description: "可查阅源代码的项目",
    items: projects.map((project) => ({
      name: project.name,
      description: project.summary,
      links: [{ label: "GitHub", href: project.githubUrl }],
    })),
  },
];
