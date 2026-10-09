import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { coursework } from "@/data/coursework";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { siteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/projects",
    "/coursework",
    "/learning",
    "/blog",
    "/links",
    "/archive",
    "/search",
    "/tags",
    ...projects.map((p) => "/projects/" + p.slug),
    ...coursework.map((p) => "/coursework/" + p.slug),
    ...getAllPosts().map((p) => "/blog/" + p.slug),
    ...getAllTags().map((tag) => "/tags/" + encodeURIComponent(tag)),
  ];
  return routes.map((route) => ({ url: siteUrl + route + "/" }));
}
