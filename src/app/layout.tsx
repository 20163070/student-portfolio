import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";

const bodyFont = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://20163070.github.io/student-portfolio"),
  title: {
    default: "20163070 | 学生学习档案",
    template: "%s | 20163070",
  },
  description: "记录软件工程学习中的项目、ICS Lab 教程、课程笔记和思考复盘。",
  openGraph: {
    title: "20163070 | 学生学习档案",
    description: "项目、Lab、课程和 Markdown 技术博客。",
    url: "https://20163070.github.io/student-portfolio",
    siteName: "20163070 Learning Archive",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
