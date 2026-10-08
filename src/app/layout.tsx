import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import "katex/dist/katex.min.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl + "/"),
  title: {
    default: "20163070 | Developer Portfolio",
    template: "%s | 20163070",
  },
  description:
    "复旦大学 2025 级本科生，关注 Harness、算法与 AI Infra。公开项目、工程案例与技术笔记。",
  openGraph: {
    title: "20163070 | Developer Portfolio",
    description: "Harness / 算法 / AI Infra · 项目案例与技术写作",
    url: siteUrl + "/",
    siteName: "20163070 / dev",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: siteUrl + "/og-card.png",
        width: 1200,
        height: 630,
        alt: "20163070 Developer Portfolio",
      },
    ],
  },
  twitter: { card: "summary", title: "20163070 | Developer Portfolio" },
};
const themeInit =
  "try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches)}catch(e){document.documentElement.classList.toggle('dark',matchMedia('(prefers-color-scheme: dark)').matches)}";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          跳至主要内容
        </a>
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <footer className="section-shell border-t border-ink/10 py-8 text-sm text-ink/70">
          {profile.name} / 以代码与技术写作记录探索。
        </footer>
      </body>
    </html>
  );
}
