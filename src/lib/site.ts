export const siteUrl = "https://20163070.github.io/student-portfolio";
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function assetPath(path: string) {
  return basePath + (path.startsWith("/") ? path : "/" + path);
}
