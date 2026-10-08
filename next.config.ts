import type { NextConfig } from "next";
const basePath =
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.PORTFOLIO_GITHUB_PAGES === "true"
    ? "/student-portfolio"
    : "";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};
export default nextConfig;
